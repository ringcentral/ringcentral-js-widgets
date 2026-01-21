import { storage } from './storage';

export const globalStorageKey: unique symbol = Symbol('globalStorage');

/**
 *  global storage
 */
export const globalStorage = (
  target: any,
  key: string,
  descriptor?: TypedPropertyDescriptor<any>,
): any => {
  storage(target, key, descriptor);
  target[globalStorageKey] = target[globalStorageKey] ?? new Set<string>();
  target[globalStorageKey].add(key);
  return descriptor;
};
