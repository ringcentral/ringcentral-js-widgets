'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.isInbound = isInbound;
exports.isOutbound = isOutbound;
exports.isRinging = isRinging;
exports.hasRingingCalls = hasRingingCalls;
exports.isEnded = isEnded;
exports.hasEndedCalls = hasEndedCalls;
exports.isOnHold = isOnHold;
exports.sortBySessionId = sortBySessionId;
exports.sortByStartTime = sortByStartTime;
exports.normalizeStartTime = normalizeStartTime;
exports.normalizeFromTo = normalizeFromTo;
exports.areTwoLegs = areTwoLegs;
exports.removeInboundRingOutLegs = removeInboundRingOutLegs;

require('core-js/fn/array/find');

var _phoneformat = require('phoneformat.js');

var _callDirections = require('../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

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
  return (0, _extends3.default)({}, call, {
    startTime: new Date(call.startTime).getTime()
  });
}

function normalizeFromTo(call) {
  return (0, _extends3.default)({}, call, {
    from: (0, _typeof3.default)(call.from) === 'object' ? call.from : { phoneNumber: call.from },
    to: (0, _typeof3.default)(call.to) === 'object' ? call.to : { phoneNumber: call.to }
  });
}

/* ringout leg helpers */
function areTwoLegs(inbound, outbound) {
  return isInbound(inbound) && isOutbound(outbound) && [1000, 2000, 3000, 4000].indexOf(Math.abs(inbound.sessionId - outbound.sessionId)) > -1 && (inbound.from === outbound.to && outbound.from === inbound.to || inbound.from === outbound.to && (0, _isSameLocalNumber2.default)(inbound.to, outbound.from) || inbound.to === outbound.from && (0, _isSameLocalNumber2.default)(inbound.from, outbound.to) || inbound.to.name && inbound.to.name === outbound.from.name);
}

function removeInboundRingOutLegs(calls) {
  var output = [];
  var outbounds = calls.filter(isOutbound);
  calls.filter(isInbound).forEach(function (inbound) {
    var outboundIndex = outbounds.findIndex(function (call) {
      return areTwoLegs(inbound, call);
    });
    if (outboundIndex > -1) {
      var outbound = (0, _extends3.default)({}, outbounds.splice(outboundIndex, 1)[0], {
        inboundLeg: inbound
      });
      // Handle inboundLeg.from is '+19072028624', but outboundLeg.to is '9072028624'
      // https://jira.ringcentral.com/browse/RCINT-3127
      if ((0, _phoneformat.isValidNumber)(inbound.from && inbound.from.phoneNumber) && (0, _isSameLocalNumber2.default)(inbound.from.phoneNumber, outbound.to && outbound.to.phonenumber)) {
        outbound.to.phoneNumber = inbound.from.phoneNumber;
      }
      if (isOnHold(inbound)) {
        outbound.telephonyStatus = _telephonyStatuses2.default.onHold;
      }
      output.push(outbound);
    } else {
      output.push(inbound);
    }
  });
  return output.concat(outbounds);
}
//# sourceMappingURL=callLogHelpers.js.map
