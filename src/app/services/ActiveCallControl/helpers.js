"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEBPHONE_REPLY_TYPE = exports.WEBPHONE_REPLY_TIME_UNIT = exports.CONFERENCE_ORIGIN_TYPE = void 0;
exports.checkIfConferenceCall = checkIfConferenceCall;
exports.checkRingOutCallDirection = void 0;
exports.conflictError = conflictError;
exports.findConferenceParticipants = void 0;
exports.getDisplayCallQueueName = getDisplayCallQueueName;
exports.getInboundSwitchedParty = getInboundSwitchedParty;
exports.getWebphoneReplyMessageOption = getWebphoneReplyMessageOption;
exports.isAtMainNumberPromptToneStage = isAtMainNumberPromptToneStage;
exports.isConnectedCall = isConnectedCall;
exports.isFaxSession = isFaxSession;
exports.isForwardedToVoiceMail = isForwardedToVoiceMail;
exports.isHangUp = isHangUp;
exports.isHolding = isHolding;
exports.isHoldingCall = void 0;
exports.isOnRecording = isOnRecording;
exports.isOnSetupStage = isOnSetupStage;
exports.isOtherDeviceCall = void 0;
exports.isProceeding = isProceeding;
exports.isQueueCall = void 0;
exports.isRecording = isRecording;
exports.isRejectCode = isRejectCode;
exports.isRingingCall = void 0;
exports.mapTelephonyStatus = mapTelephonyStatus;
exports.normalizeSession = normalizeSession;
exports.normalizeTelephonySession = normalizeTelephonySession;
exports.normalizeToActiveCallControlSession = normalizeToActiveCallControlSession;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _activeCallControlStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/activeCallControlStatus"));
var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");
var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));
var _telephonyStatus = require("@ringcentral-integration/commons/enums/telephonyStatus");
var _ramda = require("ramda");
var _Session = require("ringcentral-call-control/lib/Session");
var _recordStatus = require("../Webphone/recordStatus");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // eslint-disable-next-line import/no-named-as-default
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
function normalizeSession(session, webphoneSession) {
  var party = session.party,
    creationTime = session.creationTime,
    sessionId = session.sessionId;
  var partyId = party.id,
    direction = party.direction,
    from = party.from,
    to = party.to,
    status = party.status,
    muted = party.muted,
    recordings = party.recordings;
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
    callStatus: mapTelephonyStatus(status === null || status === void 0 ? void 0 : status.code),
    startTime: new Date(creationTime).getTime(),
    creationTime: creationTime,
    recordStatus: isOnRecording(recordings) ? _recordStatus.recordStatus.recording : _recordStatus.recordStatus.idle,
    isReject: isRejectCode({
      direction: direction,
      code: status === null || status === void 0 ? void 0 : status.code
    }),
    toMatches: [],
    fromMatches: [],
    isOnMute: Boolean(
    /**
     * the server muted state
     */
    muted || (
    /**
     * the local muted state
     */
    webphoneSession === null || webphoneSession === void 0 ? void 0 : webphoneSession.isOnMute)),
    isOnHold: (status === null || status === void 0 ? void 0 : status.code) === _activeCallControlStatus["default"].hold,
    isForwarded: false,
    isOnFlip: false,
    isOnTransfer: false,
    isReplied: false,
    isToVoicemail: false,
    lastHoldingTime: 0,
    minimized: false,
    removed: false
  };
  return formatValue;
}
function conflictError(_ref2) {
  var message = _ref2.message,
    response = _ref2.response;
  var conflictErrRgx = /409/g;
  var conflictMsgRgx = /Incorrect State/g;
  return conflictErrRgx.test(message) && conflictMsgRgx.test(response && response._text);
}

/**
 * when have webphoneSession, means that is on current device webphone call,
 * ignore fake call when when is other device call, fake call always not have webphoneSession be that is in current device
 */
