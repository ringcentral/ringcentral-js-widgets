import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { callingModes } from './callingModes';
import { callingOptions, CallingOptionsType } from './callingOptions';
import { Deps } from './CallingSettings.interface';
import { callingSettingsMessages } from './callingSettingsMessages';
import { deprecatedCallingOptions } from './deprecatedCallingOptions';
import { mapOptionToMode } from './mapOptionToMode';

const LOCATION_NUMBER_ORDER = ['Other', 'Main'];
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
    'ExtensionFeatures',
    'ExtensionPhoneNumber',
    { dep: 'CallerId', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'CallingSettingsOptions', optional: true },
  ],
})
class CallingSettings extends RcModuleV2<Deps> {
  _myPhoneNumbers: string[];
  _onFirstLogin?: () => {};
  _ringoutEnabled: boolean;
  _otherPhoneNumbers: string[];
  _webphoneEnabled: boolean;
  initRingoutPrompt?: boolean;
  _showCallWithJupiter?: boolean;
  _emergencyCallAvailable?: boolean;
  _availableNumbers: string[];
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'CallingSettings',
    });
    this._onFirstLogin = this._deps.callingSettingsOptions?.onFirstLogin;
    this.initRingoutPrompt = this._deps.callingSettingsOptions?.defaultRingoutPrompt;
    this._showCallWithJupiter =
      this._deps.callingSettingsOptions?.showCallWithJupiter ?? true;
    this._emergencyCallAvailable =
      this._deps.callingSettingsOptions?.emergencyCallAvailable ?? false;
    /* migration storage v1 to v2 */
    if (this._deps.storage) {
      this._deps.storage.migrationMapping =
        this._deps.storage.migrationMapping ?? {};
      this._deps.storage.migrationMapping['CallingSettings-data'] =
        'callingSettingsData';
    }
    /* migration storage v1 to v2 */
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

  @storage
  @state
  data: {
    callWith: string;
    ringoutPrompt: boolean;
    myLocation: string;
    fromNumber: string;
    timestamp: number;
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
    callWith?: CallingOptionsType;
    ringoutPrompt?: boolean;
    myLocation?: string;
    timestamp?: number;
    isCustomLocation?: boolean;
  }) {
    this.data.callWith = callWith;
    this.data.ringoutPrompt = ringoutPrompt;
    this.data.myLocation = myLocation;
    this.data.timestamp = timestamp;
    this.data.isCustomLocation = isCustomLocation;
  }

  @action
  _updateFromNumber(number: { phoneNumber?: string }) {
    this.data.fromNumber = number && number?.phoneNumber;
  }

  @proxify
  async updateFromNumber(number: { phoneNumber?: string }) {
    this._updateFromNumber(number);
  }

  @action
  resetSuccess() {
    this.data.fromNumber = null;
  }

  async onStateChange() {
    if (!this._shouldReset() && !this._shouldInit() && this._shouldValidate()) {
      this._ringoutEnabled = this._deps.extensionFeatures.isRingOutEnabled;
      this._webphoneEnabled = this._deps.extensionFeatures.isWebPhoneEnabled;
      this._myPhoneNumbers = this.myPhoneNumbers;
      this._otherPhoneNumbers = this.otherPhoneNumbers;
      await this._validateSettings();
    }
  }

  _shouldValidate() {
    return (
      this.ready &&
      (this._ringoutEnabled !== this._deps.extensionFeatures.isRingOutEnabled ||
        this._webphoneEnabled !==
          this._deps.extensionFeatures.isWebPhoneEnabled ||
        this._myPhoneNumbers !== this.myPhoneNumbers ||
        this._otherPhoneNumbers !== this.otherPhoneNumbers)
    );
  }

  async onInit() {
    await this._init();
  }

  onReset() {
    this.resetSuccess();
  }

  async _init() {
    if (!this._deps.extensionFeatures.isCallingEnabled) return;

    this._myPhoneNumbers = this.myPhoneNumbers;
    this._otherPhoneNumbers = this.otherPhoneNumbers;
    this._availableNumbers = this.availableNumbers;
    this._ringoutEnabled = this._deps.extensionFeatures.isRingOutEnabled;
    this._webphoneEnabled = this._deps.extensionFeatures.isWebPhoneEnabled;
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
      this._deps.alert.info({
        message: callingSettingsMessages.emergencyCallingNotAvailable,
        ttl: 0,
      });
    }
  }

  @proxify
  async _validateSettings() {
    if (this._hasWebphonePermissionRemoved()) {
      await this._setSoftPhoneToCallWith();
      this._deps.alert.danger({
        message: callingSettingsMessages.webphonePermissionRemoved,
        ttl: 0,
      });
    } else if (this._hasPermissionChanged()) {
      await this._setSoftPhoneToCallWith();
      this._deps.alert.danger({
        message: callingSettingsMessages.permissionChanged,
        ttl: 0,
      });
    } else if (this._hasPhoneNumberChanged()) {
      this.setDataAction({
        callWith: callingOptions.ringout,
        myLocation: this._myPhoneNumbers[0],
        timestamp: Date.now(),
      });
      this._deps.alert.danger({
        message: callingSettingsMessages.phoneNumberChanged,
        ttl: 0,
      });
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
      this._availableNumbers.indexOf(this.myLocation) === -1
    );
  }

  _getLocationLabel(phoneNumber: string) {
    const { devices } = this._deps.extensionDevice;
    const { flipNumbers } = this._deps.forwardingNumber;
    const { mainCompanyNumber } = this._deps.extensionPhoneNumber;
    const { extensionNumber } = this._deps.extensionInfo;
    const mainPhoneNumber = `${mainCompanyNumber.phoneNumber}*${extensionNumber}`;
    let name = null;
    if (devices.length) {
      let registeredWithDevice = false;
      devices.forEach((device) => {
        const { phoneLines } = device;
        if (phoneLines.length) {
          registeredWithDevice = !!phoneLines.find((phoneLine) => {
            return phoneLine.phoneInfo.phoneNumber === phoneNumber;
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

    if (phoneNumber === mainPhoneNumber) {
      return 'Main';
    }
    return 'Other';
  }

  @proxify
  async _initFromNumber() {
    const fromNumber = this.fromNumber;
    if (!fromNumber) {
      let defaultCallerId = this.fromNumbers[0];
      if (this._deps.callerId?.ringOut) {
        if (this._deps.callerId.ringOut.type === 'Blocked') {
          defaultCallerId = { phoneNumber: 'anonymous' };
        } else if (this._deps.callerId.ringOut.type === 'PhoneNumber') {
          const defaultPhoneNumber = this._deps.callerId?.ringOut.phoneInfo
            ?.phoneNumber;
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
    // TODO validate myLocation
    this.setDataAction({
      callWith,
      myLocation,
      ringoutPrompt,
      timestamp: Date.now(),
      isCustomLocation,
    });
    if (withPrompt) {
      if (this.callWith === callingOptions.softphone) {
        this._deps.alert.info({
          message: callingSettingsMessages.saveSuccessWithSoftphone,
        });
      } else if (this.callWith === callingOptions.jupiter) {
        this._deps.alert.info({
          message: callingSettingsMessages.saveSuccessWithJupiter,
        });
      } else {
        this._deps.alert.info({
          message: callingSettingsMessages.saveSuccess,
        });
        if (!this._emergencyCallAvailable) {
          this._warningEmergencyCallingNotAvailable();
        }
      }
    }
  }

  @computed((that: CallingSettings) => [
    that._deps.extensionPhoneNumber.directNumbers,
    that._deps.extensionPhoneNumber.mainCompanyNumber,
    that._deps.extensionInfo.extensionNumber,
  ])
  get myPhoneNumbers() {
    const {
      directNumbers,
      mainCompanyNumber,
    } = this._deps.extensionPhoneNumber;
    const { extensionNumber } = this._deps.extensionInfo;
    const myPhoneNumbers = directNumbers.map((item) => item.phoneNumber);
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
      filterMapping[item.phoneNumber] = true;
    });
    directNumbers.forEach((item) => {
      filterMapping[item.phoneNumber] = true;
    });
    return flipNumbers
      .filter((item) => !filterMapping[item.phoneNumber])
      .sort((a, b) => (a.label === 'Mobile' && a.label !== b.label ? -1 : 1))
      .map((item) => item.phoneNumber);
  }

  @computed((that: CallingSettings) => [
    that._deps.extensionFeatures.isRingOutEnabled,
    that._deps.extensionFeatures.isWebPhoneEnabled,
    that.otherPhoneNumbers.length,
    that._deps.extensionPhoneNumber.numbers.length,
  ])
  get callWithOptions() {
    const {
      isRingOutEnabled,
      isWebPhoneEnabled,
    } = this._deps.extensionFeatures;
    const hasExtensionPhoneNumber =
      this._deps.extensionPhoneNumber.numbers.length > 0;
    if (!hasExtensionPhoneNumber) {
      return [callingOptions.softphone];
    }
    const callWithOptions = [];
    if (this._deps.webphone && isWebPhoneEnabled) {
      callWithOptions.push(callingOptions.browser);
    }
    // rc&att brand support call with RingCentral App
    const brandReg = /rc|att/;
    if (
      this._deps.brand &&
      (brandReg.test(this._deps.brand.code) ||
        (this._deps.brand.brandConfig &&
          brandReg.test(this._deps.brand.brandConfig.brandCode))) &&
      this._showCallWithJupiter
    ) {
      callWithOptions.push(callingOptions.jupiter);
    }

    callWithOptions.push(callingOptions.softphone);
    if (isRingOutEnabled) {
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
      if (firstItem.usageType < lastItem.usageType) return -1;
      if (firstItem.usageType > lastItem.usageType) return 1;
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
    return mapOptionToMode(this.callWith);
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
}
export { CallingSettings };
