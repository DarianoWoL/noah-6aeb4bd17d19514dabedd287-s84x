import type { RankingEntry } from '@/lib/arenaApi';
import type { LiveStatus } from '@/hooks/useArenaData';
import HallOfFameEmpty from './HallOfFameEmpty';
import LiveCaption from './LiveCaption';
import RankingTable from './RankingTable';

interface Props {
  ranking: RankingEntry[] | null;
  status: LiveStatus;
}

const HallOfFame = ({ ranking, status }: Props) => (
  <section id="hall-of-fame" className="container px-4 pb-20 sm:px-8">
    <div className="divider-ornament font-display text-xs tracking-[0.3em]">RANKING</div>
    <h2 className="mt-4 mb-3 text-center text-3xl font-bold text-foreground sm:text-4xl">Hall of Fame</h2>
    <LiveCaption {...status} />

    {(ranking !== null || !status.error) && (
      <div className="glass-card mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg hover:translate-y-0">
        <h3 className="border-b border-primary/15 px-5 py-4 text-sm font-bold tracking-[0.18em] text-primary">TOP 10 LORDS</h3>
        {ranking === null ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-8 animate-pulse rounded bg-muted/60" />
            ))}
          </div>
        ) : ranking.length === 0 ? (
          <HallOfFameEmpty />
        ) : (
          <RankingTable ranking={ranking} />
        )}
      </div>
    )}
  </section>
);

export default HallOfFame;
