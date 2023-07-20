"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isASCII = isASCII;
// https://tw.coderbridge.com/questions/d19c96a5c7e4476eb374f87d7a00cf3c
function isASCII(str) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}
//# sourceMappingURL=isASCII.js.map
