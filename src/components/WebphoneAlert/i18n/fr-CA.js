import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Envoi réussi.',
  [webphoneErrors.browserNotSupported]: 'Les appels avec le navigateur ne sont pris en charge que dans Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Cinq téléphones Web au maximum peuvent être enregistrés.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Votre poste n\'est pas autorisé à faire des appels sortants avec le navigateur pour le moment. Veuillez communiquer avec votre représentant de compte pour obtenir une mise à niveau.',
  [webphoneErrors.getSipProvisionError]: 'Vous n\'êtes pas autorisé à envoyer des messages.',
  [webphoneErrors.connected]: 'Téléphone Web inscrit.',
  [webphoneErrors.toVoiceMailError]: 'Impossible d\'acheminer l\'appel vers la boîte vocale en raison d\'une erreur interne',
  [webphoneErrors.muteError]: 'L\'appel ne peut être mis en mode discrétion pour le moment.',
  [webphoneErrors.holdError]: 'L\'appel ne peut être mis en attente pour le moment.',
  [webphoneErrors.flipError]: 'Impossible de renvoyer l\'appel. Veuillez réessayer plus tard.',
  [webphoneErrors.recordError]: 'Vous ne pouvez pas enregistrer l\'appel pour le moment. Code d\'erreur\xA0: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Désolé, votre compte ne possède pas la fonction d\'enregistrement d\'appel. Veuillez communiquer avec votre administrateur de compte.',
  [webphoneErrors.transferError]: 'Impossible de transférer l\'appel. Veuillez réessayer plus tard.',
};
