/**
 * A module that emits events to keep track of system activity.
 *
 * The KeepBeat module emits a "beat" once every 24 hours for each user account.
 *
 * When the system wakes from sleep or receives a heartbeat, it checks if 24 hours
 * have passed since the last beat for the current user. If so, it emits a beat event
 * and updates the timestamp.
 *
 * works for both logged-in and non-logged-in users.
 */
import { SleepDetector } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  dynamic,
  fromWatchValue,
  globalStorage,
  injectable,
  PortManager,
  RcModule,
  state,
  StoragePlugin,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import {
  distinctUntilChanged,
  filter,
  merge,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

import type { Auth } from '../Auth';

const BEAT_INTERVAL = 1000 * 60 * 60 * 24; // beat once in 24 hours

const DEFAULT_NON_LOGIN_ID = 'non-login-id';

/**
 *
 */
@injectable({
  name: 'KeepBeat',
})
export class KeepBeat extends RcModule {
  @dynamic('Auth')
  private _auth?: Auth;
  /**
   * the beat will emit once in 24 hours base on the defined interval time
   *
   * the interval time is 24 hours once, for each account will have there own beat time check
   *
   * also a beat for non login account
   */
  beat$ = new Subject<string | null>();

  constructor(
    private _storagePlugin: StoragePlugin,
    private _sleepDetector: SleepDetector,
    private _portManager: PortManager,
  ) {
    super();

    this._storagePlugin.enable(this);

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.listenBeat();
      });
    } else {
      this.listenBeat();
    }
  }

  // ! should not use userStorage to prevent the rehydrated$ not triggered
  @globalStorage
  @state
  private beatTimeStampMap: Record<string, number> = {};

  private get beatTimeStamp(): number {
    const ownerId = this._auth?.ownerId || DEFAULT_NON_LOGIN_ID;
    return this.beatTimeStampMap[ownerId] || 0;
  }

  @action
  private _setBeatTimeStamp(val: number) {
    const ownerId = this._auth?.ownerId || DEFAULT_NON_LOGIN_ID;
    Object.assign(this.beatTimeStampMap, {
      [ownerId]: val,
    });
  }

  @action
  private _clearBeatTimeStamp() {
    this.beatTimeStampMap = {};
  }

  @delegate('server')
  async clearBeatTimeStamp() {
    this._clearBeatTimeStamp();
  }

  listenBeat() {
    const ownerId$ = fromWatchValue(this, () => this._auth).pipe(
      switchMap((auth) => (auth ? auth.ownerId$ : of(null))),
      distinctUntilChanged(),
    );

    const beatEvent$ = merge(
      this._sleepDetector.heartbeat$,
      this._sleepDetector.detect$,
    );

    this.ready$
      .pipe(
        switchMap(() => ownerId$),
        switchMap(() => beatEvent$.pipe(startWith(null))),
        filter(() => Date.now() - this.beatTimeStamp >= BEAT_INTERVAL),
        tap(() => {
          this._setBeatTimeStamp(Date.now());
          this.beat$.next(this._auth?.ownerId || null);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }
}
