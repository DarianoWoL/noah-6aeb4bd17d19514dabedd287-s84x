import { useTheme } from '@/hooks/useTheme';

/** Small fixed switch between the Doge (default) and Classic looks. */
const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const label = theme === 'doge' ? '🏰 Classic look' : '🐶 Doge look';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'doge' ? 'Classic' : 'Doge'} look`}
      className="btn-gold fixed bottom-4 left-4 z-[60] rounded-full px-4 py-2 font-display text-xs font-bold tracking-[0.08em] sm:text-sm"
    >
      {label}
    </button>
  );
};

export default ThemeToggle;
