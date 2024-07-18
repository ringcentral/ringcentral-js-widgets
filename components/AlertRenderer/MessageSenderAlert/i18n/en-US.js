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
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _messageSenderMessage;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, 'Send Success.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, 'Something wrong happened when send message.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, 'Phone Number Validate Error.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, 'Please enter the text to be sent.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, 'You have no permission to send message.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, 'You must select a number from your phone numbers to send'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, 'Please enter a valid phone number.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, 'Please enter a valid receiver number.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, 'Text is too long, 1000 Limited'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, 'Text is too long, 5000 Limited'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, 'Please enter a valid phone number.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, 'Please set {areaCodeLink} to use 7-digit local phone numbers.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, 'Sending text to emergency/special service numbers is not supported.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, 'Connection failed. Please try again later.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, 'Cannot connect due to internal errors. Please try again later.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, 'The extension number does not exist.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, 'Cannot connect due to network issues. Please try again later.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, 'A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, 'Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, 'Sending SMS to international phone number is not supported.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "You don't have permission to send messages to recipients outside of your organization."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, 'Maximum 10 attachments.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, 'Attachments size is limited to 1.5M bytes.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "It isn't supported to send MMS to an extension."), _defineProperty(_messageSenderMessage, "areaCode", 'area code'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, 'Message being sent…It may take a couple of minutes to complete.'), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, 'Sending SMS to short numbers is not available.'), _messageSenderMessage);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
