import { TESTNET_CONFIG } from '@/lib/config';

const EXPLORER_BASE = TESTNET_CONFIG.explorerUrl.replace(/\/$/, '');

/** 0x12ab...34cd */
export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function txUrl(hash: string): string {
  return `${EXPLORER_BASE}/tx/${hash}`;
}

export function addressUrl(address: string): string {
  return `${EXPLORER_BASE}/address/${address}`;
}

const rtf = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
  ['second', 1],
];

/** "5 minutes ago" from a unix timestamp (seconds). */
export function timeAgo(timestamp: number | null): string {
  if (timestamp === null) return '';
  const diff = Math.round(timestamp - Date.now() / 1000);
  for (const [unit, seconds] of UNITS) {
    if (Math.abs(diff) >= seconds || unit === 'second') {
      return rtf.format(Math.round(diff / seconds), unit);
    }
  }
  return '';
}