var isOtherDeviceCall = exports.isOtherDeviceCall = function isOtherDeviceCall(callItem) {
  return Boolean(!callItem.webphoneSession &&
  // when not have id, means that is our fake call
  callItem.id);
};
var isRingingCall = exports.isRingingCall = function isRingingCall(callItem) {
  return Boolean(callItem && callItem.telephonySession && isProceeding(callItem.telephonySession));
};
var getTargetCallQueueName = function getTargetCallQueueName(call) {
  var _call$webphoneSession, _find;
  return call.callQueueName || (call === null || call === void 0 ? void 0 : (_call$webphoneSession = call.webphoneSession) === null || _call$webphoneSession === void 0 ? void 0 : _call$webphoneSession.callQueueName) || (// after call in call data not able to know that is from queue call, the only way is use matches to find that, maybe should have better way to do that with platform data
  (_find = (call.toMatches || []).find(function (match) {
    return !!match.isCallQueueNumber;
  })) === null || _find === void 0 ? void 0 : _find.name) || '';
};
function getDisplayCallQueueName(call) {
  var isOutbound = call.direction === _callDirections.callDirection.outbound;
  if (isOutbound) return '';
  return getTargetCallQueueName(call);
}

/**
 * check call is department call during call connected, if you want check does call is queue call after call end, should use `isQueueHistoryCall`
 */
var isQueueCall = exports.isQueueCall = function isQueueCall(call) {
  var _call$webphoneSession2;
  if (call.direction === _callDirections.callDirection.outbound) {
    return Boolean((call.toMatches || []).some(function (match) {
      return !!match.isCallQueueNumber;
    }));
  }
  return Boolean(call.callQueueName || (call === null || call === void 0 ? void 0 : (_call$webphoneSession2 = call.webphoneSession) === null || _call$webphoneSession2 === void 0 ? void 0 : _call$webphoneSession2.callQueueName));
};
var isHoldingCall = exports.isHoldingCall = function isHoldingCall(callItem) {
  return Boolean(callItem && callItem.telephonySession && isHolding(callItem.telephonySession));
};
function isProceeding(telephonySession) {
  return telephonySession && (telephonySession.status === _Session.PartyStatusCode.proceeding || telephonySession.status === _Session.PartyStatusCode.setup) && telephonySession.direction === _callDirections.callDirection.inbound;
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
}
function isFaxSession(session) {
  return session.status === _Session.PartyStatusCode.faxReceive;
}

