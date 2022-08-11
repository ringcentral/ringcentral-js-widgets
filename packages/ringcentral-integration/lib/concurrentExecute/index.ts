import { polling } from '@ringcentral-integration/utils';

export type ConcurrentExecuteOptions = {
  /**
   * delay between each thunk `Promise.all` execution
   */
  delay?: number;
  // TODO: implement that for export result with fail item after Promise.allSettled
  /**
   * onFinalize callback
   */
  //  onFinalize
};

// type all<T extends readonly unknown[] | []>(values: T): ;
/**
 * Provide you to control the concurrency and delay of your `Promise.all` execution.
 * @param options Specify your own delay function and custom promise instance
 *
 * @example
 * ```
 * const result = await concurrentExecute(
 *   [
 *     () => Promise.resolve('123' as const),
 *     () => Promise.resolve(1),
 *     () => Promise.resolve('456'),
 *     () => Promise.resolve(2),
 *     () => Promise.resolve('789'),
 *   ],
 *   2, // in that example that will split into 3 `Promise.all` executions, run each thunk one by one
 *   {
 *      delay: 100, // that will be delay 100ms between each thunk `Promise.all` execution
 *   }
 * );
 *
 * console.log(a); // [ '123', 1, '456', 2, '789' ]
 * ```
 */
export default async function concurrentExecute<
  T extends (() => unknown)[] | [],
>(
  /**
   * A set of thunk functions of Promise
   */
  promiseFnThunks: T,
  /**
   * concurrency Concurrent granularity
   */
  concurrency: number,
  /**
   * custom options
   */
  options: ConcurrentExecuteOptions = {},
): Promise<{
  [P in keyof T]: Awaited<T[P] extends () => infer R ? R : any>;
}> {
  const { delay } = options;

  if (!Array.isArray(promiseFnThunks) || promiseFnThunks.length <= 0) {
    return [] as any;
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    typeof promiseFnThunks[0] !== 'function'
  ) {
    throw new Error('concurrentExecute needs promise thunk');
  }

  let totalThunk = promiseFnThunks.length;

  let finalResults: any = [];

  await polling(async () => {
    const promiseFnThunksBatch = promiseFnThunks.splice(0, concurrency);

    // TODO: should switch to Promise.allSettled
    // TODO: if any one error, should still keep all the results and output error items
    const result = await Promise.all(
      promiseFnThunksBatch.map((promiseFnThunk) => promiseFnThunk()),
    );

    finalResults = [...finalResults, ...result];

    totalThunk -= result.length;

    // when all thunks are executed, leave polling
    return totalThunk <= 0;
  }, delay);

  return finalResults;
}
