import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  isE164,
  parseIncompletePhoneNumber,
} from '@ringcentral-integration/phone-number';

export const formatContactPhoneNumber = (
  phoneNumber: string = '',
  countryCode: string,
  isMultipleSiteEnabled: boolean,
  siteCode?: string,
) => {
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
    });
    return formattedNumber;
  }
  return phoneNumber;
};
