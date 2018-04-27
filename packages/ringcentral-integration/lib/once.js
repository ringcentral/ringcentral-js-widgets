
/**
 * @function
 * @description Decorator function that make the class method run only once.
 */
export default function once(prototype, property, { value, ...descriptor }) {
  let run = false;
  function wrappedFn() {
    if (!run) {
      run = true;
      return this::value();
    }
    return undefined;
  }
  return {
    ...descriptor,
    value: wrappedFn,
  };
}
