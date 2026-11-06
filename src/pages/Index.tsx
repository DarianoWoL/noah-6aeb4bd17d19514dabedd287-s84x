import Header from '@/components/arena/Header';
import Hero from '@/components/arena/Hero';
import HowItWorks from '@/components/arena/HowItWorks';
import LiveArena from '@/components/arena/LiveArena';
import LiveStats from '@/components/arena/LiveStats';
import Simulation from '@/components/arena/Simulation';
import ArenaActivity from '@/components/arena/ArenaActivity';
import ContractLink from '@/components/arena/ContractLink';
import WalletLookup from '@/components/arena/WalletLookup';
import Footer from '@/components/arena/Footer';
import SkyClouds from '@/components/arena/SkyClouds';
import ThemeToggle from '@/components/arena/ThemeToggle';

const Index = () => (
  <div className="grain relative min-h-screen">
    <SkyClouds />
    <Header />
    <main>
      <Hero />
      <HowItWorks />
      <LiveArena />
      <LiveStats />
      <WalletLookup />
      <ArenaActivity />
      <Simulation />
      <ContractLink />
    </main>
    <Footer />
    <ThemeToggle />
  </div>
);

export default Index;
