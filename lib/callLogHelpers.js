"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.parse-int");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areTwoLegs = areTwoLegs;
exports.getPhoneNumber = getPhoneNumber;
exports.getPhoneNumberMatches = getPhoneNumberMatches;
exports.getWebphoneSessionDisplayName = getWebphoneSessionDisplayName;
exports.hasEndedCalls = hasEndedCalls;
exports.hasRingingCalls = hasRingingCalls;
exports.isEnded = isEnded;
exports.isInbound = isInbound;
exports.isIntermediateCall = isIntermediateCall;
exports.isMissed = isMissed;
exports.isOnHold = isOnHold;
exports.isOutbound = isOutbound;
exports.isRinging = isRinging;
exports.isRingingInboundCall = isRingingInboundCall;
exports.isSelfCall = isSelfCall;
exports.normalizeFromTo = normalizeFromTo;
exports.normalizeStartTime = normalizeStartTime;
exports.removeDuplicateIntermediateCalls = removeDuplicateIntermediateCalls;
exports.removeDuplicateSelfCalls = removeDuplicateSelfCalls;
exports.removeInboundRingOutLegs = removeInboundRingOutLegs;
exports.sortBySessionId = sortBySessionId;
exports.sortByStartTime = sortByStartTime;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _ramda = require("ramda");
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _callActions = require("../enums/callActions");
var _callDirections = _interopRequireDefault(require("../enums/callDirections"));
var _callResults = require("../enums/callResults");
var _telephonyStatus = _interopRequireDefault(require("../enums/telephonyStatus"));
var _terminationTypes = require("../enums/terminationTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// import i18n from './i18n';

/* call direction helpers */
function isInbound() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return call.direction === _callDirections["default"].inbound;
}
function isOutbound() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return call.direction === _callDirections["default"].outbound;
}
function getWebphoneSessionDisplayName(currentSession) {
  // TODO: just return null temporary, wait check api can be use with platform
  return null;
  // if (!currentSession) {
  //   return null;
  // }

  // return currentSession.direction === callDirections.inbound
  //   ? currentSession.fromUserName
  //   : currentSession.toUserName;
}

