import {
  delegate,
  dynamic,
  fromWatchValue,
  inject,
  injectable,
  optional,
  PortManager,
  RcModule,
  RouterPlugin,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import type mixpanel from 'mixpanel-browser';
import {
  BehaviorSubject,
  EMPTY,
  filter,
  firstValueFrom,
  of,
  retry,
  shareReplay,
  Subject,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';

import type { Auth } from '../Auth';
import { Environment } from '../Environment';
import { KeepBeat } from '../KeepBeat';
import { TrackPropsService } from '../TrackPropsService';

import type {
  AnalyticsOptions,
  IAnalytics,
  IExtendedProps,
  TrackRouter,
} from './Analytics.interface';
import { trackRoutersMap } from './analyticsRouters';
import { globalTrackEvent$, trackEvent } from './trackEvent';

export type TrackTarget = Exclude<TrackRouter, null | undefined>;

/**
 * Analytics service
 *
 * the tracking service for the app
 *
 * in worker mode, it will use the port manager to send the tracking data to the **main tab**
 *
 * in main tab, it will use the **analytics** library to send the tracking data to the server
 */
@injectable({
  name: 'Analytics',
})
export class Analytics extends RcModule implements IAnalytics {
  @dynamic('Auth')
  private _auth?: Auth;

  private _eventExtendedPropsMap: Record<string, IExtendedProps> = {};
  private _mixpanel$ = new BehaviorSubject<typeof mixpanel | null>(null);

  private _useLog = this._analyticsOptions.useLog ?? true;
  private _enableMixpanel = this._analyticsOptions.enableMixpanel || false;
  private _lingerThreshold = this._analyticsOptions.lingerThreshold ?? 1000;

  private _trackRoutersMap =
    this._analyticsOptions.trackRoutersMap ?? trackRoutersMap;

  /**
   * emit event when track be triggered
   */
  track$ = new Subject<{ event: string; trackProps: Record<string, any> }>();

  private enableMixpanel$ = fromWatchValue(this, () => this.enableMixpanel);

  private loadMixpanel$ = this.enableMixpanel$.pipe(
    filter(Boolean),
    // the load only need once, so take 1
    take(1),
    switchMap(async () => {
      const mixpanel = (await import('mixpanel-browser')).default;
      mixpanel.init(this._analyticsOptions.analyticsKey);
      // According to EU policy, we had to disable mixpanel to upload IP addresses
      mixpanel.set_config({ ip: false });

      this.logger.log('mixpanel init');

      return mixpanel;
    }),
    retry({
      count: 3,
      delay: (error) => {
        this.logger.error('mixpanel load fail', error);

        return timer(500);
      },
    }),
    shareReplay(1),
  );

  get mixpanel() {
    return this._mixpanel$.value;
  }

  get enableMixpanel() {
    return !!(
      this._enableMixpanel &&
      this._analyticsOptions.analyticsKey &&
      (!this._environment || this._environment.allowDataTracking)
    );
  }

  constructor(
    private _keepBeat: KeepBeat,
    private _router: RouterPlugin,
    private _trackPropsService: TrackPropsService,
    private _portManager: PortManager,
    @inject('AnalyticsOptions') private _analyticsOptions: AnalyticsOptions,
    @optional() private _environment?: Environment,
  ) {
    super();

    if (global.document) {
      if (this._portManager.shared) {
        // use client listener with focus event to track the route change event to ensure that is triggered by user
        this._portManager.onClient(() => {
          this.bindRouteChangeEventTrack();
        });
      } else {
        this.bindRouteChangeEventTrack();
      }

      this.loadMixpanel$
        .pipe(
          switchMap((mixpanel) =>
            this.enableMixpanel$.pipe(
              switchMap((enableMixpanel) => {
                if (enableMixpanel) {
                  const authModule$ = fromWatchValue(this, () => this._auth);

                  return authModule$.pipe(
                    switchMap((auth) => auth?.ownerId$ || of(null)),
                    tap((ownerId) => {
                      if (!ownerId) {
                        if (mixpanel.get_distinct_id?.()) {
                          this.logger.log('identify reset');

                          mixpanel.reset();
                        }

                        return;
                      }

                      if (mixpanel.get_distinct_id?.() === ownerId) return;

                      this.logger.log('identify set', ownerId);
                      mixpanel.identify(ownerId);
                    }),
                    tap(() => {
                      if (!this.mixpanel) {
                        // after identify or non identify then we can start send mixpanel events
                        this._mixpanel$.next(mixpanel);
                      }
                    }),
                  );
                }

                mixpanel.reset();
                this._mixpanel$.next(null);

                return EMPTY;
              }),
            ),
          ),
          takeUntilAppDestroy,
        )
        .subscribe();
    }

    // TODO: the keep beat track event be cancel by PM due to need other way to track the auto heart beat
    // in test environment, we still need to track the auto heart beat event to avoid the Line coverage, we may remove in the next release
    if (process.env.NODE_ENV === 'test') {
      this._keepBeat.beat$
        .pipe(
          switchMap(() =>
            this._trackPropsService.autoHeartBeatProps$.pipe(
              // only get data once, wait next time beat$ event to trigger
              take(1),
            ),
          ),
          tap((autoHeartBeatProps) => {
            trackEvent('Int_autoHeartBeat', autoHeartBeatProps);
          }),
          takeUntilAppDestroy,
        )
        .subscribe();
    }

    globalTrackEvent$
      .pipe(
        tap(([eventName, properties]) => {
          this.track(eventName, properties);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private bindRouteChangeEventTrack() {
    fromWatchValue(this, () => this._router.currentPath)
      .pipe(
        switchMap((currentPath) => {
          const target = this.getTrackTarget(currentPath);

          if (
            !target ||
            // only track the event that is triggered by the focus page
            !document.hasFocus()
          ) {
            return EMPTY;
          }

          const { router, eventPostfix } = target;
          this.track(`Navigation: Click/${eventPostfix}`, {
            router,
          });

          // when leave on the route for then threshold, assume that the user is linger on that route
          return timer(this._lingerThreshold).pipe(
            tap(() => {
              const { router, eventPostfix } = target;
              this.track(`Navigation: Linger/${eventPostfix}`, {
                router,
              });
            }),
          );
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private _appInitTime = Date.now();

  private async _track(event: string, properties: Record<any, any> = {}) {
    if (!this.enableMixpanel && !this._useLog) return;

    if (
      this._useLog ||
      // in test environment, always log into log system
      process.env.NODE_ENV === 'test'
    ) {
      this.logger.log('track event', event, properties, this._appInitTime);
    }

    let trackProps: Record<string, any> = {};

    if (this.enableMixpanel) {
      const mixpanel =
        this.mixpanel ??
        // must ensure the mixpanel is exist
        (await firstValueFrom(this._mixpanel$.pipe(filter(Boolean))));

      if (process.env.NODE_ENV === 'test') {
        try {
          // when in test environment, if that mixpanel.track is not mocked, set the mock function to avoid miss send data to remote
          if (!(mixpanel.track as any).mock) {
            throw new Error(
              'Mocked Mixpanel track is not mocked, should set a mock function to avoid miss send data to remote',
            );
          }
        } catch (error) {
          //
        }
      }

      trackProps = {
        ...(await this._trackPropsService.getTrackProps()),
        ...this._eventExtendedPropsMap[event],
        ...properties,
      };

      mixpanel.track(event, trackProps);
    } else {
      trackProps = {
        ...(await this._trackPropsService.getTrackProps()),
        ...this._eventExtendedPropsMap[event],
        ...properties,
      };
    }

    this.track$.next({
      event,
      trackProps,
    });
  }

  @delegate('mainClient')
  async trackOnMainTab(event: string, properties: Record<any, any> = {}) {
    await this._track(event, properties);
  }

  /**
   * Tracking with an event
   *
   * #### Never use delegate to call this method, that should occur in current client directly to get correct type
   */
  async track(event: string, properties: any = {}) {
    if (
      this._portManager.shared &&
      this._portManager.isWorkerMode &&
      // when the track is occur in server mode, we need to send the event to main client, because server not have mixpanel instance
      this._portManager.isServer
    ) {
      return this.trackOnMainTab(event, properties);
    }

    return this._track(event, properties);
  }

  @delegate('clients')
  async addEventsExtendedProps({
    events,
    extendedProps,
  }: {
    events: string[];
    extendedProps: IExtendedProps;
  }) {
    events.forEach((event) => {
      if (!this._eventExtendedPropsMap[event]) {
        this._eventExtendedPropsMap[event] = {};
      }

      Object.assign(this._eventExtendedPropsMap[event], extendedProps);
    });
  }

  toggleDebug() {
    const mixpanel = this.mixpanel;

    mixpanel?.set_config({
      debug: !mixpanel.get_config('debug'),
    });
  }

  // TODO: move out of this service
  /**
   * get Tracking Target
   */
  getTrackTarget(currentPath = this._router.currentPath): TrackRouter | null {
    if (!currentPath) return null;

    const routes = currentPath.split('/');
    let formatRoute: string | null = null;
    const needMatchSecondRoutes = ['calls'];
    if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
      formatRoute = `/${routes[1]}/${routes[2]}`;
    } else if (routes.length > 1) {
      formatRoute = `/${routes[1]}`;
    }
    return formatRoute ? this._trackRoutersMap.get(formatRoute) ?? null : null;
  }
}