// call to main company number but still at inputting extension number prompt tone stage
function isAtMainNumberPromptToneStage(session) {
  var _session$party, _session$party2;
  if (!session) return false;
  var _session$otherParties = session.otherParties,
    otherParties = _session$otherParties === void 0 ? [] : _session$otherParties;
  if (((_session$party = session.party) === null || _session$party === void 0 ? void 0 : _session$party.direction) === _callDirections.callDirection.outbound && ((_session$party2 = session.party) === null || _session$party2 === void 0 ? void 0 : _session$party2.status.code) === _Session.PartyStatusCode.answered && !otherParties.length) {
    return true;
  }
  return false;
}
function getInboundSwitchedParty(parties) {
  if (!parties.length) return false;
  var result = (0, _ramda.find)(function (party) {
    var _party$status, _party$status2;
    return party.direction === _callDirections.callDirection.inbound && ((_party$status = party.status) === null || _party$status === void 0 ? void 0 : _party$status.code) === _Session.PartyStatusCode.disconnected &&
    // TODO: should add type to PartyStatusCode at ringcentral-call-control
    // @ts-ignore
    ((_party$status2 = party.status) === null || _party$status2 === void 0 ? void 0 : _party$status2.reason) === 'CallSwitch';
  }, parties);
  return result;
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
var CONFERENCE_ORIGIN_TYPE = exports.CONFERENCE_ORIGIN_TYPE = 'Conference';
function checkIfConferenceCall(session) {
  var _session$origin;
  return (session === null || session === void 0 ? void 0 : (_session$origin = session.origin) === null || _session$origin === void 0 ? void 0 : _session$origin.type) === CONFERENCE_ORIGIN_TYPE;
}
function normalizeToActiveCallControlSession(session, conferenceParticipants, getPartyExtensionNumber) {
  var _session$party3, _session$party4, _session$origin2, _session$party5, _session$party6, _session$party7, _session$party8;
  var direction = ((_session$party3 = session.party) === null || _session$party3 === void 0 ? void 0 : _session$party3.direction) || _callDirections.callDirection.outbound;
  var status = (_session$party4 = session.party) === null || _session$party4 === void 0 ? void 0 : _session$party4.status.code;
  var party = session.party,
    otherParties = session.otherParties;

  // workaround of bug:
  // switch an inbound call then call direction will change to outbound
  if (direction === _callDirections.callDirection.outbound && status !== _Session.PartyStatusCode.disconnected) {
    var inboundSwitchedParty = getInboundSwitchedParty(otherParties);
    if (inboundSwitchedParty) {
      party.direction = inboundSwitchedParty.direction;
      party.to = inboundSwitchedParty.to;
      party.from = inboundSwitchedParty.from;
    }
  }
  var isConferenceCall = ((_session$origin2 = session.origin) === null || _session$origin2 === void 0 ? void 0 : _session$origin2.type) === CONFERENCE_ORIGIN_TYPE;
  var sessionId = isConferenceCall ? session.id : session.data.sessionId;
  var from = (_session$party5 = session.party) === null || _session$party5 === void 0 ? void 0 : _session$party5.from;
  var to = (_session$party6 = session.party) === null || _session$party6 === void 0 ? void 0 : _session$party6.to;
  return _objectSpread(_objectSpread({}, session.data), {}, {
    direction: ((_session$party7 = session.party) === null || _session$party7 === void 0 ? void 0 : _session$party7.direction) || _callDirections.callDirection.outbound,
    // in session call data not include the extensionNumber or phoneNumber, so we need check that in the parties
    from: getPartyExtensionNumber ? _objectSpread(_objectSpread({}, from), {}, {
      extensionNumber: getPartyExtensionNumber(from)
    }) : from,
    to: getPartyExtensionNumber ? _objectSpread(_objectSpread({}, to), {}, {
      extensionNumber: getPartyExtensionNumber(to)
    }) : to,
    //
    id: session.id,
    otherParties: session.otherParties || [],
    party: session.party || {},
    recordings: session.recordings,
    isRecording: isOnRecording(session.recordings),
    sessionId: sessionId,
    startTime: new Date(session.data.creationTime).getTime(),
    status: (_session$party8 = session.party) === null || _session$party8 === void 0 ? void 0 : _session$party8.status.code,
    telephonySessionId: session.id,
    telephonySession: normalizeTelephonySession(session),
    isConferenceCall: isConferenceCall,
    conferenceParticipants: conferenceParticipants,
    callQueueName: getSessionQueueName(session)
  });
}
var getSessionQueueName = function getSessionQueueName(session) {
  var _session$party9, _session$party9$uiCal;
  var primary = (_session$party9 = session.party) === null || _session$party9 === void 0 ? void 0 : (_session$party9$uiCal = _session$party9.uiCallInfo) === null || _session$party9$uiCal === void 0 ? void 0 : _session$party9$uiCal.primary;
  if ((primary === null || primary === void 0 ? void 0 : primary.type) === 'QueueName') return primary === null || primary === void 0 ? void 0 : primary.value;
  return undefined;
};
var findConferenceParticipants = exports.findConferenceParticipants = function findConferenceParticipants(currentSession, sessions, selfExtensionInfo, checkStillExist) {
  var _currentSession$origi;
  if (((_currentSession$origi = currentSession.origin) === null || _currentSession$origi === void 0 ? void 0 : _currentSession$origi.type) !== CONFERENCE_ORIGIN_TYPE) {
    return [];
  }
  var conferenceParticipants = [];
  sessions.forEach(function (session) {
    var _session$party0 = session.party,
      party = _session$party0 === void 0 ? {} : _session$party0;
    var _ref3 = party.status || {},
      code = _ref3.code,
      _ref3$peerId = _ref3.peerId,
      peerId = _ref3$peerId === void 0 ? {} : _ref3$peerId,
      reason = _ref3.reason;
    if (checkStillExist && !checkStillExist(session, peerId.partyId)) {
      return;
    }
    if (session === currentSession) {
      if (party.conferenceRole === 'Host' || !party.conferenceRole && reason === 'CallSwitch') {
        var _selfExtensionInfo$co;
        conferenceParticipants.unshift({
          sessionId: session.data.sessionId,
          telephonySessionId: session.id,
          partyId: peerId.partyId,
          isHost: true,
          sessionName: '',
          // in new spring-ui, we need render the info of the host
          info: process.env.THEME_SYSTEM === 'spring-ui' && selfExtensionInfo ? {
            phoneNumber: (_selfExtensionInfo$co = selfExtensionInfo.contact) === null || _selfExtensionInfo$co === void 0 ? void 0 : _selfExtensionInfo$co.businessPhone,
            extensionNumber: selfExtensionInfo.extensionNumber,
            name: selfExtensionInfo.name,
            extensionId: "".concat(selfExtensionInfo.id)
          } : {}
        });
      }
    }
    if (code === _Session.PartyStatusCode.gone && reason === CONFERENCE_ORIGIN_TYPE && peerId.telephonySessionId === currentSession.id) {
      var _party$from, _party$to;
      var inbound = (party === null || party === void 0 ? void 0 : party.direction) === _callDirections.callDirection.inbound;
      conferenceParticipants.push({
        sessionId: session.data.sessionId,
        telephonySessionId: session.id,
        partyId: peerId.partyId,
        sessionName: inbound ? (_party$from = party.from) === null || _party$from === void 0 ? void 0 : _party$from.name : (_party$to = party.to) === null || _party$to === void 0 ? void 0 : _party$to.name,
        info: inbound ? party.from : party.to,
        queueName: getSessionQueueName(session)
      });
    }
  });
  return conferenceParticipants;
};
function isConnectedCall(session) {
  var _session$party1, _party$status3, _session$party10, _session$party10$stat;
  var status = (_session$party1 = session.party) === null || _session$party1 === void 0 ? void 0 : _session$party1.status.code;
  var party = session.party;
  var reason = party === null || party === void 0 ? void 0 : (_party$status3 = party.status) === null || _party$status3 === void 0 ? void 0 : _party$status3.reason;
  if (!(session === null || session === void 0 ? void 0 : (_session$party10 = session.party) === null || _session$party10 === void 0 ? void 0 : (_session$party10$stat = _session$party10.status) === null || _session$party10$stat === void 0 ? void 0 : _session$party10$stat.code)) {
    return false;
  }
  return !(status === _Session.PartyStatusCode.disconnected && reason !== 'CallSwitch' || status === _Session.PartyStatusCode.gone);
}

// TODO: workaround of PLA bug: https://jira_domain/browse/PLA-52742, remove these code after PLA
// fixed this bug
var checkRingOutCallDirection = exports.checkRingOutCallDirection = function checkRingOutCallDirection(message) {
  var _body$origin;
  var body = message.body;
  var originType = body === null || body === void 0 ? void 0 : (_body$origin = body.origin) === null || _body$origin === void 0 ? void 0 : _body$origin.type;
  if (body && originType === 'RingOut') {
    var parties = body.parties;
    if (Array.isArray(parties) && parties.length) {
      parties.forEach(function (party) {
        if (party.ringOutRole && party.ringOutRole === 'Initiator' && party.direction === 'Inbound') {
          var tempFrom = _objectSpread({}, party.from);
          party.direction = 'Outbound';
          party.from = party.to;
          party.to = tempFrom;
        }
      });
    }
  }
  return message;
};
//# sourceMappingURL=helpers.js.map
