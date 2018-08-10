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

exports.default = (_messageSenderMessage = {}, (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendSuccess, "Erfolgreich gesendet."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendError, "Fehler beim Senden der Nachricht."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.numberValidateError, "Fehler beim Validieren der Telefonnummer."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textEmpty, "Geben Sie den zu sendenden Text ein."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noPermission, "Sie verfügen über keine Berechtigung zum Senden von Nachrichten."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderEmpty, "Zum Senden Nummer aus Ihren Telefonnummern auswählen"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noToNumber, "Geben Sie eine gültige Telefonnummer ein."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientsEmpty, "Geben Sie eine gültige Empfängernummer ein."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textTooLong, "Text ist zu lang, maximal 1000 Zeichen"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.multipartTextTooLong, "Text ist zu lang, maximal 5000 Zeichen"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientNumberInvalids, "Geben Sie eine gültige Telefonnummer ein."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noAreaCode, "Legen Sie für die {areaCodeLink} die Verwendung von 7-stelligen lokalen Telefonnummern fest."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.specialNumber, "Textnachrichten an Notrufnummern/bestimmte Servicenummern werden nicht unterstützt."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.connectFailed, "Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internalError, "Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Versuchen Sie es später erneut."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notAnExtension, "Die Durchwahlnummer existiert nicht."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.networkError, "Herstellen der Verbindung aufgrund von Netzwerkproblemen nicht möglich. Versuchen Sie es später erneut."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderNumberInvalid, "Zum Senden von Textnachrichten an Empfänger außerhalb Ihres Unternehmens ist eine gültige Telefonnummer erforderlich. Wenden Sie sich an Ihren Administrator, um Ihrem Konto eine Durchwahlnummer hinzuzufügen."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notSmsToExtension, "Senden an eine Durchwahl mit Haupttelefonnummer nicht möglich. Geben Sie zunächst die Durchwahl an, wenn Sie an eine Durchwahl senden möchten."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internationalSMSNotSupported, "Das Versenden von SMS an internationale Telefonnummern wird nicht unterstützt."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noInternalSMSPermission, "Sie haben keine Berechtigung, Nachrichten an Empfänger außerhalb Ihrer Organisation zu senden. Wenden Sie sich an Ihren {brand}-Kontoadministrator, um ein Upgrade zu erhalten."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noSMSPermission, "Sie haben keine Berechtigung, Nachrichten an Empfänger außerhalb Ihrer Organisation zu senden."), (0, _defineProperty3.default)(_messageSenderMessage, "areaCode", "Vorwahl"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sending, "Nachricht wird versendet… Dies kann einige Minuten dauern."), _messageSenderMessage);

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
//# sourceMappingURL=de-DE.js.map
