import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchArena, type ArenaData } from '@/lib/arenaApi';

const REFRESH_MS = 30_000;
const TIMEOUT_MS = 10_000;

export interface LiveStatus {
  error: boolean;
  loading: boolean;
  onRetry: () => void;
}

/** Polls the public arena endpoint every 30 s. Keeps the last good data on failure. */
export function useArenaData() {
  const [data, setData] = useState<ArenaData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const current = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    current.current?.abort();
    const ctrl = new AbortController();
    current.current = ctrl;
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    setLoading(true);

    try {
      const next = await fetchArena(ctrl.signal);
      if (current.current !== ctrl) return;
      setData(next);
      setError(false);
    } catch (err) {
      // Superseded by a newer request - not a real failure.
      if (current.current !== ctrl) return;
      console.error('Failed to load arena data:', err);
      setError(true);
    } finally {
      clearTimeout(timer);
      if (current.current === ctrl) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      clearInterval(id);
      current.current?.abort();
      current.current = null;
    };
  }, [load]);

  const status: LiveStatus = { error, loading, onRetry: load };
  return { data, status };
}
