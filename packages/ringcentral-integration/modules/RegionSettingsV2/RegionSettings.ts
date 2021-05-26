import { find } from 'ramda';
import {
  action,
  RcModuleV2,
  state,
  storage,
  watch,
  computed,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import { regionSettingsMessages } from './regionSettingsMessages';
import validateAreaCode from '../../lib/validateAreaCode';
import proxify from '../../lib/proxy/proxify';
import { Deps, RegionSettingsData } from './RegionSettings.interface';

@Module({
  name: 'RegionSettings',
  deps: [
    'Brand',
    'Alert',
    'DialingPlan',
    'ExtensionInfo',
    'Storage',
    { dep: 'TabManager', optional: true },
    { dep: 'RegionSettingsOptions', optional: true },
  ],
})
export class RegionSettings extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'RegionSettings',
    });
    /* migration storage v1 to v2 */
    if (this._deps.storage) {
      this._deps.storage.migrationMapping =
        this._deps.storage.migrationMapping ?? {};
      this._deps.storage.migrationMapping['RegionSettings-data'] = {
        countryCode: 'regionSettingsCountryCode',
        areaCode: 'regionSettingsAreaCode',
      };
    }
    /* migration storage v1 to v2 */
  }

  @storage
  @state
  data = {
    countryCode: 'US',
    areaCode: '',
  };

  get countryCode() {
    return this.data.countryCode || 'US';
  }

  get areaCode() {
    return this.data.areaCode || '';
  }

  @action
  _setData({
    countryCode = this.data.countryCode,
    areaCode = this.data.areaCode,
  }: RegionSettingsData) {
    this.data.countryCode = countryCode;
    this.data.areaCode = areaCode;
  }

  onInitOnce() {
    if (!this._deps.tabManager || this._deps.tabManager.active) {
      this.checkRegionSettings();
    }
    watch(
      this,
      () => this.availableCountries,
      () => {
        if (
          this.ready &&
          (!this._deps.tabManager || this._deps.tabManager.active)
        ) {
          this.checkRegionSettings();
        }
      },
    );
  }

  @computed((that: RegionSettings) => [
    that._deps.dialingPlan.plans,
    that._deps.extensionInfo.country,
  ])
  get availableCountries() {
    const plans = this._deps.dialingPlan.plans;
    const country = this._deps.extensionInfo.country;
    if (plans && plans.length > 0) {
      return plans;
    }
    return country ? [country] : [];
  }

  _alertSettingsChanged() {
    this._deps.alert.warning({
      allowDuplicates: false,
      message: regionSettingsMessages.dialingPlansChanged,
      ttl: 0,
    });
  }

  @proxify
  async checkRegionSettings() {
    let { countryCode } = this;
    if (
      countryCode &&
      !find((plan) => plan.isoCode === countryCode, this.availableCountries)
    ) {
      countryCode = null;
      if (this._deps.brand.id === '1210') {
        this._alertSettingsChanged();
      }
    }
    if (!countryCode) {
      const country =
        find(
          (plan) => plan.isoCode === this._deps.extensionInfo.country.isoCode,
          this.availableCountries,
        ) || this.availableCountries[0];
      countryCode = country && country.isoCode;
      this._setData({
        countryCode,
        areaCode: '',
      });
    }
  }

  @proxify
  async setData({ areaCode, countryCode }: RegionSettingsData) {
    if (!validateAreaCode(areaCode)) {
      this._deps.alert.danger({
        message: regionSettingsMessages.areaCodeInvalid,
      });
      return;
    }
    this._setData({
      countryCode,
      areaCode: areaCode && areaCode.trim(),
    });
    this._deps.alert.info({
      message: regionSettingsMessages.saveSuccess,
    });
  }

  setCountryCode(countryCode: RegionSettingsData['countryCode']) {
    this.setData({
      countryCode,
    });
  }

  setAreaCode(areaCode: RegionSettingsData['areaCode']) {
    this.setData({
      areaCode,
    });
  }

  @computed(({ availableCountries }: RegionSettings) => [availableCountries])
  get showReginSetting() {
    if (this.availableCountries.length > 1) {
      return true;
    }
    if (
      this.availableCountries.length === 1 &&
      (this.availableCountries[0].isoCode === 'US' ||
        this.availableCountries[0].isoCode === 'CA')
    ) {
      return true;
    }
    return false;
  }

  @computed(({ availableCountries }: RegionSettings) => [availableCountries])
  get homeCountryId() {
    const homeCountry = this.availableCountries.find(
      (country) => country.isoCode === this.countryCode,
    );
    const homeCountryId = (homeCountry && homeCountry.id) || '1';
    return homeCountryId;
  }
}
