import { sleep } from '../sleep';

type PromiseThunks<T> = (() => Promise<T>)[];

/**
 * With concurrentExecute helper function, you could control
 * the concurrency and delay of your Promise.all execution.
 * @param {Array<Function>} promiseThunks A set of thunk functions of Promise
 * @param {Number} concurrency Concurrent granularity
 * @param {Number} delay Batch execution delay
 * @param {Function} delayFn Specify your own delay function
 */
export default async function concurrentExecute<T>(
  promiseThunks: PromiseThunks<T>,
  concurrency: number,
  delay: number,
  options: {
    promise?: PromiseConstructor;
    delayFn?: (...args: any) => Promise<void>;
  } = {},
) {
  const { promise = Promise, delayFn = sleep } = options;
  if (!Array.isArray(promiseThunks) || promiseThunks.length <= 0) {
    return [];
  }
  if (typeof promiseThunks[0] !== 'function') {
    throw new Error('concurrentExecute needs promise thunk');
  }
  if (promiseThunks.length <= concurrency) {
    return promise.all(promiseThunks.map((_promise) => _promise.apply(null)));
  }
  const current: T[] = await concurrentExecute(
    promiseThunks.slice(0, concurrency),
    concurrency,
    delay,
    options,
  );
  if (delay) {
    await delayFn(delay);
  }
  const rest: T[] = await concurrentExecute(
    promiseThunks.slice(concurrency),
    concurrency,
    delay,
    options,
  );
  return [...current, ...rest];
}
