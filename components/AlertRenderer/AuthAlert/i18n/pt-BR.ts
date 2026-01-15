/* eslint-disable */
import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]:
    'Falha de login devido a erros internos. Tente novamente mais tarde.',
  [authMessages.accessDenied]: 'Acesso negado. Entre em contato com o suporte.',
  [authMessages.sessionExpired]: 'Sessão expirada. Faça login.',
  [authMessages.siteAccessForbidden]:
    'Use uma conta diferente para fazer login. Peça assistência ao administrador de TI.',
} as const;

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
