import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';

import { getExtensionPhoneNumberLabel } from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type { Deps } from './CallingSettings.interface';
import { callingModes } from './callingModes';
import type { CallingOptionsType } from './callingOptions';
import { callingOptions } from './callingOptions';
import { callingSettingsMessages } from './callingSettingsMessages';
import { deprecatedCallingOptions } from './deprecatedCallingOptions';
import { mapOptionToMode } from './mapOptionToMode';

const LOCATION_NUMBER_ORDER = ['Other', 'Main'];
export const BLOCKED_ID_VALUE = 'anonymous';
/**
 * @class
 * @description Call setting managing module
 */
@Module({
  name: 'CallingSettings',
  deps: [
    'Alert',
    'Brand',
    'Storage',
    'ExtensionInfo',
    'ExtensionDevice',
    'ForwardingNumber',
    'AppFeatures',
    'ExtensionFeatures',
    'ExtensionPhoneNumber',
    { dep: 'CallerId', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'Softphone', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'CallingSettingsOptions', optional: true },
  ],
})
class CallingSettings extends RcModuleV2<Deps> {
  private _myPhoneNumbers?: string[];
  private _onFirstLogin?: () => {};
  private _ringoutEnabled?: boolean;
  private _otherPhoneNumbers?: string[];
  private _webphoneEnabled?: boolean;
  private _blockedIdDisabled?: boolean;
  private _showCallWithJupiter: boolean;
  private _emergencyCallAvailable: boolean;
  private _showCustomPhoneLabel: boolean;
  private _availableNumbers?: string[];
  private initRingoutPrompt?: boolean;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'CallingSettings',
    });
    this._onFirstLogin = this._deps.callingSettingsOptions?.onFirstLogin;
    this.initRingoutPrompt =
      this._deps.callingSettingsOptions?.defaultRingoutPrompt;
    this._showCallWithJupiter =
      this._deps.callingSettingsOptions?.showCallWithJupiter ?? true;
    this._emergencyCallAvailable =
      this._deps.callingSettingsOptions?.emergencyCallAvailable ??
      !!this._deps.webphone;
    this._showCustomPhoneLabel =
      this._deps.callingSettingsOptions?.showCustomPhoneLabel ?? false;
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

  // For Japan Emergency Service notification
  @storage
  @state
  acknowledgeJPMessage = false;

  @storage
  @state
  data: {
    callWith: string | null;
    ringoutPrompt: boolean;
    myLocation: string;
    fromNumber: string | null | undefined;
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
    isCustomLocation = this.isCustomLocation,
  }: {
    callWith?: CallingOptionsType | null;
    ringoutPrompt?: boolean;
    myLocation?: string;
    timestamp?: number | null;
    isCustomLocation?: boolean;
  }) {
    this.data.callWith = callWith;
    this.data.ringoutPrompt = ringoutPrompt;
    this.data.myLocation = myLocation;
    this.data.timestamp = timestamp;
    this.data.isCustomLocation = isCustomLocation;
  }

  @action
  private _updateFromNumber(number: { phoneNumber?: string }) {
    // TODO: should confirm is that should be undefined
    this.data.fromNumber = number?.phoneNumber;
  }

  @proxify
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

  override async onStateChange() {
    if (!this._shouldReset() && !this._shouldInit() && this._shouldValidate()) {
      this._ringoutEnabled = this._deps.appFeatures.isRingOutEnabled;
      this._webphoneEnabled = this._deps.appFeatures.isWebPhoneEnabled;
      this._myPhoneNumbers = this.myPhoneNumbers;
      this._otherPhoneNumbers = this.otherPhoneNumbers;
      this._blockedIdDisabled = this.isBlockedIdDisabled;
      await this._validateSettings();
    }
  }

  override async onInitSuccess() {
    if (this.isWebphoneMode) {
      this._verifyJPEmergency();
    }
  }

  _shouldValidate() {
    return (
      this.ready &&
      (this._ringoutEnabled !== this._deps.appFeatures.isRingOutEnabled ||
        this._webphoneEnabled !== this._deps.appFeatures.isWebPhoneEnabled ||
        this._myPhoneNumbers !== this.myPhoneNumbers ||
        this._otherPhoneNumbers !== this.otherPhoneNumbers ||
        this._blockedIdDisabled !== this.isBlockedIdDisabled)
    );
  }

  override async onInit() {
    await this._init();
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
    if (!this._deps.appFeatures.isCallingEnabled) {
      this.setDataAction({ callWith: null, timestamp: null });
      return;
    }

    this._myPhoneNumbers = this.myPhoneNumbers;
    this._otherPhoneNumbers = this.otherPhoneNumbers;
    this._availableNumbers = this.availableNumbers;
    this._ringoutEnabled = this._deps.appFeatures.isRingOutEnabled;
    this._webphoneEnabled = this._deps.appFeatures.isWebPhoneEnabled;
    this._blockedIdDisabled = this.isBlockedIdDisabled;

    this._handleFirstTimeLogin();

    if (
      this.callWith === deprecatedCallingOptions.myphone ||
      this.callWith === deprecatedCallingOptions.otherphone ||
      this.callWith === deprecatedCallingOptions.customphone
    ) {
      this.setDataAction({
        callWith: callingOptions.ringout,
        isCustomLocation:
          this.callWith === deprecatedCallingOptions.customphone,
      });
    }
    await this._validateSettings();
    await this._initFromNumber();
  }

  @proxify
  async _warningEmergencyCallingNotAvailable() {
    if (this.callWith === callingOptions.browser) {
      this._deps.alert.warning({
        message: callingSettingsMessages.emergencyCallingNotAvailable,
        ttl: 0,
      });
    }
  }

  @proxify
  async _validateSettings() {
    if (this._hasWebphonePermissionRemoved()) {
      if (this._deps.appFeatures.isSoftphoneEnabled) {
        await this._setSoftPhoneToCallWith();
      }
      this._deps.alert.danger({
        message: callingSettingsMessages.webphonePermissionRemoved,
        ttl: 0,
      });
    } else if (this._hasPermissionChanged()) {
      if (this._deps.appFeatures.isSoftphoneEnabled) {
        await this._setSoftPhoneToCallWith();
      }
      this._deps.alert.danger({
        message: callingSettingsMessages.permissionChanged,
        ttl: 0,
      });
    } else if (this._hasPhoneNumberChanged()) {
      this.setDataAction({
        callWith: callingOptions.ringout,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        myLocation: this._myPhoneNumbers[0],
        timestamp: Date.now(),
      });
      this._deps.alert.danger({
        message: callingSettingsMessages.phoneNumberChanged,
        ttl: 0,
      });
    }

    if (this.isBlockedIdDisabled && this.fromNumber === BLOCKED_ID_VALUE) {
      this._initFromNumber();
    }
  }

  @proxify
  async _verifyJPEmergency() {
    if (this.acknowledgeJPMessage) return;

    const hasJapanNumber = !!this.fromNumbers.find(
      (record) => record?.country?.id === '112',
    );
    if (hasJapanNumber) {
      this._deps.alert.warning({
        message: callingSettingsMessages.disableEmergencyInJapan,
        ttl: 0,
      });
      this.setAcknowledgeJPMessage(true);
    }
  }

  @proxify
  async _setSoftPhoneToCallWith() {
    this.setDataAction({
      callWith: callingOptions.softphone,
      timestamp: Date.now(),
    });
  }

  _hasWebphonePermissionRemoved() {
    return (
      !(this._webphoneEnabled && this._deps.webphone) &&
      this.callWith === callingOptions.browser
    );
  }

  _hasPermissionChanged() {
    return !this._ringoutEnabled && this.callWith === callingOptions.ringout;
  }

  _hasPhoneNumberChanged() {
    return (
      this.callWith === callingOptions.ringout &&
      !this.isCustomLocation &&
      this._availableNumbers!.indexOf(this.myLocation) === -1
    );
  }

  _getLocationLabel(phoneNumber: string) {
    const { devices } = this._deps.extensionDevice;
    const { flipNumbers } = this._deps.forwardingNumber;
    const { mainCompanyNumber, numbers } = this._deps.extensionPhoneNumber;
    const { extensionNumber } = this._deps.extensionInfo;
    let name = null;
    if (this._showCustomPhoneLabel && numbers.length) {
      const label = getExtensionPhoneNumberLabel(phoneNumber, numbers);
      if (label) {
        return label;
      }
    }
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

  @proxify
  async _initFromNumber() {
    const fromNumber = this.fromNumber;
    if (
      !fromNumber ||
      (fromNumber === BLOCKED_ID_VALUE && this.isBlockedIdDisabled)
    ) {
      let defaultCallerId = this.fromNumbers[0];
      if (this._deps.callerId?.ringOut) {
        if (
          this._deps.callerId.ringOut.type === 'Blocked' &&
          !this.isBlockedIdDisabled
        ) {
          defaultCallerId = { phoneNumber: BLOCKED_ID_VALUE };
        } else if (this._deps.callerId.ringOut.type === 'PhoneNumber') {
          const defaultPhoneNumber =
            this._deps.callerId?.ringOut.phoneInfo?.phoneNumber;
          const defaultEntry = this.fromNumbers.find(
            (item) => item.phoneNumber === defaultPhoneNumber,
          );
          if (defaultEntry) {
            defaultCallerId = defaultEntry;
          }
        }
      }
      await this.updateFromNumber(defaultCallerId);
    }
  }

  @proxify
  async setData(
    {
      callWith,
      myLocation,
      ringoutPrompt,
      isCustomLocation,
    }: {
      callWith: CallingOptionsType;
      myLocation: string;
      ringoutPrompt: boolean;
      isCustomLocation: boolean;
    },
    withPrompt: boolean,
  ) {
    this.setDataAction({
      callWith,
      myLocation,
      ringoutPrompt,
      timestamp: Date.now(),
      isCustomLocation,
    });
    if (withPrompt) {
      if (this.callWith === callingOptions.softphone) {
        this._deps.alert.success({
          message: callingSettingsMessages.saveSuccessWithSoftphone,
        });
      } else if (this.callWith === callingOptions.jupiter) {
        this._deps.alert.success({
          message: callingSettingsMessages.saveSuccessWithJupiter,
        });
      } else {
        this._deps.alert.success({
          message: callingSettingsMessages.saveSuccess,
        });
        if (!this._emergencyCallAvailable) {
          this._warningEmergencyCallingNotAvailable();
        }
      }
    }

    if (this.isWebphoneMode) {
      this._verifyJPEmergency();
    }
  }

  @computed((that: CallingSettings) => [
    that._deps.extensionPhoneNumber.directNumbers,
    that._deps.extensionPhoneNumber.mainCompanyNumber,
    that._deps.extensionInfo.extensionNumber,
  ])
  get myPhoneNumbers() {
    const { directNumbers, mainCompanyNumber } =
      this._deps.extensionPhoneNumber;
    const { extensionNumber } = this._deps.extensionInfo;
    const myPhoneNumbers = directNumbers.map((item) => item.phoneNumber!);
    if (mainCompanyNumber && extensionNumber) {
      myPhoneNumbers.push(
        `${mainCompanyNumber.phoneNumber}*${extensionNumber}`,
      );
    }
    return myPhoneNumbers;
  }

  @computed((that: CallingSettings) => [
    that._deps.forwardingNumber.flipNumbers,
    that._deps.extensionPhoneNumber.callerIdNumbers,
    that._deps.extensionPhoneNumber.directNumbers,
  ])
  get otherPhoneNumbers() {
    const { flipNumbers } = this._deps.forwardingNumber;
    const { callerIdNumbers, directNumbers } = this._deps.extensionPhoneNumber;
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

  @computed((that: CallingSettings) => [
    that._deps.appFeatures.isRingOutEnabled,
    that._deps.appFeatures.isWebPhoneEnabled,
    that._deps.appFeatures.isSoftphoneEnabled,
    that.otherPhoneNumbers.length,
    that._deps.extensionPhoneNumber.numbers.length,
  ])
  get callWithOptions() {
    const { isRingOutEnabled, isWebPhoneEnabled } = this._deps.appFeatures;
    const hasExtensionPhoneNumber =
      this._deps.extensionPhoneNumber.numbers.length > 0;
    if (!hasExtensionPhoneNumber && this._deps.appFeatures.isSoftphoneEnabled) {
      return [callingOptions.softphone];
    }
    if (
      !hasExtensionPhoneNumber &&
      !this._deps.appFeatures.isSoftphoneEnabled
    ) {
      return [];
    }
    const callWithOptions = [];
    if (this._deps.webphone && isWebPhoneEnabled) {
      callWithOptions.push(callingOptions.browser);
    }
    if (
      this._deps.brand &&
      this._showCallWithJupiter &&
      this._deps.appFeatures.isRingCentralAppEnabled
    ) {
      callWithOptions.push(callingOptions.jupiter);
    }

    if (this._deps.appFeatures.isSoftphoneEnabled) {
      callWithOptions.push(callingOptions.softphone);
    }
    if (isRingOutEnabled && this._deps.appFeatures.isRingOutEnabled) {
      callWithOptions.push(callingOptions.ringout);
    }
    return callWithOptions;
  }

  @computed((that: CallingSettings) => [
    that._deps.extensionPhoneNumber.callerIdNumbers,
  ])
  get fromNumbers() {
    const { callerIdNumbers } = this._deps.extensionPhoneNumber;
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

  @computed((that: CallingSettings) => [
    that.myPhoneNumbers,
    that.otherPhoneNumbers,
  ])
  get availableNumbers() {
    return this.myPhoneNumbers.concat(this.otherPhoneNumbers);
  }

  @computed((that: CallingSettings) => [that.availableNumbers])
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

  /* ringtone */
  get isChangeRingToneAllowed() {
    return (
      this._deps.webphone &&
      (this._deps.storage.driver === 'INDEXEDDB' ||
        this._deps.storage.driver === 'WEBSQL')
    );
  }

  get jupiterAppName() {
    return this._deps.softphone?.jupiterAppName;
  }

  /* India go */
  get isBlockedIdDisabled() {
    return (
      this._deps.extensionFeatures.features?.BlockingCallerId?.available ===
      false
    );
  }
}
export { CallingSettings };
