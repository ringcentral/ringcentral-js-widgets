/* eslint-disable */
import { callErrors } from '@ringcentral-integration/commons/modules/Call';
export default {
  [callErrors.emergencyNumber]:
    'Las llamadas de emergencia no están disponibles. Use otro teléfono para ponerse en contacto con los servicios de emergencia.',
  [callErrors.noToNumber]: 'Indique un número de teléfono válido.',
  [callErrors.noAreaCode]:
    'Establezca{areaCodeLink}para usar los números de teléfono locales de 7 dígitos.',
  [callErrors.connectFailed]:
    'Error de conexión. Inténtelo de nuevo más tarde.',
  [callErrors.internalError]:
    'Se ha producido un fallo en la conexión. Inténtelo de nuevo más tarde.',
  [callErrors.notAnExtension]: 'El número de la extensión no existe.',
  [callErrors.networkError]:
    'No se puede conectar debido a problemas de red. Inténtelo de nuevo más tarde.',
  [callErrors.noInternational]:
    'No tiene permisos suficientes para hacer esta llamada internacional. Contacte con el administrador de su cuenta de{brand}para conseguir esta función.',
  [callErrors.noRingoutEnable]:
    'Su extensión puede hacer llamadas con la aplicación de escritorio.\n    Si desea acceder a otras opciones\n    póngase en contacto con el administrador de su cuenta para la actualización.',
  [callErrors.numberParseError]:
    'Lo sentimos, se ha producido un error. Inténtelo de nuevo más tarde.',
  areaCode: 'prefijo',
  telus911: 'No se pueden hacer llamadas de emergencia.',
  [callErrors.fromAndToNumberIsSame]:
    'El número de RingOut y el número de destino no pueden ser iguales. Actualice el número e inténtelo de nuevo.',
} as const;

// @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
// @key: @#@"[callErrors.fromAndToNumberIsSame]"@#@ @source: @#@"The RingOut number and destination number can't be the same. Please update the number and try again."@#@
