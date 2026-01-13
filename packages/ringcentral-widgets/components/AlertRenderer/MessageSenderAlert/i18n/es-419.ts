/* eslint-disable */
import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: 'Enviar éxito.',
  [messageSenderMessages.sendError]: 'Ocurrió un error al enviar el mensaje.',
  [messageSenderMessages.numberValidateError]:
    'Error de validación del número de teléfono.',
  [messageSenderMessages.textEmpty]: 'Introduzca el mensaje a enviar.',
  [messageSenderMessages.noPermission]:
    'No tiene permiso para enviar el mensaje.',
  [messageSenderMessages.senderEmpty]:
    'Debe seleccionar un número de sus números de teléfono para enviar',
  [messageSenderMessages.noToNumber]: 'Ingrese un número de teléfono válido.',
  [messageSenderMessages.recipientsEmpty]:
    'Ingrese un número de destinatario válido.',
  [messageSenderMessages.textTooLong]:
    'El mensaje es demasiado largo. El máximo es 1000.',
  [messageSenderMessages.multipartTextTooLong]:
    'El mensaje es demasiado largo. El máximo es 5000.',
  [messageSenderMessages.recipientNumberInvalids]:
    'Ingrese un número de teléfono válido.',
  [messageSenderMessages.noAreaCode]:
    'Establezca {areaCodeLink} para utilizar números de teléfono locales de 7 dígitos.',
  [messageSenderMessages.specialNumber]:
    'No se admite el envío de mensajes a números de emergencia/servicios especiales.',
  [messageSenderMessages.connectFailed]:
    'Error de conexión. Inténtelo de nuevo más tarde.',
  [messageSenderMessages.internalError]:
    'Se produjo un error en la conexión. Inténtelo de nuevo más tarde.',
  [messageSenderMessages.notAnExtension]: 'El número de extensión no existe.',
  [messageSenderMessages.networkError]:
    'No se puede conectar debido a problemas de red. Inténtelo de nuevo más tarde.',
  [messageSenderMessages.senderNumberInvalid]:
    'Se requiere un número de teléfono válido para enviar mensajes de texto a destinatarios fuera de su empresa. Comuníquese con su administrador para agregar un número directo a su cuenta.',
  [messageSenderMessages.notSmsToExtension]:
    'No se puede enviar a un número de extensión con número de teléfono principal. Si desea enviar a un número de extensión, solo ingrese el número de extensión.',
  [messageSenderMessages.internationalSMSNotSupported]:
    'No se admite el envío de SMS a números de teléfono internacionales.',
  [messageSenderMessages.noInternalSMSPermission]:
    'No tiene permiso para enviar mensajes. Comuníquese con su administrador de cuenta de {brand} para acceder a la actualización.',
  [messageSenderMessages.noSMSPermission]:
    'No tiene permiso para enviar mensajes a destinatarios fuera de su organización.',
  [messageSenderMessages.attachmentCountLimitation]:
    'No puede haber más de 10 archivos adjuntos por mensaje.',
  [messageSenderMessages.attachmentSizeLimitation]:
    'El tamaño total del archivo adjunto no puede ser mayor de 1,5 MB por mensaje.',
  [messageSenderMessages.noAttachmentToExtension]:
    'No se admite enviar MMS a una extensión.',
  areaCode: 'código de área',
  [messageSenderMessages.sending]:
    'Enviando mensaje… Esta acción puede tardar algunos minutos.',
  [messageSenderMessages.shortNumbersNotAvailable]:
    'No se pueden enviar SMS a números cortos.',
} as const;

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
