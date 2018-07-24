import mask from 'json-mask';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import createSimpleReducer from '../../lib/createSimpleReducer';
import actionTypes from './actionTypes';
import proxify from '../../lib/proxy/proxify';

const DEFAULT_MASK = 'phoneNumber,hostCode,participantCode,phoneNumbers(country(callingCode,id,isoCode,name),phoneNumber,location),allowJoinBeforeHost';

/**
 * @class
 * @description Conference managing module
 */
@Module({
  deps: [
    'Client', 'Storage', 'RegionSettings', 'RolesAndPermissions', { dep: 'ConferenceOptions', optional: true }
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
    client,
    regionSettings,
    storage,
    rolesAndPermissions,
    ...options
  }) {
    super({
      name: 'conference',
      client,
      fetchFunction: async () => mask(
        await client.account().extension().conferencing().get(),
        DEFAULT_MASK,
      ),
      actionTypes,
      storage,
      ...options,
    });
    this._dialInNumberStorageKey = 'conferenceDialInNumber';
    this._additionalNumbersStorageKey = 'conferenceAdditionalNumbers';
    this._regionSetting = regionSettings;
    this._rolesAndPermissions = rolesAndPermissions;
    this._lastCountryCode = null;
    this._storage.registerReducer({
      key: this._dialInNumberStorageKey,
      reducer: createSimpleReducer(this.actionTypes.updateDialInNumber, 'dialInNumber'),
    });
    this._storage.registerReducer({
      key: this._additionalNumbersStorageKey,
      reducer: createSimpleReducer(this.actionTypes.updateAdditionalNumbers, 'additionalNumbers'),
    });
  }

  async _onStateChange() {
    super._onStateChange();
    if (!this.data
      || !this._regionSetting.ready
      || this._lastCountryCode === this._regionSetting.countryCode) {
      return;
    }
    this._lastCountryCode = this._regionSetting.countryCode;
    const matchedPhoneNumber = this.data.phoneNumbers.find(
      e => e.country.isoCode === this._lastCountryCode
    );
    if (matchedPhoneNumber && matchedPhoneNumber.phoneNumber !== this.dialInNumber) {
      this.updateDialInNumber(matchedPhoneNumber.phoneNumber);
    }
  }

  _shouldInit() {
    return super._shouldInit() && this._rolesAndPermissions.ready;
  }

  @proxify
  async updateEnableJoinBeforeHost(allowJoinBeforeHost) {
    const data = await this._client.account().extension().conferencing()
      .put({ allowJoinBeforeHost });
    this._store.dispatch({ type: this.actionTypes.fetchSuccess, data });
  }

  @proxify
  updateDialInNumber(dialInNumber) {
    this._store.dispatch({ type: this.actionTypes.updateDialInNumber, dialInNumber });
  }

  @proxify
  updateAdditionalNumbers(additionalNumbers) {
    this._store.dispatch({ type: this.actionTypes.updateAdditionalNumbers, additionalNumbers });
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

  get additionalNumbers() {
    return this._storage.getItem(this._additionalNumbersStorageKey) || [];
  }

  get dialInNumber() {
    return this._storage.getItem(this._dialInNumberStorageKey) ||
      (this.data && this.data.phoneNumber);
  }

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.OrganizeConference;
  }

  _shouldFetch() {
    return !this._tabManager || this._tabManager.active;
  }
}
