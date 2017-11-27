import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Introduzca un número de teléfono válido.',
  [callErrors.noAreaCode]: 'Defina el {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos.',
  [callErrors.specialNumber]: 'No es posible llamar a emergencias o a números de servicios especiales.',
  [callErrors.connectFailed]: 'Error de conexión. Vuelva a intentarlo más tarde.',
  [callErrors.internalError]: 'Se ha producido un fallo en la conexión. Vuelva a intentarlo más tarde.',
  [callErrors.notAnExtension]: 'El número de extensión no existe.',
  [callErrors.networkError]: 'No se puede conectar debido a errores de red. Vuelva a intentarlo más tarde.',
  [callErrors.noRingoutEnable]: 'Su extensión puede hacer llamadas con la app de escritorio.\n    Si desea acceder a otras opciones\n    póngase en contacto con el administrador de su cuenta para la actualización.',
  areaCode: 'código de área',
  telus911: 'No se pueden hacer llamadas de emergencia.',
};
