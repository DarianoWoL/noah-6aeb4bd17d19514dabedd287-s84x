import { Swords } from 'lucide-react';
import { EXPLORER_CONTRACT_URL } from '@/lib/contract';

const Header = () => (
  <header className="absolute inset-x-0 top-0 z-20">
    <div className="container flex items-center justify-between px-4 py-5 sm:px-8">
      <a href="#" className="flex items-center gap-2 text-primary">
        <Swords className="h-5 w-5" />
        <span className="font-display text-sm font-bold tracking-[0.2em] sm:text-base">WAR OF LORDS</span>
      </a>
      <nav className="flex items-center gap-4 font-display text-xs tracking-[0.15em] text-muted-foreground sm:gap-5">
        <a href="#how" className="hidden transition-colors hover:text-primary md:inline">HOW IT WORKS</a>
        <a href="#live" className="transition-colors hover:text-primary">LIVE</a>
        <a href="#activity" className="hidden transition-colors hover:text-primary sm:inline">ACTIVITY</a>
        <a href="#simulation" className="hidden transition-colors hover:text-primary md:inline">SIMULATION</a>
        <a href={EXPLORER_CONTRACT_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
          CONTRACT
        </a>
      </nav>
    </div>
  </header>
);

export default Header;
