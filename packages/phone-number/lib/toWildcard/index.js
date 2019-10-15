import { isValidNumber, getCountryCallingCode, parse } from 'libphonenumber-js';

function removeCountryCode(phoneNumber) {
  if (isValidNumber(phoneNumber)) {
    const countryCallingCode = getCountryCallingCode(
      parse(phoneNumber).country,
    );
    return phoneNumber.substr(countryCallingCode.length + 1);
  }
  return phoneNumber;
}

export default function toWildcard({ phoneNumber, wildcard = '%' }) {
  if (!phoneNumber || phoneNumber.length <= 6) {
    return phoneNumber;
  }
  const numberWithWildcard = removeCountryCode(phoneNumber)
    .replace(/[^\d]/g, '')
    .split('')
    .join(wildcard);
  return `${wildcard}${numberWithWildcard}${wildcard}`;
}
