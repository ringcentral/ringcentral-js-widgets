import { parse } from '@ringcentral-integration/phone-number';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import { isExtensionExist, isAnExtension } from '../../lib/contactHelper';
import isBlank from '../../lib/isBlank';
import moduleStatuses from '../../enums/moduleStatuses';
import normalizeNumber from '../../lib/normalizeNumber';
import proxify from '../../lib/proxy/proxify';
import ensureExist from '../../lib/ensureExist';

import { numberValidateActionTypes } from './numberValidateActionTypes';
import getNumberValidateReducer from './getNumberValidateReducer';

/**
 * @class
 * @description Validate number with number parser api
 */
@Module({
  deps: [
    'Brand',
    'Client',
    'RegionSettings',
    'AccountInfo',
    { dep: 'ExtensionInfo', optional: true },
    { dep: 'CompanyContacts' },
  ],
})
export default class NumberValidate extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {CompanyContacts} params.companyContacts - companyContacts module instance
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   */
  constructor({
    brand,
    client,
    companyContacts,
    regionSettings,
    accountInfo,
    extensionInfo,
    ...options
  }) {
    super({
      ...options,
      actionTypes: numberValidateActionTypes,
    });
    this._brand = brand;
    this._client = client;
    this._companyContacts = ensureExist.call(
      this,
      companyContacts,
      'companyContacts',
    );

    this._regionSettings = regionSettings;
    this._accountInfo = accountInfo;
    this._extensionInfo = extensionInfo;
    this._reducer = getNumberValidateReducer(this.actionTypes);
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._initModuleStatus();
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    }
  }

  _shouldInit() {
    return (
      this._brand.ready &&
      this._regionSettings.ready &&
      this._companyContacts.ready &&
      this._accountInfo.ready &&
      !this.ready
    );
  }

  _initModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  _shouldReset() {
    return (
      (!this._brand.ready ||
        !this._accountInfo.ready ||
        !this._regionSettings.ready ||
        !this._companyContacts.ready) &&
      this.ready
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  isNoToNumber(input) {
    if (isBlank(input)) {
      return true;
    }
    const { hasInvalidChars, isValid } = parse({
      input,
      countryCode: this._regionSettings.countryCode,
      areaCode: this._regionSettings.areaCode,
    });
    if (hasInvalidChars || !isValid) {
      return true;
    }
    return false;
  }

  @proxify
  isNoAreaCode(input) {
    const { hasPlus, phoneNumber, isServiceNumber } = parse({
      input,
      countryCode: this._regionSettings.countryCode,
      areaCode: this._regionSettings.areaCode,
    });
    const { countryCode, areaCode } = this._regionSettings;
    if (
      this._brand.id === '1210' &&
      !isServiceNumber &&
      !hasPlus &&
      phoneNumber.length === 7 &&
      (countryCode === 'CA' || countryCode === 'US') &&
      areaCode === ''
    ) {
      return true;
    }
    return false;
  }

  _isSpecial(phoneNumber) {
    if (phoneNumber && phoneNumber.special) {
      return true;
    }
    return false;
  }

  /**
   * TODO: Currently we don't have clearly defined business rule on
   * what extension numbers are considered available for dialing.
   * @param {*} extensionNumber
   * @returns {String} extensionNumber | null
   */
  getAvailableExtension(extensionNumber) {
    if (!isAnExtension(extensionNumber)) {
      return null;
    }
    const { isMultipleSiteEnabled, site } = this._extensionInfo;
    const { filteredContacts, ivrContacts } = this._companyContacts;
    const contacts = filteredContacts.concat(ivrContacts);
    return (
      contacts.find((item) =>
        isExtensionExist({
          extensionNumber,
          extensionFromContacts: item.extensionNumber,
          options: {
            isMultipleSiteEnabled,
            siteCode: site?.code,
          },
        }),
      )?.extensionNumber ?? null
    );
  }

  isAvailableExtension(extensionNumber) {
    return !!this.getAvailableExtension(extensionNumber);
  }

  isNotAnExtension(extensionNumber) {
    if (
      extensionNumber &&
      extensionNumber.length <= 6 &&
      !this._companyContacts.isAvailableExtension(extensionNumber)
    ) {
      return true;
    }
    return false;
  }

  isCompanyExtension(companyNumber, extensionNumber) {
    const { countryCode, areaCode } = this._regionSettings;
    const normalizedCompanyNumber = normalizeNumber({
      phoneNumber: companyNumber,
      countryCode,
      areaCode,
    });
    if (normalizedCompanyNumber !== this._accountInfo.mainCompanyNumber) {
      return false;
    }
    return this._companyContacts.isAvailableExtension(extensionNumber);
  }

  @proxify
  async validateNumbers(phoneNumbers) {
    const validateResult = this.validateFormat(phoneNumbers);
    if (!validateResult.result) {
      return validateResult;
    }
    const validatedNumbers = await this.validateWithNumberParser(phoneNumbers);
    return validatedNumbers;
  }

  @proxify
  validateFormat(phoneNumbers) {
    const errors = [];
    phoneNumbers.map((phoneNumber) => {
      if (this.isNoToNumber(phoneNumber)) {
        errors.push({ phoneNumber, type: 'noToNumber' });
        return null;
      }
      if (this.isNoAreaCode(phoneNumber)) {
        errors.push({ phoneNumber, type: 'noAreaCode' });
      }
      return null;
    });
    return {
      result: errors.length === 0,
      errors,
    };
  }

  @proxify
  async validateWithNumberParser(phoneNumbers) {
    const pasedNumers = await this._numberParser(phoneNumbers);
    const errors = [];
    const validatedPhoneNumbers = [];
    pasedNumers.map((phoneNumber) => {
      if (this._isSpecial(phoneNumber)) {
        errors.push({
          phoneNumber: phoneNumber.originalString,
          type: 'specialNumber',
        });
        return null;
      }
      const number = phoneNumber.originalString;
      const availableExtension = this.getAvailableExtension(number);

      if (isAnExtension(number) && !availableExtension) {
        errors.push({
          phoneNumber: phoneNumber.originalString,
          type: 'notAnExtension',
        });
        return null;
      }

      const extensionObj = availableExtension ? { availableExtension } : {};
      validatedPhoneNumbers.push({ ...phoneNumber, ...extensionObj });
      return null;
    });
    return {
      result: errors.length === 0,
      numbers: validatedPhoneNumbers,
      errors,
    };
  }

  @proxify
  async _numberParser(phoneNumbers) {
    const { countryCode, areaCode } = this._regionSettings;
    const homeCountry = countryCode ? { homeCountry: countryCode } : {};
    const normalizedNumbers = phoneNumbers.map((phoneNumber) =>
      normalizeNumber({ phoneNumber, countryCode, areaCode }),
    );
    const response = await this._numberParserApi(
      normalizedNumbers,
      homeCountry,
    );
    return response.phoneNumbers.map((phoneNumber) => ({
      ...phoneNumber,
      international:
        !!phoneNumber.country &&
        phoneNumber.country.callingCode !== response.homeCountry.callingCode,
    }));
  }

  @proxify
  async _numberParserApi(originalStrings, homeCountry) {
    const response = await this._client.numberParser().parse().post(
      {
        originalStrings,
      },
      homeCountry,
    );
    return response;
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }
}
