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
exports["default"] = getDefaultGlobalStorageReducer;
exports.getClosedReducer = getClosedReducer;
exports.getMinimizedReducer = getMinimizedReducer;
exports.getPositionReducer = getPositionReducer;
exports.getSizeReducer = getSizeReducer;
var _redux = require("redux");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
      _ref4$position = _ref4.position;
    _ref4$position = _ref4$position === void 0 ? {} : _ref4$position;
    var _ref4$position$transl = _ref4$position.translateX,
      translateX = _ref4$position$transl === void 0 ? state.translateX : _ref4$position$transl,
      _ref4$position$transl2 = _ref4$position.translateY,
      translateY = _ref4$position$transl2 === void 0 ? state.translateY : _ref4$position$transl2,
      _ref4$position$minTra = _ref4$position.minTranslateX,
      minTranslateX = _ref4$position$minTra === void 0 ? state.minTranslateX : _ref4$position$minTra,
      _ref4$position$minTra2 = _ref4$position.minTranslateY,
      minTranslateY = _ref4$position$minTra2 === void 0 ? state.minTranslateY : _ref4$position$minTra2;
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
