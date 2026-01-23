import { subscribe, ThisService } from 'reactant-share';
import { finalize, Observable, share } from 'rxjs';

/**
 * `subscribe` redux state change notifications to `Observable` flow
 *
 * that method for you can check event when any redux dispatch triggered.
 *
 * @example
 * ```ts
 * fromSubscribe(this)
 *   .pipe(
 *     tap((e) => {
 *       console.log(e); // trigger when any state change
 *     }),
 *   )
 *   .subscribe();
 * ```
 *
 * same as `subscribe`, but not support `awaitPromise` option, if you need wait one by one, can use `concatMap` to control flow by yourself.
 */
export const fromSubscribe = (target: ThisService) => {
  let destroy: () => void;

  const obs$ = new Observable<void>((observer) => {
    destroy = subscribe(target, () => observer.next());
  });

  return obs$.pipe(
    share(),
    finalize(() => destroy()),
  );
};
