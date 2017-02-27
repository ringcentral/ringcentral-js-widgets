'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getCallHistoryReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEndedCallsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        endedCalls = _ref.endedCalls,
        timestamp = _ref.timestamp;

    switch (type) {
      case types.addEndedCalls:
        return state.concat(endedCalls.map(function (call) {
          return (0, _extends3.default)({}, call, {
            duration: Math.floor((timestamp - call.startTime) / 1000)
          });
        }));
      case types.removeEndedCalls:
        return state.filter(function (call) {
          return !endedCalls.find(function (shouldRemove) {
            return shouldRemove.sessionId === call.sessionId;
          });
        });
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
function getCallHistoryReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    endedCalls: getEndedCallsReducer(types)
  });
}
//# sourceMappingURL=getCallHistoryReducer.js.map
