"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("ringcentral-integration/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sendSuccess, "Enviar éxito."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sendError, "Ha ocurrido un error al enviar el mensaje."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.numberValidateError, "Error al validar el número de teléfono."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.textEmpty, "Escriba el mensaje que desea enviar."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noPermission, "No tiene permiso para enviar este mensaje."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.senderEmpty, "Debe seleccionar un número desde su teléfono para enviar el mensaje"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noToNumber, "Ingrese un número de teléfono válido."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.recipientsEmpty, "Ingrese un número válido de destinatario."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.textTooLong, "El mensaje es demasiado largo. El número máximo de caracteres permitidos es 1000"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.multipartTextTooLong, "El mensaje es demasiado largo. El número máximo de caracteres permitidos es 5000"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.recipientNumberInvalids, "Ingrese un número de teléfono válido."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noAreaCode, "Defina el {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.specialNumber, "No se admite el envío de mensajes de texto a números de servicios de emergencia o especiales."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.connectFailed, "Error de conexión. Vuelva a intentarlo más tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.internalError, "Se produjo un error en la conexión. Vuelva a intentarlo más tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.notAnExtension, "El número de extensión no existe."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.networkError, "No se puede conectar debido a errores de la red. Vuelva a intentarlo más tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.senderNumberInvalid, "Se necesita un número de teléfono válido para enviar mensajes de texto a destinatarios fuera de la compañía, póngase en contacto con el administrador para añadir un número directo a su cuenta."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.notSmsToExtension, "No se puede enviar a un número de extensión desde un número de teléfono principal. Si quiere enviar un mensaje a un número de extensión, escriba solo dicho número."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.internationalSMSNotSupported, "No es posible enviar SMS a números de teléfono internacionales."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noInternalSMSPermission, "No tiene permisos para enviar mensajes. Comuníquese con el administrador de su cuenta de {brand} para obtener permisos."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noSMSPermission, "No tiene permiso para enviar mensajes a destinatarios que no pertenecen a su organización."), _defineProperty(_messageSenderMessage, "areaCode", "código de área"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sending, "Enviando mensaje... Esta acción puede tardar algunos minutos."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports.default = _default;
//# sourceMappingURL=es-419.js.map
