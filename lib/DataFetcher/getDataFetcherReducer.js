"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetDataReducer = createGetDataReducer;
exports.createGetTimestampReducer = createGetTimestampReducer;
exports.getRetryCountReducer = getRetryCountReducer;
exports.getDataFetcherReducer = getDataFetcherReducer;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createGetDataReducer(cleanOnReset) {
  return function (types) {
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _ref = arguments.length > 1 ? arguments[1] : undefined,
          type = _ref.type,
          data = _ref.data,
          _ref$hasPermission = _ref.hasPermission,
          hasPermission = _ref$hasPermission === void 0 ? true : _ref$hasPermission;

      switch (type) {
        case types.fetchSuccess:
          return data;

        case types.initSuccess:
          if (hasPermission) {
            return state;
          }

          return null;

        case types.resetSuccess:
          if (cleanOnReset) {
            return null;
          }

          return state;

        default:
          return state;
      }
    };
  };
}

function createGetTimestampReducer(cleanOnReset) {
  return function (types) {
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
          type = _ref2.type,
          timestamp = _ref2.timestamp;

      switch (type) {
        case types.fetchSuccess:
          return timestamp || state;

        case types.resetSuccess:
          if (cleanOnReset) {
            return null;
          }

          return state;

        default:
          return state;
      }
    };
  };
}

function getRetryCountReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type;

    switch (type) {
      case types.init:
      case types.initSuccess:
      case types.reset:
      case types.resetSuccess:
        return 0;

      case types.retry:
        return state + 1;

      default:
        return state;
    }
  };
}

function getDataFetcherReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    status: (0, _getModuleStatusReducer["default"])(types),
    retryCount: getRetryCountReducer(types)
  }));
}
//# sourceMappingURL=getDataFetcherReducer.js.map
