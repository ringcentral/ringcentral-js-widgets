import { promisedDebounce } from './promisedDebounce';
import { ThrottleOptions } from './throttle';

export function promisedThrottle<F extends (...args: any) => any>(
  options: ThrottleOptions<F>,
) {
  return promisedDebounce({
    ...options,
    maxThreshold: options.threshold,
  });
}
