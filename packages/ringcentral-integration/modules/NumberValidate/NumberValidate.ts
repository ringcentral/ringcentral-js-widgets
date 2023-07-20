import type ParsePhoneNumberResponse from '@rc-ex/core/lib/definitions/ParsePhoneNumberResponse';
import { RcModuleV2 } from '@ringcentral-integration/core';
import type { CountryCode } from '@ringcentral-integration/phone-number';
import { parse, isUSOrCAOrPR } from '@ringcentral-integration/phone-number';

import type {
  NumberParserAPIResponse,
  ParsePhoneNumberResultsItem,
} from '../../interfaces/NumberParserResponse.interface';
import { Category } from '../../interfaces/NumberParserResponse.interface';
import cleanNumber from '../../lib/cleanNumber';
import { isAnExtension, isExtensionExist } from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import { hasNoAreaCode } from '../../lib/hasNoAreaCode';
import { isBlank } from '../../lib/isBlank';
import { normalizeNumber } from '../../lib/normalizeNumber';
import { proxify } from '../../lib/proxy/proxify';
import { callErrors } from '../Call/callErrors';
import type {
  Deps,
  ParsePhoneNumberAPIParam,
  ParseResult,
  ParseResultItem,
  ValidatedPhoneNumbers,
  ValidateFormattedError,
  ValidateFormattingResult,
  ValidateParsedError,
  ValidateParsingResult,
  ValidateResult,
} from './NumberValidate.interface';
import { contextSourceOption } from './NumberValidate.interface';

