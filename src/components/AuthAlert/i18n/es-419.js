import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Se produjo un error en el inicio de sesión debido a un error interno. Vuelva a intentarlo más tarde.',
  [authMessages.accessDenied]: 'Acceso rechazado. Comuníquese con el servicio de atención al cliente.',
  [authMessages.sessionExpired]: 'La sesión ha expirado. Inicie sesión.',
};
