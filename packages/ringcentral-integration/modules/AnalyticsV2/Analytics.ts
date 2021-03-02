import { RcModuleV2, watch } from '@ringcentral-integration/core';
import { Segment } from '../../lib/Analytics';
import { Module } from '../../lib/di';
import saveBlob from '../../lib/saveBlob';
import { Deps, TrackLog, TrackProps, TrackRouter } from './Analytics.interface';
import { trackRouters } from './analyticsRouters';

// TODO: refactoring the module against `https://docs.google.com/spreadsheets/d/1xufV6-C-RJR6OJgwFYHYzNQwhIdN4BXXCo8ABs7RT-8/edit#gid=1480480736`
// TODO: if use `dialerUI`/`callLogSection`/`adapter`, make sure they should all be RcModuleV2
@Module({
  name: 'Analytics',
  deps: [
    'Auth',
    'BrandConfig',
    'AnalyticsOptions',
    { dep: 'AccountInfo', optional: true },
    { dep: 'ExtensionInfo', optional: true },
    { dep: 'RolesAndPermissions', optional: true },
    { dep: 'RouterInteraction', optional: true },
    { dep: 'Locale', optional: true },
  ],
})
export class Analytics extends RcModuleV2<Deps> {
  protected _useLog = this._deps.analyticsOptions.useLog ?? false;

  protected _lingerThreshold =
    this._deps.analyticsOptions.lingerThreshold ?? 1000;

  protected _enablePendo = this._deps.analyticsOptions.enablePendo ?? false;

  protected _trackRouters =
    this._deps.analyticsOptions.trackRouters ?? trackRouters;

  private _segment: any;

  protected _logs: TrackLog[] = [];

  protected _lingerTimeout?: NodeJS.Timeout = null;

  constructor(deps: Deps) {
    super({
      deps,
    });
    this._segment = Segment();
  }

  onInitOnce() {
    if (this._deps.routerInteraction) {
      // make sure that track if refresh app
      this.trackRouter();
      watch(
        this,
        () => this._deps.routerInteraction.currentPath,
        (currentPath) => {
          this.trackRouter(currentPath);
        },
      );
    }

    if (this._deps.accountInfo) {
      watch(
        this,
        () => this._deps.accountInfo.ready,
        (accountInfoReady) => {
          if (accountInfoReady) {
            this._identify({
              userId: this._deps.auth.ownerId,
              accountId: this._deps.accountInfo.id,
              servicePlanId: this._deps.accountInfo.servicePlan.id,
              edition: this._deps.accountInfo.servicePlan.edition,
              CRMEnabled: this._deps.rolesAndPermissions?.tierEnabled,
            });
          }
        },
      );
    }
  }

  trackRouter(currentPath = this._deps.routerInteraction.currentPath) {
    const target = this.getTrackTarget(currentPath);
    if (target) {
      this.trackNavigation(target);
    }

    if (this._lingerTimeout) {
      clearTimeout(this._lingerTimeout);
    }
    this._lingerTimeout = setTimeout(() => {
      this._lingerTimeout = null;
      if (target && this._deps.routerInteraction.currentPath === currentPath) {
        this.trackLinger(target);
      }
    }, this._lingerThreshold);
  }

  onInit() {
    if (this._deps.analyticsOptions.analyticsKey && this._segment) {
      this._segment.load(this._deps.analyticsOptions.analyticsKey, {
        integrations: {
          All: true,
          Mixpanel: true,
          Pendo: this._enablePendo,
        },
      });
    }
  }

  setUserId() {
    this._identify({
      userId: this._deps.auth.ownerId,
    });
  }

  protected _identify({
    userId,
    ...props
  }: { userId: string } & Record<string, any>) {
    if (this.analytics) {
      this.analytics.identify(
        userId,
        {
          ...props,
          companyName: this._deps.extensionInfo?.info?.contact?.company,
        },
        {
          integrations: {
            All: true,
            Mixpanel: true,
            Pendo: this._enablePendo,
          },
        },
      );
    }
  }

  track(event: string, properties: any = {}) {
    if (!this.analytics) {
      return;
    }
    const trackProps: TrackProps = {
      ...this.trackProps,
      ...properties,
    };
    this.analytics.track(event, trackProps, {
      integrations: {
        All: true,
        Mixpanel: true,
        Pendo: this._enablePendo,
      },
    });
    if (this._useLog) {
      this._logs.push({
        timeStamp: new Date().toISOString(),
        event,
        trackProps,
      });
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

  trackNavigation({ router, eventPostfix }: TrackRouter) {
    const trackProps = {
      router,
      appName: this._deps.brandConfig.appName,
      appVersion: this._deps.analyticsOptions.appVersion,
      brand: this._deps.brandConfig.brandCode,
    };
    this.track(`Navigation: Click/${eventPostfix}`, trackProps);
  }

  trackLinger({ router, eventPostfix }: TrackRouter) {
    const trackProps = {
      router,
      appName: this._deps.brandConfig.appName,
      appVersion: this._deps.analyticsOptions.appVersion,
      brand: this._deps.brandConfig.brandCode,
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
    let formatRoute: string = null;
    const needMatchSecondRoutes = ['calls'];
    if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
      formatRoute = `/${routes[1]}/${routes[2]}`;
    } else if (routes.length > 1) {
      formatRoute = `/${routes[1]}`;
    }
    const target = this._trackRouters.find(
      (target) => formatRoute === target.router,
    );
    return target;
  }

  get analytics() {
    return (global as any).analytics;
  }

  get trackProps(): TrackProps {
    return {
      appName: this._deps.brandConfig.appName,
      appVersion: this._deps.analyticsOptions.appVersion,
      brand: this._deps.brandConfig.brandCode,
      'App Language': this._deps.locale?.currentLocale || '',
      'Browser Language': this._deps.locale?.browserLocale || '',
      'Extension Type': this._deps.extensionInfo?.info.type || '',
    };
  }
}
