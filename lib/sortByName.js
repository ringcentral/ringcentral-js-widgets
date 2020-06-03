"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByName = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.sort");

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
