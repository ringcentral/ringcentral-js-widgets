/* eslint-disable react-hooks/rules-of-hooks */
import type ParsePhoneNumberResponse from '@rc-ex/core/lib/definitions/ParsePhoneNumberResponse';
import type {
  NumberParserAPIResponse,
  ParsePhoneNumberResultsItem,
} from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import cleanNumber from '@ringcentral-integration/commons/lib/cleanNumber';
import {
  isAnExtension,
  isExtensionExist,
} from '@ringcentral-integration/commons/lib/contactHelper';
import { hasNoAreaCode } from '@ringcentral-integration/commons/lib/hasNoAreaCode';
import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import { normalizeNumber } from '@ringcentral-integration/commons/lib/normalizeNumber';
import {
  AccountInfo,
  AppFeatures,
  Client,
  ExtensionInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Brand,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import { useToastItemView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  delegate,
  injectable,
  optional,
  portal,
  RcModule,
  RouterPlugin,
} from '@ringcentral-integration/next-core';
import {
  CountryCode,
  isUSOrCAOrPR,
  parse,
} from '@ringcentral-integration/phone-number';
import FormattedMessage from '@ringcentral-integration/widgets/components/FormattedMessage';
import { RcLink } from '@ringcentral/juno';
import React from 'react';
import type { PartyToFrom } from 'ringcentral-call-control/lib/Session';

import { CompanyContacts } from '../CompanyContacts';

import type {
  NumberValidateOptions,
  ParsePhoneNumberAPIParam,
  ParseResultItem,
  ValidatedPhoneNumbers,
  ValidateFormattedError,
  ValidateFormattingResult,
  ValidateParsedError,
  ValidateParsingResult,
  ValidateResult,
} from './NumberValidate.interface';
import { contextSourceOption } from './NumberValidate.interface';
import i18n, { t } from './i18n';

@injectable({
  name: 'NumberValidate',
})
export class NumberValidate extends RcModule {
  constructor(
    protected _router: RouterPlugin,
    protected _brand: Brand,
    protected _client: Client,
    protected _regionSettings: RegionSettings,
    protected _accountInfo: AccountInfo,
    protected _companyContacts: CompanyContacts,
    protected _appFeatures: AppFeatures,
    protected _toast: Toast,
    @optional() protected _extensionInfo?: ExtensionInfo,
    @optional('NumberValidateOptions')
    protected _numberValidateOptions?: NumberValidateOptions,
  ) {
    super();
  }

  /**
   * in session call data not include the extensionNumber in data source, that just phoneNumber, need distinguish does that have extensionNumber, if so return the parsed phoneNumber as extensionNumber
   * @param source
   * @returns
   */
  getPartyExtensionNumber = (source?: PartyToFrom) => {
    if (!source) return undefined;

    const extensionNumber = source.extensionNumber;
    if (extensionNumber || !source.phoneNumber) return extensionNumber;

    const isAvailableExtension = this.isAvailableExtension(source.phoneNumber);

    if (isAvailableExtension) return source.phoneNumber;

    return undefined;
  };

  isNoToNumber(input: string) {
    if (isBlank(input)) {
      return true;
    }
    const { hasInvalidChars, isValid } = parse({
      input,
      countryCode: this._regionSettings.countryCode,
    });
    if (hasInvalidChars || !isValid) {
      return true;
    }
    return false;
  }

  hasNoAreaCode(input: string) {
    const { countryCode, areaCode } = this._regionSettings;
    return (
      this._brand.brandConfig.allowRegionSettings &&
      hasNoAreaCode({ input, countryCode, areaCode })
    );
  }

  _isSpecial(phoneNumber: { special?: boolean }) {
    return !!phoneNumber?.special;
  }

  isAnExtensionNumber(number: string) {
    return isAnExtension(number, this._accountInfo.maxExtensionNumberLength);
  }

  /**
   * TODO: Currently we don't have clearly defined business rule on
   * what extension numbers are considered available for dialing.
   */
  getAvailableExtension(extensionNumber: string) {
    if (!this.isAnExtensionNumber(extensionNumber) || !this._extensionInfo) {
      return null;
    }
    const { isMultipleSiteEnabled, site } = this._extensionInfo;
    const { allContacts } = this._companyContacts;

    // TODO: that performance is not good, need to optimize will map or other way
    return (
      allContacts.find((item) =>
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
      // TODO: does need consider about isMultipleSiteEnabled, use above `isAvailableExtension`
      !this._companyContacts.isAvailableExtension(extensionNumber)
    );
  }

  isCompanyExtension(companyNumber: string, extensionNumber: string) {
    const { countryCode, areaCode } = this._regionSettings;
    const normalizedCompanyNumber = normalizeNumber({
      phoneNumber: companyNumber,
      countryCode,
      areaCode,
      maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
    });
    if (normalizedCompanyNumber !== this._accountInfo.mainCompanyNumber) {
      return false;
    }
    // TODO: does need consider about isMultipleSiteEnabled, use above `isAvailableExtension`
    return this._companyContacts.isAvailableExtension(extensionNumber);
  }

  @delegate('server')
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

  @delegate('server')
  async validateWithNumberParser(
    phoneNumbers: string[],
  ): Promise<ValidateParsingResult> {
    const maxExtensionNumberLength = this._accountInfo.maxExtensionNumberLength;
    const parsedNumbers = await this._numberParser(phoneNumbers);
    const errors: ValidateParsedError = [];
    const validatedPhoneNumbers: ValidatedPhoneNumbers = [];
    parsedNumbers.forEach((phoneNumber) => {
      const isSpecial = this._isSpecial(phoneNumber);
      const number = phoneNumber.originalString;
      const isAnExtensionNumber =
        !isSpecial && isAnExtension(number!, maxExtensionNumberLength);
      const extensionObj: {
        availableExtension?: string;
        isAnExtension?: boolean;
      } = { isAnExtension: isAnExtensionNumber };
      if (
        !this._companyContacts?.enableCompanyPublicApi &&
        isAnExtensionNumber
      ) {
        const number = phoneNumber.originalString;
        const availableExtension = this.getAvailableExtension(number!);
        if (!availableExtension) {
          errors.push({
            phoneNumber: phoneNumber.originalString!,
            type: 'notAnExtension',
          });
          return;
        }
        extensionObj.availableExtension = availableExtension;
      }
      validatedPhoneNumbers.push({ ...phoneNumber, ...extensionObj });
    });
    return {
      result: errors.length === 0,
      numbers: validatedPhoneNumbers,
      errors,
    };
  }

  @delegate('server')
  async _numberParser(phoneNumbers: string[]) {
    const { countryCode, areaCode } = this._regionSettings;
    const homeCountry = countryCode ? { homeCountry: countryCode } : {};
    const normalizedNumbers = phoneNumbers.map((phoneNumber) =>
      normalizeNumber({ phoneNumber, countryCode, areaCode }),
    );
    const response = await this._numberParserApi(
      normalizedNumbers,
      homeCountry,
    );
    return response.phoneNumbers!.map((phoneNumber) => ({
      ...phoneNumber,
      international:
        !!phoneNumber.country &&
        phoneNumber.country.callingCode !== response.homeCountry!.callingCode,
    }));
  }

  @delegate('server')
  async _numberParserApi(
    originalStrings: string[],
    homeCountry: {
      homeCountry?: string;
    },
  ) {
    const response = await this._client.numberParser().parse().post(
      {
        // @ts-expect-error
        originalStrings,
      },
      homeCountry,
    );
    return response as ParsePhoneNumberResponse;
  }

  // introduce number parser v2
  // need to remove private, so that we can test
  @delegate('server')
  async _parsingPhoneNumber(
    data: ParsePhoneNumberAPIParam,
  ): Promise<NumberParserAPIResponse | null> {
    try {
      const response = await this._client.service
        .platform()
        .post(`/restapi/v2/number-parser/parse`, data);
      return response.json();
    } catch (ex) {
      this._toast.danger({
        message: t('numberParseError'),
      });
      return null;
    }
  }

  @delegate('server')
  async parseNumbers(inputs: string[]): Promise<ParseResultItem[] | void> {
    const { countryCode, defaultAreaCode } = this._regionSettings;
    // TODO: API has not supported sub-brand. As a workaround, we use brandId instead of uBrandId here
    const brandId =
      this._accountInfo.serviceInfo?.brand?.id || this._brand.brandConfig.id;
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
        outboundCallPrefix: this._appFeatures.OCPValue,
        conflictHandling: this._appFeatures.enableSmartDialPlan
          ? 'Client'
          : 'Default',
        maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength,
      },
    };
    const response = await this._parsingPhoneNumber(data);
    return response?.results.map((result) => this.handleResult(result));
  }

  /**
   * Whether the number is an empty string or contains invalid characters
   */
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

  @portal
  private noAreaCodeToast = this._toast.create({
    view: () => {
      const { action } = useToastItemView();
      const { t } = useLocale(i18n);

      const areaCodeLink = (
        <RcLink
          onClick={async () => {
            await this._router.push('/settings/region');
            action!.close();
          }}
          data-sign="setAreaCode"
        >
          {t('areaCode')}
        </RcLink>
      );

      return (
        <FormattedMessage message={t('noAreaCode')} values={{ areaCodeLink }} />
      );
    },
    props: () => ({
      level: 'warning',
      ttl: 0,
    }),
  });

  /**
   * after validate the number, show the toast if the number is invalid, otherwise return false
   */
  handleValidateToasts(validateResult: ValidateResult) {
    if (validateResult.result) return;

    const error = validateResult.errors?.[0];
    if (error) {
      const type = error.type;

      if (type === 'noAreaCode') {
        return this.openNoAreaCodeToast();
      }

      return this._toast.warning({
        message: t(type),
        allowDuplicates: false,
      });
    }

    return this._toast.warning({
      message: t('recipientNumberInvalids'),
      allowDuplicates: false,
    });
  }

  openNoAreaCodeToast() {
    return this._toast.open(this.noAreaCodeToast);
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

        if (formatObj) {
          parseResult.parsedNumber =
            formatObj.e164Extended ||
            formatObj.e164 ||
            formatObj.dialableExtended;
        }
        break;
      case Category.Unknown:
        if (formatObj) {
          parseResult.parsedNumber =
            formatObj.dialableExtended || formatObj.dialable;
        }
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
    const parsedNumber =
      resultItem.numberDetails?.extensionNumber || originalString;
    const availableExtension = this.getAvailableExtension(parsedNumber);
    const isAnExtension = true;

    return {
      isAnExtension,
      parsedNumber,
      availableExtension,
    };
  }

  private handleAmbiguous(resultItem: ParsePhoneNumberResultsItem) {
    const originalString = resultItem.originalString;
    const availableExtension = this.getAvailableExtension(originalString);
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
    const phoneNumberISOCode = resultItem.numberDetails?.country?.isoCode;
    const regionSettingsCountryCode = this._regionSettings.countryCode;

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
