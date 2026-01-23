/* eslint-disable @typescript-eslint/no-explicit-any */
export const portalKey: unique symbol = Symbol('portal');

/**
 * mark portal key to current instance, for do init in constructor.
 */
export const portal = (
  target: any,
  key: string,
  descriptor?: TypedPropertyDescriptor<any>,
): any => {
  target[portalKey] = target[portalKey] || new Set<string>();
  target[portalKey].add(key);
  return descriptor;
};
