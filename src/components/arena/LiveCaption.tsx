import { RefreshCw } from 'lucide-react';
import type { LiveStatus } from '@/hooks/useArenaData';

/** "Live from the game server" caption with an inline retry on failure. */
const LiveCaption = ({ error, loading, onRetry }: LiveStatus) => (
  <div className="flex flex-col items-center gap-3 text-center">
    <p className="flex items-center gap-2 text-base italic text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${error ? 'bg-destructive' : 'animate-pulse bg-primary'}`} />
      Live from the game server - testnet DOGE has no value
    </p>
    {error && (
      <div role="alert" className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-base text-foreground">Could not reach the game server.</span>
        <button
          type="button"
          onClick={onRetry}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-3 py-1.5 font-display text-[11px] tracking-[0.15em] text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'RETRYING' : 'RETRY'}
        </button>
      </div>
    )}
  </div>
);

export default LiveCaption;
