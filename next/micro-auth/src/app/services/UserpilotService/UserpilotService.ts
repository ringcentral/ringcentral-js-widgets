import type { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import {
  dynamic,
  inject,
  injectable,
  RcModule,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  filter,
  map,
  of,
  shareReplay,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Userpilot } from 'userpilot';

import { AccountInfo } from '../AccountInfo';
import { Auth } from '../Auth';
import { ExtensionInfo } from '../ExtensionInfo';
import { DEFAULT_UNKNOWN_VALUE, TrackPropsService } from '../TrackPropsService';

import type { UserpilotServiceOptions } from './UserpilotService.interface';
import type { GuideDataPayload, GuideDataResponsePayload } from './utils';
import { registerGuideDataListener } from './utils';

export type GuideDataStatusMatcher = (
  payload: GuideDataPayload | undefined,
) => boolean;

interface PendingGuideDataEvent {
  data: GuideDataResponsePayload;
  matcher?: GuideDataStatusMatcher;
}

export interface UserpilotUserProperties {
  [key: string]: any;
}

// Userpilot type definition
type UserpilotInstance = typeof Userpilot;

const USERPILOT_COMMON_USER_PROPERTIES = new Set([
  'rcExtensionId',
  'rcAccountId',
  'Phoenix',
  'superAdmin',
  'acctBrand',
  'acctEdition',
  'brandId',
  'uBrandId',
]);

const MAX_RECENT_TRACKED_EVENT_NAMES = 10;

const isGuideDataPayload = (payload: unknown): payload is GuideDataPayload =>
  typeof payload === 'string' ||
  (!!payload && typeof payload === 'object' && !Array.isArray(payload));

@injectable({
  name: 'UserpilotService',
})
export class UserpilotService extends RcModule {
  private _userpilot$ = new BehaviorSubject<UserpilotInstance | null>(null);
  private _appToken = this._userpilotServiceOptions.appToken;
  private _isInitialized = false;
  private _recentTrackedEventNames: string[] = [];

  userpilotReady$ = this._userpilot$.pipe(
    filter(Boolean),
    take(1),
    switchMap((userpilot) => {
      this.logger.log('userpilot ready');

      return (
        this._auth.ownerId$.pipe(
          switchMap((ownerId) => {
            // when owner become null and userpilot already initialized, means logout, clean the userpilot session
            if (!ownerId) {
              this.logger.log('userpilot clean session');
              userpilot.clean();

              return EMPTY;
            }

            return of(ownerId);
          }),
          map((ownerId) => ({ ownerId, userpilot })),
        ) || EMPTY
      );
    }),
    switchMap(async ({ userpilot, ownerId }) => {
      this._isInitialized = false;

      // must wait the account have id data then able to exec identify
      const userProperties = await this.getUserpilotUserProperties(ownerId);

      this.logger.log('userpilot identify', userProperties);
      userpilot.identify(ownerId, userProperties);
      userpilot.reload();
      this._isInitialized = true;

      return userpilot;
    }),
    shareReplay(1),
  );

  get enable() {
    return global.document && this._appToken;
  }

  get userpilot() {
    return this._userpilot$.value;
  }

  get isReady() {
    return this._isInitialized && this.userpilot !== null;
  }

  /**
   * Gets a snapshot of the recent raw event names passed to `track`.
   */
  get recentTrackedEventNames() {
    return [...this._recentTrackedEventNames];
  }

  /**
   * Checks whether the recent local tracking history contains the event name.
   */
  hasRecentTrackedEvent(eventName: string) {
    return this._recentTrackedEventNames.includes(eventName);
  }

  /**
   * Checks whether any target event was tracked recently, and removes all
   * matching target events when a match is found.
   */
  consumeRecentTrackedEvent(eventName: string) {
    const result = this._recentTrackedEventNames.filter(
      (name) => name !== eventName,
    );

    if (result.length !== this._recentTrackedEventNames.length) {
      this._recentTrackedEventNames = result;
      return true;
    }

    return false;
  }

  @dynamic('Brand')
  private _brand?: Brand;

  @dynamic('AccountInfo')
  private _accountInfo?: AccountInfo;

  @dynamic('ExtensionInfo')
  private _extensionInfo?: ExtensionInfo;

  private _sendGuideData$ = new Subject<PendingGuideDataEvent | null>();

  private _guideDataListener$ =
    // only register guide data listener when document is available
    globalThis.document
      ? registerGuideDataListener().pipe(
          shareReplay({ bufferSize: 1, refCount: true }),
        )
      : EMPTY;

  readonly guideData$ = this._guideDataListener$.pipe(
    map(({ payload }) => payload),
    filter(isGuideDataPayload),
  );

  sendGuideData(
    data: GuideDataResponsePayload,
    matcher?: GuideDataStatusMatcher,
  ) {
    this._sendGuideData$.next({ data, matcher });
  }

  private _isGuideDataPayloadMatched(
    payload: GuideDataPayload | undefined,
    matcher?: GuideDataStatusMatcher,
  ) {
    if (!matcher) {
      return true;
    }

    try {
      return !!matcher(payload);
    } catch (error) {
      this.logger.warn('Failed to match guide data payload', error);
      return false;
    }
  }

  constructor(
    private _auth: Auth,
    private _trackPropsService: TrackPropsService,
    @inject('UserpilotServiceOptions')
    protected _userpilotServiceOptions: UserpilotServiceOptions,
  ) {
    super();

    if (this.enable && globalThis.document) {
      combineLatest([this._guideDataListener$, this._sendGuideData$])
        .pipe(
          tap(([{ send, payload }, pendingGuideDataEvent]) => {
            if (
              send &&
              pendingGuideDataEvent &&
              this._isGuideDataPayloadMatched(
                payload,
                pendingGuideDataEvent.matcher,
              )
            ) {
              send(pendingGuideDataEvent.data);
              // clear to prepare next event
              this._sendGuideData$.next(null);
            }
          }),
          takeUntilAppDestroy,
        )
        .subscribe();
      this.initializeUserpilot();

      this.userpilotReady$.pipe(takeUntilAppDestroy).subscribe();
    }
  }

  private initializeUserpilot() {
    // Use npm package directly
    try {
      Userpilot.initialize(this._appToken, {
        auto_capture: { enabled: false },
      });
      this._userpilot$.next(Userpilot);
      this.logger.log('userpilot SDK is loaded!', {
        token: this._appToken,
      });
    } catch (error) {
      this.logger.error('Failed to initialize Userpilot', error);
    }
  }

  private _recordTrackedEvent(eventName: string) {
    this._recentTrackedEventNames = [
      ...this._recentTrackedEventNames,
      eventName,
    ].slice(-MAX_RECENT_TRACKED_EVENT_NAMES);
  }

  track(event: string, trackProps: Record<string, any> = {}): void {
    this._recordTrackedEvent(event);

    const userpilot = this.userpilot;
    const appName = trackProps.appName || this._brand?.defaultConfig.appName;

    const eventName = `${appName}-${event}`;
    this.logger.log('userpilot track', eventName, trackProps);
    // userpilot only use after login, if we need to use it before login, we need to change the logic
    if (this.isReady && this._auth?.ownerId && userpilot) {
      userpilot.track(eventName, trackProps);
    }
  }

  async refreshContent() {
    const ownerId = this._auth?.ownerId;
    const userpilot = this.userpilot;
    if (ownerId && this.isReady && userpilot) {
      // reload to get the latest userpilot content
      userpilot.reload();
    }
  }

  private async getUserpilotUserProperties(ownerId: string) {
    const profileProperties = await this._trackPropsService.getTrackProps();
    const additionalProps = this._userpilotServiceOptions.additionalUserProps;

    const userProperties = {
      name: this.userName,
      // ISO8601 Date
      created_at: new Date().toISOString(),
      ...this.toUserpilotProperties({
        env: process.env.BUILD_ENVIRONMENT,
        appName: profileProperties.appName,
        appVersion: profileProperties.appVersion,
        appBrand: this._brand?.defaultConfig.code,
        ...additionalProps,
      }),
      rcExtensionId: ownerId,
      rcAccountId: `${profileProperties.accountId}`,
      Phoenix: this.isPhoenix,
      superAdmin: this.isSuperAdmin,
      acctBrand: this.acctBrand,
      acctEdition: this.acctEdition,
      brandId: this.brandId,
      uBrandId: this.uBrandId,
    };
    return userProperties;
  }

  private toUserpilotProperties(properties: Record<string, unknown>) {
    const normalizedProperties: Record<string, unknown> = {};

    Object.entries(properties).forEach(([key, value]) => {
      const normalizedKey = this.normalizeUserpilotPropertyName(key);
      normalizedProperties[normalizedKey] =
        this.normalizeUserpilotPropertyValue(value);
    });

    return normalizedProperties;
  }

  private normalizeUserpilotPropertyName(propertyName: string) {
    if (
      USERPILOT_COMMON_USER_PROPERTIES.has(propertyName) ||
      propertyName.startsWith('int_')
    ) {
      return propertyName;
    }
    return `int_${propertyName}`;
  }

  private normalizeUserpilotPropertyValue(value: unknown) {
    if (value === undefined || value === null) {
      return DEFAULT_UNKNOWN_VALUE;
    }
    return value;
  }

  private get isPhoenix() {
    return (
      this._accountInfo?.serviceInfo?.servicePlan?.freemiumProductType ===
      'Phoenix'
    );
  }

  private get userName() {
    return this._extensionInfo?.info.name;
  }

  private get isSuperAdmin() {
    return !!this._extensionInfo?.info.permissions?.admin?.enabled;
  }

  private get acctBrand() {
    return this._accountInfo?.serviceInfo?.brand?.name;
  }

  private get acctEdition() {
    return this._accountInfo?.servicePlan?.edition;
  }

  private get brandId() {
    return this._accountInfo?.brandId;
  }

  private get uBrandId() {
    return this._accountInfo?.uBrandId;
  }
}

// Extend window type for userpilot
declare global {
  interface Window {
    userpilot?: UserpilotInstance;
  }
}
