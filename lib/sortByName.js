"use strict";

require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByName = void 0;
var sortByName = function sortByName(sourceArr, key) {
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
exports.sortByName = sortByName;
//# sourceMappingURL=sortByName.js.map
