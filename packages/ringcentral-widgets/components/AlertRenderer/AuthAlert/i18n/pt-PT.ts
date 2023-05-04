import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]: "O início de sessão falhou devido a erros internos. Tente novamente mais tarde.",
  [authMessages.accessDenied]: "Acesso negado. Contacte o suporte.",
  [authMessages.sessionExpired]: "Sessão expirada. Inicie sessão.",
  [authMessages.siteAccessForbidden]: "Lamentamos, mas terá de utilizar outra conta para iniciar sessão. Peça ajuda ao administrador de TI."
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
