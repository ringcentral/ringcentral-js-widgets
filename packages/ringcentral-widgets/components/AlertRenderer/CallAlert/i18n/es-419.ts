import { callErrors } from '@ringcentral-integration/commons/modules/Call';
export default {
  [callErrors.emergencyNumber]: "Las llamadas de emergencia no están disponibles. Utilice otro teléfono para comunicarse con los servicios de emergencia",
  [callErrors.noToNumber]: "Ingrese un número de teléfono válido.",
  [callErrors.noAreaCode]: "Establezca {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos.",
  [callErrors.connectFailed]: "Error de conexión. Inténtelo de nuevo más tarde.",
  [callErrors.internalError]: "Se produjo un error en la conexión. Inténtelo de nuevo más tarde.",
  [callErrors.notAnExtension]: "El número de extensión no existe.",
  [callErrors.networkError]: "No se puede conectar debido a problemas de red. Inténtelo de nuevo más tarde.",
  [callErrors.noInternational]: "No tiene permisos para hacer llamadas internacionales. Comuníquese con el administrador de su cuenta de {brand} para conseguir esta función.",
  [callErrors.noRingoutEnable]: "Su extensión puede hacer llamadas con la aplicación de escritorio.\n    Si desea acceder a otras opciones\n    comuníquese con el administrador de su cuenta para la actualización.",
  [callErrors.numberParseError]: "Lo sentimos. Tuvimos un problema. Inténtelo de nuevo más tarde.",
  areaCode: "código de área",
  telus911: "No se pueden hacer llamadas de emergencia."
};

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
