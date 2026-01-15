"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByName = void 0;
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var sortByName = exports.sortByName = function sortByName(sourceArr, key) {
  return sourceArr.sort(function (a, b) {
    var aName = a[key].toString().toLowerCase();
    var bName = b[key].toString().toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
};
//# sourceMappingURL=sortByName.js.map
