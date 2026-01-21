/**
 * using native value to set to trigger native onChange and input event

// TODO: find way to trigger browser history(cmd+z, cmd+y) events
 */
export function setNativeValue(element: HTMLElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')!.set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    'value',
  )!.set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter!.call(element, value);
  } else {
    valueSetter!.call(element, value);
  }

  element.dispatchEvent(new Event('input', { bubbles: true }));
}
