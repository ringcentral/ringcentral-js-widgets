import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Envoi réussi.',
  [webphoneErrors.browserNotSupported]: 'Les appels avec le navigateur ne sont pris en charge que dans Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Cinq téléphones Web au maximum peuvent être enregistrés.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Votre poste n\'est pas autorisé à faire des appels sortants avec le navigateur pour le moment. Veuillez communiquer avec votre représentant de compte pour obtenir une mise à niveau.',
  [webphoneErrors.getSipProvisionError]: 'Vous n\'êtes pas autorisé à envoyer des messages.',
};
