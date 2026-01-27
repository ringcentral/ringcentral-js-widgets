import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { normalizeNumber } from '@ringcentral-integration/commons/lib/normalizeNumber';
import {
  computed,
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';

import { AccountInfo } from '../AccountInfo';
import { ExtensionInfo } from '../ExtensionInfo';
import { RegionSettings } from '../RegionSettings';

import type {
  NumberFormatterOptions,
  NumberFormattingParams,
} from './NumberFormatter.interface';

const DEFAULT_MAX_EXT_LENGTH = 7;

@injectable({
  name: 'NumberFormatter',
})
export class NumberFormatter extends RcModule {
  constructor(
    protected _accountInfo: AccountInfo,
    protected _extensionInfo: ExtensionInfo,
    protected _regionSettings: RegionSettings,
    @optional('NumberFormatterOptions')
    protected _options?: NumberFormatterOptions,
  ) {
    super();
  }

  get maxExtNumberLength() {
    return (
      this._accountInfo.info?.limits?.maxExtensionNumberLength ||
      this._options?.maxExtensionNumberLength ||
      DEFAULT_MAX_EXT_LENGTH
    );
  }

  get isMultipleSiteEnabled() {
    return (
      this._options?.isMultipleSiteEnabled ??
      this._extensionInfo.isMultipleSiteEnabled
    );
  }

  @computed((that: NumberFormatter) => [
    that._regionSettings.areaCode,
    that._regionSettings.countryCode,
    that.isMultipleSiteEnabled,
    that.maxExtNumberLength,
    that._extensionInfo.site?.code,
  ])
  get formattingParams(): NumberFormattingParams {
    return {
      areaCode: this._regionSettings.areaCode,
      maxExtensionLength: this.maxExtNumberLength,
      countryCode: this._regionSettings.countryCode,
      isMultipleSiteEnabled: this.isMultipleSiteEnabled,
      siteCode: this.isMultipleSiteEnabled
        ? this._extensionInfo.site?.code
        : '',
    };
  }

  /**
   * Format phone numbers into local number format, if you need international format, set international to `true`
   * @param phoneNumber
   * @returns
   */
  formatNumber(phoneNumber = '', international = false) {
    return (
      formatNumber({
        phoneNumber,
        international,
        ...this.formattingParams,
      }) || phoneNumber
    );
  }

  /**
   * Normalize phone numbers into E164 format, if you need to remove extension, set removeExtension to `true`
   */
  normalizeNumber(phoneNumber: string, removeExtension = false) {
    return normalizeNumber({
      phoneNumber,
      ...this.formattingParams,
      removeExtension,
    });
  }
}
