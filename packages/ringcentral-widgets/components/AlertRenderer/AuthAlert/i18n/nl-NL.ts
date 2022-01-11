import authMessages from '@ringcentral-integration/commons/modules/Auth/authMessages';
export default {
  [authMessages.internalError]: "Aanmelden is mislukt vanwege interne fouten. Probeer het later opnieuw.",
  [authMessages.accessDenied]: "Toegang geweigerd. Neem contact op met support.",
  [authMessages.sessionExpired]: "Sessie verlopen. Meld u aan."
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
