import { cn } from '@/lib/utils';
import { useMascotSpeech } from '@/hooks/useMascotSpeech';
import DogeMascotSvg from './DogeMascotSvg';
import MascotBubble from './MascotBubble';

const MESSAGES = [
  "Much welcome! I'm Sir Doge, guardian of the Arena. Wow.",
  'Buy a ticket, beat the bots, win DOGE - all on-chain.',
  'Bots fill empty seats, so a battle starts in seconds!',
  'Press Play the game - such strategy, very glory!',
];

interface HeroMascotProps {
  /** perched: standing on the right hill (desktop). inline: under the Play button (phones). */
  variant: 'perched' | 'inline';
}

/** Sir Doge with his speech bubble (Doge theme only). */
const HeroMascot = ({ variant }: HeroMascotProps) => {
  const s = useMascotSpeech(MESSAGES, 6000);

  return (
    <div
      className={cn(
        'doge-only doge-mascot',
        `doge-mascot--${variant}`,
        s.typing && 'talking',
        s.waving && 'waving',
        s.hidden && 'dm-hidden',
      )}
    >
      <DogeMascotSvg onActivate={s.activate} onWaveEnd={s.endWave} />
      <MascotBubble text={s.text} hidden={s.hidden} announcement={s.announcement} onNext={s.next} onHide={s.hide} />
    </div>
  );
};

export default HeroMascot;
