"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessages2 = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "Verzonden."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "Er is iets misgegaan bij het verzenden van een bericht."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "Validatiefout telefoonnummer."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "Voer de te verzenden tekst in."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "U hebt geen toestemming om een bericht te verzenden."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "U moet een nummer uit uw telefoonnummers selecteren om te verzenden"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "Voer een geldig telefoonnummer in."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "Voer een geldig ontvangstnummer in."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "Tekst is te lang, mag niet langer zijn dan 1000 tekens"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "Tekst is te lang, mag niet langer zijn dan 5000"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "Voer een geldig telefoonnummer in."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "Stel {areaCodeLink} in om 7-cijferige lokale telefoonnummers te gebruiken."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "Het verzenden van een bericht naar alarmnummers of speciale servicenummers wordt niet ondersteund."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "Verbinding mislukt. Probeer het later opnieuw."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "Verbinding maken is mislukt vanwege interne fouten. Probeer het later opnieuw."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "Het extensienummer bestaat niet."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "Verbinding maken is mislukt vanwege netwerkfouten. Probeer het later opnieuw."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "Een geldig telefoonnummer is vereist om sms-berichten naar ontvangers buiten uw bedrijf te verzenden. Neem contact op met uw beheerder om een direct nummer aan uw account toe te voegen."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "Kan niet verzenden naar een extensienummer met een hoofdtelefoonnummer. Voer alleen een extensienummer in als u naar een extensienummer wilt verzenden."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "Het verzenden van sms-berichten naar een internationaal nummer wordt niet ondersteund."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "U hebt onvoldoende machtigingen om berichten te verzenden. Neem contact op met uw {brand}-accountbeheerder voor een upgrade."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "U hebt geen toestemming om berichten te verzenden naar ontvangers buiten uw organisatie."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentCountLimitation, "Maximaal 10 bijlagen."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentSizeLimitation, "Bijlagen mogen niet groter zijn dan 1,5 MB."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].noAttachmentToExtension, "Het verzenden van mms naar een extensie wordt niet ondersteund."), _defineProperty(_messageSenderMessage, "areaCode", "netnummer"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "Bericht wordt verzonden. Het kan een paar minuten duren voordat dit voltooid is."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"[messageSenderMessagesV2.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessagesV2.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
