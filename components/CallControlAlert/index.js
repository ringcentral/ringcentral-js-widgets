'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallControlAlert;

var _callControlError = require('ringcentral-integration/modules/ActiveCallControl/callControlError');

var _callControlError2 = _interopRequireDefault(_callControlError);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file call control alert
 * it be used in <SimpleActiveCallCtrlPage>
 */
function CallControlAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;

  return _i18n2.default.getString(message, currentLocale);
}

CallControlAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  var holdConflictError = _callControlError2.default.holdConflictError,
      unHoldConflictError = _callControlError2.default.unHoldConflictError,
      muteConflictError = _callControlError2.default.muteConflictError,
      unMuteConflictError = _callControlError2.default.unMuteConflictError,
      generalError = _callControlError2.default.generalError;

  return message === holdConflictError || message === unHoldConflictError || message === muteConflictError || message === unMuteConflictError || message === generalError;
};
//# sourceMappingURL=index.js.map
