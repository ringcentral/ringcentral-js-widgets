// @ts-nocheck
export const DEFAULT_THRESHOLD = 500;

/**
 * @property {function} fn - Original function to be debounced
 * @property {number} threshold
 */
export interface DebounceOptions<F> {
  /** @property {function} - Original function to be debounced */
  fn: F;
  /** @default 500 @property {number} - The debounce delay time. Or the throttle time if in leading mode. */
  threshold?: number;
  /** @default false @property {boolean} - If true, fn will be invoke first before starting the debounce timer. */
  leading?: boolean;
  /** @default true @property {boolean} - Only applies to leading=true. If true, calling the debounced function during debounce timer will lead to a trailing invocation. */
  trailing?: boolean;
  /** @default undefined @property {number} - Defines the maximum time in ms that the invocation can be delayed. This can be used as a throttling mechanism. */
  maxThreshold?: number;
}

export interface DebouncedFunction<F extends (...args: any) => any> {
  (this: any, ...args: Parameters<F>): ReturnType<F>;
  flush: () => ReturnType<F>;
  cancel: () => ReturnType<F>;
}

/**
 * @return {function} debounced - The debounced function. Set leading to true and maxThreshold to the same as threshold to have basic throttle function.
 * @return {function} debounced.cancel - Calling the cancel function will return the last known result and cancel the queued invocation if there is one.
 * @return {function} debounce.flush - Calling the flush function will return the last known result if no invocation is queued, or cancel the queue and invoke fn immediately and return the result.
 */
export function debounce<F extends (...args: any) => any>({
  fn,
  threshold = DEFAULT_THRESHOLD,
  leading = false,
  trailing = true,
  maxThreshold,
}: DebounceOptions<F>): DebouncedFunction<F> {
  let timeoutId: NodeJS.Timeout;
  let lastArgs: Parameters<F>;
  let lastThis: any;
  let lastResult: ReturnType<F>;
  let thresholdStart = 0;

  function invoke() {
    if (lastArgs) {
      lastResult = fn.apply(lastThis, lastArgs);
    }
    lastThis = undefined;
    lastArgs = undefined;
  }

  function getWaitTime(timestamp: number) {
    return !Number.isNaN(maxThreshold) && maxThreshold > 0
      ? Math.min(threshold, maxThreshold - (timestamp - thresholdStart))
      : threshold;
  }

  function handleTimeout() {
    timeoutId = null;
    const timestamp = Date.now();
    if (lastArgs) {
      thresholdStart = timestamp;
      invoke();
      timeoutId = setTimeout(handleTimeout, getWaitTime(timestamp));
    } else {
      thresholdStart = 0;
    }
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    // reset the args and thresholdStart since no invocation occurs
    lastThis = undefined;
    lastArgs = undefined;
    thresholdStart = 0;
    return lastResult;
  }

  function flush() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      handleTimeout();
    }
    return lastResult;
  }

  function debounced(this: any, ...args: Parameters<F>): ReturnType<F> {
    const timestamp = Date.now();
    if (!timeoutId || trailing || !leading) {
      lastThis = this;
      lastArgs = args;
    }

    if (!timeoutId && leading) {
      invoke();
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (thresholdStart === 0 || thresholdStart > timestamp) {
      // in case that the system time is adjusted backwards to a time server
      // resett he thresholdStart so that invocation will not be delayed indefinitely
      thresholdStart = timestamp;
    }
    timeoutId = setTimeout(handleTimeout, getWaitTime(timestamp));

    return lastResult;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
}
