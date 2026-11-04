import { Swords } from 'lucide-react';
import { EXPLORER_CONTRACT_URL } from '@/lib/contract';

const Header = () => (
  <header className="absolute inset-x-0 top-0 z-20">
    <div className="container px-3 sm:px-8">
      <div className="header-bar flex items-center justify-between gap-3 py-5">
        <a href="#" className="flex items-center gap-2 text-primary">
          <Swords className="classic-only h-5 w-5" />
          <span className="doge-only text-lg leading-none" aria-hidden>🐶</span>
          <span className="font-display text-sm font-bold tracking-[0.2em] sm:text-base">WAR OF LORDS</span>
        </a>
        <nav className="flex items-center gap-4 font-display text-xs tracking-[0.15em] text-muted-foreground sm:gap-5">
          <a href="#how" className="hidden transition-colors hover:text-primary md:inline">HOW IT WORKS</a>
          <a href="#tournaments" className="hidden transition-colors hover:text-primary lg:inline">TOURNAMENTS</a>
          <a href="#hall-of-fame" className="hidden transition-colors hover:text-primary lg:inline">HALL OF FAME</a>
          <a href="#live" className="transition-colors hover:text-primary">LIVE</a>
          <a href="#activity" className="hidden transition-colors hover:text-primary sm:inline">ACTIVITY</a>
          <a href="#simulation" className="hidden transition-colors hover:text-primary md:inline">SIMULATION</a>
          <a href={EXPLORER_CONTRACT_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            CONTRACT
          </a>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
