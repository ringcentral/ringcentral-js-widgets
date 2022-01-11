"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRateLimiterReducer;
exports.getTimestampReducer = getTimestampReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        timestamp = _ref.timestamp;

    switch (type) {
      case types.startThrottle:
        return timestamp;

      case types.stopThrottle:
        return null;

      default:
        return state;
    }
  };
}

function getRateLimiterReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types)
  });
}
//# sourceMappingURL=getRateLimiterReducer.js.map
