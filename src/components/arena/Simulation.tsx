import { Maximize2 } from 'lucide-react';

/** Standalone file served from public/simulation.html. */
const SIMULATION_URL = '/simulation.html';

const Simulation = () => (
  <section id="simulation" className="px-4 pb-20 sm:px-8">
    <div className="container px-0">
      <div className="divider-ornament font-display text-xs tracking-[0.3em]">SIMULATION</div>
      <div className="mt-4 mb-8 flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Monthly tournament simulation</h2>
        <p className="max-w-2xl text-lg italic text-muted-foreground">
          350 virtual players, 4 qualification rounds, semifinals, final and who earned what - about 2 minutes
        </p>
        <a
          href={SIMULATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-display text-xs tracking-[0.15em] text-primary transition-colors hover:text-gold-glow max-[699px]:hidden"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          OPEN FULLSCREEN
        </a>
      </div>
    </div>

    {/* Phones: prominent pill directly above the frame */}
    <div className="mb-4 flex justify-center min-[700px]:hidden">
      <a
        href={SIMULATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-pill inline-flex gap-2 font-display text-xs tracking-[0.15em]"
      >
        <Maximize2 className="h-3.5 w-3.5" />
        OPEN FULLSCREEN
      </a>
    </div>

    <div className="glass-card overflow-hidden rounded-lg hover:translate-y-0">
      <iframe
        src={SIMULATION_URL}
        title="Monthly tournament simulation"
        loading="lazy"
        className="block h-[75vh] min-h-[480px] w-full border-0 bg-background max-[699px]:h-[90vh] max-[699px]:min-h-[640px]"
      />
    </div>
  </section>
);

export default Simulation;
