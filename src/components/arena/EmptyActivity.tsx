import { Swords } from 'lucide-react';
import { PLAY_GAME_URL } from '@/lib/contract';
import { LOOKBACK_BLOCKS } from '@/lib/events';

const EmptyActivity = () => (
  <div className="glass-card mx-auto flex max-w-xl flex-col items-center gap-4 rounded-lg px-6 py-12 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-background/60">
      <Swords className="h-6 w-6 text-primary" />
    </span>
    <h3 className="text-2xl font-bold text-foreground">The arena awaits its first lord</h3>
    <p className="text-lg italic text-muted-foreground">
      No tickets or prizes in the last {LOOKBACK_BLOCKS.toLocaleString('en-US')} blocks. Be the first to enter the tournament.
    </p>
    <a
      href={PLAY_GAME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gold mt-2 rounded-md px-6 py-3 font-display text-xs font-bold tracking-[0.18em]"
    >
      PLAY THE GAME
    </a>
  </div>
);

export default EmptyActivity;
