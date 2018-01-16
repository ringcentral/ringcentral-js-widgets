"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simpleHash;
/**
 * @function
 * @description A substitute for uuid. Given the use for the function, this should be sufficent to avoid collision.
 * @return {String} Random hash string.
 */
function simpleHash() {
  var token = Math.floor(Math.random() * 10000) + "-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
  return btoa(token);
}
//# sourceMappingURL=index.js.map
