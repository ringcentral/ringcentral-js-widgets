import { debounce, DebouncedFunction, DebounceOptions } from './debounce';

export interface PromisedDebounceFunction<
  F extends (this: any, ...args: any) => any
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
      setImmediate(() => {
        lastResolve(result);
      });
      return result;
    } catch (error) {
      setImmediate(() => {
        lastReject(error);
      });
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
      setImmediate(() => lastReject(new Error('cancelled')));
    }
    return result;
  }

  debouncePromiseFn.cancel = cancel;
  debouncePromiseFn.flush = debounced.flush;

  return debouncePromiseFn;
}
