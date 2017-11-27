import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Se ha producido un fallo en el inicio de sesión debido a un error interno. Vuelva a intentarlo más tarde.',
  [authMessages.accessDenied]: 'Acceso denegado. Póngase en contacto con el servicio de atención al cliente.',
  [authMessages.sessionExpired]: 'La sesión ha expirado. Inicie sesión.',
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
