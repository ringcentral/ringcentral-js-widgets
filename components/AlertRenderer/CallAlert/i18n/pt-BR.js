"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _callErrors$emergency;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_callErrors$emergency = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, 'As chamadas de emergência não estão disponíveis. Use outro telefone para entrar em contato com os serviços de emergência'), _Call.callErrors.noToNumber, 'Insira um número de telefone válido.'), _Call.callErrors.noAreaCode, 'Defina o {areaCodeLink} para usar números de telefone locais de sete dígitos.'), _Call.callErrors.connectFailed, 'Falha de conexão. Tente novamente mais tarde.'), _Call.callErrors.internalError, 'Não é possível conectar devido a erros internos. Tente novamente mais tarde.'), _Call.callErrors.notAnExtension, 'O número do ramal não existe.'), _Call.callErrors.networkError, 'Não foi possível conectar devido a problemas de rede. Tente novamente mais tarde.'), _Call.callErrors.noInternational, 'Você não tem permissão para fazer chamadas internacionais. Entre em contato com o administrador da sua conta {brand} para fazer uma atualização.'), _Call.callErrors.noRingoutEnable, 'O ramal pode fazer chamadas com o aplicativo de desktop.\n    Se você deseja alternar para outras opções de chamada,\n    entre em contato com o administrador da conta para fazer uma atualização.'), _Call.callErrors.numberParseError, 'Ocorreu um problema do nosso lado. Tente novamente mais tarde.'), _defineProperty(_defineProperty(_defineProperty(_callErrors$emergency, "areaCode", 'código de área'), "telus911", 'Não há suporte para a discagem de emergência.'), _Call.callErrors.fromAndToNumberIsSame, 'O número do RingOut e o número de destino não podem ser iguais. Atualize o número e tente novamente.')); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
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
//# sourceMappingURL=pt-BR.js.map
