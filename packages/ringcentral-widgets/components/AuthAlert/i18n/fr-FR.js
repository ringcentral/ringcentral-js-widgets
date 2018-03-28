import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Échec de la connexion en raison d\'erreurs internes. Veuillez réessayer plus tard.',
  [authMessages.accessDenied]: 'Accès refusé. Veuillez contacter le service d\'assistance.',
  [authMessages.sessionExpired]: 'La session a expiré. Veuillez vous connecter.',
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
