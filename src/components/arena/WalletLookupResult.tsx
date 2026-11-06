import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDoge } from '@/lib/contract';
import { LOOKBACK_BLOCKS } from '@/lib/events';
import { addressUrl, shortAddress } from '@/lib/format';
import type { LookupState } from '@/hooks/useWalletLookup';
import ActivityItem from './ActivityItem';

const Note = ({ tone = 'muted', children }: { tone?: 'muted' | 'error'; children: ReactNode }) => (
  <p className={`mt-5 text-lg italic ${tone === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>{children}</p>
);

const WalletLookupResult = ({ state }: { state: LookupState }) => {
  if (state.status === 'idle') return null;
  if (state.status === 'loading') return <Skeleton className="mt-5 h-40 w-full rounded-lg bg-muted/60" />;
  if (state.status === 'invalid')
    return <Note tone="error">That doesn't look like a wallet address. It should start with 0x followed by 40 letters and numbers.</Note>;
  if (state.status === 'error')
    return <Note tone="error">Couldn't reach the DogeOS network right now. Check your connection and try again.</Note>;

  const { address, claimable, events } = state.report;
  return (
    <div className="mt-6 space-y-5">
      <div className="flex flex-col gap-3 rounded-lg border border-primary/25 bg-background/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-stat-label">UNCLAIMED PRIZES</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-stat-value">{formatDoge(claimable)}</span>
            <span className="font-display text-sm text-stat-label">DOGE</span>
          </p>
        </div>
        <a
          href={addressUrl(address)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {shortAddress(address)}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {events.length === 0 ? (
        <Note>No activity yet for this wallet in the last {LOOKBACK_BLOCKS.toLocaleString('en-US')} blocks.</Note>
      ) : (
        <div className="overflow-hidden rounded-lg border border-primary/15">
          <h3 className="border-b border-primary/15 px-5 py-3 text-sm font-bold tracking-[0.18em] text-primary">RECENT ACTIVITY</h3>
          <ul className="max-h-[420px] divide-y divide-primary/10 overflow-y-auto">
            {events.map((e) => (
              <ActivityItem key={e.id} event={e} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WalletLookupResult;
