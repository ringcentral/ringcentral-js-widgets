export interface RateLimitThrottleOptions {
  pool: number;
  poolWindow: number;
}

export const rateLimitThrottle = <F extends (...args: any) => Promise<any>>({
  fn,
  pool,
  poolWindow,
}: RateLimitThrottleOptions & { fn: F }) => {
  let resetPromise: Promise<void> = null;
  let count: number = 0;

  function getResetPromise() {
    if (!resetPromise) {
      resetPromise = new Promise((resolve) => {
        setTimeout(() => {
          resetPromise = null;
          count = 0;
          resolve();
        }, poolWindow);
      });
    }
    return resetPromise;
  }

  async function throttled(
    this: any,
    ...args: Parameters<F>
  ): Promise<ReturnType<F>> {
    let resetPromise = getResetPromise();
    while (count >= pool) {
      await resetPromise;
      resetPromise = getResetPromise();
    }
    count += 1;
    return fn.apply(this, args);
  }
  return throttled;
};
