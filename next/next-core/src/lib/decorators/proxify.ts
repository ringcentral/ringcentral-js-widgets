/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getRef,
  PortDetector,
  delegate,
  proxyExecutorKey,
} from 'reactant-share';

import { isSerializable } from './validateArgsToWorker';

/**
 * proxify execution
 *
 * run that method in `server`
 */
export const proxify = (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<(...args: any) => Promise<any>>,
) => {
  const fn = descriptor.value as (...args: any) => Promise<any>;
  descriptor.value = async function (this: any, ...args: any) {
    if (
      process.env.NODE_ENV === 'test' &&
      process.env.WORKER_TEST_ENABLED === 'true'
    ) {
      try {
        isSerializable(args);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[proxify]', { error, target, key, args });
        throw new Error('[proxify] the args must be serializable');
      }
    }

    const { container } = getRef(this);
    // when the function is called without DI container
    if (!container) return fn.apply(this, args);
    if (!container.isBound(PortDetector)) {
      throw new Error('PortDetector is not bound');
    }

    const portDetector = container.get(PortDetector);
    if (portDetector.isClient || this[proxyExecutorKey]) {
      return delegate(this, key, args, { respond: true });
    }
    return fn.apply(this, args);
  };
  return descriptor;
};
