import type { RankingEntry } from '@/lib/arenaApi';

const rankColor = (rank: number) =>
  rank === 1 ? 'text-primary' : rank === 2 ? 'text-silver' : rank === 3 ? 'text-bronze' : 'text-muted-foreground';

const fmt = (n: number) => n.toLocaleString('en-US');

const RankingTable = ({ ranking }: { ranking: RankingEntry[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[480px] text-left">
      <thead>
        <tr className="font-display text-[11px] tracking-[0.15em] text-muted-foreground">
          <th className="px-5 py-3 font-normal">RANK</th>
          <th className="py-3 font-normal">NICKNAME</th>
          <th className="py-3 text-right font-normal">SKILL POINTS</th>
          <th className="py-3 text-right font-normal">GAMES</th>
          <th className="px-5 py-3 text-right font-normal">WINS</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-primary/10">
        {ranking.map((p) => (
          <tr key={`${p.rank}-${p.nick}`} className="transition-colors hover:bg-primary/5">
            <td className={`px-5 py-3 font-display font-bold ${rankColor(p.rank)}`}>{p.rank}</td>
            <td className="max-w-[200px] truncate py-3 text-lg font-semibold text-foreground">{p.nick}</td>
            <td className="py-3 text-right font-display font-bold text-primary">{fmt(p.skillPoints)}</td>
            <td className="py-3 text-right text-lg text-muted-foreground">{fmt(p.gamesPlayed)}</td>
            <td className="px-5 py-3 text-right text-lg text-foreground">{fmt(p.wins)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RankingTable;
