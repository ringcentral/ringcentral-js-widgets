import normalizeNumber from './normalizeNumber';
import isValidNumber from './isValidNumber';
import isNoAreaCode from './isNoAreaCode';

function numberParser(phoneNumbers, regionSettings) {
  const { countryCode, areaCode } = regionSettings;
  const normalizedNumbers = phoneNumbers.map((phoneNumber) =>
    normalizeNumber({ phoneNumber, countryCode, areaCode }),
  );
  return normalizedNumbers;
}

function numberFormat(phoneNumbers, regionSettings, brandId) {
  const errors = [];
  phoneNumbers.map((phoneNumber) => {
    if (!isValidNumber(phoneNumber, regionSettings)) {
      errors.push({ phoneNumber, type: 'noToNumber' });
      return null;
    }
    if (isNoAreaCode(phoneNumber, regionSettings, brandId)) {
      errors.push({ phoneNumber, type: 'noAreaCode' });
    }
    return null;
  });
  return {
    result: errors.length === 0,
    errors,
  };
}

export default function validateNumbers(phoneNumbers, regionSettings, brandId) {
  const formatedResult = numberFormat(phoneNumbers, regionSettings, brandId);
  if (!formatedResult.result) {
    formatedResult.errors.forEach((error) => {
      throw error;
    });
    return formatedResult;
  }
  const parsedResult = numberParser(phoneNumbers, regionSettings);
  return parsedResult;
}
