/* eslint-disable no-console */
import { Observable } from 'rxjs';

/**
 * Log all event observable events to console
 */
export const debugLog =
  (
    message = '',
    mode: ('next' | 'error' | 'complete')[] = ['complete', 'next', 'error'],
  ) =>
  <T>(source: Observable<T>) =>
    new Observable<T>((observer) => {
      const prefix = message ? `🐞 [${message}]` : '🐞';

      return source.subscribe({
        next(x) {
          if (mode.includes('next')) console.log(prefix, x);
          observer.next(x);
        },
        error(error) {
          if (mode.includes('error')) console.log(`${prefix} error`, error);
          observer.error(error);
        },
        complete() {
          if (mode.includes('complete')) console.log(`${prefix} complete`);
          observer.complete();
        },
      });
    });
