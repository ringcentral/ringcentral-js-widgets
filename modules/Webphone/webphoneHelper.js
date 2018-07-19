'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowserSupport = isBrowserSupport;
exports.normalizeSession = normalizeSession;
exports.isRing = isRing;
exports.isOnHold = isOnHold;
exports.sortByCreationTimeDesc = sortByCreationTimeDesc;
exports.sortByLastHoldingTimeDesc = sortByLastHoldingTimeDesc;
exports.isConferenceSession = isConferenceSession;

var _recordStatus = require('./recordStatus');

var _recordStatus2 = _interopRequireDefault(_recordStatus);

var _sessionStatus = require('./sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _callDirections = require('../../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBrowserSupport() {
  var isChrome = !!navigator.userAgent.match(/Chrom(e|ium)/);
  if (!isChrome) {
    return false;
  }
  var chromeVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
  if (chromeVersion >= 51) {
    return true;
  }
  return false;
}

function normalizeSession(session) {
  return {
    id: session.id,
    direction: session.direction,
    callStatus: session.callStatus,
    to: session.request.to.uri.user,
    toUserName: session.request.to.displayName,
    from: session.request.from.uri.user,
    fromNumber: session.fromNumber,
    fromUserName: session.request.from.displayName,
    startTime: session.startTime && new Date(session.startTime).getTime(),
    creationTime: session.creationTime,
    isOnHold: !!session.isOnHold().local,
    isOnMute: !!session.isOnMute,
    isOnFlip: !!session.isOnFlip,
    isOnTransfer: !!session.isOnTransfer,
    isToVoicemail: !!session.isToVoicemail,
    isForwarded: !!session.isForwarded,
    isReplied: !!session.isForwarded,
    recordStatus: session.recordStatus || _recordStatus2.default.idle,
    contactMatch: session.contactMatch,
    minimized: !!session.minimized,
    data: session.data || null,
    lastHoldingTime: session.lastHoldingTime || 0,
    cached: false,
    removed: false
  };
}

function isRing(session) {
  return !!(session && session.direction === _callDirections2.default.inbound && session.callStatus === _sessionStatus2.default.connecting);
}

function isOnHold(session) {
  return !!(session && session.callStatus === _sessionStatus2.default.onHold);
}

function sortByCreationTimeDesc(l, r) {
  return r.startTime - l.startTime;
}

function sortByLastHoldingTimeDesc(l, r) {
  if (!l || !r) {
    return 0;
  }
  if (r.lastHoldingTime !== l.lastHoldingTime) {
    return r.lastHoldingTime - l.lastHoldingTime;
  }
  return sortByCreationTimeDesc(l, r);
}

/**
 * HACK: this function is not very reliable, only use it before the merging complete.
 */
function isConferenceSession(session) {
  return session && session.to && session.to.indexOf('conf_') === 0;
}
//# sourceMappingURL=webphoneHelper.js.map
