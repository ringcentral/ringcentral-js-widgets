"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("ringcentral-integration/modules/Call/callErrors"));

var _callErrors$noToNumbe;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$noToNumbe = {}, _defineProperty(_callErrors$noToNumbe, _callErrors.default.noToNumber, "Insira um número de telefone válido."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.noAreaCode, "Defina o {areaCodeLink} para usar números de telefone locais de sete dígitos."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.specialNumber, "Não há suporte de discagem para números de emergência ou serviço especiais."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.connectFailed, "Falha de conexão. Tente novamente mais tarde."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.internalError, "Não é possível conectar devido a erros internos. Tente novamente mais tarde."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.notAnExtension, "O número de ramal não existe."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.networkError, "Não é possível conectar devido a erros de rede. Tente novamente mais tarde."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.noInternational, "Você não tem permissão para fazer chamadas internacionais. Entre em contato com o administrador da sua conta {brand} para fazer um upgrade."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.noRingoutEnable, "O ramal pode fazer chamadas com o aplicativo de desktop.\n    Se você deseja alternar para outras opções de chamada,\n    entre em contato com o administrador da conta para fazer um upgrade."), _defineProperty(_callErrors$noToNumbe, "areaCode", "código de área"), _defineProperty(_callErrors$noToNumbe, "telus911", "Não há suporte para a discagem de emergência."), _callErrors$noToNumbe); // @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@


exports.default = _default;
//# sourceMappingURL=pt-BR.js.map
