"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _messageSenderMessage;

var _messageSenderMessages = require("ringcentral-integration/modules/MessageSender/messageSenderMessages");

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_messageSenderMessage = {}, (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendSuccess, "Send Success."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendError, "Something went wrong with sending the message."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.numberValidateError, "Phone Number Validation Error."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textEmpty, "Please enter the text to be sent."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noPermission, "You do not have permission to send messages."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderEmpty, "You must select a number from your phone numbers to send"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noToNumber, "Please enter a valid phone number."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientsEmpty, "Please enter a valid receiver number."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textTooLong, "Text is too long, 1000 limit"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.multipartTextTooLong, "Text is too long, 5000 limit"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientNumberInvalids, "Please enter a valid phone number."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noAreaCode, "Please set {areaCodeLink} to use 7-digit local phone numbers."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.specialNumber, "Sending text to emergency/special service numbers is not supported."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.connectFailed, "Connection failed. Please try again later."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internalError, "Cannot connect due to internal errors. Please try again later."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notAnExtension, "The extension number does not exist."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.networkError, "Cannot connect due to network issues. Please try again later."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderNumberInvalid, "A valid Phone Number is required to send text message to recipients outside your company. Please contact your Administrator to add a direct number to your account."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notSmsToExtension, "Cannot send to an extension number with main phone number. If you want to sent to a extension number, please just enter the extension number."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internationalSMSNotSupported, "Sending SMS to international phone number is not supported."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noInternalSMSPermission, "You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noSMSPermission, "You don't have permission to send messages to recipients outside your organisation."), (0, _defineProperty3.default)(_messageSenderMessage, "areaCode", "area code"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sending, "Message being sent… It may take a couple of minutes to complete."), _messageSenderMessage);

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
//# sourceMappingURL=en-GB.js.map
