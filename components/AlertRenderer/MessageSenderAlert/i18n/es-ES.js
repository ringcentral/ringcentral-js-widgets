"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessages2 = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "Enviar éxito."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "Ha ocurrido un error al enviar el mensaje."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "Error de validación de número de teléfono."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "Escriba el texto para enviar."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "No tiene permiso para enviar el mensaje."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "Debe seleccionar un número de sus números de teléfono para enviar"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "Introduzca un número de teléfono válido."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "Escriba un número de destinatario válido."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "El mensaje es demasiado largo, limitado a 1000"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "El mensaje es demasiado largo, limitado a 5000"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "Introduzca un número de teléfono válido."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "Establezca {areaCodeLink} para usar los números de teléfono locales de 7 dígitos."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "No se admite el envío de mensajes de texto a números de servicios de emergencia o especiales."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "Error de conexión. Vuelva a intentarlo más tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "Se ha producido un fallo en la conexión. Vuelva a intentarlo más tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "El número de la extensión no existe."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "No se puede conectar debido a problemas de red. Vuelva a intentarlo más tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "Se requiere un número de teléfono válido para enviar mensajes de texto a destinatarios de fuera de la empresa. Póngase en contacto con su administrador para añadir un número directo a su cuenta."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "No se puede enviar a un número de extensión con un número de teléfono principal. Si quiere enviar a un número de extensión, solo tiene que escribir el número de extensión."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "Enviar SMS a un número de teléfono internacional no se admite."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "No tiene permiso para enviar mensajes. Póngase en contacto con el administrador de la cuenta de {brand} para actualizar."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "No tiene permiso para enviar mensajes a destinatarios que no pertenecen a su organización."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentCountLimitation, "10 archivos adjuntos máximo."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentSizeLimitation, "El tamaño de los archivos adjuntos está limitado a 1,5 MB."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].noAttachmentToExtension, "No es posible enviar MMS a una extensión."), _defineProperty(_messageSenderMessage, "areaCode", "código de área"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "Enviando mensaje... Esta acción puede tardar algunos minutos."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"[messageSenderMessagesV2.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessagesV2.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
