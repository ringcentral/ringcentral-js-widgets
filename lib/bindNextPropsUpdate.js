"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindNextPropsUpdate = bindNextPropsUpdate;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function bindNextPropsUpdate(instance) {
  return function (nextProps) {
    var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
    var isFocus = arguments.length > 2 ? arguments[2] : undefined;
    if (typeof nextProps[field] !== 'undefined' && nextProps[field] !== instance.props[field] && nextProps[field] !== instance.state[field]) {
      if (field === 'value' && isFocus) {
        return;
      }
      instance.setState(_defineProperty({}, field, nextProps[field]));
    }
  };
}
//# sourceMappingURL=bindNextPropsUpdate.js.map
