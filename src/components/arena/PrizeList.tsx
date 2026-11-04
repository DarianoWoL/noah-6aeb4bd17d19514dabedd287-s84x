import { Medal } from 'lucide-react';
import { formatAmount, type ArenaRoom } from '@/lib/arenaApi';

const PLACES = [
  { key: 'first', label: '1st', color: 'text-primary' },
  { key: 'second', label: '2nd', color: 'text-silver' },
  { key: 'third', label: '3rd', color: 'text-bronze' },
] as const;

const PrizeList = ({ prizes }: { prizes: ArenaRoom['prizesDoge'] }) => (
  <ul className="space-y-2">
    {PLACES.map(({ key, label, color }) => (
      <li key={key} className="theme-row flex items-center justify-between gap-3 rounded-md bg-background/40 px-3 py-2">
        <span className={`flex items-center gap-2 font-display text-xs tracking-[0.12em] ${color}`}>
          <Medal className="h-4 w-4" />
          {label}
        </span>
        <span className={`font-display text-sm font-bold ${color}`}>
          {formatAmount(prizes[key])} <span className="text-xs font-normal text-muted-foreground">DOGE</span>
        </span>
      </li>
    ))}
  </ul>
);

export default PrizeList;
