import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Envío correcto.',
  [webphoneErrors.browserNotSupported]: 'Las llamadas con el navegador solo se permiten en Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Se han podido registrar 5 teléfonos web en total.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'En este momento, su extensión no puede realizar llamadas salientes con el navegador. Póngase en contacto con su representante de cuentas para acceder a una actualización.',
  [webphoneErrors.getSipProvisionError]: 'No tiene permiso para enviar este mensaje.',
};
