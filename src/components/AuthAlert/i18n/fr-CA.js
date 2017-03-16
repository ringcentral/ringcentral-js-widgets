import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Échec de la connexion en raison d\'erreurs internes. Veuillez réessayer plus tard.',
  [authMessages.accessDenied]: 'Accès refusé. Veuillez communiquer avec le service d\'assistance.',
  [authMessages.sessionExpired]: 'La session a expiré. Veuillez vous connecter.',
};
