"use strict";

require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkShouldHideContactUser = checkShouldHideContactUser;
require("core-js/modules/es.array.is-array.js");
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
