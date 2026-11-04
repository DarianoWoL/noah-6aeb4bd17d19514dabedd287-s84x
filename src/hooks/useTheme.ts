import { useCallback, useState } from 'react';

export type Theme = 'doge' | 'classic';

export const THEME_STORAGE_KEY = 'wol-theme';

/** The pre-paint script in index.html sets data-theme; read it back. */
const readTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'classic' ? 'classic' : 'doge';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'doge' ? 'classic' : 'doge';
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
