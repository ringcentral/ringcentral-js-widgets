import {
  getRefElement,
  RefOrElementOrCallback,
  useEventCallback,
} from '@ringcentral/spring-ui';
import { useEffect, useRef } from 'react';

export type UseMutationObserverAction = {
  observe: () => void;
  stop: () => void;
};

export type UseMutationObserverConfig = {
  /**
   * start listening when component mounted
   *
   * @default true
   */
  startImmediately?: boolean;
};

/**
 * Watch for changes being made to the DOM tree.
 *
 * @param target - React ref or DOM node
 * @param callback - callback to execute when mutations are observed
 * @param options - Options passed to mutation observer
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 * @see https://react-hooks-library.vercel.app/core/useMutationObserver
 */
export function useMutationObserver(
  /** target element ref */
  target: RefOrElementOrCallback,
  callback: MutationCallback,
  options: MutationObserverInit = {},
  { startImmediately = true }: UseMutationObserverConfig = {},
) {
  const observerRef = useRef<MutationObserver | null>(null);
  const isSupported = !!global.window?.MutationObserver;

  const cb = useEventCallback<MutationCallback>((...args) => {
    return callback(...args);
  });

  const stop = useEventCallback(() => {
    if (!observerRef.current) return;

    observerRef.current.disconnect();
    observerRef.current = null;
  });

  const observe = useEventCallback(() => {
    if (!observerRef.current) return;
    const elm = getRefElement(target);

    if (!isSupported || !elm) return;
    observerRef.current.observe(elm, options);
  });

  useEffect(() => {
    const elm = getRefElement(target);

    if (!isSupported || !elm) return stop;

    const observer = new global.window.MutationObserver(cb);
    observerRef.current = observer;

    if (startImmediately) {
      observe();
    }

    return stop;
  }, [cb, isSupported, observe, startImmediately, stop, target]);

  return {
    observe,
    stop,
  } as UseMutationObserverAction;
}
