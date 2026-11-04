import { Crown } from 'lucide-react';
import { JOIN_URL } from '@/lib/arenaApi';

const HallOfFameEmpty = () => (
  <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-background/60">
      <Crown className="h-6 w-6 text-primary" />
    </span>
    <h3 className="text-2xl font-bold text-foreground">Be the first to climb the ranking</h3>
    <p className="text-lg italic text-muted-foreground">No lord has earned a place in the hall yet.</p>
    <a
      href={JOIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gold mt-2 rounded-md px-8 py-3 font-display text-xs font-bold tracking-[0.18em]"
    >
      PLAY
    </a>
  </div>
);

export default HallOfFameEmpty;
