'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.isInbound = isInbound;
exports.isOutbound = isOutbound;
exports.isRinging = isRinging;
exports.isMissed = isMissed;
exports.hasRingingCalls = hasRingingCalls;
exports.isEnded = isEnded;
exports.hasEndedCalls = hasEndedCalls;
exports.isOnHold = isOnHold;
exports.isIntermediateCall = isIntermediateCall;
exports.isSelfCall = isSelfCall;
exports.sortBySessionId = sortBySessionId;
exports.sortByStartTime = sortByStartTime;
exports.normalizeStartTime = normalizeStartTime;
exports.normalizeFromTo = normalizeFromTo;
exports.areTwoLegs = areTwoLegs;
exports.removeInboundRingOutLegs = removeInboundRingOutLegs;
exports.removeDuplicateIntermediateCalls = removeDuplicateIntermediateCalls;
exports.removeDuplicateSelfCalls = removeDuplicateSelfCalls;

require('core-js/fn/array/find');

var _phoneformat = require('phoneformat.js');

var _HashMap = require('./HashMap');

var _HashMap2 = _interopRequireDefault(_HashMap);

var _callActions = require('../enums/callActions');

var _callActions2 = _interopRequireDefault(_callActions);

var _callDirections = require('../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _callResults = require('../enums/callResults');

var _callResults2 = _interopRequireDefault(_callResults);

var _telephonyStatuses = require('../enums/telephonyStatuses');

var _telephonyStatuses2 = _interopRequireDefault(_telephonyStatuses);

var _terminationTypes = require('../enums/terminationTypes');

var _terminationTypes2 = _interopRequireDefault(_terminationTypes);

var _isSameLocalNumber = require('./isSameLocalNumber');

var _isSameLocalNumber2 = _interopRequireDefault(_isSameLocalNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* call direction helpers */
function isInbound() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.direction === _callDirections2.default.inbound;
}

function isOutbound() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.direction === _callDirections2.default.outbound;
}

/* status helpers */
function isRinging() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.telephonyStatus === _telephonyStatuses2.default.ringing;
}

var callResultsToMissedMap = _HashMap2.default.fromSet({
  set: (0, _keys2.default)(_callResults2.default).map(function (key) {
    return _callResults2.default[key];
  }),
  getValue: function getValue(result) {
    return [_callResults2.default.missed, _callResults2.default.hangUp, _callResults2.default.busy, _callResults2.default.voicemail, _callResults2.default.rejected].indexOf(result) > -1;
  }
});
function isMissed() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return !!callResultsToMissedMap[call.result];
}

function hasRingingCalls() {
  var calls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return !!calls.find(isRinging);
}

function isEnded() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.telephonyStatus === _telephonyStatuses2.default.noCall && call.terminationType === _terminationTypes2.default.final;
}

function hasEndedCalls(calls) {
  return !!calls.find(isEnded);
}

function isOnHold() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.telephonyStatus === _telephonyStatuses2.default.onHold;
}

function isIntermediateCall() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.terminationType === _terminationTypes2.default.intermediate;
}

function isSelfCall() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (call.to && call.from) {
    return call.to.phoneNumber === call.from.phoneNumber;
  }
  return false;
}

/* sort functions */

function sortBySessionId(a, b) {
  if (a.sessionId === b.sessionId) return 0;
  return a.sessionId > b.sessionId ? 1 : -1;
}
function sortByStartTime(a, b) {
  if (a.startTime === b.startTime) return 0;
  return a.startTime > b.startTime ? -1 : 1;
}

function normalizeStartTime(call) {
  var result = (0, _extends3.default)({}, call);
  if (call.startTime) {
    result.startTime = new Date(call.startTime).getTime();
  }
  return result;
}

function normalizeFromTo(call) {
  return (0, _extends3.default)({}, call, {
    from: (0, _typeof3.default)(call.from) === 'object' ? call.from : { phoneNumber: call.from },
    to: (0, _typeof3.default)(call.to) === 'object' ? call.to : { phoneNumber: call.to }
  });
}

/* ringout leg helpers */
function areTwoLegs(inbound, outbound) {
  if (isInbound(inbound) && isOutbound(outbound)) {
    switch (Math.abs(inbound.sessionId - outbound.sessionId)) {
      case 1000:
      case 2000:
      case 3000:
      case 4000:
        {
          // presence
          if (inbound.from && inbound.to && outbound.from && outbound.to && (0, _isSameLocalNumber2.default)(inbound.from.phoneNumber, outbound.to.phoneNumber) && (0, _isSameLocalNumber2.default)(inbound.to.phoneNumber, outbound.from.phoneNumber)) {
            return true;
          }
          // call-log
          if (inbound.from && inbound.to && outbound.from && outbound.to && inbound.action === _callActions2.default.phoneCall && (outbound.action === _callActions2.default.ringOutWeb || outbound.action === _callActions2.default.ringOutPC || outbound.action === _callActions2.default.ringOutMobile) && (inbound.from.phoneNumber === outbound.from.phoneNumber || inbound.from.extensionNumber === outbound.from.extensionNumber) && inbound.to.phoneNumber === outbound.to.phoneNumber) {
            return true;
          }
          break;
        }
      default:
        return false;
    }
  }
  return false;
}

function removeInboundRingOutLegs(calls) {
  var output = [];
  var outbounds = calls.filter(isOutbound);
  calls.filter(isInbound).forEach(function (inbound) {
    var outboundIndex = outbounds.findIndex(function (call) {
      return areTwoLegs(inbound, call);
    });
    if (outboundIndex > -1) {
      var outbound = outbounds.splice(outboundIndex, 1)[0];

      if (inbound.action && outbound.action) {
        // from call-log
        var call = (0, _extends3.default)({}, outbound, {
          outboundLeg: outbound,
          inboundLeg: inbound,
          from: (0, _extends3.default)({}, inbound.to),
          to: (0, _extends3.default)({}, inbound.from),
          result: inbound.result
        });
        output.push(call);
      } else {
        var _call = (0, _extends3.default)({}, outbound, {
          outboundLeg: outbound,
          inboundLeg: inbound
        });
        // Handle inboundLeg.from is '+19072028624', but outboundLeg.to is '9072028624'
        // https://jira.ringcentral.com/browse/RCINT-3127
        if ((0, _phoneformat.isValidNumber)(inbound.from && inbound.from.phoneNumber) && (0, _isSameLocalNumber2.default)(inbound.from.phoneNumber, outbound.to && outbound.to.phoneNumber)) {
          _call.to = (0, _extends3.default)({}, outbound.to, {
            phoneNumber: inbound.from.phoneNumber
          });
          outbound.to.phoneNumber = inbound.from.phoneNumber;
        }
        if (isOnHold(inbound)) {
          _call.telephonyStatus = _telephonyStatuses2.default.onHold;
        }
        output.push(_call);
      }

      // output.push(outbound);
    } else {
      output.push(inbound);
    }
  });
  return output.concat(outbounds);
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

// there are two active calls with same sessionId when user call self.
function removeDuplicateSelfCalls(calls) {
  var resultCalls = [];
  var indexMap = {};
  calls.forEach(function (call) {
    var isSelf = isSelfCall(call);
    if (!indexMap[call.sessionId]) {
      indexMap[call.sessionid] = {
        index: resultCalls.length,
        isSelf: isSelf
      };
      resultCalls.push(call);
    } else if (!isSelf) {
      indexMap[call.sessionId].isSelf = false;
      resultCalls[indexMap[call.sessionId].index] = call;
    }
  });
  return resultCalls;
}
//# sourceMappingURL=callLogHelpers.js.map
