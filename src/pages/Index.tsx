import Header from '@/components/arena/Header';
import Hero from '@/components/arena/Hero';
import LiveStats from '@/components/arena/LiveStats';
import ArenaActivity from '@/components/arena/ArenaActivity';
import ContractLink from '@/components/arena/ContractLink';
import Footer from '@/components/arena/Footer';

const Index = () => (
  <div className="grain relative min-h-screen">
    <Header />
    <main>
      <Hero />
      <LiveStats />
      <ArenaActivity />
      <ContractLink />
    </main>
    <Footer />
  </div>
);

export default Index;
