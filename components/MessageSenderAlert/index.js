'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MessageSenderAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _messageSenderMessages = require('ringcentral-integration/modules/MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MessageSenderAlert(props) {
  var message = props.message.message;
  if (message === _messageSenderMessages2.default.noAreaCode) {
    var areaCode = _i18n2.default.getString('areaCode', props.currentLocale);
    return _react2.default.createElement(_FormattedMessage2.default, {
      message: _i18n2.default.getString(message, props.currentLocale),
      values: { areaCodeLink: _react2.default.createElement(
          _reactRouter.Link,
          { to: props.regionSettingsUrl },
          areaCode
        ) } });
  }
  return _react2.default.createElement(
    'span',
    null,
    _i18n2.default.getString(message, props.currentLocale)
  );
}

MessageSenderAlert.propTypes = {
  currentLocale: _react.PropTypes.string.isRequired,
  message: _react.PropTypes.shape({
    message: _react.PropTypes.string.isRequired
  }).isRequired,
  regionSettingsUrl: _react.PropTypes.string.isRequired
};

MessageSenderAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _messageSenderMessages2.default.sendSuccess || message === _messageSenderMessages2.default.sendError || message === _messageSenderMessages2.default.numberValidateError || message === _messageSenderMessages2.default.textEmpty || message === _messageSenderMessages2.default.noPermission || message === _messageSenderMessages2.default.senderEmpty || message === _messageSenderMessages2.default.noToNumber || message === _messageSenderMessages2.default.recipientsEmpty || message === _messageSenderMessages2.default.textTooLong || message === _messageSenderMessages2.default.recipientNumberInvalids || message === _messageSenderMessages2.default.noAreaCode || message === _messageSenderMessages2.default.specialNumber || message === _messageSenderMessages2.default.connectFailed || message === _messageSenderMessages2.default.internalError || message === _messageSenderMessages2.default.notAnExtension || message === _messageSenderMessages2.default.networkError || message === _messageSenderMessages2.default.notSmsToExtension || message === _messageSenderMessages2.default.senderNumberInvalid || message === _messageSenderMessages2.default.internationalSMSNotSupported;
};
//# sourceMappingURL=index.js.map
