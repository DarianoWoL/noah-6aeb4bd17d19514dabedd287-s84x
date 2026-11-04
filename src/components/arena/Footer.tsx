import { TESTNET_CONFIG } from '@/lib/config';

const FOOTER_LINKS = [
  { label: 'Source code', href: 'https://github.com/darekdarek412412-source/war-of-lords-dogeos' },
  {
    label: 'Contract',
    href: 'https://blockscout.testnet.dogeos.com/address/0x55b5838C405230246da2c805b81A6AA09F4980a7',
  },
  { label: 'Play the game', href: 'https://dogeos.waroflords.pl/?invite=5deeaa99831f69dfca8e66465de555ab8d3e' },
];

const Footer = () => (
  <footer className="site-footer border-t border-primary/15 px-4 py-10 sm:px-8">
    <div className="container flex flex-col items-center gap-5 px-0 text-center">
      <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
        War of Lords - Onchain Tournaments on DogeOS Chikyu Testnet (chain ID {TESTNET_CONFIG.chainId}). Testnet DOGE
        has no value.
      </p>
      <nav className="flex flex-wrap items-center justify-center gap-2 font-display text-xs tracking-[0.12em]">
        {FOOTER_LINKS.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="nav-pill inline-flex">
            {link.label.toUpperCase()}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
