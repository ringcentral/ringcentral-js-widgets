import {
  isValidNumber,
  formatNumber,
  parseNumber
} from 'libphonenumber-js';

export default function isSameLocalNumber(a, b) {
  if (a === b) {
    return true;
  }
  if (isValidNumber(a)) {
    return formatNumber(parseNumber(a), 'National').replace(/[^\d]/g, '') === b;
  }
  if (isValidNumber(b)) {
    return formatNumber(parseNumber(b), 'National').replace(/[^\d]/g, '') === a;
  }
  return false;
}

// export default function isSameLocalNumber(a, b) {
//   if (a === b) return true;
//   if (isValidNumber(a)) {
//     return formatLocal(countryForE164Number(a), a).replace(/[^\d]/g, '') === b;
//   }
//   if (isValidNumber(b)) {
//     return formatLocal(countryForE164Number(b), b).replace(/[^\d]/g, '') === a;
//   }
//   return false;
// }
