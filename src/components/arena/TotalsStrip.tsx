import { Crown, Ticket, Users } from 'lucide-react';
import { formatDoge } from '@/lib/contract';
import type { ArenaActivity } from '@/lib/events';

const TotalsStrip = ({ totals }: { totals: ArenaActivity['totals'] }) => {
  const items = [
    { label: 'TICKETS SOLD', value: totals.tickets.toLocaleString('en-US'), icon: Ticket },
    { label: 'PRIZES CREDITED', value: `${formatDoge(totals.prizesCredited)} DOGE`, icon: Crown },
    { label: 'WINNERS', value: totals.winners.toLocaleString('en-US'), icon: Users },
  ];

  return (
    <div className="glass-card grid grid-cols-1 divide-y divide-primary/15 rounded-lg sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex items-center gap-4 px-6 py-5">
          <Icon className="h-6 w-6 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="font-display text-[11px] tracking-[0.18em] text-muted-foreground">{label}</p>
            <p className="truncate font-display text-xl font-bold text-foreground sm:text-2xl">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalsStrip;
