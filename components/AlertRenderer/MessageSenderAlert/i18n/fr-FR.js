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

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "Envoi réussi."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "Une erreur s’est produite lors de l’envoi du message."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "Erreur de validité du numéro de téléphone."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "Veuillez saisir le texte à envoyer."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "Vous n’êtes pas autorisé à envoyer des messages."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "Vous devez sélectionner un numéro à envoyer parmi vos numéros de téléphone"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "Veuillez entrer un numéro de téléphone valide."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "Veuillez entrer un numéro de destinataire valide."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "Le texte est trop long, 1 000 caractères maximum"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "Le texte est trop long, 5 000 caractères maximum"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "Veuillez entrer un numéro de téléphone valide."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "Veuillez paramétrer l’{areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "L’envoi de textos à des numéros d’urgence ou à des numéros pour services spéciaux n’est pas pris en charge."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "Échec de la connexion. Veuillez réessayer plus tard."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "Connexion impossible en raison d’erreurs internes. Veuillez réessayer plus tard."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "Le numéro de l’extension n’existe pas."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "Un numéro de téléphone valide est requis pour envoyer des messages à des destinataires externes à votre entreprise. Veuillez contacter votre Administrateur pour ajouter un numéro direct à votre compte."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "Impossible d’envoyer au numéro d’extension avec le numéro de téléphone principal. Si vous souhaitez envoyer à un numéro d’extension, veuillez simplement saisir ce numéro."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "L’envoi de SMS vers un numéro de téléphone international n’est pas pris en charge."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "Vous n’êtes pas autorisé à envoyer des messages. Veuillez contacter votre administrateur de compte {brand} pour une mise à niveau."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "Vous n’êtes pas autorisé à envoyer des messages à des destinataires extérieurs à votre entreprise."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentCountLimitation, "Maximum 10 pièces jointes."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentSizeLimitation, "La taille des pièces jointes est limitée à 1,5 Mo."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].noAttachmentToExtension, "L’envoi de MMS à une extension n’est pas pris en charge."), _defineProperty(_messageSenderMessage, "areaCode", "indicatif"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "Message en cours d’envoi… Cela peut prendre quelques minutes."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
//# sourceMappingURL=fr-FR.js.map
