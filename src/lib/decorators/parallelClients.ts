/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable func-names */
import {
  getRef,
  fork,
  PortDetector,
  delegate,
  ProxyExecParams,
} from 'reactant-share';

import { isSerializable } from './validateArgsToWorker';

const parallelSymbolClients = '__reactant_parallel_clients__';

export const handleParallelClientsOnServer =
  (target: any, restArgs: string[] = []) =>
  (options: ProxyExecParams) => {
    const { modules } = getRef(target);
    fork(
      modules![options.module],
      options.method,
      [...options.args, ...restArgs],
      {
        respond: false,
      },
    );
  };

/**
 * parallel execution
 *
 * run that method in all clients
 */
export const parallelClients = (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  isDecorator?: boolean,
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
        console.error('[parallelClients]', { error, target, key, args });
        throw new Error('[parallelClients] the args must be serializable');
      }
    }

    const { container, identifier } = getRef(this);
    // when the function is called without DI container
    if (!container) return fn.apply(this, args);
    if (!container.isBound(PortDetector)) {
      throw new Error(
        'PortDetector is not bound, please check `PortDetector` injection',
      );
    }

    const portDetector = container.get(PortDetector);
    if (!portDetector.shared) {
      await fn.apply(this, args);
      return;
    }
    if (portDetector.isClient) {
      const [lastArg] = args.slice(-1);

      if (lastArg === parallelSymbolClients) {
        await fn.apply(this, args.slice(0, -1));
        portDetector.syncFullState();
        return;
      }
      return delegate(this, key, args, {
        respond: false,
        _extra: isDecorator
          ? {}
          : {
              serverHook: 'clients',
            },
      });
    }
    const _handleParallelClientsOnServer = handleParallelClientsOnServer(this, [
      parallelSymbolClients,
    ]);
    _handleParallelClientsOnServer({
      module: identifier!,
      method: key,
      args,
    });
  };
  return descriptor;
};
