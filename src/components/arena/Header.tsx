import type { MouseEvent } from 'react';
import { EXPLORER_CONTRACT_URL } from '@/lib/contract';
import MobileMenu from './MobileMenu';

/** Logo click: smooth scroll to the top (instant when reduced motion is preferred). */
const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
};

const Header = () => (
  <header className="absolute inset-x-0 top-0 z-20">
    <div className="container relative px-3 sm:px-8">
      {/* Crest logo: hangs below the bar, outside it on the left */}
      <a href="#" onClick={scrollToTop} className="site-logo">
        <img src="/logo-wol-doge.png" alt="War of Lords" width={840} height={659} className="site-logo-img" />
      </a>
      <div className="header-bar header-bar--logo flex items-center justify-end gap-3 py-5">
        <nav className="hidden min-w-0 items-center min-[900px]:flex justify-end gap-1.5 font-display text-[11px] tracking-[0.12em] sm:gap-2 sm:text-xs">
          <a href="#how" className="nav-pill hidden md:inline-flex">HOW IT WORKS</a>
          <a href="#tournaments" className="nav-pill hidden lg:inline-flex">TOURNAMENTS</a>
          <a href="#hall-of-fame" className="nav-pill hidden lg:inline-flex">HALL OF FAME</a>
          <a href="#live" className="nav-pill inline-flex">LIVE</a>
          <a href="#activity" className="nav-pill hidden sm:inline-flex">ACTIVITY</a>
          <a href="#simulation" className="nav-pill hidden md:inline-flex">SIMULATION</a>
          <a href={EXPLORER_CONTRACT_URL} target="_blank" rel="noopener noreferrer" className="nav-pill inline-flex">
            CONTRACT
          </a>
        </nav>
        <MobileMenu />
      </div>
    </div>
  </header>
);

export default Header;
