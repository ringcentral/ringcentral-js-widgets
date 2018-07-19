export function isEmpty(param) {
  return !param || param.length === 0;
}

export function isArray(x) {
  return Array.isArray
    ? Array.isArray(x)
    : Object.prototype.toString.call(x).slice(8, -1) === 'Array';
}

export function isObject(x) {
  return Object.prototype.toString.call(x).toLowerCase() === '[object object]';
}

export function isFunction(x) {
  return typeof x === 'function';
}

/**
 * Provider type guard functions
 */
const USE_VALUE = 'useValue';
export function isValueProvider(provider) {
  return USE_VALUE in provider;
}

export function isStaticClassProvider(provider) {
  return provider.useClass !== undefined;
}

export function isExistingProvider(provider) {
  return provider.useExisting !== undefined;
}

export function isFactoryProvider(provider) {
  return provider.useFactory !== undefined;
}
