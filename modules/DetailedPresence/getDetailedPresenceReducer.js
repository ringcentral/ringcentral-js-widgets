'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getDataReducer = getDataReducer;
exports.default = getDetailedPresenceReducer;

require('core-js/fn/array/find');

require('core-js/fn/array/find-index');

var _redux = require('redux');

var _getPresenceReducer = require('../Presence/getPresenceReducer');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _callLogHelpers = require('../../lib/callLogHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$activeCalls = _ref.activeCalls,
        activeCalls = _ref$activeCalls === undefined ? [] : _ref$activeCalls,
        timestamp = _ref.timestamp;

    switch (type) {
      case types.fetchSuccess:
      case types.notification:
        {
          return activeCalls.map(function (activeCall) {
            var existingCall = state.find(function (call) {
              return call.sessionId === activeCall.sessionId;
            });
            if (!existingCall) return (0, _extends3.default)({}, (0, _callLogHelpers.normalizeFromTo)(activeCall), { startTime: timestamp });
            if ((0, _callLogHelpers.isIntermediateCall)(activeCall)) return existingCall;
            return (0, _extends3.default)({}, existingCall, (0, _callLogHelpers.normalizeFromTo)(activeCall));
          })
          // [RCINT-3558] should ignore intermediate call states
          .filter(function (activeCall) {
            return !(0, _callLogHelpers.isIntermediateCall)(activeCall);
          });
        }
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

function getTelephonyStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        _ref2$telephonyStatus = _ref2.telephonyStatus,
        telephonyStatus = _ref2$telephonyStatus === undefined ? state : _ref2$telephonyStatus;

    switch (type) {
      case types.fetchSuccess:
      case types.notification:
        return telephonyStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

/* istanbul ignore next: unnecessary to test combineReducers */
function getDetailedPresenceReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    data: getDataReducer(types),
    dndStatus: (0, _getPresenceReducer.getDndStatusReducer)(types),
    telephonyStatus: getTelephonyStatusReducer(types)
  });
}
//# sourceMappingURL=getDetailedPresenceReducer.js.map
