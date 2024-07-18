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
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "Envoi réussi."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "Une erreur s’est produite lors de l’envoi du message."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "Erreur de validité du numéro de téléphone."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "Veuillez saisir le texte à envoyer."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "Vous n’êtes pas autorisé à envoyer des messages."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "Vous devez sélectionner un numéro à envoyer parmi vos numéros de téléphone"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "Veuillez saisir un numéro de téléphone valide."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "Veuillez entrer un numéro de destinataire valide."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "Le texte est trop long, 1 000 caractères maximum"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "Le texte est trop long, 5 000 caractères maximum"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "Veuillez entrer un numéro de téléphone valide."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "Veuillez paramétrer l’{areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "L’envoi de textos à des numéros d’urgence ou à des numéros pour services spéciaux n’est pas pris en charge."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "Échec de la connexion. Veuillez réessayer ultérieurement."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "Connexion impossible en raison d’erreurs internes. Veuillez réessayer ultérieurement."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "Le numéro de l’extension n’existe pas."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer ultérieurement."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "Un numéro de téléphone valide est requis pour envoyer des messages à des destinataires externes à votre entreprise. Veuillez contacter votre administrateur pour ajouter un numéro direct à votre compte."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "Envoi impossible à un numéro d’extension avec un numéro de téléphone principal. Si vous souhaitez envoyer un message à un numéro d’extension, veuillez saisir le numéro d’extension."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "L’envoi de SMS vers un numéro de téléphone international n’est pas pris en charge."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "Vous n’êtes pas autorisé à envoyer des messages. Veuillez contacter votre administrateur de compte {brand} pour une mise à niveau."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "Vous n’êtes pas autorisé à envoyer des messages à des destinataires extérieurs à votre entreprise."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "Maximum 10 pièces jointes."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "La taille des pièces jointes est limitée à 1,5 Mo."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "L’envoi de MMS à une extension n’est pas pris en charge."), _defineProperty(_messageSenderMessage, "areaCode", "indicatif"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "Message en cours d’envoi… Cela peut prendre quelques minutes."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "L’envoi de SMS à des numéros courts n’est pas disponible."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
exports["default"] = _default;
//# sourceMappingURL=fr-FR.js.map
