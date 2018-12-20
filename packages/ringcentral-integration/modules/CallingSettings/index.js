import { createSelector } from 'reselect';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import {
  getCallingSettingsReducer,
  getCallingSettingsStorageReducer,
} from './getCallingSettingsReducer';
import moduleStatuses from '../../enums/moduleStatuses';
import mapOptionToMode from './mapOptionToMode';
import callingOptions from './callingOptions';
import callingSettingsMessages from './callingSettingsMessages';
import actionTypes from './actionTypes';
import proxify from '../../lib/proxy/proxify';
import getter from '../../lib/getter';

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
    'RolesAndPermissions',
    { dep: 'TabManager', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'CallingSettingsOptions', optional: true }
  ]
})
export default class CallingSettings extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Brand} params.brand - brand module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {ExtensionPhoneNumber} params.extensionPhoneNumber - extensionPhoneNumber module instance
   * @param {ForwardingNumber} params.forwardingNumber - forwardingNumber module instance
   * @param {Storage} params.storage - storage module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {Webphone} params.webphone - webphone module instance
   * @param {Function} params.onFirstLogin - func on first login
   */
  constructor({
    alert,
    brand,
    extensionInfo,
    extensionPhoneNumber,
    forwardingNumber,
    storage,
    rolesAndPermissions,
    tabManager,
    onFirstLogin,
    webphone,
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
    this._rolesAndPermissions = rolesAndPermissions;
    this._tabManager = tabManager;
    this._webphone = webphone;
    this._storageKey = 'callingSettingsData';

    this._onFirstLogin = onFirstLogin;

    this._storage.registerReducer({
      key: this._storageKey,
      reducer: getCallingSettingsStorageReducer(this.actionTypes),
    });

    this._reducer = getCallingSettingsReducer(this.actionTypes);
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
      this._ringoutEnabled = this._rolesAndPermissions.ringoutEnabled;
      this._webphoneEnabled = this._rolesAndPermissions.webphoneEnabled;
      this._myPhoneNumbers = this.myPhoneNumbers;
      this._otherPhoneNumbers = this.otherPhoneNumbers;
      await this._validateSettings();
    }
  }
  _shouldInit() {
    return (
      this._storage.ready &&
      this._extensionInfo.ready &&
      this._extensionPhoneNumber.ready &&
      this._forwardingNumber.ready &&
      this._rolesAndPermissions.ready &&
      this.pending
    );
  }
  _shouldReset() {
    return (
      this.ready &&
      (
        !this._storage.ready ||
        !this._extensionInfo.ready ||
        !this._extensionPhoneNumber.ready ||
        !this._forwardingNumber.ready ||
        !this._rolesAndPermissions.ready
      )
    );
  }
  _shouldValidate() {
    return (
      this.ready &&
      (
        this._ringoutEnabled !== this._rolesAndPermissions.ringoutEnabled ||
        this._webphoneEnabled !== this._rolesAndPermissions.webphoneEnabled ||
        this._myPhoneNumbers !== this.myPhoneNumbers ||
        this._otherPhoneNumbers !== this.otherPhoneNumbers
      )
    );
  }
  async _init() {
    if (!this._rolesAndPermissions.callingEnabled) return;
    this._myPhoneNumbers = this.myPhoneNumbers;
    this._otherPhoneNumbers = this.otherPhoneNumbers;
    this._ringoutEnabled = this._rolesAndPermissions.ringoutEnabled;
    this._webphoneEnabled = this._rolesAndPermissions.webphoneEnabled;
    if (!this.timestamp) {
      // first time login
      const defaultCallWith = this.callWithOptions && this.callWithOptions[0];
      this.store.dispatch({
        type: this.actionTypes.setData,
        callWith: defaultCallWith,
        timestamp: Date.now(),
      });
      this._warningEmergencyCallingNotAvailable();
      if (typeof this._onFirstLogin === 'function') {
        this._onFirstLogin();
      }
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
    if (!fromNumber) {
      const fromNumberList = this.fromNumbers;
      await this.updateFromNumber(fromNumberList[0]);
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
        callWith: callingOptions.myphone,
        myLocation: this._myPhoneNumbers[0],
        timestamp: Date.now(),
      });
      this._alert.danger({
        message: callingSettingsMessages.phoneNumberChanged,
        ttl: 0,
      });
    }
  }
  _hasWebphonePermissionRemoved() {
    return (!(
      this._webphoneEnabled &&
        this._webphone
    ) &&
      this.callWith === callingOptions.browser);
  }
  _hasPermissionChanged() {
    return (
      !this._ringoutEnabled &&
      (
        this.callWith === callingOptions.myphone ||
        this.callWith === callingOptions.otherphone ||
        this.callWith === callingOptions.customphone
      )
    );
  }
  _hasPhoneNumberChanged() {
    return (
      (this.callWith === callingOptions.otherphone &&
        this._otherPhoneNumbers.indexOf(this.myLocation) === -1) ||
      (this.callWith === callingOptions.myphone &&
        this._myPhoneNumbers.indexOf(this.myLocation) === -1)
    );
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

  get myLocation() {
    return this.data.myLocation;
  }

  get timestamp() {
    return this.data.timestamp;
  }

  @getter
  callWithOptions = createSelector(
    () => this._rolesAndPermissions.ringoutEnabled,
    () => this._rolesAndPermissions.webphoneEnabled,
    () => this.otherPhoneNumbers.length > 0,
    () => this._extensionPhoneNumber.numbers.length > 0,
    (ringoutEnabled, webphoneEnabled, hasOtherPhone, hasExtensionPhoneNumber) => {
      if (!hasExtensionPhoneNumber) {
        return [callingOptions.softphone];
      }
      const callWithOptions = [];
      if (this._webphone && webphoneEnabled) {
        callWithOptions.push(callingOptions.browser);
      }
      callWithOptions.push(callingOptions.softphone);
      if (ringoutEnabled) {
        callWithOptions.push(callingOptions.myphone);
        if (hasOtherPhone) {
          callWithOptions.push(callingOptions.otherphone);
        }
        callWithOptions.push(callingOptions.customphone);
      }
      return callWithOptions;
    },
  )

  @getter
  myPhoneNumbers = createSelector(
    () => this._extensionPhoneNumber.directNumbers,
    () => this._extensionPhoneNumber.mainCompanyNumber,
    () => this._extensionInfo.extensionNumber,
    (directNumbers, mainCompanyNumber, extensionNumber) => {
      const myPhoneNumbers = directNumbers.map(item => item.phoneNumber);
      if (mainCompanyNumber && extensionNumber) {
        myPhoneNumbers.push(`${mainCompanyNumber.phoneNumber}*${extensionNumber}`);
      }
      return myPhoneNumbers;
    }
  )


  @getter
  otherPhoneNumbers = createSelector(
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
        .filter(item => !filterMapping[item.phoneNumber])
        .sort((a, b) => (a.label === 'Mobile' && a.label !== b.label ? -1 : 1))
        .map(item => item.phoneNumber);
    }
  )

  @getter
  availableNumbers = createSelector(
    () => this.myPhoneNumbers,
    () => this.otherPhoneNumbers,
    (myPhoneNumbers, otherPhoneNumbers) => ({
      [callingOptions.myphone]: myPhoneNumbers,
      [callingOptions.otherphone]: otherPhoneNumbers,
    }),
  )

  get fromNumber() {
    return this.data.fromNumber;
  }

  @getter
  fromNumbers = createSelector(
    () => this._extensionPhoneNumber.callerIdNumbers,
    phoneNumbers => phoneNumbers.sort((firstItem, lastItem) => {
      if (firstItem.usageType === 'DirectNumber') return -1;
      else if (lastItem.usageType === 'DirectNumber') return 1;
      else if (firstItem.usageType === 'MainCompanyNumber') return -1;
      else if (lastItem.usageType === 'MainCompanyNumber') return 1;
      else if (firstItem.usageType < lastItem.usageType) return -1;
      else if (firstItem.usageType > lastItem.usageType) return 1;
      return 0;
    }),
  )

  @proxify
  async setData({ callWith, myLocation, ringoutPrompt }, withPrompt) {
    // TODO validate myLocation
    this.store.dispatch({
      type: this.actionTypes.setData,
      callWith,
      myLocation,
      ringoutPrompt,
      timestamp: Date.now(),
    });
    if (withPrompt) {
      if (this.callWith === callingOptions.softphone) {
        this._alert.info({
          message: callingSettingsMessages.saveSuccessWithSoftphone,
        });
      } else {
        this._alert.info({
          message: callingSettingsMessages.saveSuccess,
        });
        this._warningEmergencyCallingNotAvailable();
      }
    }
  }
}
