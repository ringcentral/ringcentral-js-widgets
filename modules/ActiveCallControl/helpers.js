"use strict";

require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEBPHONE_REPLY_TYPE = exports.WEBPHONE_REPLY_TIME_UNIT = void 0;
exports.conflictError = conflictError;
exports.filterDisconnectedCalls = filterDisconnectedCalls;
exports.getInboundSwitchedParty = getInboundSwitchedParty;
exports.getWebphoneReplyMessageOption = getWebphoneReplyMessageOption;
exports.isAtMainNumberPromptToneStage = isAtMainNumberPromptToneStage;
exports.isFaxSession = isFaxSession;
exports.isForwardedToVoiceMail = isForwardedToVoiceMail;
exports.isGoneSession = isGoneSession;
exports.isHangUp = isHangUp;
exports.isHolding = isHolding;
exports.isOnRecording = isOnRecording;
exports.isOnSetupStage = isOnSetupStage;
exports.isRecording = isRecording;
exports.isRejectCode = isRejectCode;
exports.isRinging = isRinging;
exports.mapTelephonyStatus = mapTelephonyStatus;
exports.normalizeSession = normalizeSession;
exports.normalizeTelephonySession = normalizeTelephonySession;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
var _ramda = require("ramda");
var _Session = require("ringcentral-call-control/lib/Session");
var _activeCallControlStatus = _interopRequireDefault(require("../../enums/activeCallControlStatus"));
var _callDirections = require("../../enums/callDirections");
var _callResults = _interopRequireDefault(require("../../enums/callResults"));
var _telephonyStatus = require("../../enums/telephonyStatus");
var _recordStatus = require("../Webphone/recordStatus");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// eslint-disable-next-line import/no-named-as-default

// eslint-disable-next-line import/no-named-as-default

// eslint-disable-next-line import/no-named-as-default

// telephony session status match presence telephonyStatus
function mapTelephonyStatus(telephonySessionStatus) {
  switch (telephonySessionStatus) {
    case _Session.PartyStatusCode.setup:
    case _Session.PartyStatusCode.proceeding:
      return _telephonyStatus.telephonyStatus.ringing;
    case _Session.PartyStatusCode.hold:
      return _telephonyStatus.telephonyStatus.onHold;
    case _Session.PartyStatusCode.answered:
      return _telephonyStatus.telephonyStatus.callConnected;
    case _Session.PartyStatusCode.parked:
      return _telephonyStatus.telephonyStatus.parkedCall;
    default:
      return _telephonyStatus.telephonyStatus.noCall;
  }
}
function isHangUp(code) {
  return code === _callResults["default"].disconnected;
}
function isRejectCode(_ref) {
  var direction = _ref.direction,
    code = _ref.code;
  return direction === _callDirections.callDirection.inbound && (code === _activeCallControlStatus["default"].setUp || code === _activeCallControlStatus["default"].proceeding);
}
function isOnRecording(recordings) {
  if (!recordings || recordings.length === 0) {
    return false;
  }
  var recording = recordings[0];
  return recording.active;
}

// TODO: add call type in callMonitor module
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
    // @ts-expect-error TS(2345): Argument of type 'PartyStatusCode | undefined' is ... Remove this comment to see the full error message
    callStatus: mapTelephonyStatus(status === null || status === void 0 ? void 0 : status.code),
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
    // @ts-expect-error TS(2345): Argument of type 'Recording[] | undefined' is not ... Remove this comment to see the full error message
    recordStatus: isOnRecording(recordings) ? _recordStatus.recordStatus.recording : _recordStatus.recordStatus.idle,
    removed: false,
    // @ts-expect-error TS(2322): Type 'import("/Users/declan.zou/Projects/rc/integr... Remove this comment to see the full error message
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
  return telephonySession && (telephonySession.status === _Session.PartyStatusCode.proceeding || telephonySession.status === _Session.PartyStatusCode.setup) && telephonySession.direction === _callDirections.callDirection.inbound;
}
function isHolding(telephonySession) {
  return telephonySession.status === _Session.PartyStatusCode.hold;
}
function isRecording(session) {
  var party = session.party;
  // @ts-expect-error TS(2345): Argument of type 'Recording[] | undefined' is not ... Remove this comment to see the full error message
  return isOnRecording(party.recordings);
}
function isForwardedToVoiceMail(session) {
  return session.status === _Session.PartyStatusCode.voicemail;
}
function isOnSetupStage(session) {
  return session.status === _Session.PartyStatusCode.setup;
}
function isFaxSession(session) {
  return session.status === _Session.PartyStatusCode.faxReceive;
}

