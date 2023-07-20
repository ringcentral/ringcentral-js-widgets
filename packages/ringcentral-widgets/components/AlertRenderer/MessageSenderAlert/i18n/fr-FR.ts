import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';
export default {
  [messageSenderMessages.sendSuccess]: "Envoi réussi.",
  [messageSenderMessages.sendError]: "Une erreur s’est produite lors de l’envoi du message.",
  [messageSenderMessages.numberValidateError]: "Erreur de validité du numéro de téléphone.",
  [messageSenderMessages.textEmpty]: "Veuillez saisir le texte à envoyer.",
  [messageSenderMessages.noPermission]: "Vous n’êtes pas autorisé à envoyer des messages.",
  [messageSenderMessages.senderEmpty]: "Vous devez sélectionner un numéro à envoyer parmi vos numéros de téléphone",
  [messageSenderMessages.noToNumber]: "Veuillez saisir un numéro de téléphone valide.",
  [messageSenderMessages.recipientsEmpty]: "Veuillez entrer un numéro de destinataire valide.",
  [messageSenderMessages.textTooLong]: "Le texte est trop long, 1 000 caractères maximum",
  [messageSenderMessages.multipartTextTooLong]: "Le texte est trop long, 5 000 caractères maximum",
  [messageSenderMessages.recipientNumberInvalids]: "Veuillez entrer un numéro de téléphone valide.",
  [messageSenderMessages.noAreaCode]: "Veuillez paramétrer l’{areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres.",
  [messageSenderMessages.specialNumber]: "L’envoi de textos à des numéros d’urgence ou à des numéros pour services spéciaux n’est pas pris en charge.",
  [messageSenderMessages.connectFailed]: "Échec de la connexion. Veuillez réessayer ultérieurement.",
  [messageSenderMessages.internalError]: "Connexion impossible en raison d’erreurs internes. Veuillez réessayer ultérieurement.",
  [messageSenderMessages.notAnExtension]: "Le numéro de l’extension n’existe pas.",
  [messageSenderMessages.networkError]: "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer ultérieurement.",
  [messageSenderMessages.senderNumberInvalid]: "Un numéro de téléphone valide est requis pour envoyer des messages à des destinataires externes à votre entreprise. Veuillez contacter votre administrateur pour ajouter un numéro direct à votre compte.",
  [messageSenderMessages.notSmsToExtension]: "Envoi impossible à un numéro d’extension avec un numéro de téléphone principal. Si vous souhaitez envoyer un message à un numéro d’extension, veuillez saisir le numéro d’extension.",
  [messageSenderMessages.internationalSMSNotSupported]: "L’envoi de SMS vers un numéro de téléphone international n’est pas pris en charge.",
  [messageSenderMessages.noInternalSMSPermission]: "Vous n’êtes pas autorisé à envoyer des messages. Veuillez contacter votre administrateur de compte {brand} pour une mise à niveau.",
  [messageSenderMessages.noSMSPermission]: "Vous n’êtes pas autorisé à envoyer des messages à des destinataires extérieurs à votre entreprise.",
  [messageSenderMessages.attachmentCountLimitation]: "Maximum 10 pièces jointes.",
  [messageSenderMessages.attachmentSizeLimitation]: "La taille des pièces jointes est limitée à 1,5 Mo.",
  [messageSenderMessages.noAttachmentToExtension]: "L’envoi de MMS à une extension n’est pas pris en charge.",
  areaCode: "indicatif",
  [messageSenderMessages.sending]: "Message en cours d’envoi… Cela peut prendre quelques minutes.",
  [messageSenderMessages.shortNumbersNotAvailable]: "L’envoi de SMS à des numéros courts n’est pas disponible."
};

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
