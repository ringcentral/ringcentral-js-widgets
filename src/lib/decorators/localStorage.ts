/* eslint-disable @typescript-eslint/no-explicit-any */
export const localStorageOnlyKey: unique symbol = Symbol('localStorageOnly');

/**
 *
 * with storage only methods, that can get value from storage `synchronize`
 *
 * that always synchronize update storage directly when you set value.
 *
 * ### can't work with `@state`, only for normal value, and will not be clear after logout.
 * !!! Only setters can be used to trigger the saving of localStorage value
 *
 * @example
 *
 * ```ts
 * class User extends RcModule {
 *   @localStorageOnly
 *   example = 100;
 *
 *   something() {
 *     this.example = 100; // after this execution, default value already be changed in `localStorage`
 *
 *   }
 * }
 * ```
 */
export const localStorageOnly = (
  target: any,
  key: string,
  descriptor?: TypedPropertyDescriptor<any>,
): any => {
  target[localStorageOnlyKey] =
    target[localStorageOnlyKey] || new Set<string>();
  target[localStorageOnlyKey].add(key);
  return descriptor;
};
