import { parse } from '@ringcentral-integration/phone-number';

export default function isNoAreaCode(input, regionSettings, brandId) {
  const { hasPlus, phoneNumber, isServiceNumber } = parse({
    input,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
  });
  const { countryCode, areaCode } = regionSettings;
  if (
    brandId === '1210' &&
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
