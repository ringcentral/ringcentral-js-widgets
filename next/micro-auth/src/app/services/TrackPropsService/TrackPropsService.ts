import {
  Brand,
  Locale,
  UAParsedInfo,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  computed,
  dynamic,
  fromWatchValue,
  inject,
  injectable,
  RcModule,
} from '@ringcentral-integration/next-core';
import { getMfeMeta } from '@ringcentral-integration/next-micro';
import {
  defer,
  EMPTY,
  firstValueFrom,
  map,
  of,
  switchMap,
  timeout,
} from 'rxjs';
import type { IDevice } from 'ua-parser-js';

import type { AnalyticsOptions } from '../Analytics';
import type { Auth } from '../Auth';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { ExtensionInfo } from '../ExtensionInfo';

export const DEFAULT_UNKNOWN_VALUE = 'Unknown';

type UNKNOWN_STRING = typeof DEFAULT_UNKNOWN_VALUE;

export interface EventSuperProperties {
  Device: IDevice | UNKNOWN_STRING;
  osVersion: string | UNKNOWN_STRING;
  appName: string | UNKNOWN_STRING;
  appVersion: string | UNKNOWN_STRING;
  appVersionMFE: string | UNKNOWN_STRING;
  'Browser Language': string | UNKNOWN_STRING;
  'App Language': string | UNKNOWN_STRING;
  'CPU core': number | UNKNOWN_STRING;
  'RAM size': number | UNKNOWN_STRING;
}

export interface ProfileProperties {
  accountId: string | UNKNOWN_STRING;
  extensionType: string;
  adminPermission: boolean | UNKNOWN_STRING;
}

type AdditionalProps =
  | Record<string, unknown>
  | (() => Record<string, unknown>);

/**
 * The interface for the additional track props
 *
 * you can implement this interface in your project and inject in the createApp
 *
 * !! always use `function` or `getter` to return the trackProps, because the trackProps may be changed in the future
 *
 * @example
 * ```ts
 * {
      provide: 'AdditionalTrackProps',
      deps: [ThirdPartyService],
      useFactory: (thirdPartyService: ThirdPartyService) => {
        return () => {
          trackProps: {
            'Server Version': thirdPartyService?.crmInfo.crmVersion || '',
          },
        } satisfies IAdditionalTrackProps;
      },
    },
 * ```

    of implement the class with same name

```ts
@injectable({
  name: 'AdditionalTrackProps',
})
export class AdditionalTrackProps
  extends RcModule
  implements IAdditionalTrackProps {
  get trackProps() {
    const initProps = this.getInitTrackProps();
    return {
      ...initProps,
      ...this.trackPropsValue,
    };
  }
}

```
 */
export type IAdditionalTrackProps = {
  /**
   * the additional global track props for all events
   */
  trackProps: AdditionalProps;
  /**
   * additional props for auto autoHeartBeat event, which will send every 24 hours once
   */
  autoHeartBeatProps?: AdditionalProps;
};

@injectable({
  name: 'TrackPropsService',
})
export class TrackPropsService extends RcModule {
  private mfeInfo = getMfeMeta({ onlyVersion: true });

  /**
   * this is dynamic inject from other projects, use dynamic to avoid any possible circular dependency
   */
  @dynamic('AdditionalTrackProps')
  private additionalTrackProps?: IAdditionalTrackProps;

  @dynamic('Auth')
  private _auth?: Auth;

  @dynamic('ExtensionInfo')
  private _extensionInfo?: ExtensionInfo;

  @dynamic('ExtensionFeatures')
  private _extensionFeatures?: ExtensionFeatures;

  private readonly extensionInfoReady$ = defer(
    // use defer to use easy to mock in the test
    () =>
      this._extensionInfo?.dataReady$.pipe(
        // max wait 10s for the extension info ready before the tracking event send
        timeout({
          each: 10_000,
          with: () => of('timeout' as const),
        }),
      ) ?? of(null),
  );

  @computed
  private get extensionPermission(): Record<string, boolean> | UNKNOWN_STRING {
    const features = this._extensionFeatures?.features;
    if (features) {
      const display = Object.entries(features).reduce(
        (permissions, [key, value]) => {
          permissions[key] = !!value.available;
          return permissions;
        },
        {} as Record<string, boolean>,
      );

      if (Object.keys(display).length > 0) {
        return display;
      }
    }

    return DEFAULT_UNKNOWN_VALUE;
  }

