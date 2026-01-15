"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = simpleHash;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.now.js");
/**
 * @function
 * @description A substitute for uuid. Given the use for the function, this should be sufficent to avoid collision.
 * @return {String} Random hash string.
 */
function simpleHash() {
  var token = "".concat(Math.floor(Math.random() * 10000), "-").concat(Date.now(), "-").concat(Math.floor(Math.random() * 10000));
  return btoa(token);
}
//# sourceMappingURL=index.js.map
