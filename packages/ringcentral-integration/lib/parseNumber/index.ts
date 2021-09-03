import { parse } from '@ringcentral-integration/phone-number';

function parseNumber({
  phoneNumber,
  countryCode,
  areaCode,
}: {
  phoneNumber: string;
  countryCode: string;
  areaCode?: string;
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

export { parseNumber, parseNumber as default };
