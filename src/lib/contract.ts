import { ethers } from 'ethers';
import { TESTNET_CONFIG } from '@/lib/config';

/** War of Lords game contract on DogeOS Chikyu Testnet. */
export const WAR_OF_LORDS_ADDRESS = '0x55b5838C405230246da2c805b81A6AA09F4980a7';

/** Minimal read-only ABI — only the view functions the dashboard needs. */
export const WAR_OF_LORDS_ABI = [
  'function prizePool() view returns (uint256)',
  'function treasury() view returns (uint256)',
  'function season() view returns (uint256)',
];

/** Placeholder — replace with the real game URL. */
export const PLAY_GAME_URL = 'https://example.com/play';

export const EXPLORER_CONTRACT_URL = `${TESTNET_CONFIG.explorerUrl.replace(/\/$/, '')}/address/${WAR_OF_LORDS_ADDRESS}`;

const provider = new ethers.JsonRpcProvider(TESTNET_CONFIG.rpcUrl, TESTNET_CONFIG.chainId, {
  staticNetwork: true,
});

const contract = new ethers.Contract(WAR_OF_LORDS_ADDRESS, WAR_OF_LORDS_ABI, provider);

export interface ContractStats {
  prizePool: bigint;
  treasury: bigint;
  season: bigint;
  balance: bigint;
}

/** Reads all dashboard values in parallel. */
export async function fetchContractStats(): Promise<ContractStats> {
  const [prizePool, treasury, season, balance] = await Promise.all([
    contract.prizePool() as Promise<bigint>,
    contract.treasury() as Promise<bigint>,
    contract.season() as Promise<bigint>,
    provider.getBalance(WAR_OF_LORDS_ADDRESS),
  ]);
  return { prizePool, treasury, season, balance };
}

/** Formats a wei amount as DOGE with up to 4 decimals. */
export function formatDoge(wei: bigint): string {
  const value = Number(ethers.formatEther(wei));
  return value.toLocaleString('en-US', { maximumFractionDigits: 4 });
}
