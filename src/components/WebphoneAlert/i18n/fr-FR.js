import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Envoi réussi.',
  [webphoneErrors.browserNotSupported]: 'Appeler avec un navigateur est pris en charge uniquement sur Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Il est possible d\'enregistrer jusqu\'à 5\xA0appels.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Votre extension n\'est actuellement pas autorisée à passer des appels sortants via un navigateur, veuillez contacter votre représentant de compte pour une mise à niveau.',
  [webphoneErrors.getSipProvisionError]: 'Vous n\'êtes pas autorisé à envoyer des messages.',
  [webphoneErrors.connected]: 'Web\xA0phone enregistré.',
  [webphoneErrors.toVoiceMailError]: 'Impossible de joindre la messagerie vocale à cause d\'une erreur interne',
  [webphoneErrors.muteError]: 'Le son de l\'appel ne peut pas être désactivé pour le moment.',
  [webphoneErrors.holdError]: 'L\'appel ne peut pas être mis en attente pour le moment.',
  [webphoneErrors.flipError]: 'Renvoi de l\'appel impossible. Veuillez réessayer plus tard.',
  [webphoneErrors.recordError]: 'Vous ne pouvez pas enregistrer l\'appel pour le moment. Code d\'erreur\xA0: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Désolé, votre compte ne comprend pas la fonction permettant d\'enregistrer un appel. Veuillez contacter votre administrateur de compte.',
  [webphoneErrors.transferError]: 'Impossible de transférer l\'appel. Veuillez réessayer plus tard.',
};
