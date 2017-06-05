import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Enviar éxito.',
  [webphoneErrors.browserNotSupported]: 'Las llamadas con el explorador solo son compatibles con Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Se pueden registrar 5 teléfonos web como máximo.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'En este momento, su extensión no puede realizar llamadas salientes con navegador, Comuníquese con su representante para acceder a la actualización.',
  [webphoneErrors.getSipProvisionError]: 'No tiene permiso para enviar este mensaje.',
};
