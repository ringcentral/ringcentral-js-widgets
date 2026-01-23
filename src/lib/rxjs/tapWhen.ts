import { concatMap, of, OperatorFunction } from 'rxjs';

/**
 * tap do something when `evaluateFn` be trusty
 */
export function tapWhen<T>(
  tapFn: (t: T) => void,
  evaluateFn: (index: number, t: T) => boolean,
): OperatorFunction<T, T> {
  return (source$) =>
    source$.pipe(
      concatMap((value, index) => {
        if (evaluateFn(index, value)) {
          tapFn(value);
        }
        return of(value);
      }),
    );
}
