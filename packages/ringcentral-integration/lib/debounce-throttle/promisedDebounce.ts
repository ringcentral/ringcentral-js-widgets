// @ts-nocheck
import type { DebouncedFunction, DebounceOptions } from './debounce';
import { debounce } from './debounce';

export interface PromisedDebounceFunction<
  F extends (this: any, ...args: any) => any,
> {
  (this: any, ...args: Parameters<F>): Promise<ReturnType<F>>;
  cancel: DebouncedFunction<F>['cancel'];
  flush: DebouncedFunction<F>['flush'];
}

export function promisedDebounce<F extends (...args: any) => any>({
  fn,
  ...options
}: DebounceOptions<F>): PromisedDebounceFunction<F> {
  let promise: Promise<ReturnType<F>> = null;
  let reject: (reason?: any) => void = null;
  let resolve: (value?: any) => void = null;

  function wrappedFn(this: any, ...args: Parameters<F>) {
    let result: ReturnType<F>;
    const lastResolve = resolve;
    const lastReject = reject;

    promise = null;
    reject = null;
    resolve = null;

    try {
      result = fn.apply(this, args);
      setTimeout(() => {
        lastResolve(result);
      }, 0);
      return result;
    } catch (error: any /** TODO: confirm with instanceof */) {
      setTimeout(() => {
        lastReject(error);
      }, 0);
      throw error;
    }
  }

  const debounced = debounce({
    fn: wrappedFn,
    ...options,
  });

  function debouncePromiseFn(
    this: any,
    ...args: Parameters<F>
  ): Promise<ReturnType<F>> {
    if (!promise) {
      promise = new Promise((promiseResolve, promiseReject) => {
        resolve = promiseResolve;
        reject = promiseReject;
      });
    }
    debounced.apply(this, args);
    return promise;
  }

  function cancel() {
    const result = debounced.cancel();
    if (promise) {
      const lastReject = reject;
      promise = null;
      resolve = null;
      reject = null;
      setTimeout(() => lastReject(new Error('cancelled')), 0);
    }
    return result;
  }

  debouncePromiseFn.cancel = cancel;
  debouncePromiseFn.flush = debounced.flush;

  return debouncePromiseFn;
}
