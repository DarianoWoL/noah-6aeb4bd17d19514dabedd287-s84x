import FloatingCoins from './FloatingCoins';
import HeroCoin from './HeroCoin';
import ShibaFlag from './ShibaFlag';

/** Bright cartoon sky for the hero: golden coin, clouds, floating coins, hills and flag (Doge theme only). */
const CLOUDS = [
  { top: '18%', left: '8%', width: 170, duration: 38 },
  { top: '30%', left: '48%', width: 130, duration: 46 },
  { top: '52%', left: '78%', width: 200, duration: 52 },
  { top: '64%', left: '22%', width: 110, duration: 42 },
];

const HeroSky = () => (
  <div className="doge-only pointer-events-none absolute inset-0" aria-hidden>
    <HeroCoin />
    {CLOUDS.map((c) => (
      <span
        key={c.top}
        className="cloud"
        style={{ top: c.top, left: c.left, width: c.width, height: c.width * 0.32, animationDuration: `${c.duration}s` }}
      />
    ))}
    <FloatingCoins />
    <div className="hero-hill hero-hill-back" />
    <div className="hero-hill hero-hill-front" />
    <ShibaFlag />
  </div>
);

export default HeroSky;
