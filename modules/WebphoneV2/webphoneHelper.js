"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractHeadersData = extractHeadersData;
exports.getCallQueueName = getCallQueueName;
exports.isBrowserSupport = isBrowserSupport;
exports.isChrome = isChrome;
exports.isConferenceSession = isConferenceSession;
exports.isEnableMidLinesInSDP = isEnableMidLinesInSDP;
exports.isFirefox = isFirefox;
exports.isOnHold = isOnHold;
exports.isRecording = isRecording;
exports.isRing = isRing;
exports.isWebRTCSupport = isWebRTCSupport;
exports.isWebSocketSupport = isWebSocketSupport;
exports.normalizeSession = normalizeSession;
exports.sortByCreationTimeDesc = sortByCreationTimeDesc;
exports.sortByLastActiveTimeDesc = sortByLastActiveTimeDesc;

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.match");

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _utils = require("../../lib/di/utils/utils");

var _recordStatus = require("./recordStatus");

var _sessionStatus = require("./sessionStatus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  if (!isFirefox()) {
    return false;
  }

  var version = parseInt(navigator.userAgent.toLowerCase().match(/firefox\/([0-9]+)/)[1], 10);
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

function extractHeadersData(session, headers) {
  if (headers && headers['P-Rc-Api-Ids'] && headers['P-Rc-Api-Ids'][0] && headers['P-Rc-Api-Ids'][0].raw) {
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
    var data = headers['P-Rc-Api-Ids'][0].raw.split(';').map(function (sub) {
      return sub.split('=');
    }).reduce(function (accum, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      accum[(0, _utils.camelize)(key)] = value;
      return accum;
    }, {});

    if (Object.keys(data).length) {
      session.__rc_partyData = data;
    }
  }

  if (headers && headers['Call-ID'] && headers['Call-ID'][0] && headers['Call-ID'][0].raw) {
    session.__rc_callId = headers['Call-ID'][0].raw;
  }
}

function getCallQueueName(_ref3) {
  var direction = _ref3.direction,
      toUserName = _ref3.toUserName,
      fromUserName = _ref3.fromUserName;

  if (direction === _callDirections["default"].outbound) {
    return null;
  }

  var queueName = null;

  if (toUserName && fromUserName === toUserName && toUserName.endsWith(' - ')) {
    queueName = toUserName;
  }

  return queueName;
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
    contactMatch: session.__rc_contactMatch,
    minimized: !!session.__rc_minimized,
    partyData: session.__rc_partyData || null,
    lastActiveTime: session.__rc_lastActiveTime,
    cached: false,
    removed: false,
    callQueueName: getCallQueueName({
      direction: session.__rc_direction,
      toUserName: toUserName,
      fromUserName: fromUserName
    }),
    warmTransferSessionId: session.__rc_transferSessionId
  };
}

function isRing(session) {
  return !!(session && session.direction === _callDirections["default"].inbound && session.callStatus === _sessionStatus.sessionStatus.connecting);
}

function isOnHold(session) {
  return !!(session && session.isOnHold);
}

function sortByCreationTimeDesc(l, r) {
  return r.startTime - l.startTime;
}

function sortByLastActiveTimeDesc(l, r) {
  if (!l || !r) {
    return 0;
  }

  if (r.lastActiveTime !== l.lastActiveTime) {
    return r.lastActiveTime - l.lastActiveTime;
  }

  return sortByCreationTimeDesc(l, r);
}
/**
 * HACK: this function is not very reliable, only use it before the merging complete.
 */


function isConferenceSession(session) {
  return session && session.to && session.to.indexOf('conf_') === 0;
}

function isRecording(session) {
  return !!(session && (session.recordStatus === _recordStatus.recordStatus.pending || session.recordStatus === _recordStatus.recordStatus.recording));
}
//# sourceMappingURL=webphoneHelper.js.map
