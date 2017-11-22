import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: 'Configurações salvas com sucesso.',
  [callingSettingsMessages.saveSuccessWithSoftphone]: 'Configurações salvas com sucesso. Verifique se o {brand} para Desktop está instalado no computador.',
  [callingSettingsMessages.firstLogin]: 'Selecione como você deseja fazer a chamada na seção Chamadas. Informe sua localização ao especificar o código de país e área (se disponível) na seção Região para fazer chamadas locais com o aplicativo.',
  [callingSettingsMessages.firstLoginOther]: 'Selecione como você deseja fazer a chamada na seção Chamadas.',
  [callingSettingsMessages.permissionChanged]: 'Suas permissões foram alteradas recentemente. Acesse o {link} para verificar as opções de Chamada.',
  [callingSettingsMessages.phoneNumberChanged]: 'As informações de números de telefone foram alteradas recentemente. Acesse o {link} para verificar as opções de Chamada.',
  link: 'Configurações > Chamada',
  [callingSettingsMessages.webphonePermissionRemoved]: 'Suas permissões foram alteradas e não é possível fazer chamadas com o Navegador. Para obter mais detalhes, entre em contato com o administrador da conta.',
  [callingSettingsMessages.emergencyCallingNotAvailable]: 'Não há suporte de discagem para números de emergência ou serviço especiais. Em uma emergência, use seu telefone fixo tradicional ou sem fio para fazer uma chamada para um número de emergência.',
};
