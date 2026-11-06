import { ethers } from 'ethers';
import { provider, WAR_OF_LORDS_ABI, WAR_OF_LORDS_ADDRESS } from '@/lib/contract';
import { attachTimestamps, LOOKBACK_BLOCKS, toArenaEvent, type ArenaEvent } from '@/lib/events';

/** Same RPC limits as the activity feed: max 10,000 blocks per getLogs call. */
const CHUNK_SIZE = 2_000;
const CHUNK_CONCURRENCY = 4;
const HISTORY_LIMIT = 15;

/** Public getter for the per-wallet balance that `claim()` pays out (selector 0x402914f5). */
const claimableReader = new ethers.Contract(
  WAR_OF_LORDS_ADDRESS,
  ['function claimable(address) view returns (uint256)'],
  provider,
);

const iface = new ethers.Interface(WAR_OF_LORDS_ABI);
const topic = (name: string) => iface.getEvent(name)!.topicHash;

export interface WalletReport {
  address: string;
  claimable: bigint;
  events: ArenaEvent[];
}

/**
 * Reads this wallet's logs only. The address sits in topic 1 for TicketPurchased/PrizeClaimed
 * and in topic 2 for PrizeCredited, so each block window needs two filters.
 */
async function fetchWalletLogs(address: string): Promise<ethers.Log[]> {
  const player = ethers.zeroPadValue(address, 32);
  const filters = [
    [[topic('TicketPurchased'), topic('PrizeClaimed')], player],
    [topic('PrizeCredited'), null, player],
  ];

  const latest = await provider.getBlockNumber();
  const start = Math.max(0, latest - LOOKBACK_BLOCKS + 1);
  const jobs: (() => Promise<ethers.Log[] | null>)[] = [];
  for (let from = start; from <= latest; from += CHUNK_SIZE) {
    const to = Math.min(from + CHUNK_SIZE - 1, latest);
    for (const topics of filters) {
      jobs.push(() =>
        provider.getLogs({ address: WAR_OF_LORDS_ADDRESS, topics, fromBlock: from, toBlock: to }).catch(() => null),
      );
    }
  }

  const results: (ethers.Log[] | null)[] = [];
  for (let i = 0; i < jobs.length; i += CHUNK_CONCURRENCY) {
    results.push(...(await Promise.all(jobs.slice(i, i + CHUNK_CONCURRENCY).map((job) => job()))));
  }
  const ok = results.filter((r): r is ethers.Log[] => r !== null);
  if (jobs.length > 0 && ok.length === 0) throw new Error('All log requests failed');
  return ok.flat();
}

/** Read-only lookup: unclaimed prizes + recent events for one wallet. */
export async function lookupWallet(address: string): Promise<WalletReport> {
  const [claimable, logs] = await Promise.all([
    claimableReader.claimable(address) as Promise<bigint>,
    fetchWalletLogs(address),
  ]);
  const events = logs
    .map(toArenaEvent)
    .filter((e): e is ArenaEvent => e !== null)
    .sort((a, b) => b.blockNumber - a.blockNumber || b.logIndex - a.logIndex)
    .slice(0, HISTORY_LIMIT);
  return { address, claimable, events: await attachTimestamps(events) };
}
