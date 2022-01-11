import messageSenderMessages from '@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages';
import messageSenderMessagesV2 from '@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages';
export default {
  [messageSenderMessages.sendSuccess]: "Enviado com êxito.",
  [messageSenderMessages.sendError]: "Ocorreu um erro ao enviar a mensagem.",
  [messageSenderMessages.numberValidateError]: "Erro de validação do número de telefone.",
  [messageSenderMessages.textEmpty]: "Introduza a mensagem de texto a enviar.",
  [messageSenderMessages.noPermission]: "Não tem permissão para enviar a mensagem.",
  [messageSenderMessages.senderEmpty]: "Tem de selecionar um número dos seus números de telefone para enviar",
  [messageSenderMessages.noToNumber]: "Introduza um número de telefone válido.",
  [messageSenderMessages.recipientsEmpty]: "Introduza um número de destinatário válido.",
  [messageSenderMessages.textTooLong]: "O texto é demasiado longo; limite de 1000",
  [messageSenderMessages.multipartTextTooLong]: "O texto é demasiado longo; limite de 5000",
  [messageSenderMessages.recipientNumberInvalids]: "Introduza um número de telefone válido.",
  [messageSenderMessages.noAreaCode]: "Defina {areaCodeLink} para utilizar números de telefone locais de 7 dígitos.",
  [messageSenderMessages.specialNumber]: "O envio de texto para números de emergência/serviços especiais não é suportado.",
  [messageSenderMessages.connectFailed]: "A ligação falhou. Tente novamente mais tarde.",
  [messageSenderMessages.internalError]: "Não é possível efetuar a ligação devido a erros internos. Tente novamente mais tarde.",
  [messageSenderMessages.notAnExtension]: "O número da extensão não existe.",
  [messageSenderMessages.networkError]: "Não é possível estabelecer ligação devido a problemas de rede. Tente novamente mais tarde.",
  [messageSenderMessages.senderNumberInvalid]: "É necessário um número de telefone válido para enviar a SMS para destinatários fora da empresa. Contacte o administrador para adicionar um número direto à sua conta.",
  [messageSenderMessages.notSmsToExtension]: "Não é possível enviar para um número de extensão com o número de telefone principal. Se pretender enviar para um número de extensão, basta introduzir o número da extensão.",
  [messageSenderMessages.internationalSMSNotSupported]: "O envio de SMS para números de telefone internacionais não é suportado.",
  [messageSenderMessages.noInternalSMSPermission]: "Não tem permissão para enviar mensagens. Contacte o administrador da sua conta {brand} para atualizar.",
  [messageSenderMessages.noSMSPermission]: "Não tem permissão para enviar mensagens para destinatários fora da sua organização.",
  [messageSenderMessagesV2.attachmentCountLimitation]: "Máximo de 10 anexos.",
  [messageSenderMessagesV2.attachmentSizeLimitation]: "O tamanho dos anexos está limitado a 1,5 MB.",
  [messageSenderMessagesV2.noAttachmentToExtension]: "Não é possível enviar MMS para uma extensão.",
  areaCode: "indicativo de zona",
  [messageSenderMessages.sending]: "A enviar mensagem... Pode demorar alguns minutos a concluir."
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
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessagesV2.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
