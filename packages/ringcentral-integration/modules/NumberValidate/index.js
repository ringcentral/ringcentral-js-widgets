import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import isBlank from '../../lib/isBlank';
import moduleStatuses from '../../enums/moduleStatuses';
import normalizeNumber from '../../lib/normalizeNumber';
import parseNumber from '../../lib/parseNumber';
import proxify from '../../lib/proxy/proxify';

import numberValidateActionTypes from './numberValidateActionTypes';
import getNumberValidateReducer from './getNumberValidateReducer';

/**
 * @class
 * @description Validate number with number parser api
 */
@Module({
  deps: ['Brand', 'Client', 'AccountExtension', 'RegionSettings', 'AccountInfo']
})
export default class NumberValidate extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {AccountExtension} params.accountExtension - accountExtension module instance
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   */
  constructor({
    brand,
    client,
    accountExtension,
    regionSettings,
    accountInfo,
    ...options
  }) {
    super({
      ...options,
      actionTypes: numberValidateActionTypes,
    });
    this._brand = brand;
    this._client = client;
    this._accountExtension = accountExtension;
    this._regionSettings = regionSettings;
    this._accountInfo = accountInfo;
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
      this._accountExtension.ready &&
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
      (
        !this._brand.ready ||
        !this._accountInfo.ready ||
        !this._regionSettings.ready ||
        !this._accountExtension.ready
      ) &&
      this.ready
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  isNoToNumber(phoneNumber) {
    if (isBlank(phoneNumber)) {
      return true;
    }
    const {
      number,
      hasInvalidChars,
    } = parseNumber(phoneNumber);
    if (hasInvalidChars || number === '') {
      return true;
    }
    return false;
  }

  isNoAreaCode(phoneNumber) {
    const {
      hasPlus,
      number,
      isServiceNumber
    } = parseNumber(phoneNumber);
    const {
      countryCode,
      areaCode,
    } = this._regionSettings;
    if (
      this._brand.id === '1210' &&
      !isServiceNumber &&
      !hasPlus &&
      number.length === 7 &&
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

  isNotAnExtension(extensionNumber) {
    if (
      extensionNumber &&
      extensionNumber.length <= 6 &&
      !this._accountExtension.isAvailableExtension(extensionNumber)
    ) {
      return true;
    }
    return false;
  }

  isCompanyExtension(companyNumber, extensionNumber) {
    const {
      countryCode,
      areaCode,
    } = this._regionSettings;
    const normalizedCompanyNumber
      = normalizeNumber({ phoneNumber: companyNumber, countryCode, areaCode });
    if (normalizedCompanyNumber !== this._accountInfo.mainCompanyNumber) {
      return false;
    }
    return this._accountExtension.isAvailableExtension(extensionNumber);
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
      result: (errors.length === 0),
      errors
    };
  }

  @proxify
  async validateWithNumberParser(phoneNumbers) {
    const pasedNumers = await this._numberParser(phoneNumbers);
    const errors = [];
    const validatedPhoneNumbers = [];
    pasedNumers.map((phoneNumber) => {
      if (this._isSpecial(phoneNumber)) {
        errors.push({ phoneNumber: phoneNumber.originalString, type: 'specialNumber' });
        return null;
      }
      if (this.isNotAnExtension(phoneNumber.originalString)) {
        errors.push({ phoneNumber: phoneNumber.originalString, type: 'notAnExtension' });
        return null;
      }
      validatedPhoneNumbers.push(phoneNumber);
      return null;
    });
    return {
      result: (errors.length === 0),
      numbers: validatedPhoneNumbers,
      errors,
    };
  }

  @proxify
  async _numberParser(phoneNumbers) {
    const {
      countryCode,
      areaCode,
    } = this._regionSettings;
    const homeCountry = countryCode ? { homeCountry: countryCode } : {};
    const normalizedNumbers = phoneNumbers.map(phoneNumber => (
      normalizeNumber({ phoneNumber, countryCode, areaCode })
    ));
    const response = await this._numberParserApi(normalizedNumbers, homeCountry);
    return response.phoneNumbers.map(phoneNumber => ({
      ...phoneNumber,
      international:
        !!phoneNumber.country &&
        phoneNumber.country.isoCode !== response.homeCountry.isoCode,
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
