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
exports.computed = void 0;
var _constant = require("../constant");
var _index = require("../utils/index");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var computed = function computed(depsCallback) {
  return function (target, key, descriptor) {
    if (process.env.NODE_ENV === 'development') {
      if (typeof descriptor.get !== 'function') {
        throw new Error("'@computed' should decorate a getter.");
      }
      if (typeof depsCallback !== 'function') {
        throw new Error("@computed() parameter should be a selector function for dependencies collection.");
      }
    }
    var depsCallbackSelector = (0, _index.createSelectorWithArray)(
    // This check will be skipped if the store has not been created yet.
    function (that) {
      var _that$storeKey$getSta, _that$storeKey;
      return [(_that$storeKey$getSta = (_that$storeKey = that[_constant.storeKey]) === null || _that$storeKey === void 0 ? void 0 : _that$storeKey.getState()) !== null && _that$storeKey$getSta !== void 0 ? _that$storeKey$getSta : {}];
    },
    // eslint-disable-next-line func-names
    function () {
      return depsCallback(this);
    });
    var selector = (0, _index.createSelectorWithArray)(function (that) {
      return depsCallbackSelector.call(that);
    }, descriptor.get);
    return _objectSpread(_objectSpread({}, descriptor), {}, {
      get: function get() {
        return selector.call(this);
      }
    });
  };
};
exports.computed = computed;
//# sourceMappingURL=computed.js.map
