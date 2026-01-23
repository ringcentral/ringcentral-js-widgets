import {
  isObservable,
  map,
  Observable,
  ObservableInput,
  of,
  switchMap,
} from 'rxjs';

import { PortalHostResolveData } from '../PortalHost.interface';

type ExecFn<T> = (value: T, index: number) => ObservableInput<unknown> | void;

/**
 * answer flow for portal, switch to confirm or cancel,
 * alway switch to original result value when complete confirm or cancel exec
 *
 * @example
 * ```
 * fromPortal(() => this._modalView.open(this.confirmModal))
 * .pipe(
 *   answer({
 *     confirm: () =>
 *       of('confirm').pipe(
 *         tap(() => {
 *           // when confirm will auto switch to another flow
 *         }),
 *       ),
 *     cancel: () => {
 *       // also can do some thing without observable
 *     },
 *   }),
 *   tap((x) => {
 *     console.log(x); // x will be that original window confirm
 *   })
 * )
 * .subscribe();
 * ```
 */
export const answer = <T extends PortalHostResolveData>({
  confirm,
  cancel,
}:
  | {
      confirm?: ExecFn<T>;
      cancel: ExecFn<T>;
    }
  | {
      confirm: ExecFn<T>;
      cancel?: ExecFn<T>;
    }) =>
  switchMap<T, ObservableInput<T>>((data, index) => {
    const result = data ? confirm?.(data, index) : cancel?.(data, index);

    return isObservable(result)
      ? (result as Observable<unknown>).pipe(map(() => data))
      : of(data);
  });
