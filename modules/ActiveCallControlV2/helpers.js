"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conflictError = conflictError;
exports.filterDisconnectedCalls = filterDisconnectedCalls;
exports.getInboundSwitchedParty = getInboundSwitchedParty;
exports.isAtMainNumberPromptToneStage = isAtMainNumberPromptToneStage;
exports.isForwardedToVoiceMail = isForwardedToVoiceMail;
exports.isHangUp = isHangUp;
exports.isHolding = isHolding;
exports.isOnRecording = isOnRecording;
exports.isOnSetupStage = isOnSetupStage;
exports.isRecording = isRecording;
exports.isRejectCode = isRejectCode;
exports.isRinging = isRinging;
exports.normalizeSession = normalizeSession;
exports.normalizeTelephonySession = normalizeTelephonySession;

require("core-js/modules/es6.function.name");

var _ramda = require("ramda");

var _Session = require("ringcentral-call-control/lib/Session");

var _activeCallControlStatus = _interopRequireDefault(require("../../enums/activeCallControlStatus"));

var _callDirections = _interopRequireWildcard(require("../../enums/callDirections"));

var _callResults = _interopRequireDefault(require("../../enums/callResults"));

var _callMonitorHelper = require("../CallMonitor/callMonitorHelper");

var _recordStatus = require("../Webphone/recordStatus");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default
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
} // TODO: add call type in callMonitor module


function normalizeSession(_ref2) {
  var session = _ref2.session;
  var party = session.party,
      creationTime = session.creationTime,
      sessionId = session.sessionId;
  var partyId = party.id,
      direction = party.direction,
      from = party.from,
      to = party.to,
      status = party.status,
      recordings = party.recordings,
      muted = party.muted;
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
    callStatus: (0, _callMonitorHelper.mapTelephonyStatus)(status === null || status === void 0 ? void 0 : status.code),
    startTime: new Date(creationTime).getTime(),
    creationTime: creationTime,
    isOnMute: muted,
    isForwarded: false,
    isOnFlip: false,
    isOnHold: (status === null || status === void 0 ? void 0 : status.code) === _activeCallControlStatus["default"].hold,
    isOnTransfer: false,
    isReplied: false,
    isToVoicemail: false,
    lastHoldingTime: 0,
    minimized: false,
    recordStatus: isOnRecording(recordings) ? _recordStatus.recordStatus.recording : _recordStatus.recordStatus.idle,
    removed: false,
    isReject: isRejectCode({
      direction: direction,
      code: status === null || status === void 0 ? void 0 : status.code
    })
  };
  return formatValue;
}

function conflictError(_ref3) {
  var message = _ref3.message,
      response = _ref3.response;
  var conflictErrRgx = /409/g;
  var conflictMsgRgx = /Incorrect State/g;
  return conflictErrRgx.test(message) && conflictMsgRgx.test(response && response._text);
}

function isRinging(telephonySession) {
  return telephonySession && (telephonySession.status === _Session.PartyStatusCode.proceeding || telephonySession.status === _Session.PartyStatusCode.setup) && telephonySession.direction === _callDirections["default"].inbound;
}

function isHolding(telephonySession) {
  return telephonySession.status === _Session.PartyStatusCode.hold;
}

function isRecording(session) {
  var party = session.party;
  return isOnRecording(party.recordings);
}

function isForwardedToVoiceMail(session) {
  return session.status === _Session.PartyStatusCode.voicemail;
}

function isOnSetupStage(session) {
  return session.status === _Session.PartyStatusCode.setup;
} // call to main company number but still at inputting extension number prompt tone stage


function isAtMainNumberPromptToneStage(session) {
  if (!session) return false;
  var _session$otherParties = session.otherParties,
      otherParties = _session$otherParties === void 0 ? [] : _session$otherParties,
      direction = session.direction,
      status = session.status;

  if (direction === _callDirections["default"].outbound && status === _Session.PartyStatusCode.answered && !otherParties.length) {
    return true;
  }

  return false;
}

function getInboundSwitchedParty(parties) {
  if (!parties.length) return false;
  var result = (0, _ramda.find)(function (party) {
    var _party$status, _party$status2;

    return party.direction === _callDirections["default"].inbound && ((_party$status = party.status) === null || _party$status === void 0 ? void 0 : _party$status.code) === _Session.PartyStatusCode.disconnected && ((_party$status2 = party.status) === null || _party$status2 === void 0 ? void 0 : _party$status2.reason) === 'CallSwitch';
  }, parties);
  return result;
}

function filterDisconnectedCalls(session) {
  // workaround of bug:
  // switch an inbound call then call direction will change to outbound
  var party = session.party,
      otherParties = session.otherParties,
      direction = session.direction,
      status = session.status;

  if (direction === _callDirections.callDirection.outbound && status !== _Session.PartyStatusCode.disconnected) {
    var inboundSwitchedParty = getInboundSwitchedParty(otherParties);

    if (inboundSwitchedParty) {
      party.direction = inboundSwitchedParty.direction;
      party.to = inboundSwitchedParty.to;
      party.from = inboundSwitchedParty.from;
    }
  }

  return session.status !== _Session.PartyStatusCode.disconnected;
}

function normalizeTelephonySession(session) {
  if (!session) {
    return {};
  }

  return {
    accountId: session.accountId,
    creationTime: session.creationTime,
    data: session.data,
    extensionId: session.extensionId,
    id: session.id,
    origin: session.origin,
    otherParties: session.otherParties,
    parties: session.parties,
    party: session.party,
    recordings: session.recordings,
    requestOptions: session.requestOptions,
    serverId: session.serverId,
    sessionId: session.sessionId,
    voiceCallToken: session.voiceCallToken
  };
}
//# sourceMappingURL=helpers.js.map
