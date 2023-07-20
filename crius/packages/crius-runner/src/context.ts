import { Context } from './interface';

export function handleContext<P = {}, C = {}>(
  context?: Context<P, C>,
): Context<P, C> {
  if (toString.call(context) !== '[object Object]') {
    (context as unknown) = {};
  }
  const { beforeEach, afterEach } = context!;
  if (typeof beforeEach !== 'undefined' && typeof beforeEach !== 'function') {
    throw new Error(`'beforeEach' hook in the context must be a function.`);
  } else if (typeof beforeEach === 'function') {
    try {
      Object.defineProperties(context, {
        beforeEach: {
          configurable: false,
          enumerable: true,
          writable: false,
          value: beforeEach,
        },
      });
    } catch (e) {}
  }
  if (typeof afterEach !== 'undefined' && typeof afterEach !== 'function') {
    throw new Error(`'afterEach' hook in the context must be a function.`);
  } else if (typeof afterEach === 'function') {
    try {
      Object.defineProperties(context, {
        afterEach: {
          configurable: false,
          enumerable: true,
          writable: false,
          value: afterEach,
        },
      });
    } catch (e) {}
  }
  return context!;
}
