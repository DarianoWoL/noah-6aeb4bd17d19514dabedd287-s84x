import { Coins, Crown, Landmark, Vault } from 'lucide-react';
import { useContractStats } from '@/hooks/useContractStats';
import { formatDoge } from '@/lib/contract';
import StatCard from './StatCard';

const LiveStats = () => {
  const { stats, error, updatedAt } = useContractStats();

  const cards = [
    { label: 'PRIZE POOL', icon: Crown, unit: 'DOGE', value: stats && formatDoge(stats.prizePool) },
    { label: 'GAME TREASURY', icon: Landmark, unit: 'DOGE', value: stats && formatDoge(stats.treasury) },
    { label: 'SEASON', icon: Coins, value: stats && `#${stats.season.toString()}` },
    { label: 'CONTRACT BALANCE', icon: Vault, unit: 'DOGE', value: stats && formatDoge(stats.balance) },
  ];

  return (
    <section id="live" className="container px-4 py-20 sm:px-8">
      <div className="divider-ornament font-display text-xs tracking-[0.3em]">LIVE CONTRACT</div>

      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">The Royal Ledger</h2>
        <p className="flex items-center gap-2 text-lg text-muted-foreground">
          <span className={`h-2 w-2 rounded-full ${error ? 'bg-destructive' : 'animate-pulse bg-primary'}`} />
          {error ?? (updatedAt ? `Updated ${updatedAt.toLocaleTimeString('en-US')} - refreshes every 15 s` : 'Reading the chain...')}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <StatCard key={c.label} index={i} label={c.label} icon={c.icon} unit={c.unit} value={c.value ?? null} />
        ))}
      </div>
    </section>
  );
};

export default LiveStats;
