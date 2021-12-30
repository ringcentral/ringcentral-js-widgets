import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { selector } from '../../lib/selector';
import { actionTypes } from './actionTypes';
import callingModes from './callingModes';
import callingOptions from './callingOptions';
import { callingSettingsMessages } from './callingSettingsMessages';
import deprecatedCallingOptions from './deprecatedCallingOptions';
import {
  getCallingSettingsReducer,
  getCallingSettingsStorageReducer,
} from './getCallingSettingsReducer';
import mapOptionToMode from './mapOptionToMode';

const LOCATION_NUMBER_ORDER = ['Other', 'Main'];
const BLOCKED_ID_VALUE = 'anonymous';
/**
 * @class
 * @description Call setting managing module
 */
@Module({
  deps: [
    'Alert',
    'Brand',
    'ExtensionInfo',
    'ExtensionPhoneNumber',
    'ForwardingNumber',
    'Storage',
    'AppFeatures',
    'ExtensionDevice',
    'ExtensionFeatures',
    { dep: 'CallerId', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'CallingSettingsOptions', optional: true },
  ],
})
export default class CallingSettings extends RcModule {
  constructor({
    alert,
    brand,
    extensionInfo,
    extensionPhoneNumber,
    forwardingNumber,
    storage,
    appFeatures,
    tabManager,
    onFirstLogin,
    webphone,
    callerId,
    extensionFeatures,
    emergencyCallAvailable = false,
    defaultRingoutPrompt,
    showCallWithJupiter = true,
    extensionDevice,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._alert = alert;
    this._brand = brand;
    this._extensionInfo = extensionInfo;
    this._extensionPhoneNumber = extensionPhoneNumber;
    this._forwardingNumber = forwardingNumber;
    this._storage = storage;
    this._appFeatures = appFeatures;
    this._tabManager = tabManager;
    this._webphone = webphone;
    this._callerId = callerId;
    this._storageKey = 'callingSettingsData';
    this._emergencyCallAvailable = emergencyCallAvailable;
    this._extensionDevice = extensionDevice;
    this._onFirstLogin = onFirstLogin;
    this._extensionFeatures = extensionFeatures;
    this.initRingoutPrompt = defaultRingoutPrompt;

    this._storage.registerReducer({
      key: this._storageKey,
      reducer: getCallingSettingsStorageReducer(this.actionTypes),
    });

    this._reducer = getCallingSettingsReducer(this.actionTypes);
    this._showCallWithJupiter = showCallWithJupiter;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      await this._init();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._reset();
    } else if (this._shouldValidate()) {
      this._ringoutEnabled = this._appFeatures.isRingOutEnabled;
      this._webphoneEnabled = this._appFeatures.isWebPhoneEnabled;
      this._myPhoneNumbers = this.myPhoneNumbers;
      this._otherPhoneNumbers = this.otherPhoneNumbers;
      this._blockedIdDisabled = this.isBlockedIdDisabled;
      await this._validateSettings();
    }
  }

  _shouldInit() {
    return (
      this._storage.ready &&
      this._extensionInfo.ready &&
      this._extensionPhoneNumber.ready &&
      this._forwardingNumber.ready &&
      (!this._callerId || this._callerId.ready) &&
      this._appFeatures.ready &&
      this._extensionDevice.ready &&
      this.pending
    );
  }

  _shouldReset() {
    return !!(
      this.ready &&
      (!this._storage.ready ||
        !this._extensionInfo.ready ||
        !this._extensionPhoneNumber.ready ||
        !this._forwardingNumber.ready ||
        !this._appFeatures.ready ||
        (this._callerId && !this._callerId.ready) ||
        !this._extensionDevice.ready)
    );
  }

  _shouldValidate() {
    return (
      this.ready &&
      (this._ringoutEnabled !== this._appFeatures.isRingOutEnabled ||
        this._webphoneEnabled !== this._appFeatures.isWebPhoneEnabled ||
        this._myPhoneNumbers !== this.myPhoneNumbers ||
        this._otherPhoneNumbers !== this.otherPhoneNumbers ||
        this._blockedIdDisabled !== this.isBlockedIdDisabled)
    );
  }

