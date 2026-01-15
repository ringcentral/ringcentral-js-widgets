/* eslint-disable */
import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]:
    'Se ha producido un fallo en el inicio de sesión debido a un error interno. Inténtelo de nuevo más tarde.',
  [authMessages.accessDenied]:
    'Acceso denegado. Póngase en contacto con el soporte técnico.',
  [authMessages.sessionExpired]: 'La sesión ha expirado. Inicie sesión.',
  [authMessages.siteAccessForbidden]:
    'Utilice una cuenta distinta para iniciar sesión. Solicite ayuda a su administrador de TI.',
} as const;

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
