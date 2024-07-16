import { computed, RcModuleV2, watch } from '@ringcentral-integration/core';
import type { IAnalytics } from '@ringcentral-integration/core/lib/track';
import { getOsInfo } from '@ringcentral-integration/utils';
import mixpanel from 'mixpanel-browser';

import { Pendo, Segment } from '../../lib/Analytics';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import saveBlob from '../../lib/saveBlob';

import type {
  Deps,
  IdentifyOptions,
  IExtendedProps,
  PendoAgent,
  TrackLog,
  TrackProps,
  TrackRouter,
} from './Analytics.interface';
import { trackRouters } from './analyticsRouters';

// TODO: if use `dialerUI`/`callLogSection`/`adapter`, make sure they should all be RcModuleV2
@Module({
  name: 'Analytics',
  deps: [
    'Auth',
    'Brand',
    'ExtensionFeatures',
    'AnalyticsOptions',
    { dep: 'Environment', optional: true },
    { dep: 'AccountInfo', optional: true },
    { dep: 'ExtensionInfo', optional: true },
    { dep: 'RouterInteraction', optional: true },
    { dep: 'Locale', optional: true },
  ],
})
export class Analytics<T extends Deps = Deps>
  extends RcModuleV2<T>
  implements IAnalytics
{
  appInitTime = Date.now();

  protected _useLog = this._deps.analyticsOptions.useLog ?? false;

  protected _lingerThreshold =
    this._deps.analyticsOptions.lingerThreshold ?? 1000;

  protected _enablePendo = this._deps.analyticsOptions.enablePendo ?? false;

  protected _analyticsKey = this._deps.analyticsOptions.analyticsKey;
  protected _enableMixpanel =
    this._deps.analyticsOptions.enableMixpanel ?? false;

  protected _pendoApiKey = this._deps.analyticsOptions.pendoApiKey ?? '';

  protected _trackRouters =
    this._deps.analyticsOptions.trackRouters ?? trackRouters;

  protected _segment: any;

  protected _logs: TrackLog[] = [];

  protected _lingerTimeout: NodeJS.Timeout | null = null;

  private _pendo: any;

  private _waitPendoCount = 0;

  private _pendoTimeout?: ReturnType<typeof setTimeout>;

  private _env = this._deps.analyticsOptions.env ?? 'dev';

  private _eventExtendedPropsMap = new Map<string, IExtendedProps>();
  private _useLocalPendoJS =
    this._deps.analyticsOptions.useLocalPendoJS ?? false;
  private _useLocalAnalyticsJS =
    this._deps.analyticsOptions.useLocalAnalyticsJS ?? false;
  protected _identifyMixpanelPromise: Promise<void> | undefined;
  protected _identifyMixpanelResolve?: () => void;

  private _OSInfo: { OS: string; Device: string };

  constructor(deps: T) {
    super({
      deps,
    });
    this._OSInfo = getOsInfo();
    this._segment =
      this._enableMixpanel && this._analyticsKey ? null : Segment();
    if (this.enableMixpanel) {
      mixpanel.init(this._analyticsKey);
      // According to EU policy, we had to disable mixpanel to upload IP addresses
      mixpanel.set_config({ ip: false });
      console.log('mixpanel init');
    }
    if (this._enablePendo && this._pendoApiKey) {
      Pendo.init(
        this._pendoApiKey,
        this._useLocalPendoJS,
        (pendoInstance: any) => {
          this._pendo = pendoInstance;
        },
      );
    }
  }

  override onInitOnce() {
    this._identifyMixpanelPromise = new Promise((resolve) => {
      this._identifyMixpanelResolve = resolve;
    });
    if (this._analyticsKey && this._segment) {
      this._segment.load(
        this._analyticsKey,
        {
          integrations: {
            All: true,
            Mixpanel: true,
          },
        },
        this._useLocalAnalyticsJS,
      );
    }
    if (this._deps.routerInteraction) {
      watch(
        this,
        () => this._deps.routerInteraction!.currentPath,
        (currentPath) => {
          this.trackRouter(currentPath);
        },
      );
    }
  }

  async trackRouter(currentPath = this._deps.routerInteraction?.currentPath) {
    if (this.enableMixpanel) {
      await this._identifyMixpanelPromise;
    }
    const target = this.getTrackTarget(currentPath);
    if (target) {
      this.trackNavigation(target);
    }

    if (this._lingerTimeout) {
      clearTimeout(this._lingerTimeout);
    }
    this._lingerTimeout = setTimeout(() => {
      this._lingerTimeout = null;
      if (target && this._deps.routerInteraction?.currentPath === currentPath) {
        this.trackLinger(target);
      }
    }, this._lingerThreshold);
  }

  setUserId() {
    this._identify({
      userId: this._deps.auth.ownerId,
    });
  }

  identify(options: IdentifyOptions) {
    this._identify(options);
  }

  protected _identify({ userId, ...props }: IdentifyOptions) {
    if (this.enableMixpanel) {
      this._mixpanelInitialize({ userId });
    } else if (this.analytics) {
      this.analytics.identify(userId, props, {
        integrations: {
          All: true,
          Mixpanel: true,
          Pendo: this._enablePendo,
        },
      });
    }
    if (this._enablePendo && this._pendoApiKey) {
      this._pendoInitialize({ userId, ...props, env: this._env });
    }
  }

  protected _mixpanelInitialize({ userId }: { userId: string }) {
    if (!userId || mixpanel.get_distinct_id?.() === userId) {
      return;
    }
    console.log('mixpanel identify');
    mixpanel.identify(userId);
    this._identifyMixpanelResolve?.();
  }

  pendoIdentify({
    userId,
    ...props
  }: { userId: string } & Record<string, any>) {
    this._pendoInitialize({ userId, ...props, env: this._env });
  }

  protected _pendoInitialize({
    userId,
    ...props
  }: { userId: string } & Record<string, any>) {
    if (!this._deps.accountInfo || !this._deps.accountInfo.id || !userId) {
      return;
    }
    if (this._pendoTimeout) {
      clearTimeout(this._pendoTimeout);
    }
    if (this._waitPendoCount > 3) {
      return;
    }
    if (!this._pendo) {
      this._pendoTimeout = setTimeout(() => {
        this._waitPendoCount += 1;
        this._pendoInitialize({ userId, ...props });
      }, 5 * 1000);
      return;
    }
    const initializeFunc = !this._pendo.isReady()
      ? this._pendo.initialize
      : this._pendo.updateOptions;
    const pendoAgent: PendoAgent = {
      visitor: {
        id: userId,
        ...props,
        appName: this._deps.brand.defaultConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        appBrand: this._deps.brand.defaultConfig.code,
        plaBrand: this._deps.accountInfo?.serviceInfo?.brand?.name,
        countryCode: this._deps.accountInfo?.countryCode,
      },
      account: {
        id: `${this._deps.accountInfo.id}`,
      },
    };
    typeof initializeFunc === 'function' &&
      initializeFunc({
        ...pendoAgent,
      });
  }

  @proxify
  async track(event: string, properties: any = {}) {
    if (!this.analytics && !this.enableMixpanel) {
      return;
    }

    const trackProps: TrackProps = {
      ...this.trackProps,
      ...properties,
      ...this.extendedProps.get(event),
    };
    if (this.enableMixpanel) {
      // NOTE: Data tracking has been migrated from Segment to Mixpanel.
      // Add id to identify in Mixpanel, so the usage data can be filtered same as before.
      if (this._deps.auth?.ownerId) {
        trackProps.id = this._deps.auth.ownerId;
      }
      mixpanel.track(event, trackProps);
    }

    if (this.analytics) {
      this.analytics.track(event, trackProps, {
        integrations: {
          All: true,
          Mixpanel: true,
          Pendo: this._enablePendo,
        },
      });
    }

    if (this._useLog) {
      this._logs.push({
        timeStamp: new Date().toISOString(),
        event,
        trackProps,
      });
    }

    if (this._enablePendo && this._pendo?.isReady?.()) {
      this._pendo.track(`${trackProps.appName}-${event}`, trackProps);
    }
  }

  downloadLogs() {
    if (!this._useLog) {
      return;
    }
    const blob = new Blob([JSON.stringify(this._logs, null, 2)], {
      type: 'application/json',
    });
    saveBlob('logs.json', blob);
  }

  trackNavigation({
    router,
    eventPostfix,
  }: Exclude<TrackRouter, null | undefined>) {
    const trackProps = {
      router,
      appName: this._deps.brand.defaultConfig.appName,
      appVersion: this._deps.analyticsOptions.appVersion,
      brand: this._deps.brand.defaultConfig.code,
    };
    this.track(`Navigation: Click/${eventPostfix}`, trackProps);
  }

  trackLinger({
    router,
    eventPostfix,
  }: Exclude<TrackRouter, null | undefined>) {
    const trackProps = {
      router,
      appName: this._deps.brand.defaultConfig.appName,
      appVersion: this._deps.analyticsOptions.appVersion,
      brand: this._deps.brand.defaultConfig.code,
    };
    this.track(`Navigation: View/${eventPostfix}`, trackProps);
  }

  getTrackTarget(
    currentPath = this._deps.routerInteraction?.currentPath,
  ): TrackRouter {
    if (!currentPath) {
      return null;
    }
    const routes = currentPath.split('/');
    let formatRoute: string | null = null;
    const needMatchSecondRoutes = ['calls'];
    if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
      formatRoute = `/${routes[1]}/${routes[2]}`;
    } else if (routes.length > 1) {
      formatRoute = `/${routes[1]}`;
    }
    const target = this._trackRouters.find(
      (target) => formatRoute === target?.router,
    );
    return target;
  }

  addEventsExtendedProps({
    events,
    extendedProps,
  }: {
    events: string[];
    extendedProps: IExtendedProps;
  }) {
    if (!events || !extendedProps) {
      console.error('[events or extendedProps] is required');
      return;
    }
    events.forEach((event) => {
      const oldValue = this._eventExtendedPropsMap.get(event);
      this._eventExtendedPropsMap.set(event, { ...oldValue, ...extendedProps });
    });
  }

  toggleDebug() {
    this.mixpanel.set_config({ debug: !this.mixpanel.get_config('debug') });
  }

  get extendedProps() {
    return this._eventExtendedPropsMap;
  }

  get analytics() {
    return (global as any).analytics;
  }

  get mixpanel() {
    return mixpanel;
  }

  @computed((that: Analytics) => [
    that._deps.brand.brandConfig,
    that._deps.accountInfo?.id,
    that._deps.extensionInfo?.country,
    that._deps.extensionFeatures?.features,
  ])
  private get trackedUserInfo(): TrackProps {
    const userInfo: Record<string, any> = {
      BrandId: this._deps.brand.brandConfig.id,
      AccountID: this._deps.accountInfo?.id,
      BrandName: this._deps.brand.brandConfig.name,
      CRMEnabled: this._deps.accountInfo?.isCRMEnabled,
      servicePlanId: this._deps.accountInfo?.servicePlan.id,
      edition: this._deps.accountInfo?.servicePlan.edition,
    };

    const features = this._deps.extensionFeatures?.features;
    const isCallingEnabled =
      features?.RingOut?.available || features?.WebPhone?.available;
    const hasSmsPermission =
      features?.PagesReceiving?.available || features?.SMSReceiving?.available;
    const hasFaxPermission = features?.FaxReceiving?.available;
    const hasGlipPermission = features?.Glip?.available;

    const properties = [
      { name: 'PhoneService', value: isCallingEnabled },
      { name: 'SMSService', value: hasSmsPermission },
      { name: 'FaxService', value: hasFaxPermission },
      { name: 'MessageService', value: hasGlipPermission },
    ];

    properties.forEach(({ name, value }) => {
      if (value !== undefined) {
        userInfo[name] = value ? 'ON' : 'OFF';
      }
    });

    return userInfo as TrackProps;
  }

  get trackProps(): TrackProps {
    return {
      ...this.trackedUserInfo,
      ...this._OSInfo,
      appName: this._deps.brand.defaultConfig.appName,
      appVersion: this._deps.analyticsOptions.appVersion,
      brand: this._deps.brand.defaultConfig.code,
      'App Language': this._deps.locale?.currentLocale || '',
      'Browser Language': this._deps.locale?.browserLocale || '',
      'Extension Type': this._deps.extensionInfo?.info.type || '',
      'App Init Time': this.appInitTime,
    };
  }

  get pendo() {
    return this._pendo;
  }

  get enableMixpanel() {
    return !!(
      this._enableMixpanel &&
      this._analyticsKey &&
      (!this._deps.environment || this._deps.environment.allowDataTracking)
    );
  }
}
