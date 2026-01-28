"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findFirstFIndex = void 0;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.number.max-safe-integer.js");
var findFirstFIndex = exports.findFirstFIndex = function findFirstFIndex(str, searchString) {
  var index = str.indexOf(searchString);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};
//# sourceMappingURL=helper.js.map
