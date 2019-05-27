"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHangUp = isHangUp;
exports.isReject = isReject;
exports.normalizeSession = normalizeSession;
exports.requestURI = requestURI;
exports.confictError = confictError;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

var _recordStatus = _interopRequireDefault(require("../../modules/Webphone/recordStatus"));

var _callResults = _interopRequireDefault(require("../../enums/callResults"));

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _activeCallControlStatus = _interopRequireDefault(require("../../enums/activeCallControlStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isHangUp(code) {
  return code === _callResults["default"].disconnected;
}

function isReject(_ref) {
  var direction = _ref.direction,
      code = _ref.code;
  return direction === _callDirections["default"].inbound && (code === _activeCallControlStatus["default"].setUp || code === _activeCallControlStatus["default"].proceeding);
}

function normalizeSession(_ref2) {
  var call = _ref2.call,
      _ref2$activeSessionSt = _ref2.activeSessionStatus,
      activeSessionStatus = _ref2$activeSessionSt === void 0 ? {} : _ref2$activeSessionSt;
  var telephonySessionId = call.telephonySessionId,
      partyId = call.partyId,
      direction = call.direction,
      from = call.from,
      to = call.to,
      result = call.result,
      telephonyStatus = call.telephonyStatus,
      startTime = call.startTime,
      sessionId = call.sessionId;
  var isOnMute = activeSessionStatus.isOnMute,
      isOnHold = activeSessionStatus.isOnHold,
      isReject = activeSessionStatus.isReject,
      isOnRecording = activeSessionStatus.isOnRecording;
  var formatValue = {
    telephonySessionId: telephonySessionId,
    partyId: partyId,
    direction: direction,
    from: from && from.phoneNumber,
    fromNumber: from && from.phoneNumber,
    fromUserName: from && from.name,
    to: to && to.phoneNumber,
    toNumber: to && to.phoneNumber,
    toUserName: to && to.name,
    id: sessionId,
    sessionId: sessionId,
    callStatus: telephonyStatus || result,
    startTime: startTime,
    creationTime: startTime,
    isOnMute: isOnMute,
    isForwarded: false,
    isOnFlip: false,
    isOnHold: isOnHold,
    isOnTransfer: false,
    isReplied: false,
    isToVoicemail: false,
    lastHoldingTime: 0,
    minimized: false,
    recordStatus: isOnRecording ? _recordStatus["default"].recording : _recordStatus["default"].idle,
    removed: false,
    isReject: isReject
  };
  return _objectSpread({}, formatValue);
}

function requestURI(activeSession) {
  var telephonySessionId = activeSession.telephonySessionId,
      partyId = activeSession.partyId,
      recordingId = activeSession.recordingId;
  var prefix = "/account/~/telephony/sessions/".concat(telephonySessionId);
  return {
    hangUp: "".concat(prefix),
    reject: "".concat(prefix, "/parties/").concat(partyId, "/reject"),
    hold: "".concat(prefix, "/parties/").concat(partyId, "/hold"),
    unhold: "".concat(prefix, "/parties/").concat(partyId, "/unhold"),
    transfer: "".concat(prefix, "/parties/").concat(partyId, "/transfer"),
    flip: "".concat(prefix, "/parties/").concat(partyId, "/flip"),
    getPartyData: "".concat(prefix, "/parties/").concat(partyId),
    mute: "".concat(prefix, "/parties/").concat(partyId),
    record: "".concat(prefix, "/parties/").concat(partyId, "/recordings"),
    stopRecord: "".concat(prefix, "/parties/").concat(partyId, "/recordings/").concat(recordingId)
  };
}

function confictError(error) {
  var conflictErrRgx = /409/g;
  var conflictMsgRgx = /Incorrect State/g;
  return conflictErrRgx.test(error.message) && conflictMsgRgx.test(error.apiResponse._text);
}
//# sourceMappingURL=helpers.js.map
