"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Track a CSS media query from React. The server snapshot is always `false`,
 * so server and first client render agree; the real value takes over as soon
 * as the store subscribes.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
