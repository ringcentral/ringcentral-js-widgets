import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Envoi réussi.',
  [webphoneErrors.browserNotSupported]: 'Appeler avec un navigateur est pris en charge uniquement sur Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Il est possible d\'enregistrer jusqu\'à 5 appels.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Votre extension n\'est actuellement pas autorisée à passer des appels sortants via un navigateur, veuillez contacter votre représentant de compte pour une mise à niveau.',
  [webphoneErrors.getSipProvisionError]: 'Vous n\'êtes pas autorisé à envoyer des messages.',
};
