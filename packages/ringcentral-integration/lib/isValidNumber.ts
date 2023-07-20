import type { CountryCode } from '@ringcentral-integration/phone-number';
import { parse } from '@ringcentral-integration/phone-number';

import { isBlank } from './isBlank';

function isValidNumber({
  input,
  countryCode,
}: {
  input: string;
  countryCode: CountryCode;
}) {
  if (isBlank(input)) {
    return false;
  }
  const { hasInvalidChars, isValid } = parse({
    input,
    countryCode,
  });
  if (hasInvalidChars || !isValid) {
    return false;
  }
  return true;
}

export { isValidNumber as default, isValidNumber };
