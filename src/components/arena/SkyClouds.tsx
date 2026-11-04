/** Page-wide drifting clouds behind all content (Doge theme only). */
const CLOUDS = [
  { top: '22%', left: '4%', width: 150, duration: 46 },
  { top: '38%', left: '72%', width: 190, duration: 54 },
  { top: '58%', left: '12%', width: 120, duration: 40 },
  { top: '76%', left: '60%', width: 160, duration: 50 },
  { top: '90%', left: '30%', width: 110, duration: 44 },
];

const SkyClouds = () => (
  <div className="doge-only pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
    {CLOUDS.map((c) => (
      <span
        key={c.top}
        className="cloud"
        style={{ top: c.top, left: c.left, width: c.width, height: c.width * 0.32, animationDuration: `${c.duration}s` }}
      />
    ))}
  </div>
);

export default SkyClouds;
