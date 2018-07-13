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
    const next = () => descriptor.value.apply(this, args);
    if (prev) {
      prev = prev.then(() => {
        prev = null;
        next();
      });
    } else {
      prev = next();
    }
    return prev;
  }

  return {
    ...descriptor,
    value: serializeFunc,
  };
}
