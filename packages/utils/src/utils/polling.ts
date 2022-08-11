// import { jestFakeTimersAreEnabled } from '@ringcentral-integration/test-utils/lib/jestFakeTimersAreEnabled';

import { sleep } from './sleep';

export interface PollingPromise extends Promise<void> {
  /** cancel polling timer */
  cancel: () => void;
}

/**
 * polling execute function, that will be executed until it returns `true`
 * @param fn polling function
 * @param interval interval time in milliseconds, when you not provide it, that will ignore any delay between each execution
 *
 * @example
 * ```ts
 * let count = 5;
 *
 * const pollingPromise = polling(() => {
 *  count++;
 *
 *  return count >= 5;
 * }, 1000);
 *
 * pollingPromise
 *   .then(() => {
 *     console.log('polling done');
 *   })
 *   .catch(() => {
 *     console.log('polling canceled');
 *   }
 *
 * const onClick = () => {
 *   pollingPromise.cancel();
 * }
 * ```
 */
export const polling = (
  fn: () => boolean | Promise<boolean>,
  interval?: number,
) => {
  if (process.env.NODE_ENV !== 'production' && typeof fn !== 'function') {
    throw new Error("'fn' must be a function");
  }

  let finished = false;
  let sleepPromise: ReturnType<typeof sleep>;

  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise<void>(async (resolve, reject) => {
    while (!finished) {
      const result = await fn();

      // check that still not finished, because user may cancel in that fn execution period
      if (!finished) {
        finished = result;
      }

      if (!finished && typeof interval === 'number' && interval >= 0) {
        sleepPromise = sleep(interval);

        try {
          await sleepPromise;
        } catch (error) {
          reject(new Error('Async Polling has been cancelled'));
        }
      }
    }

    resolve();
  }) as PollingPromise;

  promise.cancel = () => {
    sleepPromise?.cancel();
    finished = true;
  };

  return promise;
};
