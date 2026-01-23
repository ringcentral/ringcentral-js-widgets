import { storageKey } from './storage';

export const userStorageKey: unique symbol = Symbol('userStorage');

/**
 * User storage - After logout, the user cache will not be cleared.
 */
export const userStorage = (
  target: any,
  key: string,
  descriptor?: TypedPropertyDescriptor<any>,
): any => {
  target[userStorageKey] = target[userStorageKey] || new Set<string>();
  target[userStorageKey].add(key);
  target[storageKey] = target[storageKey] || new Set<string>();
  target[storageKey].add(key);
  return descriptor;
};
