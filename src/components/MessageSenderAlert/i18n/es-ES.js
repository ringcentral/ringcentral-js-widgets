import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Enviar éxito.',
  [messageSenderMessages.sendError]: 'Ha ocurrido un error al enviar el mensaje.',
  [messageSenderMessages.numberValidateError]: 'Error al validar el número de teléfono.',
  [messageSenderMessages.textEmpty]: 'Escriba el mensaje que desea enviar.',
  [messageSenderMessages.noPermission]: 'No tiene permiso para enviar este mensaje.',
  [messageSenderMessages.senderEmpty]: 'Debe seleccionar un número desde su teléfono para enviar el mensaje',
  [messageSenderMessages.noToNumber]: 'Número de teléfono no válido.',
  [messageSenderMessages.recipientsEmpty]: 'Introduzca un número válido de destinatario.',
  [messageSenderMessages.textTooLong]: 'El mensaje es demasiado largo. El número máximo de caracteres permitidos es 1000',
  [messageSenderMessages.recipientNumberInvalids]: 'El número del destinatario no es válido',
  [messageSenderMessages.noAreaCode]: 'Defina el {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos.',
  [messageSenderMessages.specialNumber]: 'No es posible llamar a emergencias o a números de servicios especiales.',
  [messageSenderMessages.connectFailed]: 'Error de conexión. Vuelva a intentarlo más tarde.',
  [messageSenderMessages.internalError]: 'Se ha producido un fallo en la conexión. Vuelva a intentarlo más tarde.',
  [messageSenderMessages.notAnExtension]: 'El número de extensión no existe.',
  [messageSenderMessages.networkError]: 'No se puede conectar debido a errores de red. Vuelva a intentarlo más tarde.',
  [messageSenderMessages.senderNumberInvalid]: 'Se necesita un número de teléfono válido para enviar mensajes de texto a destinatarios fuera de la compañía. Póngase en contacto con el administrador para añadir un número directo a su cuenta.',
  [messageSenderMessages.notSmsToExtension]: 'No se puede enviar a un número de extensión desde un número de teléfono principal. Si quiere enviar un mensaje a un número de extensión, escriba solo dicho número.',
  [messageSenderMessages.internationalSMSNotSupported]: 'No es posible enviar SMS a números de teléfono internacionales.',
  areaCode: 'código de área',
};
