import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Fehler bei der Anmeldung aufgrund interner Fehler. Versuchen Sie es später erneut.',
  [authMessages.accessDenied]: 'Der Zugriff wurde verweigert. Wenden Sie sich an den Kundendienst.',
  [authMessages.sessionExpired]: 'Die Sitzung ist abgelaufen. Melden Sie sich an.',
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
