/* eslint-disable */
import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]:
    'Se produjo un error en el inicio de sesión debido a un error interno. Inténtelo de nuevo más tarde.',
  [authMessages.accessDenied]:
    'Acceso rechazado. Comuníquese con el servicio de atención al cliente.',
  [authMessages.sessionExpired]: 'La sesión ha expirado. Inicie sesión.',
  [authMessages.siteAccessForbidden]:
    'Lo sentimos, use una cuenta diferente para iniciar sesión. Comuníquese con su administrador de TI para que lo asista.',
} as const;

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
