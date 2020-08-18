"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHangUp = isHangUp;
exports.isRejectCode = isRejectCode;
exports.isOnRecording = isOnRecording;
exports.getSessionsParty = getSessionsParty;
exports.normalizeSession = normalizeSession;
exports.conflictError = conflictError;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

var _recordStatus = _interopRequireDefault(require("../../modules/Webphone/recordStatus"));

var _callResults = _interopRequireDefault(require("../../enums/callResults"));

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _activeCallControlStatus = _interopRequireDefault(require("../../enums/activeCallControlStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isHangUp(code) {
  return code === _callResults["default"].disconnected;
}

function isRejectCode(_ref) {
  var direction = _ref.direction,
      code = _ref.code;
  return direction === _callDirections["default"].inbound && (code === _activeCallControlStatus["default"].setUp || code === _activeCallControlStatus["default"].proceeding);
}

function isOnRecording(recordings) {
  if (!recordings || recordings.length === 0) {
    return false;
  }

  var recording = recordings[0];
  return recording.active;
}

function getSessionsParty(session) {
  var extensionId = session.extensionId;
  return session.parties.find(function (p) {
    return p.extensionId === extensionId;
  });
}

function normalizeSession(_ref2) {
  var session = _ref2.session,
      call = _ref2.call;
  var party = getSessionsParty(session);
  var partyId = party.id,
      direction = party.direction,
      from = party.from,
      to = party.to,
      status = party.status,
      recordings = party.recordings,
      muted = party.muted;
  var startTime = call.startTime,
      sessionId = call.sessionId;
  var formatValue = {
    telephonySessionId: session.id,
    partyId: partyId,
    direction: direction,
    from: from === null || from === void 0 ? void 0 : from.phoneNumber,
    fromNumber: from === null || from === void 0 ? void 0 : from.phoneNumber,
    fromUserName: from === null || from === void 0 ? void 0 : from.name,
    to: to === null || to === void 0 ? void 0 : to.phoneNumber,
    toNumber: to === null || to === void 0 ? void 0 : to.phoneNumber,
    toUserName: to === null || to === void 0 ? void 0 : to.name,
    id: session.id,
    sessionId: sessionId,
    callStatus: call.telephonyStatus,
    startTime: startTime,
    creationTime: startTime,
    isOnMute: muted,
    isForwarded: false,
    isOnFlip: false,
    isOnHold: status.code === _activeCallControlStatus["default"].hold,
    isOnTransfer: false,
    isReplied: false,
    isToVoicemail: false,
    lastHoldingTime: 0,
    minimized: false,
    recordStatus: isOnRecording(recordings) ? _recordStatus["default"].recording : _recordStatus["default"].idle,
    removed: false,
    isReject: isRejectCode({
      direction: direction,
      code: status.code
    })
  };
  return _objectSpread({}, formatValue);
}

function conflictError(_ref3) {
  var message = _ref3.message,
      response = _ref3.response;
  var conflictErrRgx = /409/g;
  var conflictMsgRgx = /Incorrect State/g;
  return conflictErrRgx.test(message) && conflictMsgRgx.test(response && response._text);
}
//# sourceMappingURL=helpers.js.map
