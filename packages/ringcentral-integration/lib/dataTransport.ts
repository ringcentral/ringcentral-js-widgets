import { forEachObjIndexed } from 'ramda';
import { Transport } from 'data-transport';

export * from 'data-transport';

const listen = (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<(...args: any) => Promise<any>>,
) => {
  const fn = descriptor.value;
  if (process.env.NODE_ENV !== 'production') {
    if (typeof fn !== 'function') {
      console.warn(
        `The decorator '@listen' can only decorate methods, '${key}' is NOT a methods.`,
      );
      return descriptor;
    }
  }
  target.listeners ??= {};
  target.listeners[key] = fn;
  return {
    ...descriptor,
    async value(this: Transport) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          `The method '${key}' is a listen function that can NOT be actively called.`,
        );
      }
    },
  };
};

const bindListeners = (instance: object, transport: Transport<any, any>) => {
  forEachObjIndexed(
    (func, name) => {
      transport.listen(name, func.bind(instance));
    },
    (instance as {
      listeners?: Record<string, (...args: any) => any>;
    }).listeners ?? {},
  );
};

export { listen, bindListeners };
