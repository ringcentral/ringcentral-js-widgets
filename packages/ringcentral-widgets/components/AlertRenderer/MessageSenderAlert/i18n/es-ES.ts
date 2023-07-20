import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';
export default {
  [messageSenderMessages.sendSuccess]: "Enviado con éxito.",
  [messageSenderMessages.sendError]: "Se ha producido un error al enviar el mensaje.",
  [messageSenderMessages.numberValidateError]: "Error de validación de número de teléfono.",
  [messageSenderMessages.textEmpty]: "Escriba el texto para enviar.",
  [messageSenderMessages.noPermission]: "No tiene permiso para enviar el mensaje.",
  [messageSenderMessages.senderEmpty]: "Debe seleccionar un número de sus números de teléfono para enviar",
  [messageSenderMessages.noToNumber]: "Indique un número de teléfono válido.",
  [messageSenderMessages.recipientsEmpty]: "Escriba un número de destinatario válido.",
  [messageSenderMessages.textTooLong]: "El mensaje es demasiado largo, limitado a 1000",
  [messageSenderMessages.multipartTextTooLong]: "El mensaje es demasiado largo, limitado a 5000",
  [messageSenderMessages.recipientNumberInvalids]: "Indique un número de teléfono válido.",
  [messageSenderMessages.noAreaCode]: "Establezca {areaCodeLink} para usar los números de teléfono locales de 7 dígitos.",
  [messageSenderMessages.specialNumber]: "No se admite el envío de mensajes de texto a números de servicios de emergencia o especiales.",
  [messageSenderMessages.connectFailed]: "Error de conexión. Inténtelo de nuevo más tarde.",
  [messageSenderMessages.internalError]: "Se ha producido un fallo en la conexión. Inténtelo de nuevo más tarde.",
  [messageSenderMessages.notAnExtension]: "El número de la extensión no existe.",
  [messageSenderMessages.networkError]: "No se puede conectar debido a problemas de red. Inténtelo de nuevo más tarde.",
  [messageSenderMessages.senderNumberInvalid]: "Se requiere un número de teléfono válido para enviar mensajes de texto a los destinatarios externos a su empresa. Póngase en contacto con su administrador para añadir un número directo a su cuenta.",
  [messageSenderMessages.notSmsToExtension]: "No se puede enviar un número de extensión con el número de teléfono principal. Si desea enviar a un número de extensión, solo tiene que introducirlo.",
  [messageSenderMessages.internationalSMSNotSupported]: "No se pueden enviar SMS a números de teléfono internacionales.",
  [messageSenderMessages.noInternalSMSPermission]: "No tiene permiso para enviar mensajes. Póngase en contacto con el administrador de la cuenta de {brand} para actualizar.",
  [messageSenderMessages.noSMSPermission]: "No tiene permiso para enviar mensajes a destinatarios fuera de su organización.",
  [messageSenderMessages.attachmentCountLimitation]: "10 archivos adjuntos máximo.",
  [messageSenderMessages.attachmentSizeLimitation]: "El tamaño de los archivos adjuntos está limitado a 1,5 MB.",
  [messageSenderMessages.noAttachmentToExtension]: "No es posible enviar MMS a una extensión.",
  areaCode: "prefijo",
  [messageSenderMessages.sending]: "Enviando mensaje... Esta acción puede tardar algunos minutos.",
  [messageSenderMessages.shortNumbersNotAvailable]: "El envío de SMS a números cortos no está disponible."
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
