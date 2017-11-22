import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Enviar éxito.',
  [webphoneErrors.browserNotSupported]: 'Las llamadas con el explorador solo son compatibles con Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Se pueden registrar 5 teléfonos web como máximo.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'En este momento, su extensión no puede realizar llamadas salientes con navegador, Comuníquese con su representante para acceder a la actualización.',
  [webphoneErrors.getSipProvisionError]: 'No tiene permiso para enviar este mensaje.',
  [webphoneErrors.connected]: 'Teléfono web registrado.',
  [webphoneErrors.toVoiceMailError]: 'No se puede enviar la llamada a correo de voz debido a un error interno',
  [webphoneErrors.muteError]: 'No se puede silenciar la llamada en este momento.',
  [webphoneErrors.holdError]: 'No se puede poner la llamada en espera en este momento.',
  [webphoneErrors.flipError]: 'No se puede hacer flip en la llamada. Vuelva a intentarlo más tarde.',
  [webphoneErrors.recordError]: 'No puede grabar la llamada en este momento. Código de error: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Su cuenta no incluye la función de grabar llamadas. Comuníquese con el administrador de su cuenta.',
  [webphoneErrors.transferError]: 'No se puede transferir la llamada. Vuelva a intentarlo más tarde.',
};
