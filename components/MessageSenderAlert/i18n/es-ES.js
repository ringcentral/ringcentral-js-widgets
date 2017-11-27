'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _messageSenderMessage;

var _messageSenderMessages = require('ringcentral-integration/modules/MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_messageSenderMessage = {}, (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendSuccess, 'Enviar éxito.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendError, 'Ha ocurrido un error al enviar el mensaje.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.numberValidateError, 'Error al validar el número de teléfono.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textEmpty, 'Escriba el mensaje que desea enviar.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noPermission, 'No tiene permiso para enviar este mensaje.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderEmpty, 'Debe seleccionar un número desde su teléfono para enviar el mensaje'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noToNumber, 'Número de teléfono no válido.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientsEmpty, 'Introduzca un número válido de destinatario.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textTooLong, 'El mensaje es demasiado largo. El número máximo de caracteres permitidos es 1000'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientNumberInvalids, 'El número del destinatario no es válido'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noAreaCode, 'Defina el {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.specialNumber, 'No es posible llamar a emergencias o a números de servicios especiales.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.connectFailed, 'Error de conexión. Vuelva a intentarlo más tarde.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internalError, 'Se ha producido un fallo en la conexión. Vuelva a intentarlo más tarde.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notAnExtension, 'El número de extensión no existe.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.networkError, 'No se puede conectar debido a errores de red. Vuelva a intentarlo más tarde.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderNumberInvalid, 'Se necesita un número de teléfono válido para enviar mensajes de texto a destinatarios fuera de la compañía. Póngase en contacto con el administrador para añadir un número directo a su cuenta.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notSmsToExtension, 'No se puede enviar a un número de extensión desde un número de teléfono principal. Si quiere enviar un mensaje a un número de extensión, escriba solo dicho número.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internationalSMSNotSupported, 'No es posible enviar SMS a números de teléfono internacionales.'), (0, _defineProperty3.default)(_messageSenderMessage, 'areaCode', 'código de área'), _messageSenderMessage);
//# sourceMappingURL=es-ES.js.map