@Module({
  name: 'NumberValidate',
  deps: [
    'Brand',
    'Client',
    'RegionSettings',
    'AccountInfo',
    'CompanyContacts',
    'AppFeatures',
    'Alert',
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
  getAvailableExtension(extensionNumber: string, maxExtensionNumberLength = 6) {
    if (!isAnExtension(extensionNumber, maxExtensionNumberLength)) {
      return null;
    }
    if (!this._deps.extensionInfo) {
      return null;
    }
    const { isMultipleSiteEnabled, site } = this._deps.extensionInfo;
    const { filteredContacts, ivrContacts } = this._deps.companyContacts;
    const contacts = filteredContacts.concat(ivrContacts);
    return (
      contacts.find((item) =>
        isExtensionExist({
          extensionNumber,
          extensionFromContacts: item.extensionNumber ?? '',
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

  isNotAnExtension(extensionNumber: string, maxExtensionLength = 6) {
    return (
      extensionNumber &&
      extensionNumber.length <= maxExtensionLength &&
      !this._deps.companyContacts.isAvailableExtension(extensionNumber)
    );
  }

  isCompanyExtension(companyNumber: string, extensionNumber: string) {
    const { countryCode, areaCode } = this._deps.regionSettings;
    const normalizedCompanyNumber = normalizeNumber({
      phoneNumber: companyNumber,
      countryCode,
      areaCode,
      maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
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
    const maxExtensionNumberLength =
      this._deps.accountInfo.maxExtensionNumberLength;
    const parsedNumbers = await this._numberParser(phoneNumbers);
    const errors: ValidateParsedError = [];
    const validatedPhoneNumbers: ValidatedPhoneNumbers = [];
    parsedNumbers.map((phoneNumber) => {
      const isSpecial = this._isSpecial(phoneNumber);
      const number = phoneNumber.originalString;

      const isAnExtensionNumber =
        !isSpecial && isAnExtension(number!, maxExtensionNumberLength);
      const extensionObj: {
        availableExtension?: string;
        isAnExtension?: boolean;
      } = { isAnExtension: isAnExtensionNumber };
      if (
        !this._deps.companyContacts?.enableCompanyPublicApi &&
        isAnExtensionNumber
      ) {
        const availableExtension = this.getAvailableExtension(
          number!,
          maxExtensionNumberLength,
        );
        if (!availableExtension) {
          errors.push({
            // @ts-expect-error
            phoneNumber: phoneNumber.originalString,
            type: 'notAnExtension',
          });
          return null;
        }

        extensionObj.availableExtension = availableExtension;
      }
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
    // @ts-expect-error
    return response.phoneNumbers.map((phoneNumber) => ({
      ...phoneNumber,
      international:
        !!phoneNumber.country &&
        // @ts-expect-error
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

  // introduce number parser v2
  // need to remove private, so that we can test
  @proxify
  async _parsingPhoneNumber(
    data: ParsePhoneNumberAPIParam,
  ): Promise<NumberParserAPIResponse | null> {
    try {
      const response = await this._deps.client.service
        .platform()
        .post(`/restapi/v2/number-parser/parse`, data);
      return response.json();
    } catch (ex) {
      this._deps.alert.danger({
        message: callErrors.numberParseError,
        payload: ex,
      });
      return null;
    }
  }

  @proxify
  async parseNumbers(inputs: string[]): Promise<ParseResult | void> {
    const { countryCode, defaultAreaCode } = this._deps.regionSettings;
    const brandId = this._deps.brand.brandConfig.id;
    const phoneNumbers = inputs.map((input: string) => cleanNumber(input));
    const data: ParsePhoneNumberAPIParam = {
      originalStrings: phoneNumbers,
      contextSource: contextSourceOption.account,
      context: {
        brandId,
        country: {
          isoCode: countryCode,
        },
        defaultAreaCode,
        outboundCallPrefix: this._deps.appFeatures.OCPValue,
        conflictHandling: this._deps.appFeatures.enableSmartDialPlan
          ? 'Client'
          : 'Default',
        maxExtensionNumberLength:
          this._deps.accountInfo.maxExtensionNumberLength,
      },
    };
    const response = await this._parsingPhoneNumber(data);
    return response?.results.map((result) => this.handleResult(result));
  }

  // whether the number is an empty string or contains invalid characters
  validate(numbers: string[]): ValidateFormattingResult {
    const errors: ValidateFormattedError = [];
    numbers.forEach((phoneNumber) => {
      if (isBlank(phoneNumber) || /[^\d*+#\-(). ]/.test(phoneNumber)) {
        errors.push({ phoneNumber, type: 'noToNumber' });
      }
    });
    return {
      result: errors.length === 0,
      errors,
    };
  }

  private handleResult(
    resultItem: ParsePhoneNumberResultsItem,
  ): ParseResultItem {
    const formatObj = resultItem.formats?.[0];
    const originalString = resultItem.originalString;
    let parseResult: ParseResultItem = {
      originalString,
      isAnExtension: false,
      isInternational: false,
      specialService: false,
      parsedNumber: resultItem.originalString,
      availableExtension: null,
      ...formatObj,
    };
    switch (resultItem.category) {
      case Category.SpecialService:
        parseResult.specialService = true;
        parseResult.parsedNumber = formatObj?.national;
        break;
      case Category.Extension:
        parseResult = {
          ...parseResult,
          ...this.handleExtension(resultItem),
        };
        break;
      case Category.Regular:
      case Category.ShortCode:
      case Category.TollFree:
        parseResult.isInternational = this.isInternational(resultItem);

        parseResult.parsedNumber =
          formatObj.e164Extended ||
          formatObj.e164 ||
          formatObj.dialableExtended;
        break;
      case Category.Unknown:
        parseResult.parsedNumber =
          formatObj.dialableExtended || formatObj.dialable;
        break;
      case Category.Ambiguous:
        parseResult = {
          ...parseResult,
          ...this.handleAmbiguous(resultItem),
        };
        break;
      default:
        break;
    }

    return parseResult;
  }

  private handleExtension(resultItem: ParsePhoneNumberResultsItem) {
    const originalString = resultItem.originalString;
    const maxExtensionNumberLength =
      this._deps.accountInfo.maxExtensionNumberLength;
    const parsedNumber =
      resultItem.numberDetails?.extensionNumber || originalString;
    const availableExtension = this.getAvailableExtension(
      parsedNumber,
      maxExtensionNumberLength,
    );
    const isAnExtension = true;

    return {
      isAnExtension,
      parsedNumber,
      availableExtension,
    };
  }

  private handleAmbiguous(resultItem: ParsePhoneNumberResultsItem) {
    const originalString = resultItem.originalString;
    const maxExtensionNumberLength =
      this._deps.accountInfo.maxExtensionNumberLength;
    const availableExtension = this.getAvailableExtension(
      originalString,
      maxExtensionNumberLength,
    );
    let isInternational = false;
    let parsedNumber = originalString;
    let isAnExtension = false;
    if (availableExtension) {
      parsedNumber = availableExtension;
      isAnExtension = true;
    } else {
      const externalNumber = resultItem.formats.find(
        (item) => item.category !== Category.Extension,
      );
      isInternational = !!externalNumber && this.isInternational(resultItem);
      parsedNumber =
        externalNumber?.e164Extended || externalNumber?.e164 || originalString;
    }

    return {
      isAnExtension,
      parsedNumber,
      isInternational,
      availableExtension,
    };
  }

  private isInternational(resultItem: ParsePhoneNumberResultsItem): boolean {
    const phoneNumberISOCode = resultItem.numberDetails?.country?.isoCode ?? '';
    const regionSettingsCountryCode = this._deps.regionSettings.countryCode;

    // The call between us/ca/pr should not be considered to be the international call, check RCINT-25922/RCINT-26726 for more details
    if (
      isUSOrCAOrPR(regionSettingsCountryCode) &&
      isUSOrCAOrPR(phoneNumberISOCode as CountryCode)
    ) {
      return false;
    }

    // For rest of the cases, check if the number is international
    return phoneNumberISOCode !== regionSettingsCountryCode;
  }
}
