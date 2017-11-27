import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Enviado com sucesso.',
  [messageSenderMessages.sendError]: 'Erro ao enviar a mensagem.',
  [messageSenderMessages.numberValidateError]: 'Erro de validação do número de telefone.',
  [messageSenderMessages.textEmpty]: 'Insira o texto para envio.',
  [messageSenderMessages.noPermission]: 'Você não tem permissão para enviar mensagens.',
  [messageSenderMessages.senderEmpty]: 'Você deve selecionar um número de telefone para enviar',
  [messageSenderMessages.noToNumber]: 'Número de telefone inválido.',
  [messageSenderMessages.recipientsEmpty]: 'Insira um número de recebimento válido.',
  [messageSenderMessages.textTooLong]: 'O texto é muito longo. Limitado a 1000',
  [messageSenderMessages.recipientNumberInvalids]: 'O número do destinatário é inválido',
  [messageSenderMessages.noAreaCode]: 'Defina o {areaCodeLink} para usar números de telefone locais de sete dígitos.',
  [messageSenderMessages.specialNumber]: 'Não há suporte de discagem para números de emergência ou serviço especiais.',
  [messageSenderMessages.connectFailed]: 'Falha de conexão. Tente novamente mais tarde.',
  [messageSenderMessages.internalError]: 'Não é possível conectar devido a erros internos. Tente novamente mais tarde.',
  [messageSenderMessages.notAnExtension]: 'O número de ramal não existe.',
  [messageSenderMessages.networkError]: 'Não é possível conectar devido a erros de rede. Tente novamente mais tarde.',
  [messageSenderMessages.senderNumberInvalid]: 'Requer um número de telefone para uma enviar mensagem de texto para os destinatários fora da empresa. Contate o Administrador para adicionar um número direto à conta.',
  [messageSenderMessages.notSmsToExtension]: 'Não é possível enviar para um número de ramal com o número de telefone principal. Se você deseja enviar para um Número de ramal, insira um Número de ramal.',
  [messageSenderMessages.internationalSMSNotSupported]: 'Não há suporte para o envio de SMS para um número de telefone internacional.',
  areaCode: 'código de área',
};
