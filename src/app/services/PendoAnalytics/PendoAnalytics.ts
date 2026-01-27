import { Pendo } from '@ringcentral-integration/commons/lib/Analytics';
import type { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import {
  dynamic,
  fromWatchValue,
  inject,
  injectable,
  RcModule,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import {
  BehaviorSubject,
  EMPTY,
  filter,
  firstValueFrom,
  map,
  of,
  shareReplay,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';

import type { Analytics } from '../Analytics/Analytics';
import type { Auth } from '../Auth';
import { DEFAULT_UNKNOWN_VALUE, TrackPropsService } from '../TrackPropsService';

import type { PendoAnalyticsOptions } from './PendoAnalytics.interface';

export interface PendoAgent {
  visitor: {
    id: string;
    [key: string]: any;
  };
  account: {
    id: string;
    [key: string]: any;
  };
}

@injectable({
  name: 'PendoAnalytics',
})
export class PendoAnalytics extends RcModule {
  private _pendo$ = new BehaviorSubject<pendo.Pendo | null>(null);
  private _useLocalPendoJS =
    this._pendoAnalyticsOptions.useLocalPendoJS ?? false;
  private _pendoApiKey = this._pendoAnalyticsOptions.pendoApiKey;

  pendoReady$ = this._pendo$.pipe(
    filter(Boolean),
    take(1),
    switchMap(
      (pendo) =>
        fromWatchValue(this, () => this._auth).pipe(
          switchMap((auth) => auth?.ownerId$ || EMPTY),
          switchMap((ownerId) => {
            // when owner become null and pendo already ready, means logout, clear the pendo session
            if (!ownerId) {
              if (pendo.isReady()) {
                this.logger.log('pendo clear session');
                // https://support.pendo.io/hc/en-us/community/posts/4430350875291-How-to-make-user-Anonymous-by-setting-default-visitor-id-when-user-logout
                pendo.clearSession();
              }

              return EMPTY;
            }

            return of(ownerId);
          }),
          map((ownerId) => ({ ownerId, pendo })),
        ) || EMPTY,
    ),
    switchMap(async ({ pendo }) => {
      const init = !pendo.isReady?.();
      const fn = init ? pendo.initialize : pendo.updateOptions;

      if (typeof fn === 'function') {
        // must wait the account have id data then able to exec initialize
        const pendoAgent = await firstValueFrom(
          fromWatchValue(this, () => this._auth?.ownerId).pipe(
            switchMap((ownerId) => this.getPendoAgent(ownerId)),
            filter((x) => x.account.id !== DEFAULT_UNKNOWN_VALUE),
          ),
        );

        this.logger.log(
          `pendo ${init ? 'initialize' : 'update'} options`,
          pendoAgent,
        );
        fn(pendoAgent);
      }

      return pendo;
    }),
    shareReplay(1),
  );

  get enable() {
    return global.document && this._pendoApiKey;
  }

  get pendo() {
    return this._pendo$.value;
  }

  get isReady() {
    return this.pendo?.isReady?.() || false;
  }

  @dynamic('Analytics')
  private _analytics?: Analytics;

  @dynamic('Auth')
  private _auth?: Auth;

  @dynamic('Brand')
  private _brand?: Brand;

  constructor(
    private _trackPropsService: TrackPropsService,
    @inject('PendoAnalyticsOptions')
    protected _pendoAnalyticsOptions: PendoAnalyticsOptions,
  ) {
    super();

    if (this.enable) {
      Pendo.init(this._pendoApiKey, this._useLocalPendoJS, (pendoInstance) => {
        this._pendo$.next(pendoInstance);
      });

      const analyticsModule$ = fromWatchValue(this, () => this._analytics);

      this.pendoReady$
        .pipe(
          switchMap(() =>
            analyticsModule$.pipe(
              switchMap((analytics) => analytics?.track$ || EMPTY),
            ),
          ),
          filter(({ event }) => {
            const trackEvents = this._pendoAnalyticsOptions?.trackEvents;
            return trackEvents?.has(event) || false;
          }),
          tap(({ event, trackProps }) => {
            this.track(event, trackProps);
          }),
          takeUntilAppDestroy,
        )
        .subscribe();
    }
  }

  track(event: string, trackProps: Record<string, any> = {}): void {
    const pendo = this.pendo;
    const appName = trackProps.appName || this._brand?.defaultConfig.appName;

    const eventName = `${appName}-${event}`;
    this.logger.log('pendo track', eventName, trackProps);
    // in current version pendo only use after login, if we need to use it before login, we need to change the logic
    if (pendo?.isReady?.() && this._auth?.ownerId) {
      pendo.track(eventName, trackProps);
    }
  }

  guidesLoaded$ = (() => {
    const subject = new Subject<void>();
    let everListen = false;

    const obs = this.pendoReady$.pipe(
      take(1),
      switchMap((pendo) => {
        if (!everListen) {
          everListen = true;
          pendo.events.guidesLoaded(() => {
            subject.next();
          });
        }

        return subject.asObservable();
      }),
    );

    return obs;
  })();

  private count = 0;
  async refreshGuides() {
    const ownerId = this._auth?.ownerId;
    const pendo = this.pendo;
    if (ownerId && pendo?.isReady?.()) {
      const promise = firstValueFrom(this.guidesLoaded$);

      // submitted the saved data to pendo server before refresh guides
      await pendo.flushNow();

      // use empty object and exist pendo object to refresh get the latest pendo guides
      pendo.updateOptions(
        this.count % 2 === 0 ? {} : await this.getPendoAgent(ownerId),
      );
      this.count++;

      return promise;
    }
  }

  async flushNow() {
    const pendo = this.pendo;
    if (pendo?.isReady?.()) {
      await pendo.flushNow();
    }
  }

  private async getPendoAgent(ownerId: string | undefined) {
    const profileProperties = await this._trackPropsService.getTrackProps();
    const additionalProps = this._pendoAnalyticsOptions.additionalVisitorProps;

    const pendoAgent: PendoAgent = {
      visitor: {
        id: ownerId || this._auth?.ownerId || '',
        env: process.env.BUILD_ENVIRONMENT,
        appName: profileProperties.appName,
        appVersion: profileProperties.appVersion,
        appBrand: this._brand?.defaultConfig.code,
        ...additionalProps,
      },
      account: {
        id: `${profileProperties.accountId}`,
      },
    };
    return pendoAgent;
  }
}