  autoHeartBeatProps$ = fromWatchValue(this, () => this._auth).pipe(
    switchMap((auth) => {
      if (!auth) return EMPTY;

      return auth.ownerId$.pipe(
        switchMap((ownerId) => {
          if (ownerId) {
            return fromWatchValue(this, () => this._extensionFeatures).pipe(
              switchMap((extensionFeatures) => {
                if (!extensionFeatures) return of(null);

                return extensionFeatures.ready$.pipe(
                  map(() => {
                    return this.autoHeartBeatProps;
                  }),
                );
              }),
            );
          }

          return of(null);
        }),
      );
    }),
    map(() => this.autoHeartBeatProps),
  );

  /**
   * this data must wait the account info ready, so we can get the extension permission, keep that be private, outside must use the autoHeartBeatProps$ to get the data
   */
  private get autoHeartBeatProps() {
    if (!this.additionalTrackProps?.autoHeartBeatProps) {
      return {
        extensionPermission: this.extensionPermission,
      };
    }

    const autoHeartBeatProps = this.additionalTrackProps?.autoHeartBeatProps;
    return {
      extensionPermission: this.extensionPermission,
      ...(typeof autoHeartBeatProps === 'function'
        ? autoHeartBeatProps()
        : autoHeartBeatProps),
    };
  }

  constructor(
    private _brand: Brand,
    private _uAParsedInfo: UAParsedInfo,
    private _locale: Locale,
    @inject('AnalyticsOptions') private _analyticsOptions: AnalyticsOptions,
  ) {
    super();
  }

  /**
   * Gets event super properties for analytics tracking
   */
  get eventSuperProperties(): EventSuperProperties {
    const userAgentResult = this._uAParsedInfo.userAgentResult;
    const device = userAgentResult?.device;
    return {
      Device:
        (Object.keys(device || {}).length > 0
          ? device
          : // when be virtual device, that will be {}, we also show that as unknown
            DEFAULT_UNKNOWN_VALUE) ?? DEFAULT_UNKNOWN_VALUE,
      osVersion: userAgentResult?.os.version ?? DEFAULT_UNKNOWN_VALUE,
      appName:
        (this._brand.defaultConfig.appName as string) ?? DEFAULT_UNKNOWN_VALUE,
      appVersion: this._analyticsOptions.appVersion,
      appVersionMFE: (this.mfeInfo as any).version ?? DEFAULT_UNKNOWN_VALUE,
      'Browser Language': this._locale.browserLocale ?? DEFAULT_UNKNOWN_VALUE,
      'App Language': this._locale.currentLocale ?? DEFAULT_UNKNOWN_VALUE,
      'CPU core': navigator.hardwareConcurrency ?? DEFAULT_UNKNOWN_VALUE,
      'RAM size':
        ('deviceMemory' in navigator
          ? (navigator.deviceMemory as number)
          : 0) ?? DEFAULT_UNKNOWN_VALUE,
    };
  }

  /**
   * Gets profile properties for analytics tracking
   */
  private get profileProperties(): ProfileProperties {
    return {
      accountId: this._extensionInfo?.accountId ?? DEFAULT_UNKNOWN_VALUE,
      extensionType: this._extensionInfo?.info.type ?? DEFAULT_UNKNOWN_VALUE,
      adminPermission:
        this._extensionInfo?.info.permissions?.admin?.enabled ??
        DEFAULT_UNKNOWN_VALUE,
    };
  }

  private get trackProps() {
    const trackProps = this.additionalTrackProps?.trackProps;
    return {
      ...this.eventSuperProperties,
      ...this.profileProperties,
      ...(typeof trackProps === 'function' ? trackProps() : trackProps),
    };
  }

  async getTrackProps() {
    const infoProps = {} as Record<string, unknown>;
    // when the user is logged in, we need to wait the extension info ready before the tracking event send
    if (this._auth?.ownerId) {
      const result = await firstValueFrom(this.extensionInfoReady$);

      if (result === 'timeout') {
        this.logger.error('Timeout 10s for the extension info ready');
        infoProps.comment = 'Timeout 10s for the extension info ready';
      }
    }

    return {
      ...this.trackProps,
      ...infoProps,
    };
  }
}
