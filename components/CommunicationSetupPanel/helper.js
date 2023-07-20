"use strict";

require("core-js/modules/es.string.trim");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateValidChars = exports.isSplitterKey = void 0;
var isSplitterKey = function isSplitterKey(e) {
  return e.key === ',' || e.key === ';' || e.key === 'Unidentified' && (
  // for Safari (FF cannot rely on keyCode...)
  e.keyCode === 186 ||
  // semicolon
  e.keyCode === 188);
}; // comma
exports.isSplitterKey = isSplitterKey;
var invalidCharsRegExp = /[^\d*+#\-(). ]/;
var numberRegExp = /\d/;
var validateValidChars = function validateValidChars(input) {
  var chars = input.trim();
  return chars.length > 0 && !invalidCharsRegExp.test(chars) && numberRegExp.test(chars);
};
exports.validateValidChars = validateValidChars;
//# sourceMappingURL=helper.js.map