// call to main company number but still at inputting extension number prompt tone stage
function isAtMainNumberPromptToneStage(session) {
  if (!session) return false;
  var _session$otherParties = session.otherParties,
    otherParties = _session$otherParties === void 0 ? [] : _session$otherParties,
    direction = session.direction,
    status = session.status;
  if (direction === _callDirections.callDirection.outbound && status === _Session.PartyStatusCode.answered && !otherParties.length) {
    return true;
  }
  return false;
}
function getInboundSwitchedParty(parties) {
  if (!parties.length) return false;
  var result = (0, _ramda.find)(function (party) {
    var _party$status, _party$status2;
    return party.direction === _callDirections.callDirection.inbound && ((_party$status = party.status) === null || _party$status === void 0 ? void 0 : _party$status.code) === _Session.PartyStatusCode.disconnected &&
    // @ts-expect-error TS(2339): Property 'reason' does not exist on type 'PartySta... Remove this comment to see the full error message
    ((_party$status2 = party.status) === null || _party$status2 === void 0 ? void 0 : _party$status2.reason) === 'CallSwitch';
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
function isGoneSession(session) {
  return session.status === _Session.PartyStatusCode.gone;
}
function normalizeTelephonySession(session) {
  if (!session) {
    // @ts-expect-error TS(2740): Type '{}' is missing the following properties from... Remove this comment to see the full error message
    return {};
  }
  return {
    accountId: session.accountId,
    creationTime: session.creationTime,
    // @ts-expect-error TS(2322): Type '{ accountId: any; creationTime: any; data: a... Remove this comment to see the full error message
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

// fix call control api issue.
var WEBPHONE_REPLY_TIME_UNIT = exports.WEBPHONE_REPLY_TIME_UNIT = {
  Minute: '0',
  Hour: '1',
  Day: '2'
};
var WEBPHONE_REPLY_TYPE = exports.WEBPHONE_REPLY_TYPE = {
  customMessage: 0,
  callBack: 1,
  onMyWay: 2,
  inAMeeting: 5
};
function getWebphoneReplyMessageOption(params) {
  var _params$replyWithPatt, _params$replyWithPatt2, _params$replyWithPatt3, _params$replyWithPatt4;
  if (params.replyWithText) {
    return {
      replyType: WEBPHONE_REPLY_TYPE.customMessage,
      replyText: params.replyWithText
    };
  }
  if (((_params$replyWithPatt = params.replyWithPattern) === null || _params$replyWithPatt === void 0 ? void 0 : _params$replyWithPatt.pattern) === _Session.ReplyWithPattern.onMyWay) {
    return {
      replyType: WEBPHONE_REPLY_TYPE.onMyWay
    };
  }
  if (((_params$replyWithPatt2 = params.replyWithPattern) === null || _params$replyWithPatt2 === void 0 ? void 0 : _params$replyWithPatt2.pattern) === _Session.ReplyWithPattern.inAMeeting) {
    return {
      replyType: WEBPHONE_REPLY_TYPE.inAMeeting
    };
  }
  var replyType = WEBPHONE_REPLY_TYPE.callBack;
  var callbackDirection;
  if ((_params$replyWithPatt3 = params.replyWithPattern) === null || _params$replyWithPatt3 === void 0 ? void 0 : _params$replyWithPatt3.pattern.includes('CallMe')) {
    callbackDirection = "1";
  } else {
    callbackDirection = "0";
  }
  return {
    replyType: replyType,
    timeValue: ((_params$replyWithPatt4 = params.replyWithPattern) === null || _params$replyWithPatt4 === void 0 ? void 0 : _params$replyWithPatt4.time) || '',
    timeUnits: WEBPHONE_REPLY_TIME_UNIT[params.replyWithPattern.timeUnit],
    callbackDirection: callbackDirection
  };
}
//# sourceMappingURL=helpers.js.map
