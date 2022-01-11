import { ParsePhoneNumberResponse } from '@rc-ex/core/definitions';
import { RcModuleV2 } from '@ringcentral-integration/core';
import { parse } from '@ringcentral-integration/phone-number';

import { isAnExtension, isExtensionExist } from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import { hasNoAreaCode } from '../../lib/hasNoAreaCode';
import isBlank from '../../lib/isBlank';
import normalizeNumber from '../../lib/normalizeNumber';
import { proxify } from '../../lib/proxy/proxify';
import {
  Deps,
  ValidatedPhoneNumbers,
  ValidateFormattedError,
  ValidateFormattingResult,
  ValidateParsedError,
  ValidateParsingResult,
  ValidateResult,
} from './NumberValidate.interface';

@Module({
  name: 'NumberValidate',
  deps: [
    'Brand',
    'Client',
    'RegionSettings',
    'AccountInfo',
    'CompanyContacts',
    { dep: 'ExtensionInfo', optional: true },
    { dep: 'NumberValidateOptions', optional: true },
  ],
})
export class NumberValidate extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  isNoToNumber(input: string) {
    if (isBlank(input)) {
      return true;
    }
    const { hasInvalidChars, isValid } = parse({
      input,
      countryCode: this._deps.regionSettings.countryCode,
    });
    if (hasInvalidChars || !isValid) {
      return true;
    }
    return false;
  }

  hasNoAreaCode(input: string) {
    const { countryCode, areaCode } = this._deps.regionSettings;
    return (
      this._deps.brand.brandConfig.allowRegionSettings &&
      hasNoAreaCode({ input, countryCode, areaCode })
    );
  }

  _isSpecial(phoneNumber: { special?: boolean }) {
    return !!phoneNumber?.special;
  }

  /**
   * TODO: Currently we don't have clearly defined business rule on
   * what extension numbers are considered available for dialing.
   * @param {*} extensionNumber
   * @returns {String} extensionNumber | null
   */
  getAvailableExtension(extensionNumber: string) {
    if (!isAnExtension(extensionNumber)) {
      return null;
    }
    const { isMultipleSiteEnabled, site } = this._deps.extensionInfo;
    const { filteredContacts, ivrContacts } = this._deps.companyContacts;
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

  isAvailableExtension(extensionNumber: string) {
    return !!this.getAvailableExtension(extensionNumber);
  }

  isNotAnExtension(extensionNumber: string) {
    return (
      extensionNumber &&
      extensionNumber.length <= 6 &&
      !this._deps.companyContacts.isAvailableExtension(extensionNumber)
    );
  }

  isCompanyExtension(companyNumber: string, extensionNumber: string) {
    const { countryCode, areaCode } = this._deps.regionSettings;
    const normalizedCompanyNumber = normalizeNumber({
      phoneNumber: companyNumber,
      countryCode,
      areaCode,
    });
    if (normalizedCompanyNumber !== this._deps.accountInfo.mainCompanyNumber) {
      return false;
    }
    return this._deps.companyContacts.isAvailableExtension(extensionNumber);
  }

  @proxify
  async validateNumbers(phoneNumbers: string[]): Promise<ValidateResult> {
    const validateResult = this.validateFormat(phoneNumbers);
    if (!validateResult.result) {
      return validateResult;
    }
    const validatedNumbers = await this.validateWithNumberParser(phoneNumbers);
    return validatedNumbers;
  }

  validateFormat(phoneNumbers: string[]): ValidateFormattingResult {
    const errors: ValidateFormattedError = [];
    phoneNumbers.forEach((phoneNumber) => {
      if (this.isNoToNumber(phoneNumber)) {
        errors.push({ phoneNumber, type: 'noToNumber' });
      } else if (this.hasNoAreaCode(phoneNumber)) {
        errors.push({ phoneNumber, type: 'noAreaCode' });
      }
    });
    return {
      result: errors.length === 0,
      errors,
    };
  }

  @proxify
  async validateWithNumberParser(
    phoneNumbers: string[],
  ): Promise<ValidateParsingResult> {
    const parsedNumbers = await this._numberParser(phoneNumbers);
    const errors: ValidateParsedError = [];
    const validatedPhoneNumbers: ValidatedPhoneNumbers = [];
    parsedNumbers.map((phoneNumber) => {
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
  async _numberParser(phoneNumbers: string[]) {
    const { countryCode, areaCode } = this._deps.regionSettings;
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
  async _numberParserApi(
    originalStrings: string[],
    homeCountry: {
      homeCountry?: string;
    },
  ) {
    const response: ParsePhoneNumberResponse = await this._deps.client
      .numberParser()
      .parse()
      .post(
        {
          originalStrings,
        },
        homeCountry,
      );
    return response;
  }
}
