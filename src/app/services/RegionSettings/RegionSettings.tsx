/* eslint-disable react-hooks/rules-of-hooks */
import type CountryInfoShortModel from '@rc-ex/core/lib/definitions/CountryInfoShortModel';
import validateAreaCode from '@ringcentral-integration/commons/lib/validateAreaCode';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Brand,
  Toast,
  ToastManager,
} from '@ringcentral-integration/micro-core/src/app/services';
import { useToastItemView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  computed,
  delegate,
  injectable,
  optional,
  portal,
  RcModule,
  RouterPlugin,
  state,
  StoragePlugin,
  userStorage,
  watch,
} from '@ringcentral-integration/next-core';
import FormattedMessage from '@ringcentral-integration/widgets/components/FormattedMessage';
import { RcLink } from '@ringcentral/juno';
import type { CountryCode } from 'libphonenumber-js';
import { getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js';
import { find, includes } from 'ramda';
import React from 'react';

import { AppFeatures } from '../AppFeatures';
import { DialingPlan } from '../DialingPlan';
import { ExtensionInfo } from '../ExtensionInfo';
import { ExtensionNumberAreaCode } from '../ExtensionNumberAreaCode';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';

import type {
  RegionSettingsData,
  RegionSettingsOptions,
} from './RegionSettings.interface';
import i18n, { t } from './i18n';

@injectable({
  name: 'RegionSettings',
})
export class RegionSettings extends RcModule {
  private uniqueManager = this._toastManager.createUniqueManager();

  @portal
  private dialingPlansChangedToast = this._toast.create({
    view: () => {
      const { action } = useToastItemView();
      const { t } = useLocale(i18n);

      const regionSettings = t('regionSettings');
      const regionSettingsLink = (
        <RcLink
          onClick={async () => {
            await this._router.push('/settings/region');
            action!.close();
          }}
        >
          {regionSettings}
        </RcLink>
      );

      return (
        <FormattedMessage
          message={t('dialingPlansChanged')}
          values={{ regionSettingsLink }}
        />
      );
    },
    props: () => ({
      level: 'warning',
      ttl: 0,
    }),
  });

  constructor(
    protected _router: RouterPlugin,
    protected _brand: Brand,
    protected _toastManager: ToastManager,
    protected _toast: Toast,
    protected _dialingPlan: DialingPlan,
    protected _extensionInfo: ExtensionInfo,
    protected _storage: StoragePlugin,
    protected _extensionPhoneNumber: ExtensionPhoneNumber,
    protected _appFeatures: AppFeatures,
    protected _extensionNumberAreaCode: ExtensionNumberAreaCode,
    @optional('RegionSettingsOptions')
    protected _regionSettingsOptions?: RegionSettingsOptions,
  ) {
    super();
    this._storage.enable(this, {
      migrations: [['data', 'RegionSettings-data']],
    });
  }

  @userStorage
  @state
  data = {
    countryCode: this._extensionInfo?.isoCode || '',
    areaCode: '',
  };

  get countryCode() {
    return (
      (this.data.countryCode as CountryCode) ||
      this._extensionInfo.isoCode ||
      'US'
    );
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

  override onInitOnce() {
    watch(
      this,
      () => this.availableCountries,
      () => {
        if (this.ready) {
          this.checkRegionSettings();
        }
      },
    );
  }

  override onInit() {
    this.checkRegionSettings();
  }

  @computed
  get availableCountries(): CountryInfoShortModel[] {
    const plans = this._dialingPlan.plans;
    const country = this._extensionInfo.country;
    if (plans && plans.length > 0) {
      return plans;
    }
    return country ? [country] : [];
  }

  private _alertSettingsChanged() {
    return this.uniqueManager.unique(() =>
      this._toast.open(this.dialingPlansChangedToast),
    );
  }

  @delegate('server')
  async checkRegionSettings() {
    let countryCode: CountryCode | null = this.countryCode;

    if (
      countryCode &&
      !find((plan) => plan.isoCode === countryCode, this.availableCountries)
    ) {
      countryCode = null;
      if (
        this._brand.brandConfig?.allowRegionSettings &&
        !this._regionSettingsOptions?.suppressSettingsChangedWarning
      ) {
        this._alertSettingsChanged();
      }
    }

    if (!countryCode) {
      const country =
        find(
          (plan) => plan.isoCode === this._extensionInfo.country.isoCode,
          this.availableCountries,
        ) || this.availableCountries[0];

      this._setData({
        countryCode: country?.isoCode,
        areaCode: '',
      });
    }

    const isEDPEnabled = this._appFeatures.isEDPEnabled;
    if (isEDPEnabled && includes(this.countryCode, ['US', 'PR', 'CA'])) {
      this._setData({
        areaCode: '',
      });
    }
  }

  @delegate('server')
  async setData({
    areaCode = this.areaCode,
    countryCode = this.countryCode,
  }: RegionSettingsData) {
    const isEDPEnabled = this._appFeatures.isEDPEnabled;
    if (!isEDPEnabled && !validateAreaCode(areaCode)) {
      this._toast.danger({
        message: t('areaCodeInvalid'),
        allowDuplicates: false,
      });
      return;
    }
    this._setData({
      countryCode,
      areaCode: areaCode && areaCode.trim(),
    });

    if (process.env.THEME_SYSTEM === 'spring-ui') return;

    this._toast.success({
      message: t('saveSuccess'),
    });
  }

  @computed
  get showRegionSettings() {
    const allowRegionSettings = !!this._brand.brandConfig.allowRegionSettings;
    const hasMultiplePlans = this.availableCountries.length > 1;
    const isUSOrCA =
      this.availableCountries.length === 1 &&
      (this.availableCountries[0].isoCode === 'US' ||
        this.availableCountries[0].isoCode === 'CA');
    const isEDPEnabled = this._appFeatures.isEDPEnabled;

    return (
      allowRegionSettings && (hasMultiplePlans || isEDPEnabled || isUSOrCA)
    );
  }

  @computed
  get homeCountryId() {
    const homeCountry = this.availableCountries.find(
      (country) => country.isoCode === this.countryCode,
    );
    const homeCountryId = (homeCountry && homeCountry.id) || '1';
    return homeCountryId;
  }

  @computed
  get defaultAreaCode() {
    const isEDPEnabled = this._appFeatures.isEDPEnabled;
    if (isEDPEnabled && includes(this.countryCode, ['US', 'PR', 'CA'])) {
      return;
    }

    if (this.areaCode) {
      return this.areaCode;
    }

    const callingCode = getCountryCallingCode(this.countryCode as CountryCode);
    const { primaryNumber, mainCompanyNumber } = this._extensionPhoneNumber;

    const mainNumberCallingCode =
      mainCompanyNumber?.phoneNumber &&
      parsePhoneNumber(mainCompanyNumber.phoneNumber).countryCallingCode;
    const primaryNumberCallingCode =
      primaryNumber?.phoneNumber &&
      parsePhoneNumber(primaryNumber.phoneNumber).countryCallingCode;

    const canUseExtensionAreaCode =
      primaryNumberCallingCode === callingCode ||
      mainNumberCallingCode === callingCode;
    if (canUseExtensionAreaCode) {
      return this._extensionNumberAreaCode.defaultAreaCode;
    }
  }
}
