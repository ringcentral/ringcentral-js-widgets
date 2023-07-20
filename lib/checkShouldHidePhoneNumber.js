"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkShouldHidePhoneNumber = checkShouldHidePhoneNumber;
var _ramda = require("ramda");
function checkShouldHidePhoneNumber(phoneNumber, contactMatches) {
  if (!phoneNumber || phoneNumber === '' || !contactMatches || !Array.isArray(contactMatches) || contactMatches.length === 0) {
    return false;
  }
  var filteredMatches = (0, _ramda.filter)(function (item) {
    return !item.hidden;
  }, contactMatches);
  if (filteredMatches.length === 0) {
    return true;
  }
  var filteredPhoneNumbers = (0, _ramda.reduce)(function (acc, x) {
    var numbers = (0, _ramda.filter)(function (item) {
      return !item.hidden;
    }, x.phoneNumbers || []);
    return acc.concat(numbers);
  }, [], filteredMatches);
  return filteredPhoneNumbers.length === 0;
}
//# sourceMappingURL=checkShouldHidePhoneNumber.js.map
