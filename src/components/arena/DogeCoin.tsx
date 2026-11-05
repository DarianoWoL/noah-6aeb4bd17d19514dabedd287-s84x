import { useId } from 'react';

/** Rim bead positions (24 dots around the embossed rim). */
const BEADS = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2;
  return { x: 50 + Math.cos(a) * 41.5, y: 50 + Math.sin(a) * 41.5 };
});

/** Generic golden "Ð" coin (not the official Dogecoin logo). Colors come from --coin-* tokens. */
const DogeCoin = () => {
  const id = useId().replace(/:/g, '');
  const face = `coin-face-${id}`;
  const rim = `coin-rim-${id}`;

  return (
    <svg className="coin-svg" viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id={face} cx="38%" cy="34%" r="70%">
          <stop offset="0%" className="coin-stop-hi" />
          <stop offset="55%" className="coin-stop-gold" />
          <stop offset="100%" className="coin-stop-deep" />
        </radialGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="coin-stop-rim-light" />
          <stop offset="100%" className="coin-stop-rim-dark" />
        </linearGradient>
      </defs>

      {/* Rim + embossed edge */}
      <circle cx="50" cy="50" r="46" fill={`url(#${rim})`} className="coin-outline" strokeWidth="4" />
      {BEADS.map((b) => (
        <circle key={`${b.x}-${b.y}`} cx={b.x} cy={b.y} r="1.3" className="coin-bead" />
      ))}
      <path d="M22 30 A35 35 0 0 1 70 18" className="coin-emboss-hi" strokeWidth="2.2" strokeLinecap="round" />

      {/* Face */}
      <circle cx="50" cy="50" r="36" fill={`url(#${face})`} className="coin-groove" strokeWidth="3" />
      <path d="M78 64 A30 30 0 0 1 36 80" className="coin-emboss-lo" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* Embossed Ð */}
      <text x="51.5" y="52" textAnchor="middle" dominantBaseline="central" fontFamily="Fredoka, 'Trebuchet MS', sans-serif" fontWeight="700" fontSize="46" className="coin-letter-shadow">
        Ð
      </text>
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontFamily="Fredoka, 'Trebuchet MS', sans-serif" fontWeight="700" fontSize="46" className="coin-letter">
        Ð
      </text>
    </svg>
  );
};

export default DogeCoin;
