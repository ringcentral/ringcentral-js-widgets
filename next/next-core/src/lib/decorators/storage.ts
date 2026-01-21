export const storageKey: unique symbol = Symbol('storage');

/**
 *  Non-user storage - After logout, the cache will be cleared.
 */
export const storage = (
  target: any,
  key: string,
  descriptor?: TypedPropertyDescriptor<any>,
): any => {
  target[storageKey] = target[storageKey] || new Set<string>();
  target[storageKey].add(key);
  return descriptor;
};
