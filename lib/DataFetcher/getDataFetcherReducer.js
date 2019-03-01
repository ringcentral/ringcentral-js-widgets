"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultDataReducer = getDefaultDataReducer;
exports.getDefaultTimestampReducer = getDefaultTimestampReducer;
exports.getRetryCountReducer = getRetryCountReducer;
exports.default = getDataFetcherReducer;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDefaultDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        data = _ref.data,
        _ref$cleanOnReset = _ref.cleanOnReset,
        cleanOnReset = _ref$cleanOnReset === void 0 ? false : _ref$cleanOnReset,
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
}

function getDefaultTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        timestamp = _ref2.timestamp,
        cleanOnReset = _ref2.cleanOnReset;

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
  return (0, _redux.combineReducers)(_objectSpread({}, reducers, {
    status: (0, _getModuleStatusReducer.default)(types),
    retryCount: getRetryCountReducer(types)
  }));
}
//# sourceMappingURL=getDataFetcherReducer.js.map
