export interface SleepPromise extends Promise<void> {
  /** cancel sleep timer */
  cancel: () => void;
}

/**
 * sleep for ms
 * @param ms what ms to sleep
 * @returns Promise with cancel method, that can be used to cancel sleep
 *
 * @example
 *
 * when call cancel, it will cancel sleep, otherwise that will be completed after 1000ms
 * ```ts
 * const sleepPromise = sleep(1000);
 *
 * sleepPromise
 *   .then(() => {
 *     console.log('sleep done');
 *   })
 *   .catch(() => {
 *     console.log('sleep canceled');
 *   }
 *
 * const onClick = () => {
 *   sleepPromise.cancel();
 * }
 * ```
 */
export const sleep = (ms: number) => {
  let timer: ReturnType<typeof setTimeout>;
  let rejector: (reason?: any) => void;

  const promise = new Promise((resolve, reject) => {
    rejector = reject;
    timer = setTimeout(resolve, ms);
  }) as SleepPromise;

  promise.cancel = () => {
    rejector(new Error('Async sleep has been cancelled'));
    clearTimeout(timer);
  };

  return promise;
};
