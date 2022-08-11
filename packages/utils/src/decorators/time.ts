/**
 * let you can calculate the time when run that method,
 *
 * ### that time not calculate in `process.env.NODE_ENV !== 'production'`
 * @param title
 */
export const time = (title: string) => {
  // eslint-disable-next-line func-names
  return function (target: any, name: string, descriptor?: any) {
    if (process.env.NODE_ENV !== 'production') {
      if (
        typeof descriptor.value !== 'function' &&
        typeof descriptor.initializer !== 'function'
      ) {
        throw new Error(`@time decorated '${name}' is not a method`);
      }
      let fn: (...args: any) => any = descriptor.value;
      const initializer = descriptor.initializer;
      // eslint-disable-next-line func-names
      const trackedFn = async function (this: any, ...args: any) {
        if (typeof initializer === 'function') {
          fn = initializer.call(this);
        }
        if (typeof fn !== 'function') {
          throw new Error(`@time decorated '${name}' is not a function`);
        }
        console.time(`[Time Decorator] ${title}: `);
        const result = await fn.apply(this, args);
        console.timeEnd(`[Time Decorator] ${title}: `);
        return result;
      };

      // the any type is just to be compatible with babel and tsc.
      return {
        enumerable: true,
        configurable: true,
        value: trackedFn,
      } as any;
    }

    return descriptor;
  };
};
