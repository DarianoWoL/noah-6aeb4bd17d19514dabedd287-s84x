import { RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useArenaActivity } from '@/hooks/useArenaActivity';
import ActivityFeed from './ActivityFeed';
import EmptyActivity from './EmptyActivity';
import TopWinners from './TopWinners';
import TotalsStrip from './TotalsStrip';

const ArenaActivity = () => {
  const { data, loading, error, reload } = useArenaActivity();

  const body = () => {
    if (!data && loading) return <Skeleton className="h-72 w-full rounded-lg bg-muted/60" />;
    if (!data) return <p className="text-center text-lg italic text-destructive">{error}</p>;
    if (data.eventCount === 0) return <EmptyActivity />;
    return (
      <div className="space-y-6">
        <TotalsStrip totals={data.totals} />
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3"><ActivityFeed events={data.feed} /></div>
          <div className="lg:col-span-2"><TopWinners winners={data.topWinners} /></div>
        </div>
      </div>
    );
  };

  return (
    <section id="activity" className="container px-4 pb-20 sm:px-8">
      <div className="divider-ornament font-display text-xs tracking-[0.3em]">CHRONICLES</div>
      <div className="mt-4 mb-10 flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Tales of the Arena</h2>
        <button
          onClick={reload}
          disabled={loading}
          className="inline-flex items-center gap-2 font-display text-xs tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'READING THE CHAIN...' : 'REFRESH'}
        </button>
        {data && error && <p className="text-sm italic text-destructive">{error}</p>}
      </div>
      {body()}
    </section>
  );
};

export default ArenaActivity;
