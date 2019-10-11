/**
 * @background is a decorator designed for explicitly making the function
 * to be executed in background instead of client.
 * It can be used for decorating UI-driven function calls so that it will
 * only be called in background.
 */
export default function background(
  target: any,
  name: string,
  { value, ...descriptor }: TypedPropertyDescriptor<any>,
) {
  function wrappedFn(this: any, ...args) {
    // Only clinet has transport
    if (!this._transport) {
      return value.call(this, ...args);
    }
    return null;
  }
  return {
    ...descriptor,
    value: wrappedFn,
  };
}
