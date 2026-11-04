import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { EXPLORER_CONTRACT_URL } from '@/lib/contract';

const MENU_LINKS = [
  { label: 'HOW IT WORKS', href: '#how' },
  { label: 'TOURNAMENTS', href: '#tournaments' },
  { label: 'HALL OF FAME', href: '#hall-of-fame' },
  { label: 'LIVE', href: '#live' },
  { label: 'ACTIVITY', href: '#activity' },
  { label: 'SIMULATION', href: '#simulation' },
  { label: 'CONTRACT', href: EXPLORER_CONTRACT_URL, external: true },
];

/** Hamburger + dropdown panel, shown only below 900px. */
const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="min-[900px]:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="nav-pill inline-flex font-display"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {open && (
        <nav id="mobile-menu" className="mobile-menu absolute inset-x-4 top-full flex flex-col gap-3 p-4 font-display">
          {MENU_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="nav-pill flex justify-center"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
};

export default MobileMenu;
