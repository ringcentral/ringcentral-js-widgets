"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHangUp = isHangUp;
exports.isRejectCode = isRejectCode;
exports.isOnRecording = isOnRecording;
exports.normalizeSession = normalizeSession;
exports.conflictError = conflictError;
exports.isRinging = isRinging;
exports.isHolding = isHolding;
exports.isRecording = isRecording;
exports.isForwardedToVoiceMail = isForwardedToVoiceMail;
exports.isOnSetupStage = isOnSetupStage;
exports.isAtMainNumberPromptToneStage = isAtMainNumberPromptToneStage;
exports.getInboundSwitchedParty = getInboundSwitchedParty;

require("core-js/modules/es6.function.name");

var _Session = require("ringcentral-call-control/lib/Session");

var _ramda = require("ramda");

var _recordStatus = require("../Webphone/recordStatus");

var _callResults = _interopRequireDefault(require("../../enums/callResults"));

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _activeCallControlStatus = _interopRequireDefault(require("../../enums/activeCallControlStatus"));

var _callMonitorHelper = require("../CallMonitor/callMonitorHelper");

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
  // TODO: fix this for call control js
  // return session.status === PartyStatusCode.voicemail;
  return session.status === 'Voicemail';
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
    return party.direction === _callDirections["default"].inbound && party.status.code === _Session.PartyStatusCode.disconnected && party.status.reason === 'CallSwitch';
  }, parties);
  return result;
}
//# sourceMappingURL=helpers.js.map
