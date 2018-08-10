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

exports.default = (_messageSenderMessage = {}, (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendSuccess, "Envoi réussi."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendError, "Une erreur s'est produite lors de l'envoi du message."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.numberValidateError, "Erreur de validation du numéro de téléphone."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textEmpty, "Veuillez saisir le texte à envoyer."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noPermission, "Vous n'êtes pas autorisé à envoyer des messages."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderEmpty, "Vous devez sélectionner un numéro parmi les numéros de téléphone pour envoyer"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noToNumber, "Veuillez saisir un numéro de téléphone valide."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientsEmpty, "Veuillez saisir un numéro de destinataire valide."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textTooLong, "Le texte est trop long, limite : 1 000"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.multipartTextTooLong, "Le texte est trop long, limite : 5 000"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientNumberInvalids, "Veuillez entrer un numéro de téléphone valide."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noAreaCode, "Veuillez paramétrer {areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.specialNumber, "L'envoi de textos à des numéros d'urgence ou à des numéros pour services spéciaux n'est pas pris en charge."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.connectFailed, "Échec de la connexion. Veuillez réessayer plus tard."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internalError, "Connexion impossible en raison d'erreurs internes. Veuillez réessayer plus tard."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notAnExtension, "Le numéro de l'extension n'existe pas."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.networkError, "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderNumberInvalid, "Un numéro de téléphone valide est requis pour envoyer des textos aux destinataires qui ne font pas partie de votre entreprise. Veuillez contacter votre administrateur pour ajouter un numéro direct à votre compte."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notSmsToExtension, "Impossible d'envoyer au numéro d'extension avec le numéro de téléphone principal. Si vous souhaitez envoyer à un numéro d'extension, veuillez simplement saisir ce numéro."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internationalSMSNotSupported, "L'envoi de SMS vers un numéro de téléphone international n'est pas pris en charge."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noInternalSMSPermission, "Vous n'êtes pas autorisé à envoyer des messages. Veuillez contacter votre administrateur de compte {brand} pour une mise à niveau."), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noSMSPermission, "Vous n'êtes pas autorisé à envoyer des messages à des destinataires extérieurs à votre entreprise."), (0, _defineProperty3.default)(_messageSenderMessage, "areaCode", "indicatif régional"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sending, "Message en cours d'envoi… Cela peut prendre quelques minutes."), _messageSenderMessage);

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
//# sourceMappingURL=fr-FR.js.map
