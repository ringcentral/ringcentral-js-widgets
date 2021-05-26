import { storageStateKey, globalStorageStateKey, RcModuleV2 } from './RcModule';

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
  target[storageStateKey] = [...(target[storageStateKey] ?? []), key];
};
