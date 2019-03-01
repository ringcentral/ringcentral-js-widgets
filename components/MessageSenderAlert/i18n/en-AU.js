"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("ringcentral-integration/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sendSuccess, "Send Success."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sendError, "Something went wrong with sending the message."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.numberValidateError, "Phone Number Validation Error."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.textEmpty, "Please enter the text to be sent."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noPermission, "You do not have permission to send messages."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.senderEmpty, "You must select a number from your phone numbers to send"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noToNumber, "Please enter a valid phone number."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.recipientsEmpty, "Please enter a valid receiver number."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.textTooLong, "Text is too long, 1000 limit"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.multipartTextTooLong, "Text is too long, 5000 limit"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.recipientNumberInvalids, "Please enter a valid phone number."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noAreaCode, "Please set {areaCodeLink} to use 7-digit local phone numbers."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.specialNumber, "Sending texts to emergency/special service numbers is not supported."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.connectFailed, "Connection failed. Please try again later."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.internalError, "Cannot connect due to internal errors. Please try again later."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.notAnExtension, "The extension number does not exist."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.networkError, "Cannot connect due to network issues. Please try again later."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.senderNumberInvalid, "A valid phone number is required to send text messages to recipients outside of your company. Please contact your administrator to add a direct number to your account."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.notSmsToExtension, "Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.internationalSMSNotSupported, "Sending SMS to international phone numbers is not supported."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noInternalSMSPermission, "You do not have permission to send messages. Please contact your {brand} account administrator for an upgrade."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noSMSPermission, "You don't have permission to send messages to recipients outside your organisation."), _defineProperty(_messageSenderMessage, "areaCode", "area code"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sending, "Message being sent… It may take a couple of minutes to complete."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports.default = _default;
//# sourceMappingURL=en-AU.js.map
