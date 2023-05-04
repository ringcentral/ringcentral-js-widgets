import { polling } from './polling';
import { sleep } from './sleep';

export interface WaitUntilOption {
  /**
   * interval time in `ms`
   *
   * @default 100
   */
  interval?: number;
  /**
   * timeout time in `ms`
   *
   * @default 5000
   */
  timeout?: number;
}

export interface WaitUntilPromise extends Promise<void> {
  /** cancel that wailUntil timer */
  cancel: () => void;
}

/**
 * Polling check `fn` result until `fn` return `true`
 *
 * throw error when timeout
 */
export const waitUntil = (
  fn: () => boolean | Promise<boolean>,
  { interval = 100, timeout = 5000 }: WaitUntilOption = {},
) => {
  const timeoutPromise = sleep(timeout);
  const poolingPromise = polling(fn, interval);
  let rejector: (reason?: any) => void;

  const clearTimers = () => {
    timeoutPromise.cancel();
    poolingPromise.cancel();
  };

  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise(async (resolve, reject) => {
    rejector = reject;
    await Promise.race([
      poolingPromise,
      timeoutPromise.then(() => {
        reject(new Error(`${timeout} ms timeout error`));
      }),
    ])
      // TODO: use then and catch for support old browser, that can be remove after we no longer need support that.
      .then(clearTimers)
      .catch(clearTimers);

    resolve();
  }) as WaitUntilPromise;

  promise.cancel = () => {
    rejector(new Error('Async waitUntil has been cancelled'));
    clearTimers();
  };

  return promise;
};
