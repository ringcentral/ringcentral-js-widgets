import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Envoi réussi.',
  [messageSenderMessages.sendError]: 'Une erreur est survenue lors de l\'envoi du message.',
  [messageSenderMessages.numberValidateError]: 'Erreur de validation du numéro de téléphone.',
  [messageSenderMessages.textEmpty]: 'Veuillez entrer le texte à envoyer.',
  [messageSenderMessages.noPermission]: 'Vous n\'êtes pas autorisé à envoyer des messages.',
  [messageSenderMessages.senderEmpty]: 'Vous devez sélectionner un numéro parmi les numéros de téléphone pour envoyer',
  [messageSenderMessages.noToNumber]: 'Veuillez entrer un numéro de téléphone valide.',
  [messageSenderMessages.recipientsEmpty]: 'Veuillez entrer un numéro de destinataire valide.',
  [messageSenderMessages.textTooLong]: 'Le texte est trop long, limite : 1 000',
  [messageSenderMessages.recipientNumberInvalids]: 'Le numéro du destinataire n\'est pas valide',
  [messageSenderMessages.noAreaCode]: 'Veuillez configurer {areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres.',
  [messageSenderMessages.specialNumber]: 'La composition de numéros d\'urgence ou renvoyant à des services spéciaux n\'est pas prise en charge.',
  [messageSenderMessages.connectFailed]: 'Échec de la connexion. Veuillez réessayer plus tard.',
  [messageSenderMessages.internalError]: 'Connexion impossible en raison d\'erreurs internes. Veuillez réessayer plus tard.',
  [messageSenderMessages.notAnExtension]: 'Le numéro de poste n\'existe pas.',
  [messageSenderMessages.networkError]: 'Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard.',
  [messageSenderMessages.notSmsToExtension]: `Impossible d'envoyer au numéro de poste avec le numéro de téléphone principal.
    Si vous souhaitez envoyer à un numéro de poste,
    veuillez simplement saisir ce numéro.`,
  [messageSenderMessages.senderNumberInvalids]: `Vous ne possédez pas un numéro de téléphone valide à partir duquel\n    envoyer des textos. Veuillez communiquer avec votre administrateur de compte.`,
  [messageSenderMessages.internationalSMSNotSupported]: `L'envoi de textos vers un numéro de téléphone international n'est pas
    pris en charge.`,
  areaCode: 'indicatif régional',
  [messageSenderMessages.senderNumberInvalid]: `Un numéro de téléphone valide est requis pour envoyer
    des textos aux destinataires en dehors de votre entreprise. Veuillez communiquer avec
    votre administrateur pour ajouter un numéro direct à votre compte.`,
};
