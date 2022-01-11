import { parse } from '@ringcentral-integration/phone-number';

export function hasNoAreaCode({
  input,
  countryCode,
  areaCode,
}: {
  input: string;
  countryCode: string;
  areaCode: string;
}) {
  const { hasPlus, phoneNumber, isServiceNumber } = parse({
    input,
    countryCode,
  });
  return (
    !isServiceNumber &&
    !hasPlus &&
    phoneNumber.length === 7 &&
    (countryCode === 'CA' || countryCode === 'US') &&
    areaCode === ''
  );
}

// allowRegionSettings
