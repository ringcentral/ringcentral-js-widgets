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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
