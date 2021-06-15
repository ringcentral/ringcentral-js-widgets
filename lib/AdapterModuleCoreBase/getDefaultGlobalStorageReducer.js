"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClosedReducer = getClosedReducer;
exports.getMinimizedReducer = getMinimizedReducer;
exports.getSizeReducer = getSizeReducer;
exports.getPositionReducer = getPositionReducer;
exports["default"] = getDefaultGlobalStorageReducer;

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