/* status helpers */
function isRinging(call) {
  if (!call) return false;
  return call.telephonyStatus === _telephonyStatus["default"].ringing;
}
function isRingingInboundCall(call) {
  return isRinging(call) && isInbound(call);
}
var callResultsToMissedMap = _ObjectMap.ObjectMap.fromObject((0, _ramda.reduce)(function (result, key) {
  var value = _callResults.callResults[key];
  result[value] = !!(0, _ramda.find)(function (item) {
    return item === value;
  }, [_callResults.callResults.missed, _callResults.callResults.hangUp,
  // callResults.HangUp,
  _callResults.callResults.busy, _callResults.callResults.voicemail, _callResults.callResults.rejected]);
  return result;
}, {}, Object.keys(_callResults.callResults)));
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
  return call.telephonyStatus === _telephonyStatus["default"].noCall && call.terminationType === _terminationTypes.terminationTypes["final"];
}
function hasEndedCalls(calls) {
  return !!calls.find(isEnded);
}
function isOnHold() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return call.telephonyStatus === _telephonyStatus["default"].onHold;
}
function isIntermediateCall(call) {
  return call.terminationType === _terminationTypes.terminationTypes.intermediate;
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

// TODO: fix `ActiveCall` startTime optional type
function sortByStartTime(a, b) {
  if (a.startTime === b.startTime) return 0;
  return a.startTime > b.startTime ? -1 : 1;
}
function normalizeStartTime(item) {
  var result = _objectSpread({}, item);
  if (item.startTime) {
    // Fix: Safari doesn't support timezone offset
    // `startTime` might switch between `2019-10-18T08:18:47.972+0000`
    // and `2019-10-18T08:18:47.972Z`
    // dayjs construction using a non-iso string is deprecated
    result.startTime = (0, _dayjs["default"])(new Date(item.startTime)).valueOf();
  }
  return result;
}
function normalizeFromTo(call) {
  return _objectSpread(_objectSpread({}, call), {}, {
    from: _typeof(call.from) === 'object' ? call.from : {
      phoneNumber: call.from
    },
    to: _typeof(call.to) === 'object' ? call.to : {
      phoneNumber: call.to
    }
  });
}

/* ringout leg helpers */
function areTwoLegs(inbound, outbound) {
  if (isInbound(inbound) && isOutbound(outbound)) {
    switch (Math.abs(parseInt(inbound.sessionId, 10) - parseInt(outbound.sessionId, 10))) {
      case 1000:
      case 2000:
      case 3000:
      case 4000:
        {
          // presence
          if (inbound.from && inbound.to && outbound.from && outbound.to && (0, _phoneNumber.isSameLocalNumber)(inbound.from.phoneNumber, outbound.to.phoneNumber) && (0, _phoneNumber.isSameLocalNumber)(inbound.to.phoneNumber, outbound.from.phoneNumber)) {
            return true;
          }
          // call-log
          if (inbound.from && inbound.to && outbound.from && outbound.to && inbound.action === _callActions.callActions.phoneCall && (outbound.action === _callActions.callActions.ringOutWeb || outbound.action === _callActions.callActions.ringOutPC || outbound.action === _callActions.callActions.ringOutMobile) && (inbound.from.phoneNumber === outbound.from.phoneNumber || inbound.from.extensionNumber === outbound.from.extensionNumber) && inbound.to.phoneNumber === outbound.to.phoneNumber) {
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
        var call = _objectSpread(_objectSpread({}, outbound), {}, {
          outboundLeg: outbound,
          inboundLeg: inbound,
          from: _objectSpread({}, inbound.from),
          to: _objectSpread({}, inbound.to),
          result: inbound.result
        });
        output.push(call);
      } else {
        var _inbound$from;
        var _call = _objectSpread(_objectSpread({}, outbound), {}, {
          outboundLeg: outbound,
          inboundLeg: inbound
        });
        // Handle inboundLeg.from is '+19072028624', but outboundLeg.to is '9072028624'
        // https://jira_domain/browse/RCINT-3127
        if (inbound.from &&
        // TODO: should confirm that type, not met
        // @ts-expect-error ts-migrate(2306) FIXME: type not match
        (0, _phoneNumber.isValidNumber)((_inbound$from = inbound.from) === null || _inbound$from === void 0 ? void 0 : _inbound$from.phoneNumber) && (0, _phoneNumber.isSameLocalNumber)(inbound.from.phoneNumber, outbound.to && outbound.to.phoneNumber)) {
          _call.to = _objectSpread(_objectSpread({}, outbound.to), {}, {
            phoneNumber: inbound.from.phoneNumber
          });
          outbound.to.phoneNumber = inbound.from.phoneNumber;
        }
        if (isOnHold(inbound)) {
          _call.telephonyStatus = _telephonyStatus["default"].onHold;
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
    var sessionId = call.sessionId;
    if (!indexMap[sessionId]) {
      indexMap[sessionId] = {
        index: resultCalls.length,
        isIntermediate: isIntermediate
      };
      resultCalls.push(call);
    } else if (!isIntermediate) {
      indexMap[sessionId].isIntermediate = false;
      resultCalls[indexMap[sessionId].index] = call;
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
    var sessionId = call.sessionId;
    if (!indexMap[sessionId]) {
      indexMap[sessionId] = {
        index: resultCalls.length,
        isSelf: isSelf
      };
      resultCalls.push(call);
    } else if (!isSelf) {
      indexMap[sessionId].isSelf = false;
      resultCalls[indexMap[sessionId].index] = call;
    }
  });
  return resultCalls;
}
function getPhoneNumber() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if ((0, _ramda.isEmpty)(call)) {
    return undefined;
  }
  var _call$to = call.to,
    to = _call$to === void 0 ? {} : _call$to,
    _call$from = call.from,
    from = _call$from === void 0 ? {} : _call$from;
  if (isOutbound(call)) {
    return to.phoneNumber || to.extensionNumber;
  }
  return from.phoneNumber || from.extensionNumber;
}

// Get phone number and matches.
function getPhoneNumberMatches() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _call$to2 = call.to,
    to = _call$to2 === void 0 ? {} : _call$to2,
    _call$from2 = call.from,
    from = _call$from2 === void 0 ? {} : _call$from2,
    toMatches = call.toMatches,
    fromMatches = call.fromMatches;
  if ((0, _ramda.isEmpty)(call)) {
    return {};
  }
  var isOutboundCall = isOutbound(call);
  var isInboundCall = isInbound(call);
  var phoneNumber = null;
  var matches = null;
  if (isOutboundCall) {
    phoneNumber = to.phoneNumber || to.extensionNumber;
    matches = toMatches;
  } else if (isInboundCall) {
    phoneNumber = from.phoneNumber || from.extensionNumber;
    matches = fromMatches;
  }
  // if (!phoneNumber || !matches) {
  //   console.warn(`Call sessionId: ${sessionId} is abnormal data.`);
  // }
  return {
    phoneNumber: phoneNumber,
    matches: matches
  };
}
//# sourceMappingURL=callLogHelpers.js.map
