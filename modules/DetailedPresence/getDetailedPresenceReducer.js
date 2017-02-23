'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.isIntermediateCall = isIntermediateCall;
exports.samePresenceCallAs = samePresenceCallAs;
exports.removeDuplicateIntermediateCalls = removeDuplicateIntermediateCalls;
exports.removeEndedCalls = removeEndedCalls;
exports.processActiveCalls = processActiveCalls;
exports.getCallsReducer = getCallsReducer;
exports.default = getDetailedPresenceReducer;

require('core-js/fn/array/find');

require('core-js/fn/array/find-index');

var _redux = require('redux');

var _getPresenceReducer = require('../Presence/getPresenceReducer');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _telephonyStatuses = require('../../enums/telephonyStatuses');

var _telephonyStatuses2 = _interopRequireDefault(_telephonyStatuses);

var _terminationTypes = require('../../enums/terminationTypes');

var _terminationTypes2 = _interopRequireDefault(_terminationTypes);

var _callLogHelpers = require('../../lib/callLogHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isIntermediateCall() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.telephonyStatus === _telephonyStatuses2.default.noCall && call.terminationType === _terminationTypes2.default.intermediate;
}
function samePresenceCallAs(targetCall) {
  return function (call) {
    return call.id === targetCall.id || call.sessionId === targetCall.sessionId;
  };
}
function removeDuplicateIntermediateCalls(calls) {
  var resultCalls = [];
  var indexMap = {};
  calls.forEach(function (call) {
    var isIntermediate = isIntermediateCall(call);
    if (!indexMap[call.sessionId]) {
      indexMap[call.sessionid] = {
        index: resultCalls.length,
        isIntermediate: isIntermediate
      };
      resultCalls.push(call);
    } else if (!isIntermediate) {
      indexMap[call.sessionId].isIntermediate = false;
      resultCalls[indexMap[call.sessionId].index] = call;
    }
  });
  return resultCalls;
}

function removeEndedCalls() {
  var activeCalls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return activeCalls.filter(function (call) {
    return !(0, _callLogHelpers.isEnded)(call);
  });
}

function processActiveCalls(activeCalls) {
  return removeEndedCalls((0, _callLogHelpers.removeInboundRingOutLegs)(removeDuplicateIntermediateCalls(activeCalls).map(_callLogHelpers.normalizeFromTo)));
}

function getCallsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        activeCalls = _ref.activeCalls,
        timestamp = _ref.timestamp;

    switch (type) {
      case types.fetchSuccess:
      case types.notification:
        {
          if (activeCalls) {
            return processActiveCalls(activeCalls).map(function (activeCall) {
              var currentCall = state.find(samePresenceCallAs(activeCall));
              if (!currentCall) return (0, _extends3.default)({}, activeCall, { startTime: timestamp });
              if (isIntermediateCall(activeCall)) return currentCall;
              return (0, _extends3.default)({}, currentCall, activeCall);
            }).sort(_callLogHelpers.sortByStartTime);
          }
          return state;
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
    calls: getCallsReducer(types),
    dndStatus: (0, _getPresenceReducer.getDndStatusReducer)(types),
    telephonyStatus: getTelephonyStatusReducer(types)
  });
}
//# sourceMappingURL=getDetailedPresenceReducer.js.map
