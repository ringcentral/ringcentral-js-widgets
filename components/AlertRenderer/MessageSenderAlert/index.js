"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.string.link.js");
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MessageSenderAlert = function MessageSenderAlert(_ref) {
  var currentLocale = _ref.currentLocale,
    _ref$message = _ref.message,
    id = _ref$message.id,
    message = _ref$message.message,
    onAreaCodeLink = _ref.onAreaCodeLink,
    brand = _ref.brand;
  if (message === _MessageSender.messageSenderMessages.noAreaCode) {
    var areaCode = _i18n["default"].getString('areaCode', currentLocale);
    var areaCodeLink = onAreaCodeLink ? /*#__PURE__*/_react["default"].createElement("a", {
      className: _styles["default"].link,
      onClick: function onClick(e) {
        e.preventDefault();
        onAreaCodeLink({
          alertId: id
        });
      }
    }, areaCode) : areaCode;
    return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, currentLocale),
      values: {
        areaCodeLink: areaCodeLink
      }
    });
  }
  if ([_MessageSender.messageSenderMessages.noInternalSMSPermission, _MessageSender.messageSenderMessages.noSMSPermission].indexOf(message) !== -1) {
    return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, currentLocale),
      values: {
        brand: brand
      }
    });
  }
  return /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString(message, currentLocale));
};
MessageSenderAlert.defaultProps = {
  onAreaCodeLink: undefined,
  brand: 'RingCentral'
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'F... Remove this comment to see the full error message
MessageSenderAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _MessageSender.messageSenderMessages.sendSuccess || message === _MessageSender.messageSenderMessages.sendError || message === _MessageSender.messageSenderMessages.numberValidateError || message === _MessageSender.messageSenderMessages.textEmpty || message === _MessageSender.messageSenderMessages.noPermission || message === _MessageSender.messageSenderMessages.senderEmpty || message === _MessageSender.messageSenderMessages.noToNumber || message === _MessageSender.messageSenderMessages.recipientsEmpty || message === _MessageSender.messageSenderMessages.textTooLong || message === _MessageSender.messageSenderMessages.multipartTextTooLong || message === _MessageSender.messageSenderMessages.recipientNumberInvalids || message === _MessageSender.messageSenderMessages.noAreaCode || message === _MessageSender.messageSenderMessages.specialNumber || message === _MessageSender.messageSenderMessages.connectFailed || message === _MessageSender.messageSenderMessages.internalError || message === _MessageSender.messageSenderMessages.notAnExtension || message === _MessageSender.messageSenderMessages.networkError || message === _MessageSender.messageSenderMessages.notSmsToExtension || message === _MessageSender.messageSenderMessages.senderNumberInvalid || message === _MessageSender.messageSenderMessages.internationalSMSNotSupported || message === _MessageSender.messageSenderMessages.noInternalSMSPermission || message === _MessageSender.messageSenderMessages.noSMSPermission || message === _MessageSender.messageSenderMessages.attachmentCountLimitation || message === _MessageSender.messageSenderMessages.attachmentSizeLimitation || message === _MessageSender.messageSenderMessages.noAttachmentToExtension || message === _MessageSender.messageSenderMessages.sending || message === _MessageSender.messageSenderMessages.shortNumbersNotAvailable;
};
var _default = exports["default"] = MessageSenderAlert;
//# sourceMappingURL=index.js.map
