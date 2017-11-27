import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Accesso non riuscito a causa di errori interni. Riprova più tardi.',
  [authMessages.accessDenied]: 'Accesso negato. Contatta il supporto.',
  [authMessages.sessionExpired]: 'Sessione scaduta. Effettua l\'accesso.',
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
