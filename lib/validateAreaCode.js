'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateAreaCode;
function validateAreaCode(code) {
  return !(code === undefined || code.trim().length === 0 || code.length > 0 && (code.length !== 3 || code[0] === '0'));
}
//# sourceMappingURL=validateAreaCode.js.map
