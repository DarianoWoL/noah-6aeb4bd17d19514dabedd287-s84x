import type { ArenaEvent } from '@/lib/events';
import ActivityItem from './ActivityItem';

const ActivityFeed = ({ events }: { events: ArenaEvent[] }) => (
  <div className="glass-card overflow-hidden rounded-lg">
    <h3 className="border-b border-primary/15 px-5 py-4 text-sm font-bold tracking-[0.18em] text-primary">
      RECENT ACTIVITY
    </h3>
    {events.length === 0 ? (
      <p className="px-5 py-8 text-center italic text-muted-foreground">No activity yet.</p>
    ) : (
      <ul className="max-h-[560px] divide-y divide-primary/10 overflow-y-auto">
        {events.map((e) => (
          <ActivityItem key={e.id} event={e} />
        ))}
      </ul>
    )}
  </div>
);

export default ActivityFeed;
