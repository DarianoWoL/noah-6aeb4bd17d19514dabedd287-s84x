import { ExternalLink, ScrollText } from 'lucide-react';
import { EXPLORER_CONTRACT_URL, WAR_OF_LORDS_ADDRESS } from '@/lib/contract';

const ContractLink = () => (
  <section className="container px-4 pb-20 sm:px-8">
    <a
      href={EXPLORER_CONTRACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card group mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-lg p-6 text-center sm:flex-row sm:text-left"
    >
      <ScrollText className="h-10 w-10 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm tracking-[0.15em] text-foreground">VIEW THE CONTRACT ON BLOCKSCOUT</p>
        <p className="mt-1 break-all font-mono text-xs text-muted-foreground">{WAR_OF_LORDS_ADDRESS}</p>
      </div>
      <ExternalLink className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
    </a>
  </section>
);

export default ContractLink;
