"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CallControlAlert;
var _ActiveCallControl = require("@ringcentral-integration/commons/modules/ActiveCallControl");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function CallControlAlert(_ref) {
  var message = _ref.message.message,
    currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}
CallControlAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
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
  return message === callsMerged || message === somethingWentWrong || message === tooManyParticipants || message === holdConflictError || message === unHoldConflictError || message === muteConflictError || message === unMuteConflictError || message === generalError || message === forwardSuccess || message === transferCompleted || message === replyCompleted;
};
//# sourceMappingURL=index.js.map
