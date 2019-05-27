"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInbound = isInbound;
exports.isOutbound = isOutbound;
exports.isRinging = isRinging;
exports.isRingingInboundCall = isRingingInboundCall;
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
exports.getPhoneNumberMatches = getPhoneNumberMatches;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var R = _interopRequireWildcard(require("ramda"));

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _HashMap = _interopRequireDefault(require("./HashMap"));

var _callActions = _interopRequireDefault(require("../enums/callActions"));

var _callDirections = _interopRequireDefault(require("../enums/callDirections"));

var _callResults = _interopRequireDefault(require("../enums/callResults"));

var _telephonyStatus = _interopRequireDefault(require("../enums/telephonyStatus"));

var _terminationTypes = _interopRequireDefault(require("../enums/terminationTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
/* status helpers */


function isRinging() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return call.telephonyStatus === _telephonyStatus["default"].ringing;
}

function isRingingInboundCall(call) {
  return isRinging(call) && isInbound(call);
}

var callResultsToMissedMap = _HashMap["default"].fromSet({
  set: Object.keys(_callResults["default"]).map(function (key) {
    return _callResults["default"][key];
  }),
  getValue: function getValue(result) {
    return [_callResults["default"].missed, _callResults["default"].hangUp, _callResults["default"].busy, _callResults["default"].voicemail, _callResults["default"].rejected].indexOf(result) > -1;
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
  return call.telephonyStatus === _telephonyStatus["default"].noCall && call.terminationType === _terminationTypes["default"]["final"];
}

function hasEndedCalls(calls) {
  return !!calls.find(isEnded);
}

function isOnHold() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return call.telephonyStatus === _telephonyStatus["default"].onHold;
}

function isIntermediateCall() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return call.terminationType === _terminationTypes["default"].intermediate;
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
  var result = _objectSpread({}, call);

  if (call.startTime) {
    result.startTime = new Date(call.startTime).getTime();
  }

  return result;
}

function normalizeFromTo(call) {
  return _objectSpread({}, call, {
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
    switch (Math.abs(inbound.sessionId - outbound.sessionId)) {
      case 1000:
      case 2000:
      case 3000:
      case 4000:
        {
          // presence
          if (inbound.from && inbound.to && outbound.from && outbound.to && (0, _phoneNumber.isSameLocalNumber)(inbound.from.phoneNumber, outbound.to.phoneNumber) && (0, _phoneNumber.isSameLocalNumber)(inbound.to.phoneNumber, outbound.from.phoneNumber)) {
            return true;
          } // call-log


          if (inbound.from && inbound.to && outbound.from && outbound.to && inbound.action === _callActions["default"].phoneCall && (outbound.action === _callActions["default"].ringOutWeb || outbound.action === _callActions["default"].ringOutPC || outbound.action === _callActions["default"].ringOutMobile) && (inbound.from.phoneNumber === outbound.from.phoneNumber || inbound.from.extensionNumber === outbound.from.extensionNumber) && inbound.to.phoneNumber === outbound.to.phoneNumber) {
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
        var call = _objectSpread({}, outbound, {
          outboundLeg: outbound,
          inboundLeg: inbound,
          from: _objectSpread({}, inbound.from),
          to: _objectSpread({}, inbound.to),
          result: inbound.result
        });

        output.push(call);
      } else {
        var _call = _objectSpread({}, outbound, {
          outboundLeg: outbound,
          inboundLeg: inbound
        }); // Handle inboundLeg.from is '+19072028624', but outboundLeg.to is '9072028624'
        // https://jira.ringcentral.com/browse/RCINT-3127


        if ((0, _phoneNumber.isValidNumber)(inbound.from && inbound.from.phoneNumber) && (0, _phoneNumber.isSameLocalNumber)(inbound.from.phoneNumber, outbound.to && outbound.to.phoneNumber)) {
          _call.to = _objectSpread({}, outbound.to, {
            phoneNumber: inbound.from.phoneNumber
          });
          outbound.to.phoneNumber = inbound.from.phoneNumber;
        }

        if (isOnHold(inbound)) {
          _call.telephonyStatus = _telephonyStatus["default"].onHold;
        }

        output.push(_call);
      } // output.push(outbound);

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
} // there are two active calls with same sessionId when user call self.


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
} // Get phone number and matches.


function getPhoneNumberMatches() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _call$to = call.to,
      to = _call$to === void 0 ? {} : _call$to,
      _call$from = call.from,
      from = _call$from === void 0 ? {} : _call$from,
      toMatches = call.toMatches,
      fromMatches = call.fromMatches;

  if (R.isEmpty(call)) {
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
  } // if (!phoneNumber || !matches) {
  //   console.warn(`Call sessionId: ${sessionId} is abnormal data.`);
  // }


  return {
    phoneNumber: phoneNumber,
    matches: matches
  };
}
//# sourceMappingURL=callLogHelpers.js.map
