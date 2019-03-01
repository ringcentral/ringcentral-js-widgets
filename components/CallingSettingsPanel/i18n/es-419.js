"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _title$callingOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$callingOptions = {
  title: "Llamadas"
}, _defineProperty(_title$callingOptions, _callingOptions.default.softphone, "{brand} para escritorio"), _defineProperty(_title$callingOptions, _callingOptions.default.myphone, "Mi teléfono {brand}"), _defineProperty(_title$callingOptions, _callingOptions.default.otherphone, "Otro teléfono"), _defineProperty(_title$callingOptions, _callingOptions.default.customphone, "Teléfono personalizado"), _defineProperty(_title$callingOptions, _callingOptions.default.browser, "Navegador"), _defineProperty(_title$callingOptions, "makeCallsWith", "Realizar mis llamadas con"), _defineProperty(_title$callingOptions, "ringoutHint", "Llamar primero a mi ubicación y luego conectar al número llamado"), _defineProperty(_title$callingOptions, "myLocationLabel", "Mi ubicación"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "Avisarme que marque 1 para conectar la llamada"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.browser, "Tooltip"), "Utilice esta opción para hacer y recibir llamadas con el micrófono y los altavoces de su computadora."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.softphone, "Tooltip"), "Utilice esta opción para hacer y recibir llamadas usando su aplicación {brand} para escritorio."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.myphone, "Tooltip"), "Use esta opción para hacer llamadas usando su teléfono {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.myphone, "Tooltip1"), "En la llamada que realice, primero sonará su teléfono {brand} y luego el de la persona a la que llama."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.otherphone, "Tooltip"), "Utilice esta opción para realizar llamadas desde el resto de los teléfonos que ha añadido a su extensión {brand} como el de su domicilio o el celular."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.otherphone, "Tooltip1"), "En la llamada que realice, este teléfono sonará primero y luego el de la persona a la que llama."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.customphone, "Tooltip"), "Use esta opción para realizar llamadas usando el teléfono de su preferencia, ingresando un número de teléfono válido en el campo a continuación."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.customphone, "Tooltip1"), "En la llamada que realice, este teléfono sonará primero y luego el de la persona a la que llama."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.myphone]"@#@ @source: @#@"My {brand} Phone"@#@
// @key: @#@"[callingOptions.otherphone]"@#@ @source: @#@"Other Phone"@#@
// @key: @#@"[callingOptions.customphone]"@#@ @source: @#@"Custom Phone"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand} for Desktop app."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your {brand} phone."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip1`]"@#@ @source: @#@"For the call you make, your {brand} phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your other phones such as home or cell phones that you have added in your {brand} Extension."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using any phone of your choice by entering a valid phone number in the field below."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@


exports.default = _default;
//# sourceMappingURL=es-419.js.map
