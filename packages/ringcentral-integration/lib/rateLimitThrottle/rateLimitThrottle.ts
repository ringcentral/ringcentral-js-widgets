export interface RateLimitThrottleOptions {
  pool: number;
  poolWindow: number;
}

export const rateLimitThrottle = <F extends (...args: any) => Promise<any>>({
  fn,
  pool,
  poolWindow,
}: RateLimitThrottleOptions & { fn: F }) => {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Promise<voi... Remove this comment to see the full error message
  let resetPromise: Promise<void> = null;
  let count = 0;

  function getResetPromise() {
    if (!resetPromise) {
      resetPromise = new Promise((resolve) => {
        setTimeout(() => {
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Promise<voi... Remove this comment to see the full error message
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
