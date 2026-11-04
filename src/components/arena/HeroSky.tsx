/** Bright cartoon sky for the hero: sun, clouds and rolling hills (Doge theme only). */
const CLOUDS = [
  { top: '18%', left: '8%', width: 170, duration: 38 },
  { top: '30%', left: '48%', width: 130, duration: 46 },
  { top: '52%', left: '78%', width: 200, duration: 52 },
  { top: '64%', left: '22%', width: 110, duration: 42 },
];

const HeroSky = () => (
  <div className="doge-only pointer-events-none absolute inset-0" aria-hidden>
    <div className="hero-sun" />
    {CLOUDS.map((c) => (
      <span
        key={c.top}
        className="cloud"
        style={{ top: c.top, left: c.left, width: c.width, height: c.width * 0.32, animationDuration: `${c.duration}s` }}
      />
    ))}
    <div className="hero-hill hero-hill-back" />
    <div className="hero-hill hero-hill-front" />
  </div>
);

export default HeroSky;
