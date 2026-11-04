import { ethers } from 'ethers';
import { provider, WAR_OF_LORDS_ABI, WAR_OF_LORDS_ADDRESS } from '@/lib/contract';

export const LOOKBACK_BLOCKS = 20_000;
/** Max blocks per getLogs call (the RPC rejects ranges above 10,000). */
const CHUNK_SIZE = 2_000;
/** How many chunk requests run at the same time. */
const CHUNK_CONCURRENCY = 4;
const FEED_LIMIT = 30;
const TOP_WINNERS_LIMIT = 10;

const iface = new ethers.Interface(WAR_OF_LORDS_ABI);

const EVENT_KINDS = {
  TicketPurchased: 'ticket',
  PrizeCredited: 'credited',
  PrizeClaimed: 'claimed',
} as const;

type EventName = keyof typeof EVENT_KINDS;
export type ArenaEventKind = (typeof EVENT_KINDS)[EventName];

const EVENT_TOPICS = (Object.keys(EVENT_KINDS) as EventName[]).map((name) => iface.getEvent(name)!.topicHash);

export interface ArenaEvent {
  id: string;
  kind: ArenaEventKind;
  player: string;
  amount: bigint;
  txHash: string;
  blockNumber: number;
  logIndex: number;
  timestamp: number | null;
}

export interface Winner {
  address: string;
  total: bigint;
  prizes: number;
}

export interface ArenaActivity {
  feed: ArenaEvent[];
  topWinners: Winner[];
  totals: { tickets: number; prizesCredited: bigint; winners: number };
  eventCount: number;
}

/** Fetches one block range; returns null instead of throwing if the RPC call fails. */
async function fetchChunk(fromBlock: number, toBlock: number): Promise<ethers.Log[] | null> {
  try {
    return await provider.getLogs({ address: WAR_OF_LORDS_ADDRESS, topics: [EVENT_TOPICS], fromBlock, toBlock });
  } catch (err) {
    console.warn(`Skipping blocks ${fromBlock}-${toBlock}:`, err);
    return null;
  }
}

/**
 * Reads the last LOOKBACK_BLOCKS blocks of logs in CHUNK_SIZE windows,
 * CHUNK_CONCURRENCY at a time. Failed chunks are skipped; throws only if every chunk failed.
 */
async function fetchLogs(): Promise<ethers.Log[]> {
  const latest = await provider.getBlockNumber();
  const start = Math.max(0, latest - LOOKBACK_BLOCKS + 1);
  const ranges: [number, number][] = [];
  for (let from = start; from <= latest; from += CHUNK_SIZE) {
    ranges.push([from, Math.min(from + CHUNK_SIZE - 1, latest)]);
  }

  const results: (ethers.Log[] | null)[] = [];
  for (let i = 0; i < ranges.length; i += CHUNK_CONCURRENCY) {
    const batch = ranges.slice(i, i + CHUNK_CONCURRENCY);
    results.push(...(await Promise.all(batch.map(([from, to]) => fetchChunk(from, to)))));
  }

  const ok = results.filter((r): r is ethers.Log[] => r !== null);
  if (ranges.length > 0 && ok.length === 0) throw new Error('All log chunks failed');
  return ok.flat();
}

/** Decodes one log; returns null (and skips it) if it can't be parsed. */
function toArenaEvent(log: ethers.Log): ArenaEvent | null {
  try {
    const parsed = iface.parseLog({ topics: [...log.topics], data: log.data });
    if (!parsed || !(parsed.name in EVENT_KINDS)) return null;
    const isTicket = parsed.name === 'TicketPurchased';
    return {
      id: `${log.transactionHash}-${log.index}`,
      kind: EVENT_KINDS[parsed.name as EventName],
      player: String(isTicket ? parsed.args.buyer : parsed.args.winner),
      amount: BigInt(isTicket ? parsed.args.price : parsed.args.amount),
      txHash: log.transactionHash,
      blockNumber: log.blockNumber,
      logIndex: log.index,
      timestamp: null,
    };
  } catch (err) {
    console.warn('Skipping undecodable log:', log.transactionHash, err);
    return null;
  }
}

function rankWinners(events: ArenaEvent[]): Winner[] {
  const byAddress = new Map<string, Winner>();
  for (const e of events) {
    if (e.kind !== 'credited') continue;
    const key = e.player.toLowerCase();
    const w = byAddress.get(key) ?? { address: e.player, total: 0n, prizes: 0 };
    w.total += e.amount;
    w.prizes += 1;
    byAddress.set(key, w);
  }
  return [...byAddress.values()].sort((a, b) => (b.total > a.total ? 1 : b.total < a.total ? -1 : 0));
}

/** Adds block timestamps to feed items (one request per unique block, batched by ethers). */
async function attachTimestamps(feed: ArenaEvent[]): Promise<ArenaEvent[]> {
  const blocks = [...new Set(feed.map((e) => e.blockNumber))];
  const fetched = await Promise.all(blocks.map((n) => provider.getBlock(n).catch(() => null)));
  const times = new Map(blocks.map((n, i) => [n, fetched[i]?.timestamp ?? null]));
  return feed.map((e) => ({ ...e, timestamp: times.get(e.blockNumber) ?? null }));
}

export async function fetchArenaActivity(): Promise<ArenaActivity> {
  const events = (await fetchLogs())
    .map(toArenaEvent)
    .filter((e): e is ArenaEvent => e !== null)
    .sort((a, b) => b.blockNumber - a.blockNumber || b.logIndex - a.logIndex);

  const winners = rankWinners(events);
  const feed = await attachTimestamps(events.slice(0, FEED_LIMIT));

  return {
    feed,
    topWinners: winners.slice(0, TOP_WINNERS_LIMIT),
    totals: {
      tickets: events.filter((e) => e.kind === 'ticket').length,
      prizesCredited: winners.reduce((sum, w) => sum + w.total, 0n),
      winners: winners.length,
    },
    eventCount: events.length,
  };
}
