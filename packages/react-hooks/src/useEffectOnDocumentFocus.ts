import { type DependencyList, type EffectCallback, useEffect } from 'react';

/**
 * function same as useEffect method, which will only trigger when the document is focusing
 */
export const useEffectOnDocumentFocus = (
  effect: EffectCallback,
  deps?: DependencyList,
) =>
  useEffect(() => {
    // only focus page should do the auto save action, because we will do the multiple state sync
    if (document.hasFocus()) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
