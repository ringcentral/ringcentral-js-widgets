'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameLocalNumber;

var _libphonenumberJs = require('libphonenumber-js');

function isSameLocalNumber(a, b) {
  if (a === b) {
    return true;
  }
  if ((0, _libphonenumberJs.isValidNumber)(a)) {
    return (0, _libphonenumberJs.formatNumber)((0, _libphonenumberJs.parseNumber)(a), 'National').replace(/[^\d]/g, '') === b;
  }
  if ((0, _libphonenumberJs.isValidNumber)(b)) {
    return (0, _libphonenumberJs.formatNumber)((0, _libphonenumberJs.parseNumber)(b), 'National').replace(/[^\d]/g, '') === a;
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
//# sourceMappingURL=index.js.map
