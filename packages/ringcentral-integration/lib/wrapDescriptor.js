
/**
 * @function
 * @description helper function to wrap property descriptors with fn
 * @param {Object} descriptor
 * @param {function} fn
 */
export default function wrapDescriptor(descriptor, fn) {
  const wrappedDescriptor = {
    ...descriptor,
  };
  if (descriptor.get) {
    wrappedDescriptor.get = function get() {
      this::fn();
      return this::descriptor.get();
    };
  }
  if (descriptor.set) {
    wrappedDescriptor.set = function set(value) {
      this::fn();
      return this::descriptor.set(value);
    };
  }
  if (descriptor.value) {
    wrappedDescriptor.value = function value(...args) {
      this::fn();
      return this::descriptor.value(...args);
    };
  }
  if (descriptor.initializer) {
    wrappedDescriptor.initializer = function initializer() {
      const target = this::descriptor.initializer();
      return (...args) => {
        this::fn();
        return this::target(...args);
      };
    };
  }
  return wrappedDescriptor;
}
