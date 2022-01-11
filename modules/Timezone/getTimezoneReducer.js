"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getReducer;
exports.getCacheExpiredAtReducer = getCacheExpiredAtReducer;
exports.getTimezonesReducer = getTimezonesReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTimezonesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        timezones = _ref.timezones;

    if (type === types.updateTimezones) {
      return timezones;
    }

    return state;
  };
}

function getCacheExpiredAtReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        cacheExpiredAt = _ref2.cacheExpiredAt;

    if (type === types.updateCacheExpiredAt) {
      return cacheExpiredAt;
    }

    return state;
  };
}

function getReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    timezones: getTimezonesReducer(types),
    cacheExpiredAt: getCacheExpiredAtReducer(types)
  });
}
//# sourceMappingURL=getTimezoneReducer.js.map
