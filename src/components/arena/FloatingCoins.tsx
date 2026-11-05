import type { CSSProperties } from 'react';
import DogeCoin from './DogeCoin';

/**
 * Small bobbing Ð coins. Placed in the right/upper areas of the hero, away from the title
 * and the Play button; they also sit behind the text layer. Hidden on phones via CSS.
 */
const COINS: CSSProperties[] = [
  { top: '11%', left: '47%', width: 34, animationDuration: '4.2s' },
  { top: '17%', left: '67%', width: 28, animationDuration: '3.6s', animationDelay: '-1.2s' },
  { top: '36%', right: '30%', width: 44, animationDuration: '4.8s', animationDelay: '-2.1s' },
  { top: '44%', right: '9%', width: 30, animationDuration: '3.9s', animationDelay: '-0.6s' },
  { top: '54%', left: '60%', width: 24, animationDuration: '4.4s', animationDelay: '-3s' },
];

const FloatingCoins = () => (
  <>
    {COINS.map((style) => (
      <span key={`${style.top}-${style.width}`} className="float-coin" style={style}>
        <DogeCoin />
      </span>
    ))}
  </>
);

export default FloatingCoins;
