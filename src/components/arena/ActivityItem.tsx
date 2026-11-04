import { Crown, ExternalLink, HandCoins, Ticket } from 'lucide-react';
import { formatDoge } from '@/lib/contract';
import type { ArenaEvent } from '@/lib/events';
import { shortAddress, timeAgo, txUrl } from '@/lib/format';

const ICONS = { ticket: Ticket, credited: Crown, claimed: HandCoins };

function describe(e: ArenaEvent): string {
  const amount = `${formatDoge(e.amount)} DOGE`;
  if (e.kind === 'ticket') return `A player bought a ticket for ${amount}`;
  if (e.kind === 'credited') return `${amount} prize credited to ${shortAddress(e.player)}`;
  return `${shortAddress(e.player)} claimed ${amount}`;
}

const ActivityItem = ({ event }: { event: ArenaEvent }) => {
  const Icon = ICONS[event.kind];
  return (
    <li>
      <a
        href={txUrl(event.txHash)}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-primary/5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background/60">
          <Icon className="h-4 w-4 text-primary" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg leading-snug text-foreground">{describe(event)}</p>
          <p className="text-sm italic text-muted-foreground">{timeAgo(event.timestamp) || `Block ${event.blockNumber}`}</p>
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </a>
    </li>
  );
};

export default ActivityItem;
