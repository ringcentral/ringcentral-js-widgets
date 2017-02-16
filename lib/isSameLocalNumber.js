'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameLocalNumber;

var _phoneformat = require('phoneformat.js');

function isSameLocalNumber(a, b) {
  if (a === b) return true;
  if ((0, _phoneformat.isValidNumber)(a)) {
    return (0, _phoneformat.formatLocal)((0, _phoneformat.countryForE164Number)(a), a).replace(/[^\d]/g, '') === b;
  }
  if ((0, _phoneformat.isValidNumber)(b)) {
    return (0, _phoneformat.formatLocal)((0, _phoneformat.countryForE164Number)(b), b).replace(/[^\d]/g, '') === a;
  }
  return false;
}
//# sourceMappingURL=isSameLocalNumber.js.map
