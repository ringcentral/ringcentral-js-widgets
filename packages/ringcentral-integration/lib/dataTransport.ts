import { Transport } from 'data-transport';
import { forEachObjIndexed } from 'ramda';

export * from 'data-transport';

/**
 * `@listen` decorator, that will auto binding event with `data-transport`
 */
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
  target.listeners = target.listeners ?? {};
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

/**
 * bind current class listenable,
 * that your class `@listen` work
 *
 * @example
 *
  ```ts

  class Adapter implements ToInternal, ToExternal {

    transport?: Transport<ToInternal, ToExternal>;

    constructor(){
      this.transport = createTransport('IFrameMain', {
        iframe: this.appIFrame,
      });
      bindListeners(this, this.transport);
    }

    @listen
    async fetchIsMatchCaseId(caseId: string): Promise<string> {
      return this.visualforceRequest('fetchIsMatchCaseId', caseId);
    }
  }
 * ```
 */
const bindListeners = (instance: object, transport: Transport<any, any>) => {
  forEachObjIndexed(
    (func, name) => {
      transport.listen(name, func.bind(instance));
    },
    (
      instance as {
        listeners?: Record<string, (...args: any) => any>;
      }
    ).listeners ?? {},
  );
};

export { bindListeners, listen };
