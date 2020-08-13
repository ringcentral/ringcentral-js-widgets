import { debounce, DEFAULT_THRESHOLD } from './debounce';

export interface ThrottleOptions<F> {
  /** @property {function} - The function to be throttled. */
  fn: F;
  /** @default true @property {boolean} - When true, fn will be invoked first, then the throttle timer will start. When false, will start throttle timer and only invoke after thorttle. */
  leading?: boolean;
  /** @default true @property {boolean} - When true, if there are calls during the throttle timer, fn will be invoked after throttle timer is over. When false, calls during the throttle timer will be ignored. */
  trailing?: boolean;
  /** @default 500 @property {boolean} - Throttle time in ms. The fn can only be invoke once every {threshold}ms. */
  threshold?: number;
}

/**
 * @return {function} throttled - The throttled function.
 * @return {function} throttled.cancel - Calling cancel will stop the throttle timer and prevent trailing invocation if queued, and return the last known result.
 * @return {function} throttled.flush - Calling flush will stop the throttle timer and invoke fn immediately and return the result if there is trailing invocation queue. If no trailing invocation is queued, it will return the last known result.
 */
export function throttle<F extends (...args: any) => any>({
  fn,
  leading = true,
  trailing = true,
  threshold = DEFAULT_THRESHOLD,
}: ThrottleOptions<F>) {
  return debounce({
    fn,
    leading,
    trailing,
    threshold,
    maxThreshold: threshold,
  });
}
