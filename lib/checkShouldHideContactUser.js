"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkShouldHideContactUser = checkShouldHideContactUser;

require("core-js/modules/es6.array.is-array");

var _ramda = require("ramda");

function checkShouldHideContactUser(contactMatches) {
  if (!contactMatches || !Array.isArray(contactMatches) || contactMatches.length === 0) {
    return true;
  }

  var filteredMatches = (0, _ramda.filter)(function (contact) {
    return !contact.hidden;
  }, contactMatches);
  return !filteredMatches.length;
}
//# sourceMappingURL=checkShouldHideContactUser.js.map
