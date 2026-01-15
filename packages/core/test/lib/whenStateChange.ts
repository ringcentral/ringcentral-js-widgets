/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  act,
  jestFakeTimersAreEnabled,
} from '@ringcentral-integration/test-utils';
import { waitUntilTo } from '@ringcentral-integration/utils';
import {
  concatAll,
  concatMap,
  defer,
  filter,
  finalize,
  firstValueFrom,
  last,
  map,
  merge,
  Observable,
  of,
  switchMap,
  timer,
} from 'rxjs';

import { fromSubscribe } from '../../lib/rxjs/fromSubscribe';

/**
 * ### ⚠️⚠️⚠️ this method only be used in test environment
 *
 * wait subscribe emit one value until an timer
 * if timer exceeded, throw timeout error
 *
 * and also support `jest fake timer`, that will run each timer in next tick with fake `100ms` with custom timeout
 *
 * @default timeout 5000ms
 */
const waitSubscribeSuccess$ = <R, K, T extends Observable<R>>(
  obs$: T,
  cb: (value?: R) => K,
  options: {
    timeout?: number;
  } = {},
) => {
  let lastResult: K;
  let lastErr: unknown;

  const { timeout = 5000 } = options;

  const usingJestFakeTimers = jestFakeTimersAreEnabled();

  const timeout$ = usingJestFakeTimers
    ? defer(async () => {
        const eachPeriod = 100;
        const times = timeout / eachPeriod;
        // eslint-disable-next-line no-console
        console.warn(
          `waitSubscribeSuccess in fake timer mode will only take ${times} times of jest.advanceTimersByTime with ${eachPeriod}ms each`,
        );

        // when be in fake timer mode, we should use `jest.advanceTimersByTime` to trigger `setTimeout` callback
        // and trigger each with next tick to let async event be executed
        const array = Array.from({ length: times }, (_, index) => {
          return defer(async () => {
            jest.advanceTimersByTime(eachPeriod);
            await act(() => Promise.resolve());
            return 0;
          });
        });

        return of(...array);
      }).pipe(
        switchMap((obs) => obs),
        concatAll(),
        // only get the last result, that means all timer be executed, timeout!
        last(),
      )
    : timer(timeout);

  return merge(
    obs$.pipe(
      concatMap(async (value) => {
        try {
          const result = await cb(value);

          lastResult = result;
          return true;
        } catch (error) {
          lastErr = error;
          return false;
        }
      }),
      filter((ready) => !!ready),
      map(() => lastResult),
    ),
    timeout$.pipe(
      concatMap(async () => {
        try {
          const result = await cb();
          // when timeout but success, also emit that as success to make that pass-rate more higher
          // eslint-disable-next-line no-console
          console.warn(
            'you use timer to pass the check, should use fakeTimer or other timer base api instead',
            result,
          );

          return result;
        } catch (error) {
          lastErr = error;
          throw lastErr;
        }
      }),
    ),
  );
};

/**
 * ### ⚠️⚠️⚠️ this method only be used in test environment
 *
 * wait subscribe emit one value until an timer
 * if timer exceeded, throw timeout error
 *
 * and also support `jest fake timer`, that will run each timer in next tick with fake `100ms` with custom timeout
 *
 * @default timeout 5000ms
 */
export const waitSubscribeSuccess = <R, K, T extends Observable<R>>(
  obs$: T,
  cb: (value?: R) => K,
  options: {
    timeout?: number;
  } = {},
) => {
  return firstValueFrom(waitSubscribeSuccess$(obs$, cb, options));
};

/**
 * subscribe to redux to check value be expected
 *
 * ```ts
 * try {
 *   const result = await subscribeWaitUntilTo(
 *     this,
 *     () => {
 *       if (this._home.enable) {
 *         return true;
 *       }
 *       throw new Error('EE');
 *     },
 *     {
 *       timeout: 1000, // wait timeout, default be 5000
 *     },
 *   );

 *   console.log(result); // to be true when `this._home.enable` be true
 * } catch (error) {
 *   console.log(error); // to be latest error `new Error('EE')`
 * }
 * ```
 *
 * that be useful in test environment, like
 */
export const subscribeWaitUntilTo = async <T>(
  target: any,
  cb: () => T,
  options: {
    timeout?: number;
  } = {},
) => {
  try {
    const value = cb();
    return Promise.resolve(value);
  } catch (error) {
    const obs$ = fromSubscribe(target);

    return waitSubscribeSuccess(obs$, (v) => cb(), options);
  }
};

/**
 * when redux state change, trigger `callback` to check value be expected
 *
 * with `subscribeWaitUntilTo` method
 *
 * ### ⚠️⚠️⚠️ this method only be used in test environment
 */
export const whenStateChange = <T>(
  cb: () => T,
  options?: {
    timeout?: number;
  },
) => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('waitStateChange can only be used in the test environment');
  }

  return subscribeWaitUntilTo<T>(
    // @ts-ignore
    global.instance.phone,
    cb,
    options,
  );
};

/**
 * combine with `waitUntilTo` method to polling check also `whenStateChange` method with redux state change
 *
 * ### ⚠️⚠️⚠️ this method only be used in test environment
 */
export const whenStateOrTimerChange = async <T>(
  cb: () => T,
  options?: {
    timeout?: number;
  },
) => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('waitStateChange can only be used in the test environment');
  }

  const pollingCheck = waitUntilTo(cb, options);

  const obs$ = fromSubscribe(
    // @ts-ignore
    global.instance.phone,
  );

  const result = await firstValueFrom(
    merge(
      waitSubscribeSuccess$(obs$, (v) => cb(), options),
      pollingCheck,
    ).pipe(
      finalize(() => {
        pollingCheck.cancel(true);
      }),
    ),
  );

  return result;
};
