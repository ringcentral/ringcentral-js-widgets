"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateValidChars = exports.isSplitterKey = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.trim.js");
var isSplitterKey = exports.isSplitterKey = function isSplitterKey(e) {
  return e.key === ',' || e.key === ';' || e.key === 'Unidentified' && (
  // for Safari (FF cannot rely on keyCode...)
  e.keyCode === 186 ||
  // semicolon
  e.keyCode === 188);
}; // comma

var invalidCharsRegExp = /[^\d*+#\-(). ]/;
var numberRegExp = /\d/;
var validateValidChars = exports.validateValidChars = function validateValidChars(input) {
  var chars = input.trim();
  return chars.length > 0 && !invalidCharsRegExp.test(chars) && numberRegExp.test(chars);
};
//# sourceMappingURL=helper.js.map
