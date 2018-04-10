import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Ingrese un número de teléfono válido.',
  [callErrors.noAreaCode]: 'Defina el {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos.',
  [callErrors.specialNumber]: 'No es posible llamar a emergencias o a números de servicios especiales.',
  [callErrors.connectFailed]: 'Error de conexión. Vuelva a intentarlo más tarde.',
  [callErrors.internalError]: 'Se produjo un error en la conexión. Vuelva a intentarlo más tarde.',
  [callErrors.notAnExtension]: 'El número de extensión no existe.',
  [callErrors.networkError]: 'No se puede conectar debido a errores de la red. Vuelva a intentarlo más tarde.',
  [callErrors.noInternational]: "No tiene permisos para hacer llamadas internacionales. Cominíquese con el administrador de su cuenta de {brand} para conseguir una actualización.",
  [callErrors.noRingoutEnable]: 'Su extensión puede hacer llamadas con la aplicación de escritorio.\n    Si desea acceder a otras opciones\n    comuníquese con el administrador de su cuenta para la actualización.',
  areaCode: 'código de área',
  telus911: 'No se pueden hacer llamadas de emergencia.',
};

// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
