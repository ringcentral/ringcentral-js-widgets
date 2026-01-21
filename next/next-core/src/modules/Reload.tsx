import { Subject, switchMap, take, tap } from 'rxjs';

import { injectable, logger } from '../lib';
import { StoragePlugin } from '../plugins/Storage.plugin';

import { takeUntilAppDestroy } from './destroy';

export type ReloadGuard = (reason: string) => Promise<unknown>;

@injectable({
  name: 'Reload',
})
export class Reload {
  private _reload$ = new Subject<string>();

  private reloadGuards: ReloadGuard[] = [];

  /**
   * when reload be trigger will emit value out
   */
  public reload$ = this._reload$.asObservable();

  private readonly reloadProcess$ = this._reload$.pipe(
    switchMap(async (reason) => {
      // before reload flush storage to make sure all storage be saved.
      await Promise.allSettled([
        // use allSettled,
        // because we don't want to stop reload process if some promise reject
        this._storage.flush(),
        ...this.reloadGuards.map((guard) => guard(reason)),
      ]);

      logger.log('[debug] refresh', reason);
    }),
    tap(() => globalThis.location.reload()),
    take(1),
    takeUntilAppDestroy,
  );

  constructor(private _storage: StoragePlugin) {
    this.reloadProcess$.subscribe();
  }

  reload(reason: string) {
    this._reload$.next(reason);
  }

  /**
   * add a guard to reload process
   * reload behavior will wait all guard promise finish
   *
   * @param guard - a function to check if can reload
   *
   * @example
   * ```ts
   * reload.addReloadGuard(async (reason) => {
   *   // do something before reload
   *   return Promise.resolve();
   * });
   * ```
   */
  addReloadGuard(guard: ReloadGuard) {
    this.reloadGuards.push(guard);
  }
}
