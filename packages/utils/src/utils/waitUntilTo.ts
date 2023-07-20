import type { WaitUntilOption } from './waitUntil';
import { waitUntil } from './waitUntil';

export interface WaitUntilToPromise<T> extends Promise<T> {
  /** cancel wailUntilTo timer */
  cancel: () => void;
}

/**
 * like `waitUntil`, but polling check `fn` execute without throw error,
 * and throw latest error when timeout.
 *
 * @returns `callback` result when callback execute completed.
 */
export const waitUntilTo = <T = any>(
  fn: () => T,
  { interval = 100, timeout = 5000 }: WaitUntilOption = {},
): WaitUntilToPromise<T> => {
  let rejector: (reason?: any) => void;
  let waitUntilPromise: ReturnType<typeof waitUntil>;

  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise<T>(async (resolve, reject) => {
    let lastError: any;
    rejector = reject;

    const callback = async () => {
      try {
        const result = await fn();

        resolve(result);

        return true;
      } catch (e) {
        lastError = e;
        return false;
      }
    };

    waitUntilPromise = waitUntil(callback, { interval, timeout });

    try {
      await waitUntilPromise;
    } catch (e) {
      reject(lastError);
    }
  }) as WaitUntilToPromise<T>;

  promise.cancel = () => {
    rejector(new Error('Async waitUntilTo has been cancelled'));
    waitUntilPromise.cancel();
  };

  return promise;
};
