/* eslint-disable */
import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: 'Enviado com sucesso.',
  [messageSenderMessages.sendError]: 'Algo deu errado ao enviar a mensagem.',
  [messageSenderMessages.numberValidateError]:
    'Erro de validação do número de telefone.',
  [messageSenderMessages.textEmpty]: 'Digite o texto a ser enviado.',
  [messageSenderMessages.noPermission]:
    'Você não tem permissão para enviar a mensagem.',
  [messageSenderMessages.senderEmpty]:
    'É preciso selecionar um de seus números de telefone para enviar',
  [messageSenderMessages.noToNumber]: 'Insira um número de telefone válido.',
  [messageSenderMessages.recipientsEmpty]:
    'Insira um número de destinatário válido.',
  [messageSenderMessages.textTooLong]:
    'O texto é longo demais. O limite é de 1000',
  [messageSenderMessages.multipartTextTooLong]:
    'O texto é longo demais. O limite é de 5000',
  [messageSenderMessages.recipientNumberInvalids]:
    'Insira um número de telefone válido.',
  [messageSenderMessages.noAreaCode]:
    'Defina o {areaCodeLink} para usar números de telefone locais de sete dígitos.',
  [messageSenderMessages.specialNumber]:
    'Não é possível enviar mensagens de texto para números de emergência/serviços especiais.',
  [messageSenderMessages.connectFailed]:
    'Falha de conexão. Tente novamente mais tarde.',
  [messageSenderMessages.internalError]:
    'Não é possível conectar devido a erros internos. Tente novamente mais tarde.',
  [messageSenderMessages.notAnExtension]: 'O número do ramal não existe.',
  [messageSenderMessages.networkError]:
    'Não foi possível conectar devido a problemas de rede. Tente novamente mais tarde.',
  [messageSenderMessages.senderNumberInvalid]:
    'É necessário ter um número de telefone válido para enviar mensagens de texto a destinatários de fora da empresa. Entre em contato com o administrador para adicionar um número direto à sua conta.',
  [messageSenderMessages.notSmsToExtension]:
    'Não é possível enviar para um número de ramal com o número de telefone principal. Se você deseja enviar para um número de ramal, insira o número do ramal.',
  [messageSenderMessages.internationalSMSNotSupported]:
    'Não é possível enviar SMS a números de telefone internacionais.',
  [messageSenderMessages.noInternalSMSPermission]:
    'Você não tem permissão para enviar mensagens. Entre em contato com o administrador da conta do {brand} para fazer a atualização.',
  [messageSenderMessages.noSMSPermission]:
    'Você não tem permissão para enviar mensagens a destinatários de fora da organização.',
  [messageSenderMessages.attachmentCountLimitation]:
    'Não pode haver mais de 10 anexos por mensagem',
  [messageSenderMessages.attachmentSizeLimitation]:
    'O tamanho total de anexos não pode exceder 1,5 MB por mensagem.',
  [messageSenderMessages.noAttachmentToExtension]:
    'Não há suporte para enviar MMS para um ramal.',
  areaCode: 'código de área',
  [messageSenderMessages.sending]:
    'Enviando mensagem… O processo pode levar alguns minutos para ser concluído.',
  [messageSenderMessages.shortNumbersNotAvailable]:
    'O envio de SMS para números curtos não está disponível.',
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