  async _init() {
    if (!this._appFeatures.isCallingEnabled) return;
    this._myPhoneNumbers = this.myPhoneNumbers;
    this._otherPhoneNumbers = this.otherPhoneNumbers;
    this._availableNumbers = this.availableNumbers;
    this._ringoutEnabled = this._appFeatures.isRingOutEnabled;
    this._webphoneEnabled = this._appFeatures.isWebPhoneEnabled;
    this._blockedIdDisabled = this.isBlockedIdDisabled;
    if (!this.timestamp) {
      // first time login
      const defaultCallWith = this.callWithOptions && this.callWithOptions[0];
      this.store.dispatch({
        type: this.actionTypes.setData,
        callWith: defaultCallWith,
        timestamp: Date.now(),
      });
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
      this.store.dispatch({
        type: this.actionTypes.setData,
        callWith: callingOptions.ringout,
        isCustomLocation:
          this.callWith === deprecatedCallingOptions.customphone,
      });
    }
    await this._validateSettings();
    await this._initFromNumber();
  }

  _reset() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async _initFromNumber() {
    const fromNumber = this.fromNumber;
    if (
      !fromNumber ||
      (fromNumber === BLOCKED_ID_VALUE && this.isBlockedIdDisabled)
    ) {
      let defaultCallerId = this.fromNumbers[0];
      if (this._callerId?.ringOut) {
        if (
          this._callerId.ringOut.type === 'Blocked' &&
          !this.isBlockedIdDisabled
        ) {
          defaultCallerId = { phoneNumber: BLOCKED_ID_VALUE };
        } else if (this._callerId.ringOut.type === 'PhoneNumber') {
          const defaultPhoneNumber =
            this._callerId?.ringOut.phoneInfo?.phoneNumber;
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
  async updateFromNumber(number) {
    this.store.dispatch({
      type: this.actionTypes.updateFromNumber,
      number: number && number.phoneNumber,
    });
  }

  @proxify
  async _setSoftPhoneToCallWith() {
    this.store.dispatch({
      type: this.actionTypes.setData,
      callWith: callingOptions.softphone,
      timestamp: Date.now(),
    });
  }

  @proxify
  async _validateSettings() {
    if (this._hasWebphonePermissionRemoved()) {
      await this._setSoftPhoneToCallWith();
      this._alert.danger({
        message: callingSettingsMessages.webphonePermissionRemoved,
        ttl: 0,
      });
    } else if (this._hasPermissionChanged()) {
      await this._setSoftPhoneToCallWith();
      this._alert.danger({
        message: callingSettingsMessages.permissionChanged,
        ttl: 0,
      });
    } else if (this._hasPhoneNumberChanged()) {
      this.store.dispatch({
        type: this.actionTypes.setData,
        callWith: callingOptions.ringout,
        myLocation: this._myPhoneNumbers[0],
        timestamp: Date.now(),
      });
      this._alert.danger({
        message: callingSettingsMessages.phoneNumberChanged,
        ttl: 0,
      });
    }

    if (this.isBlockedIdDisabled && this.fromNumber === BLOCKED_ID_VALUE) {
      this._initFromNumber();
    }
  }

  _hasWebphonePermissionRemoved() {
    return (
      !(this._webphoneEnabled && this._webphone) &&
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

  _getLocationLabel(phoneNumber) {
    const { devices } = this._extensionDevice;
    const { flipNumbers } = this._forwardingNumber;
    const { mainCompanyNumber } = this._extensionPhoneNumber;
    const { extensionNumber } = this._extensionInfo;
    const mainPhoneNumber = `${mainCompanyNumber.phoneNumber}*${extensionNumber}`;
    let name = null;
    if (devices.length) {
      let registedWithDevice = false;
      devices.forEach((device) => {
        const { phoneLines } = device;
        if (phoneLines.length) {
          registedWithDevice = phoneLines.find((phoneLine) => {
            return phoneLine.phoneInfo.phoneNumber === phoneNumber;
          });
          if (registedWithDevice) {
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
  async _warningEmergencyCallingNotAvailable() {
    if (this.callWith === callingOptions.browser) {
      this._alert.info({
        message: callingSettingsMessages.emergencyCallingNotAvailable,
        ttl: 0,
      });
    }
  }

  get data() {
    return this._storage.getItem(this._storageKey);
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  get callWith() {
    return this.data.callWith;
  }

  get callingMode() {
    return mapOptionToMode(this.callWith);
  }

  get ringoutPrompt() {
    return this.data.ringoutPrompt;
  }

  get defaultRingoutPrompt() {
    return this.initRingoutPrompt;
  }

  get myLocation() {
    return this.data.myLocation;
  }

  get isCustomLocation() {
    return this.data.isCustomLocation;
  }

  get timestamp() {
    return this.data.timestamp;
  }

  get isWebphoneMode() {
    return this.callingMode === callingModes.webphone;
  }

  @selector
  callWithOptions = [
    () => this._appFeatures.isRingOutEnabled,
    () => this._appFeatures.isWebPhoneEnabled,
    () => this.otherPhoneNumbers.length > 0,
    () => this._extensionPhoneNumber.numbers.length > 0,
    (
      ringoutEnabled,
      webphoneEnabled,
      hasOtherPhone,
      hasExtensionPhoneNumber,
    ) => {
      if (!hasExtensionPhoneNumber) {
        return [callingOptions.softphone];
      }
      const callWithOptions = [];
      if (this._webphone && webphoneEnabled) {
        callWithOptions.push(callingOptions.browser);
      }
      if (this._brand && this._showCallWithJupiter) {
        callWithOptions.push(callingOptions.jupiter);
      }

      callWithOptions.push(callingOptions.softphone);
      if (ringoutEnabled) {
        callWithOptions.push(callingOptions.ringout);
      }
      return callWithOptions;
    },
  ];

  @selector
  myPhoneNumbers = [
    () => this._extensionPhoneNumber.directNumbers,
    () => this._extensionPhoneNumber.mainCompanyNumber,
    () => this._extensionInfo.extensionNumber,
    (directNumbers, mainCompanyNumber, extensionNumber) => {
      const myPhoneNumbers = directNumbers.map((item) => item.phoneNumber);
      if (mainCompanyNumber && extensionNumber) {
        myPhoneNumbers.push(
          `${mainCompanyNumber.phoneNumber}*${extensionNumber}`,
        );
      }
      return myPhoneNumbers;
    },
  ];

  @selector
  otherPhoneNumbers = [
    () => this._forwardingNumber.flipNumbers,
    () => this._extensionPhoneNumber.callerIdNumbers,
    () => this._extensionPhoneNumber.directNumbers,
    (flipNumbers, callerIdNumbers, directNumbers) => {
      const filterMapping = {};
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
    },
  ];

  @selector
  availableNumbers = [
    () => this.myPhoneNumbers,
    () => this.otherPhoneNumbers,
    (myPhoneNumbers, otherPhoneNumbers) => {
      const phoneNumbers = myPhoneNumbers.concat(otherPhoneNumbers);
      return phoneNumbers;
    },
  ];

  @selector
  availableNumbersWithLabel = [
    () => this.availableNumbers,
    (availableNumbers) => {
      const result = [];
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
    },
  ];

  get fromNumber() {
    return this.data.fromNumber;
  }

  @selector
  fromNumbers = [
    () => this._extensionPhoneNumber.callerIdNumbers,
    (phoneNumbers) =>
      phoneNumbers.sort((firstItem, lastItem) => {
        if (firstItem.usageType === 'DirectNumber') return -1;
        if (lastItem.usageType === 'DirectNumber') return 1;
        if (firstItem.usageType === 'MainCompanyNumber') return -1;
        if (lastItem.usageType === 'MainCompanyNumber') return 1;
        if (firstItem.usageType < lastItem.usageType) return -1;
        if (firstItem.usageType > lastItem.usageType) return 1;
        return 0;
      }),
  ];

  @proxify
  async setData(
    { callWith, myLocation, ringoutPrompt, isCustomLocation },
    withPrompt,
  ) {
    // TODO validate myLocation
    this.store.dispatch({
      type: this.actionTypes.setData,
      callWith,
      myLocation,
      ringoutPrompt,
      isCustomLocation,
      timestamp: Date.now(),
    });
    if (withPrompt) {
      if (this.callWith === callingOptions.softphone) {
        this._alert.info({
          message: callingSettingsMessages.saveSuccessWithSoftphone,
        });
      } else if (this.callWith === callingOptions.jupiter) {
        this._alert.info({
          message: callingSettingsMessages.saveSuccessWithJupiter,
        });
      } else {
        this._alert.info({
          message: callingSettingsMessages.saveSuccess,
        });
        if (!this._emergencyCallAvailable) {
          this._warningEmergencyCallingNotAvailable();
        }
      }
    }
  }

  /* ringtone */
  get isChangeRingToneAllowed() {
    return (
      this._webphone &&
      (this._storage.driver === 'INDEXEDDB' ||
        this._storage.driver === 'WEBSQL')
    );
  }

  /* India go */
  get isBlockedIdDisabled() {
    return (
      this._extensionFeatures.features?.BlockingCallerId?.available === false
    );
  }
}
