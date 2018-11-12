'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.isHangUp = isHangUp;
exports.isReject = isReject;
exports.normalizeSession = normalizeSession;
exports.requestURI = requestURI;
exports.confictError = confictError;

var _recordStatus = require('../../modules/Webphone/recordStatus');

var _recordStatus2 = _interopRequireDefault(_recordStatus);

var _callResults = require('../../enums/callResults');

var _callResults2 = _interopRequireDefault(_callResults);

var _callDirections = require('../../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _activeCallControlStatus = require('../../enums/activeCallControlStatus');

var _activeCallControlStatus2 = _interopRequireDefault(_activeCallControlStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isHangUp(code) {
  return code === _callResults2.default.disconnected;
}
function isReject(_ref) {
  var direction = _ref.direction,
      code = _ref.code;

  return direction === _callDirections2.default.inbound && (code === _activeCallControlStatus2.default.setUp || code === _activeCallControlStatus2.default.proceeding);
}
function normalizeSession(_ref2) {
  var call = _ref2.call,
      _ref2$activeSessionSt = _ref2.activeSessionStatus,
      activeSessionStatus = _ref2$activeSessionSt === undefined ? {} : _ref2$activeSessionSt;
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
    recordStatus: isOnRecording ? _recordStatus2.default.recording : _recordStatus2.default.idle,
    removed: false,
    isReject: isReject
  };
  return (0, _extends3.default)({}, formatValue);
}
function requestURI(activeSession) {
  var telephonySessionId = activeSession.telephonySessionId,
      partyId = activeSession.partyId,
      recordingId = activeSession.recordingId;

  var prefix = '/account/~/telephony/sessions/' + telephonySessionId;
  return {
    hangUp: '' + prefix,
    reject: prefix + '/parties/' + partyId + '/reject',
    hold: prefix + '/parties/' + partyId + '/hold',
    unHold: prefix + '/parties/' + partyId + '/unhold',
    transfer: prefix + '/parties/' + partyId + '/transfer',
    flip: prefix + '/parties/' + partyId + '/flip',
    getPartyData: prefix + '/parties/' + partyId,
    mute: prefix + '/parties/' + partyId,
    record: prefix + '/parties/' + partyId + '/recordings',
    stopRecord: prefix + '/parties/' + partyId + '/recordings/' + recordingId
  };
}
function confictError(error) {
  var conflictErrRgx = /409/g;
  var conflictMsgRgx = /Incorrect State/g;
  return conflictErrRgx.test(error.message) && conflictMsgRgx.test(error.apiResponse._text);
}
//# sourceMappingURL=helpers.js.map
