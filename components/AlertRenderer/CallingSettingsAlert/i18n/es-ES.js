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
var _default = exports["default"] = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _CallingSettings.callingSettingsMessages.saveSuccess, 'La configuración se ha guardado correctamente.'), _CallingSettings.callingSettingsMessages.saveSuccessWithSoftphone, 'La configuración se ha guardado correctamente. Asegúrese de que tiene{brand}instalado en su equipo.'), _CallingSettings.callingSettingsMessages.permissionChanged, 'Sus permisos han cambiado recientemente. Vaya a{link}para comprobar las opciones de llamada.'), _CallingSettings.callingSettingsMessages.phoneNumberChanged, 'La información de su número de teléfono ha cambiado recientemente. Vaya a{link}para comprobar las opciones de llamada.'), "link", 'Configuración > Llamadas'), _CallingSettings.callingSettingsMessages.webphonePermissionRemoved, 'Sus permisos han cambiado y ya no puede hacer llamadas con el navegador. Póngase en contacto con el administrador de su cuenta para obtener información detallada.'), _CallingSettings.callingSettingsMessages.emergencyCallingNotAvailable, 'No es posible llamar a números de emergencia o de servicios especiales. Ante una emergencia, use la línea fija o el teléfono móvil para llamar a un número de emergencias.'), _CallingSettings.callingSettingsMessages.saveSuccessWithJupiter, 'La configuración se ha guardado correctamente. Asegúrese de que tiene{brand}instalado en su equipo.'), _CallingSettings.callingSettingsMessages.disableEmergencyInJapan, 'El servicio de emergencias no está disponible en Japón.'); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.disableEmergencyInJapan]"@#@ @source: @#@"Emergency service is not available in Japan."@#@
//# sourceMappingURL=es-ES.js.map
