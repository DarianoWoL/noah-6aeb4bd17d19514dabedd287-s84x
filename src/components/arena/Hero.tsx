import { motion } from 'framer-motion';
import { ShieldAlert, Swords } from 'lucide-react';
import heroImage from '@/assets/hero-arena.jpg';
import { PLAY_GAME_URL } from '@/lib/contract';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Embers from './Embers';
import HeroSky from './HeroSky';
import HeroMascot from './mascot/HeroMascot';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Hero = () => {
  // One mascot instance: on the hill (desktop) or under the Play button (phones).
  const isPhone = useMediaQuery('(max-width: 767px)');

  return (
  <section className="relative flex min-h-[92vh] items-center overflow-hidden">
    {/* Classic: dark castle scene */}
    <img src={heroImage} alt="" className="classic-only absolute inset-0 h-full w-full object-cover" />
    <div className="classic-only absolute inset-0" style={{ background: 'var(--gradient-hero-fade)' }} />
    <div className="classic-only">
      <Embers />
    </div>
    {/* Doge: bright sky scene */}
    <HeroSky />
    {!isPhone && <HeroMascot variant="perched" />}

    <div className="container relative z-10 px-4 pb-28 pt-28 sm:px-8">
      <motion.span
        {...fadeUp(0)}
        className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-3 py-1 font-display text-[11px] tracking-[0.12em] text-primary backdrop-blur-md"
      >
        <ShieldAlert className="h-3.5 w-3.5" />
        TESTNET - TEST DOGE HAS NO VALUE
      </motion.span>

      <motion.h1 {...fadeUp(0.15)} className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
        <span className="text-gold-gradient hero-title">War of Lords</span>
        <span className="mt-2 block text-2xl font-medium tracking-[0.08em] text-foreground sm:text-4xl lg:text-5xl">
          Onchain Tournaments
        </span>
      </motion.h1>

      <motion.p {...fadeUp(0.3)} className="mt-6 max-w-xl text-xl italic text-muted-foreground sm:text-2xl">
        Pay tournament tickets and win prizes in a game of skill - all on DogeOS.
      </motion.p>

      <motion.div {...fadeUp(0.45)} className="mt-10">
        <a
          href={PLAY_GAME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-flex items-center gap-3 rounded-md px-8 py-4 font-display text-sm font-bold tracking-[0.18em]"
        >
          <Swords className="h-4 w-4" />
          PLAY THE GAME
        </a>
      </motion.div>

      {isPhone && <HeroMascot variant="inline" />}
    </div>
  </section>
  );
};

export default Hero;
