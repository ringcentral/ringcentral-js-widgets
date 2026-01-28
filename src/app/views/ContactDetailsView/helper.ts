import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  isE164,
  parseIncompletePhoneNumber,
} from '@ringcentral-integration/phone-number';

interface FormatContactPhoneNumberParam {
  phoneNumber: string;
  countryCode: string;
  isMultipleSiteEnabled: boolean;
  siteCode?: string;
  maxExtensionNumberLength?: number;
}

export const formatContactPhoneNumber = ({
  phoneNumber = '',
  countryCode,
  isMultipleSiteEnabled,
  siteCode,
  maxExtensionNumberLength = 6,
}: FormatContactPhoneNumberParam) => {
  if (!phoneNumber) {
    return phoneNumber;
  }
  // if the cleaned phone number is not a E164 format
  // we will show it directly, doesn't format it.
  const cleanedNumber = parseIncompletePhoneNumber(phoneNumber.toString());
  const isE164Number = isE164(cleanedNumber);
  if (isE164Number) {
    const formattedNumber = formatNumber({
      phoneNumber,
      countryCode,
      maxExtensionLength: maxExtensionNumberLength,
    });
    return formattedNumber;
  }
  // if multi-site is enabled then we will try to remove site code with same site
  if (isMultipleSiteEnabled && siteCode) {
    const formattedNumber = formatNumber({
      phoneNumber,
      countryCode,
      siteCode,
      isMultipleSiteEnabled,
      maxExtensionLength: maxExtensionNumberLength,
    });
    return formattedNumber;
  }
  return phoneNumber;
};
