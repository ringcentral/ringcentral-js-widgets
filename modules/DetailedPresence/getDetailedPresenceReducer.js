'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.isIntermediateCall = isIntermediateCall;
exports.samePresenceCallAs = samePresenceCallAs;
exports.removeDuplicateIntermediateCalls = removeDuplicateIntermediateCalls;
exports.removeEndedCalls = removeEndedCalls;
exports.removeInboundRingOutLegs = removeInboundRingOutLegs;
exports.processActiveCalls = processActiveCalls;
exports.getCallsReducer = getCallsReducer;
exports.default = getDetailedPresenceReducer;

require('core-js/fn/array/find');

require('core-js/fn/array/find-index');

var _redux = require('redux');

var _phoneformat = require('phoneformat.js');

var _getPresenceReducer = require('../Presence/getPresenceReducer');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _telephonyStatus = require('../../enums/telephonyStatus');

var _telephonyStatus2 = _interopRequireDefault(_telephonyStatus);

var _terminationTypes = require('../../enums/terminationTypes');

var _terminationTypes2 = _interopRequireDefault(_terminationTypes);

var _callLogHelpers = require('../../lib/callLogHelpers');

var _isSameLocalNumber = require('../../lib/isSameLocalNumber');

var _isSameLocalNumber2 = _interopRequireDefault(_isSameLocalNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isIntermediateCall() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.telephonyStatus === _telephonyStatus2.default.noCall && call.terminationType === _terminationTypes2.default.intermediate;
}
function samePresenceCallAs(targetCall) {
  return function (call) {
    return call.id === targetCall.id || call.from === targetCall.from && call.to === targetCall.to && call.sessionId === targetCall.sessionId;
  };
}
function removeDuplicateIntermediateCalls(calls) {
  var resultCalls = [];
  var indexMap = new _map2.default();
  calls.forEach(function (call) {
    var isIntermediate = isIntermediateCall(call);
    if (!indexMap.has(call.sessionId)) {
      indexMap.set(call.sessionId, { index: resultCalls.length, isIntermediate: isIntermediate });
      resultCalls.push(call);
    } else if (!isIntermediate) {
      var record = indexMap.get(call.sessionId);
      record.isIntermediate = false;
      resultCalls[record.index] = call;
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

function removeInboundRingOutLegs(calls) {
  var output = [];
  var outbounds = calls.filter(_callLogHelpers.isOutbound);
  calls.filter(_callLogHelpers.isInbound).forEach(function (inbound) {
    var outboundIndex = outbounds.findIndex(function (call) {
      return (0, _callLogHelpers.areTwoLegs)(inbound, call);
    });
    if (outboundIndex > -1) {
      var outbound = (0, _extends3.default)({}, outbounds.splice(outboundIndex, 1).pop());
      // Handle inboundLeg.from is '+19072028624', but outboundLeg.to is '9072028624'
      // https://jira.ringcentral.com/browse/RCINT-3127
      if ((0, _isSameLocalNumber2.default)(inbound.from, outbound.to) && (0, _phoneformat.isValidNumber)(inbound.from)) {
        outbound.to = inbound.from;
      }
      if ((0, _callLogHelpers.isOnHold)(inbound)) {
        outbound.telephonyStatus = _telephonyStatus2.default.onHold;
      }
      output.push(outbound);
    } else {
      output.push(inbound);
    }
  });
  return output.concat(outbounds);
}

function processActiveCalls(activeCalls) {
  return removeEndedCalls(removeInboundRingOutLegs(removeDuplicateIntermediateCalls(activeCalls)));
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
            }).sort(_callLogHelpers.sortCallsByStartTime);
          }
          return state;
        }
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
    dndStatus: (0, _getPresenceReducer.getDndStatusReducer)(types)
  });
}
//# sourceMappingURL=getDetailedPresenceReducer.js.map
