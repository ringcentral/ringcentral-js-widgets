/**
 * A decorator for making sure specific function being invoked serializely.
 *
 * Usage:
 * class A {
 *   @serialize
 *   async foo() {}
 * }
 *
 */
export default function serialize(target, key, descriptor) {
  let prev = null;
  function serializeFunc(...args) {
    const next = () =>
      Promise.resolve(descriptor.value.apply(this, args)).then(() => {
        prev = null;
      });
    prev = prev ? prev.then(next) : next();
    return prev;
  }

  return {
    ...descriptor,
    value: serializeFunc,
  };
}
