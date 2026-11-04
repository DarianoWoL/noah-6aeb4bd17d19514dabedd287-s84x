import type { ArenaRoom } from '@/lib/arenaApi';
import type { LiveStatus } from '@/hooks/useArenaData';
import LiveCaption from './LiveCaption';
import RoomCard from './RoomCard';

interface Props {
  rooms: ArenaRoom[] | null;
  status: LiveStatus;
}

const OpenTournaments = ({ rooms, status }: Props) => (
  <section id="tournaments" className="container px-4 py-20 sm:px-8">
    <div className="divider-ornament font-display text-xs tracking-[0.3em]">TOURNAMENTS</div>
    <h2 className="mt-4 mb-3 text-center text-3xl font-bold text-foreground sm:text-4xl">Open tournaments</h2>
    <LiveCaption {...status} />

    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {rooms === null && !status.error &&
        [0, 1, 2].map((i) => <div key={i} className="glass-card h-[420px] animate-pulse rounded-lg" />)}
      {rooms?.map((room, i) => <RoomCard key={`${room.name}-${i}`} room={room} index={i} />)}
    </div>

    {rooms?.length === 0 && (
      <p className="text-center text-lg italic text-muted-foreground">No tournaments are open right now. Check back soon.</p>
    )}
  </section>
);

export default OpenTournaments;
