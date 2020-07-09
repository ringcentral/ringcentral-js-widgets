/**
 * @function
 * @description Decorator function that make the class method run only once.
 */
export default function once(
  prototype: object,
  property: string,
  { value, ...descriptor }: TypedPropertyDescriptor<(...args: any[]) => any>,
) {
  let run = false;
  function wrappedFn(this: ThisType<object>) {
    if (!run) {
      run = true;
      return value.call(this);
    }
    return undefined;
  }
  return {
    ...descriptor,
    value: wrappedFn,
  };
}
