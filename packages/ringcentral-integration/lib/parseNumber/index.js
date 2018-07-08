import { parse } from '@ringcentral-integration/phone-number';

export default function parseNumber({
  phoneNumber,
  countryCode,
  areaCode,
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
  });
  return {
    hasPlus,
    number,
    extension,
    isServiceNumber,
    hasInvalidChars,
  };
}
