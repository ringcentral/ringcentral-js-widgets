"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMiddleSplit = getMiddleSplit;
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
var DEFAULT_MAX_LENGTH = 22;
var DEFAULT_MIDDLE = -8;
function getMiddleSplit(text, _ref) {
  var _ref$max = _ref.max,
    max = _ref$max === void 0 ? DEFAULT_MAX_LENGTH : _ref$max,
    _ref$middle = _ref.middle,
    middle = _ref$middle === void 0 ? DEFAULT_MIDDLE : _ref$middle;
  if ((text || '').trim() === '') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[getMiddleSplit] please make sure your input value must have string');
    }
    return {
      left: '',
      right: ''
    };
  }
  var left = text;
  var right = '';
  if (text.length > max) {
    right = text.slice(middle);
    left = text.replace(right, '');
  }
  return {
    left: left,
    right: right
  };
}
//# sourceMappingURL=getMiddleSplit.js.map
