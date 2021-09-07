"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkShouldHidePhoneNumber = checkShouldHidePhoneNumber;

require("core-js/modules/es6.array.is-array");

var _ramda = require("ramda");

function checkShouldHidePhoneNumber(phoneNumber, contactMatches) {
  if (!phoneNumber || phoneNumber === '' || !contactMatches || !Array.isArray(contactMatches) || contactMatches.length === 0) {
    return false;
  }

  var filteredMatches = (0, _ramda.filter)(function (item) {
    return !item.hidden;
  }, contactMatches);

  if (filteredMatches.length && (0, _ramda.find)(function (m) {
    var _m$phoneNumbers;

    return !!(0, _ramda.find)(function (p) {
      return p.phoneNumber === phoneNumber && !p.hidden;
    }, (_m$phoneNumbers = m.phoneNumbers) !== null && _m$phoneNumbers !== void 0 ? _m$phoneNumbers : []);
  }, filteredMatches)) {
    return false;
  }

  return true;
}
//# sourceMappingURL=checkShouldHidePhoneNumber.js.map
