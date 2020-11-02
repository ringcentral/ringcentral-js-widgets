import { debounce } from './debounce';

export function Debounce(duration?: number) {
  return function innerDecorator(target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        // Attach this function to the instance (not the class)
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: debounce({
            fn: descriptor.value,
            threshold: duration,
          }),
        });

        return (this as any)[key];
      },
    };
  };
}
