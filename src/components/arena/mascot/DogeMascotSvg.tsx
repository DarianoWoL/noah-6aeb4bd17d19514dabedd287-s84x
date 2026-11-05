import type { AnimationEvent, KeyboardEvent } from 'react';
import MascotHead from './MascotHead';

interface DogeMascotSvgProps {
  onActivate: () => void;
  onWaveEnd: () => void;
}

/** Sir Doge knight figure (body, tail, waving arm). Ported from public/doge-mascot.html. */
const DogeMascotSvg = ({ onActivate, onWaveEnd }: DogeMascotSvgProps) => {
  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
    }
  };
  const onArmEnd = (e: AnimationEvent<SVGGElement>) => {
    if (e.animationName === 'dm-wave') onWaveEnd();
  };

  return (
    <svg
      className="dm-svg"
      viewBox="0 0 240 280"
      role="button"
      tabIndex={0}
      aria-label="Sir Doge mascot - show speech bubble"
      onClick={onActivate}
      onKeyDown={onKey}
    >
      <ellipse cx="120" cy="266" rx="78" ry="9" className="dm-ink" opacity="0.18" />
      <g className="dm-figure dm-ink-stroke" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <g className="dm-tail">
          <path d="M156 214 C192 216 216 190 208 160 C202 136 172 134 167 156 C164 171 180 178 189 168 C188 188 174 198 154 198 Z" className="dm-fur" />
          <path d="M175 150 C186 144 198 150 200 160 C192 156 182 156 175 150 Z" className="dm-cream" strokeWidth="3" />
        </g>

        <ellipse cx="80" cy="236" rx="26" ry="23" className="dm-fur" />
        <ellipse cx="160" cy="236" rx="26" ry="23" className="dm-fur" />
        <ellipse cx="66" cy="257" rx="19" ry="9" className="dm-cream" />
        <ellipse cx="174" cy="257" rx="19" ry="9" className="dm-cream" />

        <path d="M84 250 C72 214 80 168 120 162 C160 168 168 214 156 250 Z" className="dm-fur" />
        <ellipse cx="120" cy="184" rx="24" ry="17" className="dm-cream" stroke="none" />

        <path d="M84 182 Q98 172 108 174 L120 198 L132 174 Q142 172 156 182 L162 234 Q120 248 78 234 Z" className="dm-tunic" />
        <path d="M100 200 L104 236 M140 200 L136 236" className="dm-s-tunic-dark" strokeWidth="3" fill="none" />
        <path d="M108 175 L120 198 L132 175" className="dm-s-gold" strokeWidth="4" fill="none" />
        <path d="M80 233 Q120 247 160 233" className="dm-s-gold" strokeWidth="5" fill="none" />
        <circle cx="120" cy="216" r="9" className="dm-gold" strokeWidth="3" />
        <path d="M120 210 L122 214.5 L126.5 215 L123 218 L124 222.5 L120 220 L116 222.5 L117 218 L113.5 215 L118 214.5 Z" className="dm-cream" strokeWidth="1.5" />

        <g>
          <rect x="92" y="198" width="20" height="62" rx="10" className="dm-fur" />
          <ellipse cx="102" cy="258" rx="14" ry="8" className="dm-cream" />
          <rect x="89" y="192" width="26" height="18" rx="8" className="dm-tunic" />
          <path d="M91 209 L113 209" className="dm-s-gold" strokeWidth="3" />
        </g>

        <MascotHead />

        <g className="dm-arm" onAnimationEnd={onArmEnd}>
          <rect x="128" y="198" width="20" height="62" rx="10" className="dm-fur" />
          <ellipse cx="138" cy="258" rx="14" ry="8" className="dm-cream" />
          <path d="M133 256 L133 262 M143 256 L143 262" strokeWidth="2.5" />
          <rect x="125" y="192" width="26" height="18" rx="8" className="dm-tunic" />
          <path d="M127 209 L149 209" className="dm-s-gold" strokeWidth="3" />
        </g>
      </g>
    </svg>
  );
};

export default DogeMascotSvg;
