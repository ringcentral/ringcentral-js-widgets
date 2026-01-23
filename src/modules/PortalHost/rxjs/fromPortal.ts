import { Observable } from 'rxjs';

import type {
  PortalHostResolveData,
  PortalInstance,
} from '../PortalHost.interface';

/**
 * flow way usage API, subscribe will exec portal open API,
 * when unsubscribe will auto close portal.
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
export const fromPortal = (instanceFn: () => PortalInstance) =>
  new Observable<PortalHostResolveData>((subscribe) => {
    const { closed, close } = instanceFn();

    let innerClose = false;

    closed.then((result) => {
      subscribe.next(result);
      innerClose = true;
      subscribe.complete();
    });

    return () => {
      if (innerClose) return;

      close();
    };
  });
