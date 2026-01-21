import {
  Observable,
  ObservableInput,
  ObservedValueOf,
  defer,
  finalize,
  tap,
} from 'rxjs';

/**
 * abort controller with flow way, when unsubscribe,
 * abort controller will be abort, that can be use in abort fetch request
 *
 * @example
 * ```ts
 * const fetch$ = withAbortController(signal => fetch('url', { signal }));
 * const subscription = fetch$.subscribe();
 *
 * subscription.unsubscribe(); // abort fetch request
 * ```
 */
export const withAbortController = <R extends ObservableInput<unknown>>(
  fetcher: (signal: AbortSignal) => R,
): Observable<ObservedValueOf<R>> => {
  return defer(() => {
    let controller: AbortController | null = new AbortController();
    const signal = controller.signal;

    return defer(() => fetcher(signal)).pipe(
      tap(() => (controller = null)),
      finalize(() => controller?.abort()),
    );
  });
};
