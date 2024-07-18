"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ActiveCallControl = require("@ringcentral-integration/commons/modules/ActiveCallControl");
var _callsMerged$somethin;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var callsMerged = _ActiveCallControl.callControlAlerts.callsMerged,
  somethingWentWrong = _ActiveCallControl.callControlAlerts.somethingWentWrong,
  tooManyParticipants = _ActiveCallControl.callControlAlerts.tooManyParticipants;
var holdConflictError = _ActiveCallControl.callControlError.holdConflictError,
  unHoldConflictError = _ActiveCallControl.callControlError.unHoldConflictError,
  muteConflictError = _ActiveCallControl.callControlError.muteConflictError,
  unMuteConflictError = _ActiveCallControl.callControlError.unMuteConflictError,
  generalError = _ActiveCallControl.callControlError.generalError,
  forwardSuccess = _ActiveCallControl.callControlError.forwardSuccess,
  transferCompleted = _ActiveCallControl.callControlError.transferCompleted,
  replyCompleted = _ActiveCallControl.callControlError.replyCompleted;
var _default = (_callsMerged$somethin = {}, _defineProperty(_callsMerged$somethin, callsMerged, 'Calls merged'), _defineProperty(_callsMerged$somethin, somethingWentWrong, 'Something went wrong. Please try again.'), _defineProperty(_callsMerged$somethin, tooManyParticipants, 'Maximum number of participants is reached.'), _defineProperty(_callsMerged$somethin, muteConflictError, 'This call had been muted on other device. Please unmute the call before you control in this App.'), _defineProperty(_callsMerged$somethin, unHoldConflictError, 'This call had been held on other device. Please unhold the call before you control in this App.'), _defineProperty(_callsMerged$somethin, unMuteConflictError, 'This call had been unmuted on other device. Please mute the call before you control in this App.'), _defineProperty(_callsMerged$somethin, holdConflictError, 'This call had been unheld on other device. Please hold the call before you control in this App.'), _defineProperty(_callsMerged$somethin, generalError, 'Unexpected server error. Please try again later.'), _defineProperty(_callsMerged$somethin, forwardSuccess, 'Call forwarded'), _defineProperty(_callsMerged$somethin, transferCompleted, 'Call transferred'), _defineProperty(_callsMerged$somethin, replyCompleted, 'Voice message sent.'), _callsMerged$somethin);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
