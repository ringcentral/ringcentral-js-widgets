'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getEndedCallsReducer = getEndedCallsReducer;
exports.default = getCallHistoryReducer;

var _redux = require('redux');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000; // 1day

function getEndedCallsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        endedCalls = _ref.endedCalls,
        timestamp = _ref.timestamp;

    switch (type) {
      case types.addEndedCalls:
        {
          var newState = state.slice();
          _ramda2.default.forEach(function (call) {
            var callWithDuration = (0, _extends3.default)({}, call, {
              duration: Math.floor((timestamp - call.startTime) / 1000)
            });
            var idx = _ramda2.default.findIndex(function (item) {
              return item.sessionId === call.sessionId;
            }, newState);
            if (idx > -1) {
              // replace old one if found
              newState[idx] = callWithDuration;
            } else {
              newState.push(callWithDuration);
            }
          }, endedCalls);
          return newState;
        }
      case types.removeEndedCalls:
        return state.filter(function (call) {
          return !endedCalls.find(function (shouldRemove) {
            return shouldRemove.sessionId === call.sessionId;
          }) ||
          // clean current overdue ended call (default clean time: 1day).
          new Date().getTime() - call.startTime > DEFAULT_CLEAN_TIME;
        });
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
function getCallHistoryReducer(types, reducers) {
  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types)
  }));
}
//# sourceMappingURL=getCallHistoryReducer.js.map
