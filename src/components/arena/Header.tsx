import { Swords } from 'lucide-react';
import { EXPLORER_CONTRACT_URL } from '@/lib/contract';
import MobileMenu from './MobileMenu';

const Header = () => (
  <header className="absolute inset-x-0 top-0 z-20">
    <div className="container px-3 sm:px-8">
      <div className="header-bar flex items-center justify-between gap-3 py-5">
        <a href="#" className="flex shrink-0 items-center gap-2 text-primary">
          <Swords className="classic-only h-5 w-5" />
          <span className="doge-only text-lg leading-none" aria-hidden>🐶</span>
          <span className="whitespace-nowrap font-display text-[13px] font-bold tracking-[0.12em] min-[400px]:text-sm min-[400px]:tracking-[0.2em] sm:text-base">
            WAR OF LORDS
          </span>
        </a>
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
