import { concatMap, EMPTY, of, timer } from 'rxjs';

/**
 * Creates a progressive timer that increases by eachTimeout ms each time, and when all times are reached, emit the final timeout event
 *
 * @example
 *
 * ```ts
 * progressiveTimer({
 *   initTimeout: 1000,
 *   times: 5,
 *   onEachTimeout: (times, timeout) => {
 *     console.log(times, timeout);
 *   },
 *   onFinalTimeout: () => {
 *     console.log('final timeout');
 *   },
 * });
 * ```
 *
 * that means the timer will be 1000ms, 2000ms, 3000ms, 4000ms, 5000ms, and then final emit the timeout event
 */
export const progressiveTimer = ({
  initTimeout,
  times,
  eachTimeout = 1000,
  onEachTimeout,
  onFinalTimeout,
}: {
  initTimeout: number;
  times: number;
  eachTimeout?: number;
  onEachTimeout?: (times: number, timeout: number) => void;
  onFinalTimeout?: (timeout: number) => void;
}) => {
  return timer(initTimeout).pipe(
    concatMap(() => of(...Array.from({ length: times + 1 }))),
    concatMap((_, index) => {
      const currTimeout = initTimeout + index * eachTimeout;

      if (index === times) {
        onFinalTimeout?.(currTimeout);
        return of(false);
      }

      onEachTimeout?.(index, currTimeout);

      return timer(currTimeout + eachTimeout).pipe(concatMap(() => EMPTY));
    }),
  );
};
