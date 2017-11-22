import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Insira um número de telefone válido.',
  [callErrors.noAreaCode]: 'Defina o {areaCodeLink} para usar números de telefone locais de sete dígitos.',
  [callErrors.specialNumber]: 'Não há suporte de discagem para números de emergência ou serviço especiais.',
  [callErrors.connectFailed]: 'Falha de conexão. Tente novamente mais tarde.',
  [callErrors.internalError]: 'Não é possível conectar devido a erros internos. Tente novamente mais tarde.',
  [callErrors.notAnExtension]: 'O número de ramal não existe.',
  [callErrors.networkError]: 'Não é possível conectar devido a erros de rede. Tente novamente mais tarde.',
  [callErrors.noRingoutEnable]: 'O ramal pode fazer chamadas com o aplicativo de desktop.\n    Se você deseja alternar para outras opções de chamada,\n    entre em contato com o administrador da conta para fazer um upgrade.',
  areaCode: 'código de área',
  telus911: 'Não há suporte para a discagem de emergência.',
};
