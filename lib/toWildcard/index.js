"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toWildcard;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _libphonenumberJs = require("libphonenumber-js");
function removeCountryCode(phoneNumber) {
  if ((0, _libphonenumberJs.isValidNumber)(phoneNumber)) {
    var countryCallingCode = (0, _libphonenumberJs.getCountryCallingCode)((0, _libphonenumberJs.parse)(phoneNumber).country);
    return phoneNumber.substr(countryCallingCode.length + 1);
  }
  return phoneNumber;
}
function toWildcard(_ref) {
  var phoneNumber = _ref.phoneNumber,
    _ref$wildcard = _ref.wildcard,
    wildcard = _ref$wildcard === void 0 ? '%' : _ref$wildcard;
  if (!phoneNumber || phoneNumber.length <= 6) {
    return phoneNumber;
  }
  var numberWithWildcard = removeCountryCode(phoneNumber).replace(/[^\d]/g, '').split('').join(wildcard);
  return "".concat(wildcard).concat(numberWithWildcard).concat(wildcard);
}
//# sourceMappingURL=index.js.map
