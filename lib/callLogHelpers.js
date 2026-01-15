"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.some");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.parse-int");
require("core-js/modules/es.string.includes");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areTwoLegs = areTwoLegs;
exports.getPhoneNumber = getPhoneNumber;
exports.getPhoneNumberMatches = getPhoneNumberMatches;
exports.getTelephoneDisplayName = getTelephoneDisplayName;
exports.getWebphoneSessionDisplayName = getWebphoneSessionDisplayName;
exports.hasEndedCalls = hasEndedCalls;
exports.hasRingingCalls = hasRingingCalls;
exports.isEnded = isEnded;
exports.isExtensionCall = isExtensionCall;
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
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _ramda = require("ramda");
var _callActions = require("../enums/callActions");
var _callDirections = _interopRequireDefault(require("../enums/callDirections"));
var _callResults = require("../enums/callResults");
var _telephonyStatus = _interopRequireDefault(require("../enums/telephonyStatus"));
var _terminationTypes = require("../enums/terminationTypes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
function isExtensionCall(callItem, mainCompanyNumbers) {
  var _callItem$toMatches, _callItem$fromMatches;
  var isCompanyNumber = function isCompanyNumber(phoneInfo) {
    if ((phoneInfo === null || phoneInfo === void 0 ? void 0 : phoneInfo.phoneNumber) && (mainCompanyNumbers === null || mainCompanyNumbers === void 0 ? void 0 : mainCompanyNumbers.includes(phoneInfo.phoneNumber))) {
      return true;
    }
    return false;
  };
  var isInbound = function isInbound(call) {
    return call.direction === 'Inbound';
  };
  var isOutbound = function isOutbound(call) {
    return call.direction === 'Outbound';
  };
  var recipientCallInfo = isInbound(callItem) ? callItem.from : callItem.to;
  if (isCompanyNumber(recipientCallInfo)) {
    return true;
  }
  var toMatches = (_callItem$toMatches = callItem.toMatches) !== null && _callItem$toMatches !== void 0 ? _callItem$toMatches : [];
  var fromMatches = (_callItem$fromMatches = callItem.fromMatches) !== null && _callItem$fromMatches !== void 0 ? _callItem$fromMatches : [];
  var to = callItem.to;
  var from = callItem.from;
  if (isOutbound(callItem) && (toMatches === null || toMatches === void 0 ? void 0 : toMatches.length)) {
    return !!toMatches.find(function (match) {
      var _match$phoneNumbers;
      if (match.type !== 'company') {
        return false;
      }
      var hasExtensionMatch = match.extensionNumber && (match.extensionNumber === (to === null || to === void 0 ? void 0 : to.phoneNumber) || match.extensionNumber === (to === null || to === void 0 ? void 0 : to.extensionNumber));
      if (hasExtensionMatch) {
        return true;
      }
      var phoneMatch = !!((_match$phoneNumbers = match.phoneNumbers) === null || _match$phoneNumbers === void 0 ? void 0 : _match$phoneNumbers.some(function (phone) {
        return phone.phoneNumber === (to === null || to === void 0 ? void 0 : to.phoneNumber);
      }));
      return phoneMatch;
    });
  } else if (isInbound(callItem) && (fromMatches === null || fromMatches === void 0 ? void 0 : fromMatches.length)) {
    return !!fromMatches.find(function (match) {
      var _match$phoneNumbers2;
      if (match.type !== 'company') {
        return false;
      }
      var hasExtensionMatch = match.extensionNumber && (match.extensionNumber === (from === null || from === void 0 ? void 0 : from.phoneNumber) || match.extensionNumber === (from === null || from === void 0 ? void 0 : from.extensionNumber));
      if (hasExtensionMatch) {
        return true;
      }
      var phoneMatch = !!((_match$phoneNumbers2 = match.phoneNumbers) === null || _match$phoneNumbers2 === void 0 ? void 0 : _match$phoneNumbers2.some(function (phone) {
        return phone.phoneNumber === (from === null || from === void 0 ? void 0 : from.phoneNumber);
      }));
      return phoneMatch;
    });
  }
  return false;
}

// get caller id name for webphone session
function getWebphoneSessionDisplayName(currentSession) {
  if (!currentSession) {
    return null;
  }
  return currentSession.direction === _callDirections["default"].inbound ? currentSession.fromUserName : currentSession.toUserName;
}

// get caller id name for telephone
function getTelephoneDisplayName(call) {
  if (!call) {
    return null;
  }
  return call.direction === _callDirections["default"].inbound ? call.fromName : call.toName;
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
        // @ts-expect-error TS(2769): No overload matches this call.
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
  var phoneNumber = undefined;
  var matches = undefined;
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
