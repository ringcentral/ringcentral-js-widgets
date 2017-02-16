'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInbound = isInbound;
exports.isOutbound = isOutbound;
exports.areTwoLegs = areTwoLegs;
exports.isRinging = isRinging;
exports.hasRingingCalls = hasRingingCalls;
exports.isEnded = isEnded;
exports.hasEndedCalls = hasEndedCalls;
exports.isOnHold = isOnHold;
exports.sortBySessionId = sortBySessionId;
exports.sortCallsByStartTime = sortCallsByStartTime;

require('core-js/fn/array/find');

var _callDirections = require('../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _telephonyStatus = require('../enums/telephonyStatus');

var _telephonyStatus2 = _interopRequireDefault(_telephonyStatus);

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

/* ringout leg helpers */
function areTwoLegs(inbound, outbound) {
  return isInbound(inbound) && isOutbound(outbound) && [1000, 2000, 3000, 4000].indexOf(Math.abs(inbound.sessionId - outbound.sessionId)) > -1 && (inbound.from === outbound.to && outbound.from === inbound.to || inbound.from === outbound.to && (0, _isSameLocalNumber2.default)(inbound.to, outbound.from) || inbound.to === outbound.from && (0, _isSameLocalNumber2.default)(inbound.from, outbound.to) || inbound.to.name && inbound.to.name === outbound.from.name);
}

/* status helpers */
function isRinging() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.telephonyStatus === _telephonyStatus2.default.ringing;
}

function hasRingingCalls() {
  var calls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return !!calls.find(isRinging);
}

function isEnded() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.telephonyStatus === _telephonyStatus2.default.noCall && call.terminationType === _terminationTypes2.default.final;
}

function hasEndedCalls(calls) {
  return !!calls.find(isEnded);
}

function isOnHold() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return call.telephonyStatus === _telephonyStatus2.default.onHold;
}

/* sort functions */

function sortBySessionId(a, b) {
  if (a.sessionId === b.sessionId) return 0;
  return a.sessionId > b.sessionId ? 1 : -1;
}
function sortCallsByStartTime(a, b) {
  if (a.startTime === b.startTime) return 0;
  return a.startTime > b.startTime ? -1 : 1;
}
//# sourceMappingURL=callLogHelpers.js.map
