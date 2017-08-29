'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowerSupport = isBrowerSupport;
exports.normalizeSession = normalizeSession;
exports.isRing = isRing;
exports.isOnHold = isOnHold;

var _recordStatus = require('./recordStatus');

var _recordStatus2 = _interopRequireDefault(_recordStatus);

var _sessionStatus = require('./sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _callDirections = require('../../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBrowerSupport() {
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
    minimized: !!session.minimized
  };
}

function isRing(session) {
  return !!(session && session.direction === _callDirections2.default.inbound && session.callStatus === _sessionStatus2.default.connecting);
}

function isOnHold(session) {
  return !!(session && session.callStatus === _sessionStatus2.default.onHold);
}
//# sourceMappingURL=webphoneHelper.js.map
