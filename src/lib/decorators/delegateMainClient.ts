/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable func-names */
import { getRef, delegate } from 'reactant-share';

import type { PortManager } from '../../modules/PortManager';
import { handleMainClientOnServer } from '../handleMainClient';

import { isSerializable } from './validateArgsToWorker';

/**
 * delegate execution in main client
 */
export const delegateMainClient = (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<(...args: any) => Promise<any>>,
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
        console.error('[delegateMainClient]', { error, target, key, args });
        throw new Error('[delegateMainClient] the args must be serializable');
      }
    }

    const { container, identifier, modules } = getRef(this);
    // when the function is called without DI container
    if (!container) return fn.apply(this, args);
    if (modules?.PortManager) {
      const portManager = modules.PortManager as PortManager;
      if (!portManager.shared) return fn.apply(this, args);
      const checkMainTab = portManager.checkMainTabMapping.get(this);
      if ((portManager.isMainTab && !checkMainTab) || checkMainTab?.()) {
        return fn.apply(this, args);
      }
      const customClientDelegateName =
        portManager.customClientDelegateNameMapping.get(this);
      const params = {
        module: identifier,
        method: key,
        args: args ?? [],
      };
      if (customClientDelegateName) {
        return portManager.transport!.emit(
          {
            // TODO: fix types
            // @ts-ignore
            name: customClientDelegateName,
          },
          params,
        );
      }
      if (portManager.isClient) {
        if (portManager.isMainTab) {
          return fn.apply(this, args);
        }
        return delegate(this, key, args, {
          _extra: isDecorator
            ? {}
            : {
                serverHook: 'mainClient',
              },
        });
      }
      const _handleMainClientOnServer = handleMainClientOnServer(portManager);
      return _handleMainClientOnServer({
        module: params.module!,
        method: params.method,
        args: params.args,
      });
    }
    throw new Error('PortManager is not bound');
  };
  return descriptor;
};
