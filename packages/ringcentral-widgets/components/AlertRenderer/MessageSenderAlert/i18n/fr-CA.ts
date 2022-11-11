import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';
export default {
  [messageSenderMessages.sendSuccess]: "Envoi réussi.",
  [messageSenderMessages.sendError]: "Une erreur est survenue lors de l’envoi du message.",
  [messageSenderMessages.numberValidateError]: "Erreur de validation du numéro de téléphone.",
  [messageSenderMessages.textEmpty]: "Veuillez entrer le texte à envoyer.",
  [messageSenderMessages.noPermission]: "Vous n’êtes pas autorisé à envoyer des messages.",
  [messageSenderMessages.senderEmpty]: "Vous devez sélectionner un numéro parmi les numéros de téléphone pour envoyer.",
  [messageSenderMessages.noToNumber]: "Veuillez entrer un numéro de téléphone valide.",
  [messageSenderMessages.recipientsEmpty]: "Veuillez entrer un numéro de destinataire valide.",
  [messageSenderMessages.textTooLong]: "Le texte est trop long (limite : 1 000).",
  [messageSenderMessages.multipartTextTooLong]: "Le texte est trop long (limite : 5 000).",
  [messageSenderMessages.recipientNumberInvalids]: "Veuillez entrer un numéro de téléphone valide.",
  [messageSenderMessages.noAreaCode]: "Veuillez configurer l’{areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres.",
  [messageSenderMessages.specialNumber]: "L’envoi de textos à des numéros d’urgence ou à des numéros pour services spéciaux n’est pas pris en charge.",
  [messageSenderMessages.connectFailed]: "Échec de la connexion. Veuillez réessayer plus tard.",
  [messageSenderMessages.internalError]: "Connexion impossible en raison d’erreurs internes. Veuillez réessayer plus tard.",
  [messageSenderMessages.notAnExtension]: "Le numéro de poste n’existe pas.",
  [messageSenderMessages.networkError]: "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard.",
  [messageSenderMessages.senderNumberInvalid]: "Un numéro de téléphone valide est nécessaire pour envoyer des textos à des destinataires en dehors de votre entreprise. Veuillez communiquer avec votre administrateur afin qu’il ajoute un numéro direct à votre compte.",
  [messageSenderMessages.notSmsToExtension]: "Impossible d’envoyer à un numéro de poste avec le numéro de téléphone principal. Si vous souhaitez envoyer à un numéro de poste, veuillez simplement entrer ce numéro.",
  [messageSenderMessages.internationalSMSNotSupported]: "L’envoi de textos vers un numéro de téléphone international n’est pas pris en charge.",
  [messageSenderMessages.noInternalSMSPermission]: "Vous n’êtes pas autorisé à envoyer des messages. Veuillez communiquer avec l’administrateur de votre compte {brand} pour effectuer une mise à niveau.",
  [messageSenderMessages.noSMSPermission]: "Vous n’êtes pas autorisé à envoyer des messages à des destinataires qui ne font pas partie de votre entreprise.",
  [messageSenderMessages.attachmentCountLimitation]: "Maximum de 10 pièces jointes.",
  [messageSenderMessages.attachmentSizeLimitation]: "La taille des pièces jointes est limitée à 1,5 Mo.",
  [messageSenderMessages.noAttachmentToExtension]: "Vous ne pouvez pas envoyer de MMS à un poste.",
  areaCode: "indicatif régional",
  [messageSenderMessages.sending]: "Le message est envoyé… Il pourrait s’écouler quelques minutes avant que ne ce soit terminé."
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
