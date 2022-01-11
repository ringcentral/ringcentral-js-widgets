import { hasNoAreaCode } from './hasNoAreaCode';
import { isValidNumber } from './isValidNumber';
import { normalizeNumber } from './normalizeNumber';

function numberParser({
  phoneNumbers,
  countryCode,
  areaCode,
}: {
  phoneNumbers: string[];
  countryCode: string;
  areaCode: string;
}) {
  const normalizedNumbers = phoneNumbers.map((phoneNumber) =>
    normalizeNumber({ phoneNumber, countryCode, areaCode }),
  );
  return normalizedNumbers;
}

function numberFormat({
  phoneNumbers,
  countryCode,
  areaCode,
  allowRegionSettings,
}: {
  phoneNumbers: string[];
  countryCode: string;
  areaCode: string;
  allowRegionSettings: boolean;
}) {
  const errors: { phoneNumber: string; type: string }[] = [];
  phoneNumbers.map((phoneNumber) => {
    if (!isValidNumber({ input: phoneNumber, countryCode })) {
      errors.push({ phoneNumber, type: 'noToNumber' });
      return null;
    }
    if (
      allowRegionSettings &&
      hasNoAreaCode({
        input: phoneNumber,
        areaCode,
        countryCode,
      })
    ) {
      errors.push({ phoneNumber, type: 'noAreaCode' });
    }
    return null;
  });
  return {
    result: errors.length === 0,
    errors,
  };
}

export function validateNumbers({
  phoneNumbers,
  countryCode,
  areaCode,
  allowRegionSettings,
}: {
  phoneNumbers: string[];
  countryCode: string;
  areaCode: string;
  allowRegionSettings: boolean;
}) {
  const formattedResult = numberFormat({
    phoneNumbers,
    countryCode,
    areaCode,
    allowRegionSettings,
  });
  if (!formattedResult.result) {
    formattedResult.errors.forEach((error) => {
      throw error;
    });
    return formattedResult;
  }
  const parsedResult = numberParser({
    phoneNumbers,
    countryCode,
    areaCode,
  });
  return parsedResult;
}
