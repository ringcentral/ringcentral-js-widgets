import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]: "Échec de la connexion en raison d’erreurs internes. Veuillez réessayer plus tard.",
  [authMessages.accessDenied]: "Accès refusé. Veuillez communiquer avec le service d’assistance.",
  [authMessages.sessionExpired]: "La session a expiré. Veuillez vous connecter.",
  [authMessages.siteAccessForbidden]: "Désolés, utilisez un autre compte pour vous connecter. Veuillez demander de l’aide à votre administrateur du service informatique."
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
