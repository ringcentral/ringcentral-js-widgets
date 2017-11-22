import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Envío correcto.',
  [webphoneErrors.browserNotSupported]: 'Las llamadas con el navegador solo se permiten en Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Se han podido registrar 5 teléfonos web en total.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'En este momento, su extensión no puede realizar llamadas salientes con el navegador. Póngase en contacto con su representante de cuentas para acceder a una actualización.',
  [webphoneErrors.getSipProvisionError]: 'No tiene permiso para enviar este mensaje.',
  [webphoneErrors.connected]: 'Teléfono web registrado.',
  [webphoneErrors.toVoiceMailError]: 'No se puede enviar la llamada al buzón de voz debido a un error interno',
  [webphoneErrors.muteError]: 'No se puede silenciar la llamada en este momento.',
  [webphoneErrors.holdError]: 'No se puede poner la llamada en espera en este momento.',
  [webphoneErrors.flipError]: 'No se puede hacer flip en la llamada. Vuelva a intentarlo más tarde.',
  [webphoneErrors.recordError]: 'No puede grabar la llamada en este momento. Código de error: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Su cuenta no incluye la función para grabar llamadas. Póngase en contacto con el administrador de su cuenta.',
  [webphoneErrors.transferError]: 'No se puede transferir la llamada. Vuelva a intentarlo más tarde.',
};
