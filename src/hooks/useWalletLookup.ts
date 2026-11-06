import { useCallback, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { lookupWallet, type WalletReport } from '@/lib/walletLookup';

export type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'invalid' }
  | { status: 'error' }
  | { status: 'done'; report: WalletReport };

/** Validates an address and reads its prizes/history. Stale responses are ignored. */
export function useWalletLookup() {
  const [state, setState] = useState<LookupState>({ status: 'idle' });
  const requestId = useRef(0);

  const lookup = useCallback(async (input: string) => {
    const raw = input.trim();
    const id = ++requestId.current;
    if (!ethers.isAddress(raw)) {
      setState({ status: 'invalid' });
      return;
    }
    setState({ status: 'loading' });
    try {
      const report = await lookupWallet(ethers.getAddress(raw));
      if (id === requestId.current) setState({ status: 'done', report });
    } catch (err) {
      console.error('Wallet lookup failed:', err);
      if (id === requestId.current) setState({ status: 'error' });
    }
  }, []);

  return { state, lookup };
}
