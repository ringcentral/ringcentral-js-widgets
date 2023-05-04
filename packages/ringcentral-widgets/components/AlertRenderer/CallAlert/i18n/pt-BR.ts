import { callErrors } from '@ringcentral-integration/commons/modules/Call';
export default {
  [callErrors.emergencyNumber]: "As chamadas de emergência não estão disponíveis. Use outro telefone para entrar em contato com os serviços de emergência",
  [callErrors.noToNumber]: "Insira um número de telefone válido.",
  [callErrors.noAreaCode]: "Defina o {areaCodeLink} para usar números de telefone locais de sete dígitos.",
  [callErrors.connectFailed]: "Falha de conexão. Tente novamente mais tarde.",
  [callErrors.internalError]: "Não é possível conectar devido a erros internos. Tente novamente mais tarde.",
  [callErrors.notAnExtension]: "O ramal não existe.",
  [callErrors.networkError]: "Não foi possível conectar devido a problemas de rede. Tente novamente mais tarde.",
  [callErrors.noInternational]: "Você não tem permissão para fazer chamadas internacionais. Entre em contato com o administrador da sua conta {brand} para fazer uma atualização.",
  [callErrors.noRingoutEnable]: "O ramal pode fazer chamadas com o aplicativo de desktop.\n    Se você deseja alternar para outras opções de chamada,\n    entre em contato com o administrador da conta para fazer uma atualização.",
  [callErrors.numberParseError]: "Ocorreu um problema do nosso lado. Tente novamente mais tarde.",
  areaCode: "código de área",
  telus911: "Não há suporte para a discagem de emergência."
};

// @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
