"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallControlAlert;

var _callControlError = _interopRequireDefault(require("ringcentral-integration/modules/ActiveCallControl/callControlError"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file call control alert
 * it be used in <SimpleActiveCallCtrlPage>
 */
function CallControlAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;
  return _i18n.default.getString(message, currentLocale);
}

CallControlAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  var holdConflictError = _callControlError.default.holdConflictError,
      unHoldConflictError = _callControlError.default.unHoldConflictError,
      muteConflictError = _callControlError.default.muteConflictError,
      unMuteConflictError = _callControlError.default.unMuteConflictError,
      generalError = _callControlError.default.generalError;
  return message === holdConflictError || message === unHoldConflictError || message === muteConflictError || message === unMuteConflictError || message === generalError;
};
//# sourceMappingURL=index.js.map
