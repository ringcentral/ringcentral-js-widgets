'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WebphoneAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _webphoneErrors = require('ringcentral-integration/modules/Webphone/webphoneErrors');

var _webphoneErrors2 = _interopRequireDefault(_webphoneErrors);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WebphoneAlert(props) {
  var message = props.message.message;

  var view = _react2.default.createElement(
    'span',
    null,
    _i18n2.default.getString(message, props.currentLocale)
  );
  // Handle call record error
  if (message === _webphoneErrors2.default.recordError) {
    var errorCode = props.message.payload.errorCode;

    view = _react2.default.createElement(_FormattedMessage2.default, {
      message: _i18n2.default.getString(message, props.currentLocale),
      values: { errorCode: errorCode }
    });
  }
  if (message === _webphoneErrors2.default.requestTimeout || message === _webphoneErrors2.default.serverTimeout || message === _webphoneErrors2.default.internalServerError || message === _webphoneErrors2.default.sipProvisionError || message === _webphoneErrors2.default.webphoneForbidden || message === _webphoneErrors2.default.unknownError) {
    var statusCode = props.message.payload.statusCode;
    // sipProvisionError does not have statusCode

    var stub = statusCode ? _react2.default.createElement(_FormattedMessage2.default, {
      message: _i18n2.default.getString('errorCode', props.currentLocale),
      values: { errorCode: statusCode }
    }) : _i18n2.default.getString('occurs', props.currentLocale);
    view = _react2.default.createElement(_FormattedMessage2.default, {
      message: _i18n2.default.getString('webphoneUnavailable', props.currentLocale),
      values: { error: stub, brandName: props.brand.name }
    });
  }
  return view;
}

WebphoneAlert.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.object.isRequired,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired
};

WebphoneAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _webphoneErrors2.default.browserNotSupported || message === _webphoneErrors2.default.webphoneCountOverLimit || message === _webphoneErrors2.default.webphoneForbidden || message === _webphoneErrors2.default.notOutboundCallWithoutDL || message === _webphoneErrors2.default.toVoiceMailError || message === _webphoneErrors2.default.connected || message === _webphoneErrors2.default.muteError || message === _webphoneErrors2.default.holdError || message === _webphoneErrors2.default.flipError || message === _webphoneErrors2.default.recordError || message === _webphoneErrors2.default.recordDisabled || message === _webphoneErrors2.default.transferError || message === _webphoneErrors2.default.requestTimeout || message === _webphoneErrors2.default.serverTimeout || message === _webphoneErrors2.default.internalServerError || message === _webphoneErrors2.default.sipProvisionError || message === _webphoneErrors2.default.unknownError;
};
//# sourceMappingURL=index.js.map
