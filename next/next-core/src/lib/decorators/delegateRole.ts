/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRef } from 'reactant';

import { isRoleInvocation, RoleFencedError } from '../roleDelegation';
import type {
  InvokeRoleOptions,
  RoleDefinition,
  RoleId,
} from '../roleDelegation';

type FunctionKeys<T> = Exclude<
  {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
  }[keyof T],
  void
>;

type RolePortManager = {
  invokeRole(
    role: RoleId,
    module: string,
    method: string,
    args: unknown[],
    options?: InvokeRoleOptions,
  ): Promise<unknown>;
  isRoleInvocationCurrent(role: RoleId, revision: number): boolean;
};

const roleMethods = new WeakMap<object, Map<string, (...args: any[]) => any>>();

/** Execute the undecorated role method after targeted delivery. */
export const executeRoleMethod = (
  target: object,
  key: string,
  args: unknown[],
) => {
  let prototype = Object.getPrototypeOf(target);
  while (prototype) {
    const method = roleMethods.get(prototype)?.get(key);
    if (method) return method.apply(target, args);
    prototype = Object.getPrototypeOf(prototype);
  }
  throw new Error(`'${key}' is not a role-delegated method.`);
};

/** Route a method to the current owners of one named role. */
export const delegateRole =
  (roleOrDefinition: RoleId | RoleDefinition) =>
  (
    target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ) => {
    const method = descriptor.value;
    if (!method) throw new Error(`'${key}' must decorate a method.`);
    const methods = roleMethods.get(target) ?? new Map();
    methods.set(key, method);
    roleMethods.set(target, methods);

    descriptor.value = async function (this: object, ...args: unknown[]) {
      const invocation = args.at(-1);
      if (isRoleInvocation(invocation)) {
        const portManager = getRef(this).modules?.PortManager as
          | RolePortManager
          | undefined;
        if (
          !portManager?.isRoleInvocationCurrent(
            invocation.role,
            invocation.revision,
          )
        ) {
          throw new RoleFencedError(invocation.role);
        }
        return method.apply(this, args.slice(0, -1));
      }
      const { container, identifier, modules } = getRef(this);
      if (!container) return method.apply(this, args);
      const portManager = modules?.PortManager as RolePortManager | undefined;
      if (!portManager) throw new Error('PortManager is not registered.');
      const role =
        typeof roleOrDefinition === 'string'
          ? roleOrDefinition
          : roleOrDefinition.role;
      return portManager.invokeRole(role, identifier!, key, args);
    };
    return descriptor;
  };

/** Imperative equivalent of {@link delegateRole}. */
export const invokeRole = <
  T extends Record<string | number | symbol, any>,
  K extends FunctionKeys<T>,
>(
  module: T,
  method: K,
  args: Parameters<T[K]>,
  options: InvokeRoleOptions & { readonly role: RoleId },
): Promise<unknown> => {
  const { container, identifier, modules } = getRef(module);
  if (!container) return Promise.resolve(module[method](...args));
  const portManager = modules?.PortManager as RolePortManager | undefined;
  if (!portManager)
    return Promise.reject(new Error('PortManager is not registered.'));
  return portManager.invokeRole(
    options.role,
    identifier!,
    method as string,
    args,
    options,
  );
};
