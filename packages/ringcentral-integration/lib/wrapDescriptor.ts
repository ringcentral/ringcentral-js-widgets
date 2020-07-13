interface Descriptor<T> extends TypedPropertyDescriptor<T> {
  initializer?(): T;
}
/**
 * @function
 * @description helper function to wrap property descriptors with fn
 * @param {Object} descriptor
 * @param {function} fn
 */
export default function wrapDescriptor(
  descriptor: Descriptor<any>,
  fn: (...args: any[]) => any,
) {
  const wrappedDescriptor = {
    ...descriptor,
  };
  if (descriptor.get) {
    wrappedDescriptor.get = function get() {
      fn.call(this);
      return descriptor.get.call(this);
    };
  }
  if (descriptor.set) {
    wrappedDescriptor.set = function set(value) {
      fn.call(this);
      return descriptor.set.call(this, value);
    };
  }
  if (descriptor.value) {
    wrappedDescriptor.value = function value(...args: any[]) {
      fn.call(this);
      return descriptor.value.call(this, ...args);
    };
  }
  if (descriptor.initializer) {
    wrappedDescriptor.initializer = function initializer() {
      const target = descriptor.initializer.call(this);
      return (...args: any[]) => {
        fn.call(this);
        return target.call(this, ...args);
      };
    };
  }
  return wrappedDescriptor;
}
