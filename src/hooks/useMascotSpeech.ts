import { useCallback, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const isDogeTheme = () => document.documentElement.getAttribute('data-theme') !== 'classic';

/**
 * Speech-bubble state for Sir Doge: typewriter text, auto-cycling messages, Next / Hide,
 * and the wave gesture. Ported from the vanilla script in public/doge-mascot.html.
 */
export function useMascotSpeech(messages: string[], cycleMs = 6000) {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(reduceMotion ? Infinity : 0);
  const [hidden, setHidden] = useState(false);
  const [waving, setWaving] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const full = messages[index];
  const chars = useMemo(() => Array.from(full), [full]);
  const typing = !hidden && count < chars.length;

  // Typewriter: one character per tick, a short pause after punctuation.
  useEffect(() => {
    if (!typing) return;
    const last = chars[count - 1] ?? '';
    const delay = count === 0 ? 150 : /[.,!?]/.test(last) ? 170 : 28;
    const t = window.setTimeout(() => setCount((c) => c + 1), delay);
    return () => window.clearTimeout(t);
  }, [typing, count, chars]);

  const wave = useCallback(() => {
    if (reduceMotion) return;
    setWaving(false);
    requestAnimationFrame(() => setWaving(true)); // restart the CSS animation
  }, [reduceMotion]);

  const goTo = useCallback(
    (next: number, announce: boolean) => {
      setIndex(next);
      setCount(reduceMotion ? Infinity : 0);
      setHidden(false);
      if (announce) setAnnouncement(messages[next]);
      wave();
    },
    [messages, reduceMotion, wave],
  );

  // Auto-cycle every `cycleMs` (clock resets on Next); paused while hidden or in Classic theme.
  useEffect(() => {
    if (hidden) return;
    const t = window.setInterval(() => {
      if (isDogeTheme() && !document.hidden) goTo((index + 1) % messages.length, false);
    }, cycleMs);
    return () => window.clearInterval(t);
  }, [hidden, index, messages.length, cycleMs, goTo]);

  // Greet with a wave once the entrance animation has played.
  useEffect(() => {
    const t = window.setTimeout(wave, 900);
    return () => window.clearTimeout(t);
  }, [wave]);

  const next = useCallback(() => {
    if (typing) setCount(Infinity); // first press while typing reveals the full line
    else goTo((index + 1) % messages.length, true);
  }, [typing, index, messages.length, goTo]);

  const hide = useCallback(() => {
    setCount(Infinity);
    setHidden(true);
  }, []);

  const activate = useCallback(() => {
    if (hidden) {
      setHidden(false);
      setAnnouncement(full);
    }
    wave();
  }, [hidden, full, wave]);

  return {
    text: chars.slice(0, count).join(''),
    typing,
    hidden,
    waving,
    announcement,
    next,
    hide,
    activate,
    endWave: () => setWaving(false),
  };
}
