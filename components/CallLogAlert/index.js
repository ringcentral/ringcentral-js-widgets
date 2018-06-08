'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallLogAlert;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _callLogMessages = require('ringcentral-integration/enums/callLogMessages');

var _callLogMessages2 = _interopRequireDefault(_callLogMessages);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallLogAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;

  return _i18n2.default.getString(message, currentLocale);
}
CallLogAlert.propTypes = {
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};
CallLogAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callLogMessages2.default.logCallLogFailed;
};
//# sourceMappingURL=index.js.map
