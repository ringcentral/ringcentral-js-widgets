"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getDefaultGlobalStorageReducer;
exports.getClosedReducer = getClosedReducer;
exports.getMinimizedReducer = getMinimizedReducer;
exports.getPositionReducer = getPositionReducer;
exports.getSizeReducer = getSizeReducer;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _redux = require("redux");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function getClosedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      closed = _ref.closed;
    switch (type) {
      case types.syncClosed:
        return !!closed;
      case types.showAdapter:
        return false;
      default:
        return state;
    }
  };
}
function getMinimizedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref2.type,
      minimized = _ref2.minimized;
    switch (type) {
      case types.syncMinimized:
        return !!minimized;
      case types.showAdapter:
        return false;
      default:
        return state;
    }
  };
}
function getSizeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      width: 300,
      height: 500
    };
    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref3.type,
      _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? {} : _ref3$size;
    switch (type) {
      case types.syncSize:
        return _objectSpread(_objectSpread({}, state), size);
      default:
        return state;
    }
  };
}
function getPositionReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      translateX: null,
      translateY: null,
      minTranslateX: null,
      minTranslateY: null
    };
    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref4.type,
      _ref4$position = _ref4.position,
      _ref4$position2 = _ref4$position === void 0 ? {} : _ref4$position,
      _ref4$position2$trans = _ref4$position2.translateX,
      translateX = _ref4$position2$trans === void 0 ? state.translateX : _ref4$position2$trans,
      _ref4$position2$trans2 = _ref4$position2.translateY,
      translateY = _ref4$position2$trans2 === void 0 ? state.translateY : _ref4$position2$trans2,
      _ref4$position2$minTr = _ref4$position2.minTranslateX,
      minTranslateX = _ref4$position2$minTr === void 0 ? state.minTranslateX : _ref4$position2$minTr,
      _ref4$position2$minTr2 = _ref4$position2.minTranslateY,
      minTranslateY = _ref4$position2$minTr2 === void 0 ? state.minTranslateY : _ref4$position2$minTr2;
    if (type === types.syncPosition) {
      return {
        translateX: translateX,
        translateY: translateY,
        minTranslateX: minTranslateX,
        minTranslateY: minTranslateY
      };
    }
    return state;
  };
}
function getDefaultGlobalStorageReducer(types) {
  return (0, _redux.combineReducers)({
    closed: getClosedReducer(types),
    minimized: getMinimizedReducer(types),
    size: getSizeReducer(types),
    position: getPositionReducer(types)
  });
}
//# sourceMappingURL=getDefaultGlobalStorageReducer.js.map
