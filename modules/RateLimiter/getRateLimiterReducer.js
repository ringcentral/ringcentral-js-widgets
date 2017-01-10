'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimestampReducer = getTimestampReducer;
exports.default = getRateLimiterReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
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
    status: (0, _getModuleStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getRateLimiterReducer.js.map
