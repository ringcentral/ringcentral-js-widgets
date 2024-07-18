"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _messageSenderMessage;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "Enviar éxito."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "Ocurrió un error al enviar el mensaje."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "Error de validación del número de teléfono."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "Introduzca el mensaje a enviar."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "No tiene permiso para enviar el mensaje."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "Debe seleccionar un número de sus números de teléfono para enviar"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "Ingrese un número de teléfono válido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "Ingrese un número de destinatario válido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "El mensaje es demasiado largo, máximo 1000"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "El mensaje es demasiado largo, máximo 5000"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "Ingrese un número de teléfono válido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "Establezca {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "No se admite el envío de mensajes a números de emergencia/servicios especiales."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "Error de conexión. Inténtelo de nuevo más tarde."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "Se produjo un error en la conexión. Inténtelo de nuevo más tarde."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "El número de extensión no existe."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "No se puede conectar debido a problemas de red. Inténtelo de nuevo más tarde."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "Se requiere un número de teléfono válido para enviar mensajes de texto a destinatarios fuera de su empresa. Comuníquese con su administrador para agregar un número directo a su cuenta."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "No se puede enviar a un número de extensión con número de teléfono principal. Si desea enviar a un número de extensión, solo ingrese el número de extensión."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "No se admite el envío de SMS a números de teléfono internacionales."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "No tiene permiso para enviar mensajes. Comuníquese con su administrador de cuentas de {brand} para conseguir esta función."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "No tiene permiso para enviar mensajes a destinatarios fuera de su organización."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "Máx. 10 adjuntos."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "El tamaño de adjuntos se limita a 1,5 M bytes."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "No se admite enviar MMS a una extensión."), _defineProperty(_messageSenderMessage, "areaCode", "código de área"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "Enviando mensaje… Esta acción puede tardar algunos minutos."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "No se pueden enviar SMS a números cortos."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
exports["default"] = _default;
//# sourceMappingURL=es-419.js.map
