"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractHeadersData = extractHeadersData;
exports.getCallQueueName = getCallQueueName;
exports.getWebphoneSessionStartTime = getWebphoneSessionStartTime;
exports.isBrowserSupport = isBrowserSupport;
exports.isChrome = isChrome;
exports.isEnableMidLinesInSDP = isEnableMidLinesInSDP;
exports.isFirefox = isFirefox;
exports.isOnHold = isOnHold;
exports.isPickupReason = isPickupReason;
exports.isRing = isRing;
exports.isWebRTCSupport = isWebRTCSupport;
exports.isWebSocketSupport = isWebSocketSupport;
exports.normalizeSession = normalizeSession;
exports.readCallIdFromHeaders = readCallIdFromHeaders;
exports.readPartyDataFromHeaders = readPartyDataFromHeaders;
exports.sortByLastActiveTimeDesc = sortByLastActiveTimeDesc;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.match.js");
var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");
var _camelCase = _interopRequireDefault(require("lodash/camelCase"));
var _recordStatus = require("./recordStatus");
var _sessionStatus = require("./sessionStatus");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var environment;
if (typeof window !== 'undefined') {
  environment = window;
}
if (typeof global !== 'undefined') {
  environment = global.window || global;
}
function isChrome() {
  if (!environment.navigator) {
    return false;
  }
  var browserUa = environment.navigator.userAgent.toLowerCase();
  return !!browserUa.match(/chrom(e|ium)/);
}
function isFirefox() {
  if (!environment.navigator) {
    return false;
  }
  var browserUa = environment.navigator.userAgent.toLowerCase();
  return browserUa.indexOf('firefox') > -1 && !isChrome();
}
function isEnableMidLinesInSDP() {
  var _navigator$userAgent$;
  if (!isFirefox()) {
    return false;
  }
  var version = parseInt((_navigator$userAgent$ = navigator.userAgent.toLowerCase().match(/firefox\/([0-9]+)/)) === null || _navigator$userAgent$ === void 0 ? void 0 : _navigator$userAgent$[1], 10);
  return version >= 63;
}
function isWebSocketSupport() {
  return !!(environment && environment.WebSocket);
}
function isWebRTCSupport() {
  if (!environment.navigator) {
    return false;
  }
  return !!(environment.MediaStream && environment.RTCPeerConnection && environment.navigator.mediaDevices.getUserMedia);
}
function isBrowserSupport() {
  return isWebSocketSupport() && isWebRTCSupport();
}
function readPartyDataFromHeaders(headers) {
  var _headers$PRcApiIds, _headers$PRcApiIds$;
  var rawValue = headers === null || headers === void 0 ? void 0 : (_headers$PRcApiIds = headers['P-Rc-Api-Ids']) === null || _headers$PRcApiIds === void 0 ? void 0 : (_headers$PRcApiIds$ = _headers$PRcApiIds[0]) === null || _headers$PRcApiIds$ === void 0 ? void 0 : _headers$PRcApiIds$.raw;
  if (rawValue) {
    /**
     * interface PartyData {
     *  "partyId": String,
     *  "sessionId": String
     * }
     *
     * INFO: partyId is ID of the participant in current Session. Mostly it represents User on the call,
     * it could be active participant (talking right now) or already disconnected User,
     * e.g. who made a transfer to another person.
     * To identify the User who owns the party you need to find owner.extensionId within party.
     */
    var data = rawValue.split(';').map(function (sub) {
      return sub.split('=');
    }).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      acc[(0, _camelCase["default"])(key)] = value;
      return acc;
    }, {});
    if (Object.keys(data).length) {
      return data;
    }
  }
}
function readCallIdFromHeaders(headers) {
  var _headers$CallID, _headers$CallID$;
  return headers === null || headers === void 0 ? void 0 : (_headers$CallID = headers['Call-ID']) === null || _headers$CallID === void 0 ? void 0 : (_headers$CallID$ = _headers$CallID[0]) === null || _headers$CallID$ === void 0 ? void 0 : _headers$CallID$.raw;
}
function extractHeadersData(session, headers) {
  var partyData = readPartyDataFromHeaders(headers);
  if (partyData) {
    session.__rc_partyData = partyData;
  }
  var callId = readCallIdFromHeaders(headers);
  if (callId) {
    session.__rc_callId = callId;
  }
}
function getCallQueueName(_ref3) {
  var direction = _ref3.direction,
    headers = _ref3.headers;
  if (direction === _callDirections.callDirection.outbound || !headers || !headers['P-Rc-Api-Call-Info'] || !headers['P-Rc-Api-Call-Info'][0] || !headers['P-Rc-Api-Call-Info'][0].raw || !headers['P-Asserted-Identity'] || !headers['P-Asserted-Identity'][0] || !headers['P-Asserted-Identity'][0].raw) {
    return null;
  }
  if (headers['P-Rc-Api-Call-Info'][0].raw.indexOf('queue-call') === -1) {
    return null;
  }
  var name = headers['P-Asserted-Identity'][0].raw.split('"')[1];
  return name || null;
}
function normalizeSession(session) {
  var _session$request, _session$request$to, _session$request2, _session$request2$fro, _session$request3, _session$request3$to, _session$request3$to$, _session$request4, _session$request4$fro, _session$request4$fro2;
  if (!session) {
    return session;
  }
  var toUserName = (_session$request = session.request) === null || _session$request === void 0 ? void 0 : (_session$request$to = _session$request.to) === null || _session$request$to === void 0 ? void 0 : _session$request$to.displayName;
  var fromUserName = (_session$request2 = session.request) === null || _session$request2 === void 0 ? void 0 : (_session$request2$fro = _session$request2.from) === null || _session$request2$fro === void 0 ? void 0 : _session$request2$fro.displayName;
  return {
    id: session.id,
    callId: session.__rc_callId,
    direction: session.__rc_direction,
    callStatus: session.__rc_callStatus,
    to: (_session$request3 = session.request) === null || _session$request3 === void 0 ? void 0 : (_session$request3$to = _session$request3.to) === null || _session$request3$to === void 0 ? void 0 : (_session$request3$to$ = _session$request3$to.uri) === null || _session$request3$to$ === void 0 ? void 0 : _session$request3$to$.user,
    toUserName: toUserName,
    from: (_session$request4 = session.request) === null || _session$request4 === void 0 ? void 0 : (_session$request4$fro = _session$request4.from) === null || _session$request4$fro === void 0 ? void 0 : (_session$request4$fro2 = _session$request4$fro.uri) === null || _session$request4$fro2 === void 0 ? void 0 : _session$request4$fro2.user,
    fromNumber: session.__rc_fromNumber,
    fromUserName: fromUserName,
    fromTag: session.fromTag,
    toTag: session.toTag,
    startTime: session.startTime && new Date(session.startTime).getTime(),
    creationTime: session.__rc_creationTime,
    isOnHold: !!session.localHold,
    isOnMute: !!session.__rc_isOnMute,
    isOnFlip: !!session.__rc_isOnFlip,
    isOnTransfer: !!session.__rc_isOnTransfer,
    isToVoicemail: !!session.__rc_isToVoicemail,
    isForwarded: !!session.__rc_isForwarded,
    isReplied: !!session.__rc_isReplied,
    recordStatus: session.__rc_recordStatus || _recordStatus.recordStatus.idle,
    // TODO: fix type
    // @ts-ignore
    contactMatch: session.__rc_contactMatch,
    minimized: !!session.__rc_minimized,
    partyData: session.__rc_partyData || null,
    lastActiveTime: session.__rc_lastActiveTime,
    cached: false,
    removed: false,
    callQueueName: getCallQueueName({
      direction: session.__rc_direction,
      headers: session.request && session.request.headers
    }),
    warmTransferSessionId: session.__rc_transferSessionId || ''
  };
}
function isRing(session) {
  return !!(session && session.direction === _callDirections.callDirection.inbound && session.callStatus === _sessionStatus.sessionStatus.connecting);
}
function isOnHold(session) {
  return !!(session && session.isOnHold);
}
function sortByLastActiveTimeDesc(l, r) {
  if (!l || !r) {
    return 0;
  }
  if (r.lastActiveTime !== l.lastActiveTime) {
    return r.lastActiveTime - l.lastActiveTime;
  }
  return r.startTime - l.startTime;
}
function isPickupReason(e) {
  var _e$data, _e$data$includes;
  return Boolean(e === null || e === void 0 ? void 0 : (_e$data = e.data) === null || _e$data === void 0 ? void 0 : (_e$data$includes = _e$data.includes) === null || _e$data$includes === void 0 ? void 0 : _e$data$includes.call(_e$data, 'p-rc-reason: Pickup'));
}
function getWebphoneSessionStartTime(session) {
  if (session.direction === _callDirections.callDirection.inbound) {
    return session.creationTime;
  }
  return session.startTime || session.creationTime;
}
//# sourceMappingURL=webphoneHelper.js.map
