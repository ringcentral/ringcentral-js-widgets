import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Enviar éxito.',
  [messageSenderMessages.sendError]: 'Ha ocurrido un error al enviar el mensaje.',
  [messageSenderMessages.numberValidateError]: 'Error al validar el número de teléfono.',
  [messageSenderMessages.textEmpty]: 'Escriba el mensaje que desea enviar.',
  [messageSenderMessages.noPermission]: 'No tiene permiso para enviar este mensaje.',
  [messageSenderMessages.senderEmpty]: 'Debe seleccionar un número desde su teléfono para enviar el mensaje',
  [messageSenderMessages.noToNumber]: 'Ingrese un número de teléfono válido.',
  [messageSenderMessages.recipientsEmpty]: 'Ingrese un número válido de destinatario.',
  [messageSenderMessages.textTooLong]: 'El mensaje es demasiado largo. El número máximo de caracteres permitidos es 1000',
  [messageSenderMessages.multipartTextTooLong]: 'El mensaje es demasiado largo. El número máximo de caracteres permitidos es 5000',
  [messageSenderMessages.recipientNumberInvalids]: 'Please enter a valid phone number.',
  [messageSenderMessages.noAreaCode]: 'Defina el {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos.',
  [messageSenderMessages.specialNumber]: 'No se admite el envío de mensajes de texto a números de servicios de emergencia o especiales.',
  [messageSenderMessages.connectFailed]: 'Error de conexión. Vuelva a intentarlo más tarde.',
  [messageSenderMessages.internalError]: 'Se produjo un error en la conexión. Vuelva a intentarlo más tarde.',
  [messageSenderMessages.notAnExtension]: 'El número de extensión no existe.',
  [messageSenderMessages.networkError]: 'No se puede conectar debido a errores de la red. Vuelva a intentarlo más tarde.',
  [messageSenderMessages.senderNumberInvalid]: 'Se necesita un número de teléfono válido para enviar mensajes de texto a destinatarios fuera de la compañía, póngase en contacto con el administrador para añadir un número directo a su cuenta.',
  [messageSenderMessages.notSmsToExtension]: 'No se puede enviar a un número de extensión desde un número de teléfono principal. Si quiere enviar un mensaje a un número de extensión, escriba solo dicho número.',
  [messageSenderMessages.senderNumberInvalids]: 'Sie haben keine gültige Telefonnummer, um SMS zu versenden. Wenden Sie sich an Ihren Kontoadministrator.',
  [messageSenderMessages.internationalSMSNotSupported]: 'No es posible enviar SMS a números de teléfono internacionales.',
  [messageSenderMessages.recipientNumberInvalids]: 'Ingrese un número de teléfono válido.',
  [messageSenderMessages.noInternalSMSPermission]: 'No tiene permisos para enviar mensajes. Comuníquese con el administrador de su cuenta de {brand} para conseguir una actualización.',
  areaCode: 'código de área',
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
