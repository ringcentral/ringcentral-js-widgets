'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getDataReducer = getDataReducer;
exports.getTelephonyStatusReducer = getTelephonyStatusReducer;
exports.default = getDetailedPresenceReducer;

require('core-js/fn/array/find');

require('core-js/fn/array/find-index');

var _ramda = require('ramda');

var _getPresenceReducer = require('../Presence/getPresenceReducer');

var _getPresenceReducer2 = _interopRequireDefault(_getPresenceReducer);

var _callLogHelpers = require('../../lib/callLogHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeIntermediateCall = (0, _ramda.reduce)(function (result, activeCall) {
  if (!(0, _callLogHelpers.isIntermediateCall)(activeCall) && !(0, _ramda.find)(function (item) {
    return item.sessionId === activeCall.sessionId && item.direction === activeCall.direction;
  }, result)) {
    result.push(activeCall);
  }
  return result;
});

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        timestamp = _ref.timestamp,
        _ref$activeCalls = _ref.activeCalls,
        activeCalls = _ref$activeCalls === undefined ? [] : _ref$activeCalls,
        _ref$totalActiveCalls = _ref.totalActiveCalls,
        totalActiveCalls = _ref$totalActiveCalls === undefined ? 0 : _ref$totalActiveCalls;

    switch (type) {
      case types.fetchSuccess:
      case types.notification:
        {
          if (activeCalls.length !== totalActiveCalls) {
            return state;
          }
          return (0, _ramda.map)(function (activeCall) {
            var existingCall = state.find(function (call) {
              return call.sessionId === activeCall.sessionId;
            });
            if (!existingCall) {
              var normalizedCall = (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall));
              var startTime = normalizedCall.startTime || timestamp;
              var offset = Math.min(timestamp - startTime, 0);
              return (0, _extends3.default)({}, normalizedCall, {
                startTime: startTime,
                offset: offset
              });
            }
            return (0, _extends3.default)({}, existingCall, (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall)));
          }, removeIntermediateCall([], activeCalls));
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

function getDetailedPresenceReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _getPresenceReducer2.default)(types, (0, _extends3.default)({}, reducers, {
    data: getDataReducer(types),
    telephonyStatus: getTelephonyStatusReducer(types)
  }));
}
//# sourceMappingURL=getDetailedPresenceReducer.js.map
