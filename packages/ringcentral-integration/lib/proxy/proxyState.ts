import { RcModuleV2 } from '@ringcentral-integration/core';

/**
 * proxy state for client's async state changes
 *
 * @param callback it should be a async function, and run in a reducer.
 */
export const proxyState = <T extends RcModuleV2>(
  callback: (module: T, state: any) => Promise<any>,
) => (
  target: RcModuleV2,
  key: string,
  descriptor?: TypedPropertyDescriptor<any>,
): any => {
  if (target.__proxyState__) {
    target.__proxyState__[key] = callback;
  } else {
    target.__proxyState__ = {
      [key]: callback,
    };
  }
  return descriptor;
};
