import DogeCoin from './DogeCoin';

/** Big golden Ð coin in the hero's top-right corner: slow 3D spin, shine sweep and soft glow. */
const HeroCoin = () => (
  <div className="hero-coin">
    <div className="hero-coin-spin">
      <DogeCoin />
      <span className="hero-coin-shine" />
    </div>
  </div>
);

export default HeroCoin;
