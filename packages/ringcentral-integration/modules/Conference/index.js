import mask from 'json-mask';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import createSimpleReducer from '../../lib/createSimpleReducer';
import callControlError from '../ActiveCallControl/callControlError';
import actionTypes from './actionTypes';
import proxify from '../../lib/proxy/proxify';
import { updateJoinBeforeHost, getConferenceInfo, formatDialInNumbers } from './conferenceHelper';

const DEFAULT_MASK = 'phoneNumber,hostCode,participantCode,phoneNumbers(country(callingCode,id,isoCode,name),phoneNumber,location),allowJoinBeforeHost';

/**
 * @class
 * @description Conference managing module
 */
@Module({
  deps: [
    'Alert',
    'Client',
    'Storage',
    'RegionSettings',
    'RolesAndPermissions',
    'ExtensionInfo',
    'Locale',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'ConferenceOptions', optional: true }
  ]
})
export default class Conference extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {Client} params.client - client module instance
   */
  constructor({
    alert,
    client,
    regionSettings,
    storage,
    rolesAndPermissions,
    availabilityMonitor,
    showSaveAsDefault,
    extensionInfo,
    locale,
    ...options
  }) {
    super({
      client,
      fetchFunction: async () => mask(
        await getConferenceInfo(client),
        DEFAULT_MASK,
      ),
      storage,
      ...options,
    });
    this._alert = alert;
    this._dialInNumberStorageKey = 'conferenceDialInNumber';
    this._additionalNumbersStorageKey = 'conferenceAdditionalNumbers';
    this._savedStorageKey = 'conferenceSaveCurrentSettings';
    this._regionSettings = regionSettings;
    this._rolesAndPermissions = rolesAndPermissions;
    this._availabilityMonitor = availabilityMonitor;
    this._lastCountryCode = null;
    this._showSaveAsDefault = showSaveAsDefault;
    this._extensionInfo = extensionInfo;
    this._locale = locale;
    this._storage.registerReducer({
      key: this._dialInNumberStorageKey,
      reducer: createSimpleReducer(this.actionTypes.updateDialInNumber, 'dialInNumber'),
    });
    this._storage.registerReducer({
      key: this._additionalNumbersStorageKey,
      reducer: createSimpleReducer(this.actionTypes.updateAdditionalNumbers, 'additionalNumbers'),
    });
    this._storage.registerReducer({
      key: this._savedStorageKey,
      reducer: createSimpleReducer(this.actionTypes.updateSaveCurrentSettings, '_saved'),
    });
  }

  get _name() {
    return 'conference';
  }

  get _actionTypes() {
    return actionTypes;
  }

  async _onStateChange() {
    super._onStateChange();
    if (
      !this.data ||
      !this._regionSettings.ready ||
      this._lastCountryCode === this._regionSettings.countryCode) {
      return;
    }
    this._lastCountryCode = this._regionSettings.countryCode;
    const matchedPhoneNumber = this.data.phoneNumbers.find(
      e => e.country.isoCode === this._lastCountryCode
    );
    if (matchedPhoneNumber && matchedPhoneNumber.phoneNumber !== this.dialInNumber) {
      this.updateDialInNumber(matchedPhoneNumber.phoneNumber);
    }
  }

  _shouldInit() {
    return super._shouldInit() &&
      this._rolesAndPermissions.ready &&
      this._alert.ready &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready) &&
      this._extensionInfo.ready &&
      this._locale.ready &&
      this._regionSettings.ready;
  }

  @proxify
  async updateEnableJoinBeforeHost(allowJoinBeforeHost) {
    try {
      const data = await updateJoinBeforeHost(this._client, allowJoinBeforeHost);
      this._store.dispatch({ type: this.actionTypes.fetchSuccess, data });
      return data;
    } catch (error) {
      if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(error)) {
        this._alert.warning({ message: callControlError.generalError });
      }

      return null;
    }
  }

  @proxify
  updateDialInNumber(dialInNumber) {
    this._store.dispatch({ type: this.actionTypes.updateDialInNumber, dialInNumber });
  }

  @proxify
  updateAdditionalNumbers(additionalNumbers) {
    this._store.dispatch({ type: this.actionTypes.updateAdditionalNumbers, additionalNumbers });
  }

  @proxify
  updateSaveCurrentSettings(_saved) {
    this._store.dispatch({ type: this.actionTypes.updateSaveCurrentSettings, _saved });
  }

  // for track invite with text
  @proxify
  onInviteWithText() {
    this.store.dispatch({
      type: this.actionTypes.inviteWithText
    });
  }

  // for track join as host
  @proxify
  onJoinAsHost() {
    this.store.dispatch({
      type: this.actionTypes.joinAsHost
    });
  }

  @proxify
  getDefaultSettings(countryNames) {
    if (!countryNames || typeof countryNames !== 'object') {
      console.log('please privide the countryNames I18n object');
      return;
    }
    const dialInNumbers = formatDialInNumbers({
      currentLocale: this._locale.currentLocale,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      phoneNumbers: this.data.phoneNumbers,
      countryNames,
    });
    return {
      dialInNumbers,
      phoneNumber: this.data.phoneNumber,
      dialInNumber: this.dialInNumber || '',
      _saved: this._saved || false,
      additionalNumbers: this.additionalNumbers,
      allowJoinBeforeHost: this.data.allowJoinBeforeHost,
      currentLocale: this._locale.currentLocale,
      participantCode: this.data.participantCode,
      extensionName: this._extensionInfo.info.name || '',
    };
  }

  get additionalNumbers() {
    return this._storage.getItem(this._additionalNumbersStorageKey) || [];
  }

  get _saved() {
    return this._storage.getItem(this._savedStorageKey) || false;
  }

  get dialInNumber() {
    return this._storage.getItem(this._dialInNumberStorageKey) ||
      (this.data && this.data.phoneNumber);
  }

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.OrganizeConference;
  }

  get showSaveAsDefault() {
    return this._showSaveAsDefault || false;
  }
}
