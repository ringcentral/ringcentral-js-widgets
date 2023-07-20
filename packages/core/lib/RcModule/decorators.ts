/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RcModuleV2 } from './RcModule';
import { storageStateKey, globalStorageStateKey, stateKey } from './RcModule';

export interface Descriptor<T> extends TypedPropertyDescriptor<T> {
  initializer?(): T;
}

/**
 * decorate global storage state with `GlobalStorage` Module
 */
export const globalStorage = (
  target: RcModuleV2,
  key: string,
  descriptor?: Descriptor<unknown>,
) => {
  if (!(key in target[stateKey])) {
    throw new Error(
      `The ${key} must be decorated with '@state' first, and it must be a Redux state to be a persistent state`,
    );
  }
  target[globalStorageStateKey] = [
    ...(target[globalStorageStateKey] ?? []),
    key,
  ];
};

/**
 * decorate storage state with `Storage` Module
 */
export const storage = (
  target: RcModuleV2,
  key: string,
  descriptor?: Descriptor<unknown>,
) => {
  if (!(key in target[stateKey])) {
    throw new Error(
      `The ${key} must be decorated with '@state' first, and it must be a Redux state to be a persistent state`,
    );
  }
  target[storageStateKey] = [...(target[storageStateKey] ?? []), key];
};
