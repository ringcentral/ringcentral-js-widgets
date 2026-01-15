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
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _CallingSettings.callingSettingsMessages.saveSuccess, 'Configurações salvas com sucesso.'), _CallingSettings.callingSettingsMessages.saveSuccessWithSoftphone, 'Configurações salvas com sucesso. Verifique se o {brand} está instalado no computador.'), _CallingSettings.callingSettingsMessages.permissionChanged, 'Suas permissões foram alteradas recentemente. Acesse {link} para verificar as opções de Chamada.'), _CallingSettings.callingSettingsMessages.phoneNumberChanged, 'As informações de números de telefone foram alteradas recentemente. Acesse {link} para verificar as opções de Chamada.'), "link", 'Configurações > Chamadas'), _CallingSettings.callingSettingsMessages.webphonePermissionRemoved, 'Suas permissões foram alteradas e não é possível fazer chamadas com o navegador. Para obter mais detalhes, entre em contato com o administrador da conta.'), _CallingSettings.callingSettingsMessages.emergencyCallingNotAvailable, 'Não há suporte de discagem para números de emergência ou serviço especiais. Em uma emergência, use seu telefone fixo tradicional ou sem fio para fazer uma chamada para um número de emergência.'), _CallingSettings.callingSettingsMessages.saveSuccessWithJupiter, 'Configurações salvas com sucesso. Verifique se o {brand} está instalado no computador.'), _CallingSettings.callingSettingsMessages.disableEmergencyInJapan, 'O serviço de emergência não está disponível no Japão.'); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.disableEmergencyInJapan]"@#@ @source: @#@"Emergency service is not available in Japan."@#@
//# sourceMappingURL=pt-BR.js.map
