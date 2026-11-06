import { useState, type FormEvent } from 'react';
import { Loader2, Search, Wallet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useWalletLookup } from '@/hooks/useWalletLookup';
import WalletLookupResult from './WalletLookupResult';

/** Read-only wallet check: no connection, no transactions. */
const WalletLookup = () => {
  const [address, setAddress] = useState('');
  const { state, lookup } = useWalletLookup();
  const loading = state.status === 'loading';

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    lookup(address);
  };

  return (
    <section id="wallet" className="container px-4 pb-20 sm:px-8">
      <div className="glass-card mx-auto max-w-3xl rounded-lg p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <Wallet className="h-6 w-6 shrink-0 text-primary" />
          <h2 className="font-display text-sm font-bold tracking-[0.18em] text-foreground sm:text-base">CHECK YOUR WALLET</h2>
        </div>
        <p className="mt-2 text-lg italic text-muted-foreground">
          See unclaimed prizes and recent arena activity for any address. Read-only - no wallet connection needed.
        </p>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Paste your wallet address (0x...)"
            aria-label="Wallet address"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="h-12 min-w-0 flex-1 border-primary/40 bg-background/60 font-mono text-base sm:text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-gold inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 font-display text-xs font-bold uppercase tracking-[0.18em] disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Look up
          </button>
        </form>

        <WalletLookupResult state={state} />
      </div>
    </section>
  );
};

export default WalletLookup;
