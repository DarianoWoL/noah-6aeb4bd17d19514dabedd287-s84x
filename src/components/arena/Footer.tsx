import { TESTNET_CONFIG } from '@/lib/config';

const Footer = () => (
  <footer className="border-t border-primary/15 py-8">
    <div className="container flex flex-col items-center justify-between gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:px-8">
      <span className="font-display text-xs tracking-[0.2em]">WAR OF LORDS ARENA</span>
      <span>
        DogeOS Chikyu Testnet - Chain ID {TESTNET_CONFIG.chainId}
      </span>
    </div>
  </footer>
);

export default Footer;
