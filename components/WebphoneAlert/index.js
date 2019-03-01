"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WebphoneAlert;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _webphoneErrors = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/webphoneErrors"));

var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WebphoneAlert(props) {
  var message = props.message.message;

  var view = _react.default.createElement("span", null, _i18n.default.getString(message, props.currentLocale)); // Handle call record error


  if (message === _webphoneErrors.default.recordError) {
    var _props$message$payloa = props.message.payload;
    _props$message$payloa = _props$message$payloa === void 0 ? {} : _props$message$payloa;
    var errorCode = _props$message$payloa.errorCode;
    view = _react.default.createElement(_FormattedMessage.default, {
      message: _i18n.default.getString(message, props.currentLocale),
      values: {
        errorCode: errorCode
      }
    });
  }

  if (message === _webphoneErrors.default.requestTimeout || message === _webphoneErrors.default.serverTimeout || message === _webphoneErrors.default.internalServerError || message === _webphoneErrors.default.sipProvisionError || message === _webphoneErrors.default.webphoneForbidden || message === _webphoneErrors.default.unknownError) {
    var _props$message$payloa2 = props.message.payload;
    _props$message$payloa2 = _props$message$payloa2 === void 0 ? {} : _props$message$payloa2;
    var statusCode = _props$message$payloa2.statusCode; // sipProvisionError does not have statusCode

    var stub = statusCode ? _react.default.createElement(_FormattedMessage.default, {
      message: _i18n.default.getString('errorCode', props.currentLocale),
      values: {
        errorCode: statusCode
      }
    }) : _i18n.default.getString('occurs', props.currentLocale);
    view = _react.default.createElement(_FormattedMessage.default, {
      message: _i18n.default.getString('webphoneUnavailable', props.currentLocale),
      values: {
        error: stub,
        brandName: props.brand.name
      }
    });
  }

  return view;
}

WebphoneAlert.propTypes = {
  currentLocale: _propTypes.default.string.isRequired,
  brand: _propTypes.default.object.isRequired,
  message: _propTypes.default.shape({
    message: _propTypes.default.string.isRequired
  }).isRequired
};

WebphoneAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _webphoneErrors.default.browserNotSupported || message === _webphoneErrors.default.webphoneCountOverLimit || message === _webphoneErrors.default.webphoneForbidden || message === _webphoneErrors.default.notOutboundCallWithoutDL || message === _webphoneErrors.default.toVoiceMailError || message === _webphoneErrors.default.connected || message === _webphoneErrors.default.muteError || message === _webphoneErrors.default.holdError || message === _webphoneErrors.default.flipError || message === _webphoneErrors.default.recordError || message === _webphoneErrors.default.recordDisabled || message === _webphoneErrors.default.transferError || message === _webphoneErrors.default.requestTimeout || message === _webphoneErrors.default.serverTimeout || message === _webphoneErrors.default.internalServerError || message === _webphoneErrors.default.sipProvisionError || message === _webphoneErrors.default.unknownError;
};
//# sourceMappingURL=index.js.map
