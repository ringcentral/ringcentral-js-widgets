import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]: "Aanmelden is mislukt vanwege interne fouten. Probeer het later opnieuw.",
  [authMessages.accessDenied]: "Toegang geweigerd. Neem contact op met support.",
  [authMessages.sessionExpired]: "Sessie verlopen. Meld u aan.",
  [authMessages.siteAccessForbidden]: "Gebruik een ander account om u aan te melden. Vraag uw IT-beheerder om hulp."
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
