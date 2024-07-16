import { callErrors } from '@ringcentral-integration/commons/modules/Call';

export default {
  [callErrors.emergencyNumber]:
    'As chamadas de emergência não estão disponíveis. Utilize outro telefone para contactar os serviços de emergência.',
  [callErrors.noToNumber]: 'Introduza um número de telefone válido.',
  [callErrors.noAreaCode]:
    'Defina {areaCodeLink} para utilizar números de telefone locais de 7 dígitos.',
  [callErrors.connectFailed]: 'A ligação falhou. Tente novamente mais tarde.',
  [callErrors.internalError]:
    'Não é possível efetuar a ligação devido a erros internos. Tente novamente mais tarde.',
  [callErrors.notAnExtension]: 'O número da extensão não existe.',
  [callErrors.networkError]:
    'Não é possível estabelecer ligação devido a problemas de rede. Tente novamente mais tarde.',
  [callErrors.noInternational]:
    'Não tem permissões para efetuar chamadas internacionais. Contacte o administrador da conta {brand} para obter uma atualização.',
  [callErrors.noRingoutEnable]:
    'A sua extensão está autorizada a efetuar chamadas através de uma aplicação para computador.\n    Caso pretenda alterar para outras opções de chamada,\n    contacte o administrador da conta para obter uma atualização.',
  [callErrors.numberParseError]:
    'Lamentamos, mas ocorreu um problema do nosso lado. Tente novamente mais tarde.',
  areaCode: 'indicativo de zona',
  telus911: 'A marcação de emergência não é suportada.',
  [callErrors.fromAndToNumberIsSame]:
    'O número de destino e o número RingOut não podem ser o mesmo. Atualize o número e tente novamente.',
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
// @key: @#@"[callErrors.fromAndToNumberIsSame]"@#@ @source: @#@"The RingOut number and destination number can't be the same. Please update the number and try again."@#@
