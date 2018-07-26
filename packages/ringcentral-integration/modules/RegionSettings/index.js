import 'core-js/fn/array/find';
import { createSelector } from 'reselect';

import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import getRegionSettingsReducer, {
  getCountryCodeReducer,
  getAreaCodeReducer,
} from './getRegionSettingsReducer';
import moduleStatuses from '../../enums/moduleStatuses';
import regionSettingsMessages from '../RegionSettings/regionSettingsMessages';
import actionTypes from './actionTypes';
import validateAreaCode from '../../lib/validateAreaCode';
import proxify from '../../lib/proxy/proxify';
import getter from '../../lib/getter';

/**
 * @class
 * @description Region settings managing module
 */
@Module({
  deps: [
    'Brand',
    'Alert',
    'DialingPlan',
    'ExtensionInfo',
    'Storage',
    { dep: 'TabManager', optional: true },
  ],
})
export default class RegionSettings extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Storage} params.storage - storage module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {DialingPlan} params.dialingPlan - dialingPlan module instance
   * @param {Alert} params.alert - alert module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   */
  constructor({
    brand,
    storage,
    extensionInfo,
    dialingPlan,
    alert,
    tabManager,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._brand = brand;
    this._storage = storage;
    this._alert = alert;
    this._dialingPlan = dialingPlan;
    this._extensionInfo = extensionInfo;
    this._tabManager = tabManager;

    this._countryCodeKey = 'regionSettingsCountryCode';
    this._areaCodeKey = 'regionSettingsAreaCode';
    this._reducer = getRegionSettingsReducer(this.actionTypes);

    this._storage.registerReducer({
      key: this._countryCodeKey,
      reducer: getCountryCodeReducer(this.actionTypes),
    });
    this._storage.registerReducer({
      key: this._areaCodeKey,
      reducer: getAreaCodeReducer(this.actionTypes),
    });

    this._processedPlans = null;
  }
  initialize() {
    this.store.subscribe(async () => {
      if (
        this._storage.ready &&
        this._dialingPlan.ready &&
        this._extensionInfo.ready &&
        this.status === moduleStatuses.pending
      ) {
        this.store.dispatch({
          type: this.actionTypes.init,
        });
        if (!this._tabManager || this._tabManager.active) {
          await this.checkRegionSettings();
        }
        this._processedPlans = this.availableCountries;
        this.store.dispatch({
          type: this.actionTypes.initSuccess,
        });
      } else if (
        !this._storage.ready &&
        this.ready
      ) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess,
        });
      } else if (
        this.ready &&
        this._processedPlans !== this.availableCountries
      ) {
        this._processedPlans = this.availableCountries;
        if (!this._tabManager || this._tabManager.active) {
          await this.checkRegionSettings();
        }
      }
    });
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  @getter
  availableCountries = createSelector(
    () => this._dialingPlan.plans,
    () => this._extensionInfo.country,
    (plans, country) => {
      if (plans && plans.length > 0) {
        return plans;
      }
      return (country && [country]) || [];
    },
  )

  _alertSettingsChanged() {
    this._alert.warning({
      allowDuplicates: false,
      message: regionSettingsMessages.dialingPlansChanged,
      ttl: 0
    });
  }

  @proxify
  async checkRegionSettings() {
    let countryCode = this._storage.getItem(this._countryCodeKey);
    if (
      countryCode &&
      !this.availableCountries.find(plan => (
        plan.isoCode === countryCode
      ))
    ) {
      countryCode = null;
      if (this._brand.id === '1210') {
        this._alertSettingsChanged();
      }
    }
    if (!countryCode) {
      const country = this.availableCountries.find(plan => (
        plan.isoCode === this._extensionInfo.country.isoCode
      )) || this.availableCountries[0];
      countryCode = country && country.isoCode;
      this.store.dispatch({
        type: this.actionTypes.setData,
        countryCode,
        areaCode: '',
      });
    }
  }

  @proxify
  async setData({
    areaCode,
    countryCode,
  }) {
    if (!validateAreaCode(areaCode)) {
      this._alert.danger({
        message: regionSettingsMessages.areaCodeInvalid,
      });
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.setData,
      countryCode,
      areaCode: areaCode && areaCode.trim(),
    });
    this._alert.info({
      message: regionSettingsMessages.saveSuccess,
    });
  }

  setCountryCode(countryCode) {
    this.setData({
      countryCode,
    });
  }

  setAreaCode(areaCode) {
    this.setData({
      areaCode,
    });
  }

  get showReginSetting() {
    if (this.availableCountries.length > 1) {
      return true;
    }
    if (this.availableCountries.length === 1 && (
      this.availableCountries[0].isoCode === 'US' ||
      this.availableCountries[0].isoCode === 'CA'
    )) {
      return true;
    }
    return false;
  }

  get countryCode() {
    return this._storage.getItem(this._countryCodeKey) || 'US';
  }

  get areaCode() {
    return this._storage.getItem(this._areaCodeKey) || '';
  }
}
