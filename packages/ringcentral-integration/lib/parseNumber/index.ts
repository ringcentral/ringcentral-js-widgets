import type { CountryCode } from '@ringcentral-integration/phone-number';
import { parse } from '@ringcentral-integration/phone-number';

function parseNumber({
  phoneNumber,
  countryCode,
  areaCode,
  maxExtensionLength,
}: {
  phoneNumber: string;
  countryCode: CountryCode;
  areaCode?: string;
  maxExtensionLength?: number;
}) {
  const {
    hasPlus,
    phoneNumber: number,
    isServiceNumber,
    extension,
    hasInvalidChars,
  } = parse({
    input: phoneNumber,
    countryCode,
    areaCode,
    maxExtensionLength,
  });
  return {
    hasPlus,
    number,
    extension,
    isServiceNumber,
    hasInvalidChars,
  };
}

export { parseNumber as default, parseNumber };
