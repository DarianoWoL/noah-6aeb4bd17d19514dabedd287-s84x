import { useCallback, useEffect, useState } from 'react';
import { fetchContractStats, type ContractStats } from '@/lib/contract';

const REFRESH_MS = 15_000;

/** Polls the War of Lords contract every 15 seconds. */
export function useContractStats() {
  const [stats, setStats] = useState<ContractStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchContractStats();
      setStats(data);
      setError(null);
      setUpdatedAt(new Date());
    } catch (err) {
      console.error('Failed to read contract:', err);
      setError('Could not reach the contract. Retrying...');
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  return { stats, error, updatedAt };
}
