import { useEffect, useRef } from 'react';

/**
 * Stub for a future extracted game loop hook.
 * Currently the tick engine is inlined in game.tsx via useEffect/setInterval.
 * This hook is reserved for when that logic gets extracted.
 */
export function useGameLoop(
  callback: () => void,
  intervalMs: number,
  active: boolean
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => callbackRef.current(), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, active]);
}
