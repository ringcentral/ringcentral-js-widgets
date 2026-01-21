/* eslint-disable @typescript-eslint/no-explicit-any */
import { storeKey, ThisService, watch } from 'reactant-share';
import {
  defer,
  filter,
  finalize,
  Observable,
  share,
  shareReplay,
  startWith,
} from 'rxjs';

type FromWatchOptions<
  P extends boolean,
  T extends P extends true ? [...any] | readonly [...any] : any,
> = {
  multiple?: P;
  isEqual?: (x: T, y: T) => boolean;
};

/**
 * `watch` redux state change notifications to `Observable` flow, let you can control that in rxjs flow.
 *
 * that flow will get value when watch redux state change, if you also want get init state, can use `startWith` operator, that will provide you init state when subscribe.
 *
 * @example
 * ```ts
 * const obs$ = fromWatch(this, () => this.enable)
 *   .pipe(
 *     tap((e) => console.log(e)), // that will be triggered when enable be changed
 *   );
 *
 * obs$.subscribe();
 *
 * setEnable(false);
 * ```
 *
 * options same as `watch`, but not support `awaitPromise`, if you need wait one by one, can use `concatMap` to control flow by yourself.
 *
 * ### !!! if you want to use any `storage` value, must wait `target.ready$`, otherwise you will got default value
 */
export const fromWatch = <
  P extends boolean,
  T extends P extends true ? [...any] | readonly [...any] : any,
>(
  target: ThisService,
  cb: () => T,
  options?: FromWatchOptions<P, T>,
) => {
  let destroy: () => void;

  const obs$ = new Observable<T>((observer) => {
    destroy = watch(
      target,
      cb as never,
      (newValue) => observer.next(newValue),
      {
        ...options,
      } as never,
    );
  });

  return obs$.pipe(
    filter(() => {
      // Check if target is connected to store (has storeKey)
      const hasStore = !!(target as any)?.[storeKey];
      return hasStore;
    }),
    share(),
    finalize(() => destroy()),
  );
};

/**
 * same logic with `fromWatch`, but give us the initial value when subscribe.
 *
 * ### !!! if you want to use any `storage` value, must wait `target.ready$`, otherwise you will got default value
 */
export const fromWatchValue = <
  P extends boolean,
  T extends P extends true ? [...any] | readonly [...any] : any,
>(
  target: ThisService,
  cb: () => T,
  options?: FromWatchOptions<P, T>,
) => {
  const watch$ = fromWatch(target, cb, options);

  // use defer to make suer startWith value be correctly
  return defer(() =>
    watch$.pipe(
      // emit init value to subscription
      startWith(cb()),
    ),
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));
};
