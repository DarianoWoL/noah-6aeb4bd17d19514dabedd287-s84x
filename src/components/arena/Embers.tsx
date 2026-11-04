import { useMemo } from 'react';

/** Floating ember particles (CSS-only animation). */
const Embers = ({ count = 24 }: { count?: number }) => {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 10,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-0 rounded-full bg-gold-glow"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            boxShadow: '0 0 8px 2px hsl(var(--gold-glow) / 0.6)',
            animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default Embers;
