"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MessageSenderAlert;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.string.link");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _messageSenderMessages = _interopRequireDefault(require("ringcentral-integration/modules/MessageSender/messageSenderMessages"));

var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MessageSenderAlert(_ref) {
  var currentLocale = _ref.currentLocale,
      _ref$message = _ref.message,
      id = _ref$message.id,
      message = _ref$message.message,
      onAreaCodeLink = _ref.onAreaCodeLink,
      brand = _ref.brand;

  if (message === _messageSenderMessages["default"].noAreaCode) {
    var areaCode = _i18n["default"].getString('areaCode', currentLocale);

    var areaCodeLink = onAreaCodeLink ? _react["default"].createElement("a", {
      className: _styles["default"].link,
      onClick: function onClick(e) {
        e.preventDefault();
        onAreaCodeLink({
          alertId: id
        });
      }
    }, areaCode) : areaCode;
    return _react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, currentLocale),
      values: {
        areaCodeLink: areaCodeLink
      }
    });
  } else if ([_messageSenderMessages["default"].noInternalSMSPermission, _messageSenderMessages["default"].noSMSPermission].indexOf(message) !== -1) {
    return _react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, currentLocale),
      values: {
        brand: brand
      }
    });
  }

  return _react["default"].createElement("span", null, _i18n["default"].getString(message, currentLocale));
}

MessageSenderAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  onAreaCodeLink: _propTypes["default"].func
};
MessageSenderAlert.defaultProps = {
  onAreaCodeLink: undefined,
  brand: 'RingCentral'
};

MessageSenderAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _messageSenderMessages["default"].sendSuccess || message === _messageSenderMessages["default"].sendError || message === _messageSenderMessages["default"].numberValidateError || message === _messageSenderMessages["default"].textEmpty || message === _messageSenderMessages["default"].noPermission || message === _messageSenderMessages["default"].senderEmpty || message === _messageSenderMessages["default"].noToNumber || message === _messageSenderMessages["default"].recipientsEmpty || message === _messageSenderMessages["default"].textTooLong || message === _messageSenderMessages["default"].multipartTextTooLong || message === _messageSenderMessages["default"].recipientNumberInvalids || message === _messageSenderMessages["default"].noAreaCode || message === _messageSenderMessages["default"].specialNumber || message === _messageSenderMessages["default"].connectFailed || message === _messageSenderMessages["default"].internalError || message === _messageSenderMessages["default"].notAnExtension || message === _messageSenderMessages["default"].networkError || message === _messageSenderMessages["default"].notSmsToExtension || message === _messageSenderMessages["default"].senderNumberInvalid || message === _messageSenderMessages["default"].internationalSMSNotSupported || message === _messageSenderMessages["default"].noInternalSMSPermission || message === _messageSenderMessages["default"].noSMSPermission || message === _messageSenderMessages["default"].sending;
};
//# sourceMappingURL=index.js.map
