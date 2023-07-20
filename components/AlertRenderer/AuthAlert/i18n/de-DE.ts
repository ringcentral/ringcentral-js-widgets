import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]: "Fehler bei der Anmeldung aufgrund interner Fehler. Versuchen Sie es später noch einmal.",
  [authMessages.accessDenied]: "Der Zugriff wurde verweigert. Wenden Sie sich an den Kundendienst.",
  [authMessages.sessionExpired]: "Die Sitzung ist abgelaufen. Melden Sie sich an.",
  [authMessages.siteAccessForbidden]: "Verwenden Sie ein anderes Konto, um sich anzumelden. Bitten Sie Ihren IT-Administrator um Hilfe."
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
