/**
 * Throttle the execution of the function,
 * if the frequently invoked function is being throttled,
 * then the function will only be called at threshold time.
 *
 * @param {Function} func - the target function
 * @param {Number} threshold - execution threshold
 * @return {Function}
 */
export default function throttle<T extends any[], P>(
  func: (...args: T) => P,
  threshold = 500,
) {
  if (typeof func !== 'function') {
    throw new Error('First argument of throttle function should be a function');
  }

  let timer: NodeJS.Timeout = null;
  let firstTime = true;

  return function throttled(this: any, ...args: T) {
    const context = this;

    // It will be triggered at first time
    if (firstTime) {
      func.apply(context, args);
      firstTime = false;
      return;
    }

    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      func.apply(context, args);
    }, threshold);
  };
}
