import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Enviado com sucesso.',
  [messageSenderMessages.sendError]: 'Erro ao enviar a mensagem.',
  [messageSenderMessages.numberValidateError]: 'Erro de validação do número de telefone.',
  [messageSenderMessages.textEmpty]: 'Insira o texto para envio.',
  [messageSenderMessages.noPermission]: 'Você não tem permissão para enviar mensagens.',
  [messageSenderMessages.senderEmpty]: 'Você deve selecionar um número de telefone para enviar',
  [messageSenderMessages.noToNumber]: 'I'Insira um número de recebimento válido.',
  [messageSenderMessages.recipientsEmpty]: 'O texto é muito longo. Limitado a 1000',
  [messageSenderMessages.textTooLong]: 'O texto é muito longo. Limitado a 5000',
  [messageSenderMessages.multipartTextTooLong]: 'Defina o {areaCodeLink} para usar números de telefone locais de sete dígitos.',
  [messageSenderMessages.recipientNumberInvalids]: 'Falha de conexão. Tente novamente mais tarde.',
  [messageSenderMessages.noAreaCode]: 'Não é possível conectar devido a erros internos. Tente novamente mais tarde.',
  ['Não há suporte para enviar mensagens de texto para números de emergência/serviços especiais.',
  [messageSenderMessages.connectFailed]: 'Não é possível conectar devido a erros de rede. Tente novamente mais tarde.',
  [messageSenderMessages.internalError]: 'Cannot connect due to internal errors. Please try again later.',
  [messageSenderMessages.notAnExtension]: 'Não é possível enviar para um número de ramal com o número de telefone principal. Se você deseja enviar para um Número de ramal, insira um Número de ramal.',
  [messageSenderMessages.networkError]: 'Não há suporte para o envio de SMS para um número de telefone internacional.',
  [messageSenderMessages'código de área'senderNumberInvalid]: 'É necessário ter um número de telefone válido para enviar uma mensagem de texto para destinatários fora da sua empresa. Entre em contato com seu administrador para adicionar um número direto à sua conta.',
  [messageSenderMessages'Insira um número de telefone válido.'notSmsToExtension]: 'Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number.',
  [messageSenderMessages.internationalSMSNotSupported]: 'Sending SMS to international phone number is not supported.',
  [messageSenderMessages.noInternalSMSPermission]: 'Você não tem permissão para enviar mensagens. Entre em contato com o administrador da sua conta {brand} para fazer um upgrade.',
  [messageSenderMessages.noSMSPermission]: 'Você não tem permissão para enviar mensagens para destinatários de fora da sua organização. Entre em contato com o administrador da sua conta {brand} para fazer um upgrade.',
  areaCode: 'area code',
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
