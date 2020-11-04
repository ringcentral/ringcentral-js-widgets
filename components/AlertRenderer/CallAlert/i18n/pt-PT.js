"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("ringcentral-integration/modules/Call/callErrors"));

var _callErrors$noToNumbe;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$noToNumbe = {}, _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noToNumber, "Introduza um número de telefone válido."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noAreaCode, "Defina {areaCodeLink} para utilizar números de telefone locais com 7 dígitos."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].specialNumber, "A marcação de números de emergência ou de serviços especiais não é suportada."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].connectFailed, "Falha na ligação. Tente novamente mais tarde."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].internalError, "Não é possível efetuar a ligação devido a erros internos. Tente novamente mais tarde."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].notAnExtension, "O número da extensão não existe."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].networkError, "Não é possível efetuar a ligação devido a problemas de rede. Tente novamente mais tarde."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noInternational, "Não tem permissões para efetuar chamadas internacionais. Contacte o administrador da conta {brand} para obter uma atualização."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noRingoutEnable, "A sua extensão está autorizada a efetuar chamadas através de uma aplicação para ambiente de trabalho.\n    Caso pretenda alterar para outras opções de chamada, \n    contacte o administrador da conta para obter uma atualização."), _defineProperty(_callErrors$noToNumbe, "areaCode", "indicativo de zona"), _defineProperty(_callErrors$noToNumbe, "telus911", "A marcação de emergência não é suportada."), _callErrors$noToNumbe); // @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
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


exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
