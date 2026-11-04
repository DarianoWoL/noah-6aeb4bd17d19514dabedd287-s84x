import { useCallback, useEffect, useState } from 'react';
import { fetchArenaActivity, type ArenaActivity } from '@/lib/events';

/** Loads recent contract events once on mount; call `reload` to refresh. */
export function useArenaActivity() {
  const [data, setData] = useState<ArenaActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setData(await fetchArenaActivity());
      setError(null);
    } catch (err) {
      console.error('Failed to read events:', err);
      setError('Could not load recent activity from the chain.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}
