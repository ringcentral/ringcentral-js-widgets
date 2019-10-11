import { parse } from '@ringcentral-integration/phone-number';
import isBlank from './isBlank';

export default function isValidNumber(input, regionSettings) {
  if (isBlank(input)) {
    return false;
  }
  const { hasInvalidChars, isValid } = parse({
    input,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
  });
  if (hasInvalidChars || !isValid) {
    return false;
  }
  return true;
}
