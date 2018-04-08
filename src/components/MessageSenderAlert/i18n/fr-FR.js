import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Envoi réussi.',
  [messageSenderMessages.sendError]: 'Une erreur s\'est produite lors de l\'envoi du message.',
  [messageSenderMessages.numberValidateError]: 'Erreur de validation du numéro de téléphone.',
  [messageSenderMessages.textEmpty]: 'Veuillez saisir le texte à envoyer.',
  [messageSenderMessages.noPermission]: 'Vous n\'êtes pas autorisé à envoyer des messages.',
  [messageSenderMessages.senderEmpty]: 'Vous devez sélectionner un numéro parmi les numéros de téléphone pour envoyer',
  [messageSenderMessages.noToNumber]: 'Veuillez sa'Veuillez saisir un numéro de destinataire valide.',
  [messageSenderMessages.recipientsEmpty]: 'Le texte est trop long, limite\xA0: 1\xA0000',
  [messageSenderMessages.textTooLong]: 'Le texte est trop long, limite\xA0: 5\xA0000',
  [messageSenderMessages.multipartTextTooLong]: 'Veuillez paramétrer {areaCodeLink} pour utiliser des numéros de téléphone locaux à 7\xA0chiffres.',
  [messageSenderMessages.recipientNumberInvalids]: 'Échec de la connexion. Veuillez réessayer plus tard.',
  [messageSenderMessages.noAreaCode]: 'Connexion impossible en raison d\'erreurs internes. Veuillez réessayer plus tard.',
  [messageSend'L\'envoi de textos à des numéros d\'urgence ou à des numéros pour services spéciaux n\'est pas pris en charge.',
  [messageSenderMessages.connectFailed]: 'Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard.',
  [messageSenderMessages.internalError]: 'Impossible d\'envoyer au numéro d\'extension avec le numéro de téléphone principal. Si vous souhaitez envoyer à un numéro d\'extension, veuillez simplement saisir ce numéro.',
  [messageSenderMessages.notAnExtension]: 'The extension number does not exist.',
  [messageSenderMessages.networkError]: 'L\'envoi de SMS vers un numéro de téléphone international n\'est pas pris en charge.',
  [messageSenderMessages'indicatif régional'senderNumberInvalid]: 'Un numéro de téléphone valide est requis pour envoyer des textos aux destinataires qui ne font pas partie de votre entreprise. Veuillez contacter votre administrateur pour ajouter un numéro direct à votre compte.',
  [messageSenderMessages.notSmsToExtension]: 'Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number.',
  [messageSenderMessages'Veuillez saisir un numéro de téléphone valide.'internationalSMSNotSupported]: 'Sending SMS to international phone number is not supported.',
  [messageSenderMessages.noInternalSMSPermission]: 'Vous n\'êtes pas autorisé à envoyer des messages. Veuillez contacter votre administrateur de compte {brand} pour une mise à niveau.',
  [messageSenderMessages.noSMSPermission]: 'Vous n\'êtes pas autorisé à envoyer des messages à des destinataires extérieurs à votre entreprise. Veuillez contacter votre administrateur de compte {brand} pour une mise à niveau.',
  areaCode: 'area code',
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
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
