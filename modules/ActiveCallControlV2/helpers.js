"use strict";

require("core-js/modules/es6.object.define-property");

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

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.function.name");

var _Session = require("ringcentral-call-control/lib/Session");

var _recordStatus = _interopRequireDefault(require("../Webphone/recordStatus"));

var _callResults = _interopRequireDefault(require("../../enums/callResults"));

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _activeCallControlStatus = _interopRequireDefault(require("../../enums/activeCallControlStatus"));

var _callMonitorHelper = require("../CallMonitor/callMonitorHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    recordStatus: isOnRecording(recordings) ? _recordStatus["default"].recording : _recordStatus["default"].idle,
    removed: false,
    isReject: isRejectCode({
      direction: direction,
      code: status === null || status === void 0 ? void 0 : status.code
    })
  };
  return formatValue;
}

function conflictError(_x) {
  return _conflictError.apply(this, arguments);
}

function _conflictError() {
  _conflictError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
    var conflictErrRgx, conflictMsgRgx;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            conflictErrRgx = /409/g;
            conflictMsgRgx = /Incorrect State/g;
            return _context.abrupt("return", !!(conflictErrRgx.test(error.message) && conflictMsgRgx.test(error.errorCode)));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _conflictError.apply(this, arguments);
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
}
//# sourceMappingURL=helpers.js.map
