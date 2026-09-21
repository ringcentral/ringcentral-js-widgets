/* eslint-disable react-hooks/rules-of-hooks */
import {
  AppFeatures,
  ExtensionDevice,
  ExtensionFeatures,
  ExtensionInfo,
  ExtensionPhoneNumber,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Brand,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import { useToastItemView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  computed,
  delegate,
  DriverType,
  fromWatchValue,
  injectable,
  optional,
  portal,
  RcModule,
  RouterPlugin,
  state,
  StoragePlugin,
  takeUntilAppDestroy,
  userStorage,
} from '@ringcentral-integration/next-core';
import FormattedMessage from '@ringcentral-integration/widgets/components/FormattedMessage';
import { RcLink } from '@ringcentral/juno';
import React from 'react';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs';

import { CallerId } from '../CallerId';
import { ForwardingNumber } from '../ForwardingNumber';
import { Softphone } from '../Softphone';
import { Webphone } from '../Webphone';

import { callingModes } from './callingModes';
import type { CallingOptionsType } from './callingOptions';
import { callingOptions } from './callingOptions';
import type { CallingSettingsOptions } from './CallingSettings.interface';
import i18n, { t } from './i18n';
import { mapOptionToMode } from './mapOptionToMode';

const LOCATION_NUMBER_ORDER = ['Other', 'Main'];
export const BLOCKED_ID_VALUE = 'anonymous';

type LinkToastPayload = {
  message: 'permissionChanged' | 'phoneNumberChanged';
};

type SetCallingSettingsData = {
  callWith?: CallingOptionsType | null;
  myLocation?: string;
  ringoutPrompt?: boolean;
};

@injectable({
  name: 'CallingSettings',
})
class CallingSettings extends RcModule {
  private _onFirstLogin = this._callingSettingsOptions?.onFirstLogin;
  private initRingoutPrompt =
    this._callingSettingsOptions?.defaultRingoutPrompt;
  private _showCallWithJupiter =
    this._callingSettingsOptions?.showCallWithJupiter ?? true;
  private _emergencyCallAvailable =
    this._callingSettingsOptions?.emergencyCallAvailable ?? !!this._webphone;

  constructor(
    protected _router: RouterPlugin,
    protected _toast: Toast,
    protected _brand: Brand,
    protected _storage: StoragePlugin,
    protected _extensionInfo: ExtensionInfo,
    protected _extensionDevice: ExtensionDevice,
    protected _forwardingNumber: ForwardingNumber,
    protected _appFeatures: AppFeatures,
    protected _extensionFeatures: ExtensionFeatures,
    protected _extensionPhoneNumber: ExtensionPhoneNumber,
    protected _callerId: CallerId,
    @optional() protected _webphone?: Webphone,
    @optional() protected _softphone?: Softphone,
    @optional('TabManager') protected _tabManager?: any,
    @optional('CallingSettingsOptions')
    protected _callingSettingsOptions?: CallingSettingsOptions,
  ) {
    super();
    this._storage.enable(this, {
      migrations: [
        ['data', 'CallingSettings-data'],
        ['acknowledgeJPMessage', 'CallingSettings-acknowledgeJPMessage'],
      ],
    });
  }

  get callWith() {
    return this.data.callWith;
  }

  get ringoutPrompt() {
    return this.data.ringoutPrompt;
  }

  get myLocation() {
    return this.data.myLocation;
  }

  get fromNumber() {
    return this.data.fromNumber;
  }

  get timestamp() {
    return this.data.timestamp;
  }

  get isCustomLocation() {
    return this.data.isCustomLocation;
  }

  /**
   * For Japan Emergency Service notification
   */
  @userStorage
  @state
  acknowledgeJPMessage = false;

  @userStorage
  @state
  data: {
    callWith: string | null;
    ringoutPrompt: boolean;
    myLocation: string;
    fromNumber: string | null;
    timestamp: number | null;
    isCustomLocation: boolean;
  } = {
    callWith: null,
    ringoutPrompt: true,
    myLocation: '',
    fromNumber: null,
    timestamp: null,
    isCustomLocation: false,
  };

  @action
  setDataAction({
    callWith = this.callWith,
    ringoutPrompt = this.ringoutPrompt,
    myLocation = this.myLocation,
    timestamp = this.timestamp,
  }: SetCallingSettingsData & {
    timestamp?: number | null;
  }) {
    this.data.callWith = callWith;
    this.data.ringoutPrompt = ringoutPrompt;
    this.data.myLocation = myLocation;
    this.data.timestamp = timestamp;

    const isCustomLocation = this.availableNumbersWithLabel.every(
      (item) => item.value !== this.myLocation,
    );

    // save the custom location status in state to prevent the availableNumbersWithLabel change after user have custom that
    this.data.isCustomLocation = isCustomLocation;
  }

  @action
  _updateFromNumber(number: { phoneNumber?: string }) {
    this.data.fromNumber = (number && number?.phoneNumber) || null;
  }

  @delegate('server')
  async updateFromNumber(number: { phoneNumber?: string }) {
    this._updateFromNumber(number);
  }

  @action
  setAcknowledgeJPMessage(value: boolean) {
    this.acknowledgeJPMessage = value;
  }

  @action
  resetSuccess() {
    this.data.fromNumber = null;
    this.setAcknowledgeJPMessage(false);
  }

  override async onInitSuccess() {
    if (this.isWebphoneMode) {
      this._verifyJPEmergency();
    }
  }

  override async onInit() {
    await this._init();

    const validateSettings$ = fromWatchValue(
      this,
      () => [
        this._appFeatures.isRingOutEnabled,
        this._appFeatures.isWebPhoneEnabled,
        this.myPhoneNumbers,
        this.otherPhoneNumbers,
        this.isBlockedIdDisabled,
      ],
      { multiple: true },
    ).pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
      ),
      switchMap(() => this._validateSettings()),
      takeUntil(this.resetting$),
      takeUntilAppDestroy,
    );

    validateSettings$.subscribe();
  }

  override onReset() {
    this.resetSuccess();
  }

  _handleFirstTimeLogin() {
    if (!this.timestamp) {
      // first time login
      const defaultCallWith = this.callWithOptions && this.callWithOptions[0];
      this.setDataAction({ callWith: defaultCallWith, timestamp: Date.now() });
      if (!this._emergencyCallAvailable) {
        this._warningEmergencyCallingNotAvailable();
      }
      if (typeof this._onFirstLogin === 'function') {
        this._onFirstLogin();
      }
    }
  }

  async _init() {
    if (!this._appFeatures.isCallingEnabled) {
      this.setDataAction({ callWith: null, timestamp: null });
      return;
    }

    this._handleFirstTimeLogin();

    await this._initFromNumber();
  }

  @delegate('server')
  async _warningEmergencyCallingNotAvailable() {
    if (this.callWith === callingOptions.browser) {
      this._toast.warning({
        message: t('emergencyCallingNotAvailable'),
        ttl: 0,
      });
    }
  }

  @portal
  private linkToast = this._toast.create<LinkToastPayload>({
    view: () => {
      const { action, props } = useToastItemView<LinkToastPayload>();
      const { t } = useLocale(i18n);

      const link = (
        <RcLink
          onClick={() => {
            this._router.push('/settings/calling');
            action!.close();
          }}
        >
          {t('link')}
        </RcLink>
      );

      return (
        <FormattedMessage
          message={t(props.payload.message)}
          values={{ link }}
        />
      );
    },
    props: () => ({
      level: 'danger',
      ttl: 0,
    }),
  });

  @delegate('server')
  async _validateSettings() {
    if (this._hasWebphonePermissionRemoved()) {
      if (this._appFeatures.isSoftphoneEnabled) {
        await this._setSoftPhoneToCallWith();
      }
      this._toast.danger({
        message: t('webphonePermissionRemoved'),
        ttl: 0,
      });
    } else if (this._hasPermissionChanged()) {
      if (this._appFeatures.isSoftphoneEnabled) {
        await this._setSoftPhoneToCallWith();
      }
      this._toast.open(this.linkToast, {
        message: 'permissionChanged',
      });
    } else if (this.validateRingoutNumberVariable()) {
      this.setDataAction({
        callWith: callingOptions.ringout,
        myLocation: this.myPhoneNumbers[0],
        timestamp: Date.now(),
      });

      this._toast.open(this.linkToast, {
        message: 'phoneNumberChanged',
      });
    }

    if (this.isBlockedIdDisabled && this.fromNumber === BLOCKED_ID_VALUE) {
      this._initFromNumber();
    }
  }

  @delegate('server')
  async _verifyJPEmergency() {
    if (this.acknowledgeJPMessage) return;

    const hasJapanNumber = !!this.fromNumbers.find(
      (record) => record?.country?.id === '112',
    );
    if (hasJapanNumber) {
      this._toast.warning({
        message: t('disableEmergencyInJapan'),
        ttl: 0,
      });
      this.setAcknowledgeJPMessage(true);
    }
  }

  @delegate('server')
  async _setSoftPhoneToCallWith() {
    this.setDataAction({
      callWith: callingOptions.softphone,
      timestamp: Date.now(),
    });
  }

  _hasWebphonePermissionRemoved() {
    return (
      !(this._appFeatures.isWebPhoneEnabled && this._webphone) &&
      this.callWith === callingOptions.browser
    );
  }

  get callingOptions() {
    return callingOptions;
  }

  _hasPermissionChanged() {
    return (
      !this._appFeatures.isRingOutEnabled &&
      this.callWith === callingOptions.ringout
    );
  }

  private validateRingoutNumberVariable() {
    return (
      this.callWith === callingOptions.ringout &&
      !this.isCustomLocation &&
      this.availableNumbers?.indexOf(this.myLocation) === -1
    );
  }

  _getLocationLabel(phoneNumber: string) {
    const { devices } = this._extensionDevice;
    const { flipNumbers } = this._forwardingNumber;
    const { mainCompanyNumber } = this._extensionPhoneNumber;
    const { extensionNumber } = this._extensionInfo;
    let name = null;
    if (devices.length) {
      let registeredWithDevice = false;
      devices.forEach((device) => {
        const { phoneLines } = device;
        if (phoneLines?.length) {
          registeredWithDevice = !!phoneLines.find((phoneLine) => {
            return phoneLine.phoneInfo?.phoneNumber === phoneNumber;
          });
          if (registeredWithDevice) {
            name = device.name;
          }
        }
      });
      if (name) return name;
    }
    if (flipNumbers.length) {
      const isFlipNumber = flipNumbers.find(
        (flipNumber) => flipNumber.phoneNumber === phoneNumber,
      );
      if (isFlipNumber) {
        return isFlipNumber.label || 'Other';
      }
    }

    const mainPhoneNumber = `${mainCompanyNumber?.phoneNumber}*${extensionNumber}`;
    if (phoneNumber === mainPhoneNumber) {
      return 'Main';
    }
    return 'Other';
  }

  @delegate('server')
  async _initFromNumber() {
    const fromNumber = this.fromNumber;
    if (
      !fromNumber ||
      (fromNumber === BLOCKED_ID_VALUE && this.isBlockedIdDisabled)
    ) {
      await this.updateFromNumber(this._getDefaultFromNumberByCallerId());
    }
  }

  private _getDefaultFromNumberByCallerId() {
    // CallerId must be ready because selectable caller ID can be disabled;
    // the API default still needs to drive the initial from number.
    const includeBlocked = !this.isBlockedIdDisabled;
    const fromNumbers = this.fromNumbers;
    const fallback = fromNumbers[0] ?? {};
    const callerIdByFeature = this._callerId.getDefaultCallerIdWithFeature({
      includeBlocked,
    });
    const callerId = callerIdByFeature?.callerId;
    const phoneInfo = callerId?.phoneInfo;
    const baseLogContext = {
      callerIdFeature: callerIdByFeature?.feature,
      callerId: this._getCallerIdLogData(callerId),
      includeBlocked,
      isBlockedIdDisabled: this.isBlockedIdDisabled,
      fromNumbersCount: fromNumbers.length,
    };

    if (callerId?.type === 'Blocked' && !this.isBlockedIdDisabled) {
      this.logger.info('default caller ID resolved to blocked', {
        ...baseLogContext,
        selectedFromNumber: { phoneNumber: BLOCKED_ID_VALUE },
      });
      return { phoneNumber: BLOCKED_ID_VALUE };
    }

    let matchedBy: 'uri' | 'id' | 'phoneNumber' | undefined;
    const defaultEntry = fromNumbers.find((item) => {
      if (phoneInfo?.uri && item.uri === phoneInfo.uri) {
        matchedBy = 'uri';
        return true;
      }
      if (phoneInfo?.id && `${item.id}` === phoneInfo.id) {
        matchedBy = 'id';
        return true;
      }
      if (
        phoneInfo?.phoneNumber &&
        item.phoneNumber === phoneInfo.phoneNumber
      ) {
        matchedBy = 'phoneNumber';
        return true;
      }
      return false;
    });

    if (!callerId) {
      this.logger.warn(
        'no configured default caller ID found; using first from number',
        {
          ...baseLogContext,
          callerIdByFeature: this._getCallerIdFeaturesLogData(),
          fallbackFromNumber: this._getFromNumberLogData(fallback),
        },
      );
      return fallback;
    }

    if (!defaultEntry) {
      this.logger.warn(
        'default caller ID not available in from number list; using first from number',
        {
          ...baseLogContext,
          availableFromNumbers: fromNumbers.map((item) =>
            this._getFromNumberLogData(item),
          ),
          fallbackFromNumber: this._getFromNumberLogData(fallback),
        },
      );
      return fallback;
    }

    this.logger.info('default caller ID matched from number', {
      ...baseLogContext,
      matchedBy,
      selectedFromNumber: this._getFromNumberLogData(defaultEntry),
    });

    return defaultEntry;
  }

  private _getCallerIdLogData(
    callerId?: ReturnType<CallerId['getDefaultCallerId']>,
  ) {
    return callerId
      ? {
          type: callerId.type,
          phoneInfo: {
            id: callerId.phoneInfo?.id,
            hasUri: !!callerId.phoneInfo?.uri,
            hasPhoneNumber: !!callerId.phoneInfo?.phoneNumber,
          },
        }
      : null;
  }

  private _getCallerIdFeaturesLogData() {
    return this._callerId.byFeature.map(({ feature, callerId }) => ({
      feature,
      callerId: this._getCallerIdLogData(callerId),
    }));
  }

  private _getFromNumberLogData(number?: {
    id?: string | number;
    uri?: string;
    usageType?: string;
    features?: string[];
    phoneNumber?: string;
  }) {
    return number
      ? {
          id: number.id,
          usageType: number.usageType,
          features: number.features,
          hasUri: !!number.uri,
          hasPhoneNumber: !!number.phoneNumber,
        }
      : null;
  }

  @delegate('server')
  async setData(
    { callWith, myLocation, ringoutPrompt }: SetCallingSettingsData,
    withPrompt: boolean,
  ) {
    this.setDataAction({
      callWith,
      myLocation,
      ringoutPrompt,
      timestamp: Date.now(),
    });

    if (withPrompt) {
      if (this.callWith === callingOptions.softphone) {
        if (process.env.THEME_SYSTEM !== 'spring-ui') {
          this._toast.success({
            message: t('saveSuccessWithSoftphone', {
              brand: this._brand.brandConfig.callWithSoftphone?.name as string,
            }),
          });
        }
      } else if (this.callWith === callingOptions.jupiter) {
        if (process.env.THEME_SYSTEM !== 'spring-ui') {
          this._toast.success({
            message: t('saveSuccessWithJupiter', {
              brand: this._brand.brandConfig.callWithJupiter?.name as string,
            }),
          });
        }
      } else {
        if (process.env.THEME_SYSTEM !== 'spring-ui') {
          this._toast.success({
            message: t('saveSuccess'),
          });
        }
        if (!this._emergencyCallAvailable) {
          this._warningEmergencyCallingNotAvailable();
        }
      }
    }

    if (this.isWebphoneMode) {
      this._verifyJPEmergency();
    }
  }

  @computed
  get myPhoneNumbers() {
    const { directNumbers, mainCompanyNumber } = this._extensionPhoneNumber;
    const { extensionNumber } = this._extensionInfo;
    const myPhoneNumbers = directNumbers.map((item) => item.phoneNumber!);
    if (mainCompanyNumber && extensionNumber) {
      myPhoneNumbers.push(
        `${mainCompanyNumber.phoneNumber}*${extensionNumber}`,
      );
    }
    return myPhoneNumbers;
  }

  @computed
  get otherPhoneNumbers() {
    const { flipNumbers } = this._forwardingNumber;
    const { callerIdNumbers, directNumbers } = this._extensionPhoneNumber;
    const filterMapping: { [k: string]: boolean } = {};
    callerIdNumbers.forEach((item) => {
      filterMapping[item.phoneNumber!] = true;
    });
    directNumbers.forEach((item) => {
      filterMapping[item.phoneNumber!] = true;
    });
    return flipNumbers
      .filter((item) => !filterMapping[item.phoneNumber!])
      .sort((a, b) => (a.label === 'Mobile' && a.label !== b.label ? -1 : 1))
      .map((item) => item.phoneNumber!);
  }

  @computed
  get callWithOptions() {
    const { isRingOutEnabled, isWebPhoneEnabled } = this._appFeatures;
    const hasExtensionPhoneNumber =
      this._extensionPhoneNumber.numbers.length > 0;
    if (!hasExtensionPhoneNumber && this._appFeatures.isSoftphoneEnabled) {
      return [callingOptions.softphone];
    }
    if (!hasExtensionPhoneNumber && !this._appFeatures.isSoftphoneEnabled) {
      return [];
    }
    const callWithOptions = [];
    if (this._webphone && isWebPhoneEnabled) {
      callWithOptions.push(callingOptions.browser);
    }
    if (
      this._brand &&
      this._showCallWithJupiter &&
      this._appFeatures.isRingCentralAppEnabled
    ) {
      callWithOptions.push(callingOptions.jupiter);
    }

    if (this._appFeatures.isSoftphoneEnabled) {
      callWithOptions.push(callingOptions.softphone);
    }
    if (isRingOutEnabled && this._appFeatures.isRingOutEnabled) {
      callWithOptions.push(callingOptions.ringout);
    }

    return callWithOptions;
  }

  @computed
  get fromNumbers() {
    const { callerIdNumbers } = this._extensionPhoneNumber;
    const sortedPhoneNumbers = callerIdNumbers.sort((firstItem, lastItem) => {
      if (firstItem.usageType === 'DirectNumber') return -1;
      if (lastItem.usageType === 'DirectNumber') return 1;
      if (firstItem.usageType === 'MainCompanyNumber') return -1;
      if (lastItem.usageType === 'MainCompanyNumber') return 1;
      if (firstItem.usageType! < lastItem.usageType!) return -1;
      if (firstItem.usageType! > lastItem.usageType!) return 1;
      return 0;
    });
    return sortedPhoneNumbers;
  }

  @computed
  get availableNumbers() {
    return this.myPhoneNumbers.concat(this.otherPhoneNumbers);
  }

  @computed
  get availableNumbersWithLabel() {
    const { availableNumbers } = this;
    const result: { label: string; value: string }[] = [];
    if (availableNumbers.length) {
      availableNumbers.forEach((phoneNumber) => {
        const locationLabel = this._getLocationLabel(phoneNumber);
        result.push({
          label: locationLabel,
          value: phoneNumber,
        });
      });
    }
    result.sort(
      (a, b) =>
        LOCATION_NUMBER_ORDER.indexOf(a.label) -
        LOCATION_NUMBER_ORDER.indexOf(b.label),
    );
    return result;
  }

  get callingMode() {
    return mapOptionToMode(this.callWith!);
  }

  get defaultRingoutPrompt() {
    return this.initRingoutPrompt;
  }

  get isWebphoneMode() {
    return this.callingMode === callingModes.webphone;
  }

  get isChangeRingToneAllowed() {
    return this._webphone && this._storage.driver === DriverType.IndexedDB;
  }

  get jupiterAppName() {
    return this._softphone?.jupiterAppName;
  }

  /* India go */
  get isBlockedIdDisabled() {
    return (
      this._extensionFeatures.features?.BlockingCallerId?.available === false
    );
  }
}
export { CallingSettings };
