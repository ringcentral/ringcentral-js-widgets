"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _messageSenderMessage;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_messageSenderMessage = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, 'Enviado con éxito.'), _MessageSender.messageSenderMessages.sendError, 'Se ha producido un error al enviar el mensaje.'), _MessageSender.messageSenderMessages.numberValidateError, 'Error de validación de número de teléfono.'), _MessageSender.messageSenderMessages.textEmpty, 'Escriba el texto para enviar.'), _MessageSender.messageSenderMessages.noPermission, 'No tiene permiso para enviar el mensaje.'), _MessageSender.messageSenderMessages.senderEmpty, 'Debe seleccionar un número de sus números de teléfono para enviar'), _MessageSender.messageSenderMessages.noToNumber, 'Indique un número de teléfono válido.'), _MessageSender.messageSenderMessages.recipientsEmpty, 'Escriba un número de destinatario válido.'), _MessageSender.messageSenderMessages.textTooLong, 'El mensaje es demasiado largo, limitado a 1000'), _MessageSender.messageSenderMessages.multipartTextTooLong, 'El mensaje es demasiado largo, limitado a 5000'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, 'Indique un número de teléfono válido.'), _MessageSender.messageSenderMessages.noAreaCode, 'Establezca{areaCodeLink}para usar los números de teléfono locales de 7 dígitos.'), _MessageSender.messageSenderMessages.specialNumber, 'No se admite el envío de mensajes de texto a números de servicios de emergencia o especiales.'), _MessageSender.messageSenderMessages.connectFailed, 'Error de conexión. Inténtelo de nuevo más tarde.'), _MessageSender.messageSenderMessages.internalError, 'Se ha producido un fallo en la conexión. Inténtelo de nuevo más tarde.'), _MessageSender.messageSenderMessages.notAnExtension, 'El número de la extensión no existe.'), _MessageSender.messageSenderMessages.networkError, 'No se puede conectar debido a problemas de red. Inténtelo de nuevo más tarde.'), _MessageSender.messageSenderMessages.senderNumberInvalid, 'Se requiere un número de teléfono válido para enviar mensajes de texto a los destinatarios externos a su empresa. Póngase en contacto con su administrador para añadir un número directo a su cuenta.'), _MessageSender.messageSenderMessages.notSmsToExtension, 'No se puede enviar un número de extensión con el número de teléfono principal. Si desea enviar a un número de extensión, solo tiene que introducirlo.'), _MessageSender.messageSenderMessages.internationalSMSNotSupported, 'No se pueden enviar SMS a números de teléfono internacionales.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, 'No tiene permiso para enviar mensajes. Póngase en contacto con el administrador de la cuenta de{brand}para actualizar.'), _MessageSender.messageSenderMessages.noSMSPermission, 'No tiene permiso para enviar mensajes a destinatarios fuera de su organización.'), _MessageSender.messageSenderMessages.attachmentCountLimitation, 'No puede haber más de 10 archivos adjuntos por mensaje'), _MessageSender.messageSenderMessages.attachmentSizeLimitation, 'El tamaño total de los archivos adjuntos no puede superar los 1,5 MB por mensaje.'), _MessageSender.messageSenderMessages.noAttachmentToExtension, 'No es posible enviar MMS a una extensión.'), "areaCode", 'prefijo'), _MessageSender.messageSenderMessages.sending, 'Enviando mensaje... Esta acción puede tardar algunos minutos.'), _MessageSender.messageSenderMessages.shortNumbersNotAvailable, 'El envío de SMS a números cortos no está disponible.')); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"You can enter up to 1,000 characters."@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"You can enter up to 5,000 characters."@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
//# sourceMappingURL=es-ES.js.map
