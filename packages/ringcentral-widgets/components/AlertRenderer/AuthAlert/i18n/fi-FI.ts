import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]: "Kirjautuminen epäonnistui sisäisen virheen vuoksi. Yritä myöhemmin uudelleen.",
  [authMessages.accessDenied]: "Käyttö kielletty. Ota yhteyttä tukeen.",
  [authMessages.sessionExpired]: "Istunto on vanhentunut. Kirjaudu sisään.",
  [authMessages.siteAccessForbidden]: "Käytä kirjautumiseen eri tiliä. Pyydä apua IT-järjestelmänvalvojaltasi."
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
