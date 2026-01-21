/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmitOptions, Transport } from 'reactant-share';
import { defer, merge, NEVER, Observable, Subject, switchMap } from 'rxjs';

/**
 * a flow base transport instance, you can use that to work with flow way transport emit or listen
 *
 * @example
 * ```ts
 * const transportFlow = createTransportFlow(transport);
 *
 * transportFlow
 *   .listen$('login-success')
 *   .pipe(
 *     tap(() => {
 *       this._clientNotificationStatus();
 *     }),
 *     switchMap(() =>
 *       transportFlow.emit$({
 *         name: 'set-current-tz',
 *         response: true,
 *       }),
 *     ),
 *     tap(() => {
 *       console.log('set time zone successfully');
 *     }),
 *   )
 *   .subscribe();
 * ```
 */
export const createTransportFlow = <
  S extends Record<string, (...args: any[]) => any>,
>(
  transport: Transport,
) => {
  const emit$ = <K extends keyof S>(
    options: EmitOptions<K>,
    ...arg: Parameters<S[K]>
  ) =>
    defer(() => transport.emit(options, ...arg)) as Observable<
      Awaited<ReturnType<S[K]>>
    >;

  const listen$ = <K extends keyof S, F extends S[K]>(
    key: K,
    onValue?: (value: any) => any,
  ) =>
    new Observable<Awaited<ReturnType<F>>>((observer) => {
      const destroy = transport.listen(key, (value: any) => {
        observer.next(value);

        return onValue?.(value);
      });

      return () => {
        destroy?.();
      };
    });

  return {
    /**
     * emit value with flow way.
     *
     * ### if you work with other connection tool, please make sure peer connected before emit value.
     *
     * like:
     *
     * @example
     * ```ts
     * adapterConnection.peerBeConnected$
     *    .pipe(
     *       switchMap(() => adapterConnection.emit$('example', value))
     *    )
     * ```
     */
    emit$,
    listen$,
  };
};

/**
 * when you use listen and want flow be emit with responded inner value, use that wrap
 * @param getListener that source listener
 *
 * @example
 * ```ts
 * waitFlowResponded<string>((obs$) =>
      transportFlow.listen$(
        contactSwitcher.fullSyncStart,
        (clientId: string) => {
          obs$.next('example next flow');

          return 'some value'
        },
      ),
    ).pipe(
      tap((obs) => {
        console.log(obs); // should 'example next flow'
      }),
    );
 * ```
 */
export const waitFlowResponded = <T = any>(
  getListener: (subject: Subject<T>) => Observable<unknown>,
) => {
  return defer(() => {
    const subject$ = new Subject<T>();

    return merge(
      // subject must put in front, some sync method must be listen first
      subject$,
      getListener(subject$).pipe(
        // source never emit, all emit be handle by subject
        switchMap(() => NEVER),
      ),
    );
  });
};
