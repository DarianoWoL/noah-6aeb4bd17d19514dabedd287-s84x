import Header from '@/components/arena/Header';
import Hero from '@/components/arena/Hero';
import HowItWorks from '@/components/arena/HowItWorks';
import LiveArena from '@/components/arena/LiveArena';
import LiveStats from '@/components/arena/LiveStats';
import Simulation from '@/components/arena/Simulation';
import ArenaActivity from '@/components/arena/ArenaActivity';
import ContractLink from '@/components/arena/ContractLink';
import Footer from '@/components/arena/Footer';

const Index = () => (
  <div className="grain relative min-h-screen">
    <Header />
    <main>
      <Hero />
      <HowItWorks />
      <LiveArena />
      <LiveStats />
      <ArenaActivity />
      <Simulation />
      <ContractLink />
    </main>
    <Footer />
  </div>
);

export default Index;
