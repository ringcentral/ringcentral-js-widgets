"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _title$callingOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$callingOptions = {
  title: "Chiamata"
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, "{brand} per desktop"), _defineProperty(_title$callingOptions, _callingOptions["default"].myphone, "Il mio telefono {brand}"), _defineProperty(_title$callingOptions, _callingOptions["default"].otherphone, "Altro telefono"), _defineProperty(_title$callingOptions, _callingOptions["default"].customphone, "Telefono personalizzato"), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, "Browser"), _defineProperty(_title$callingOptions, "makeCallsWith", "Effettua chiamate con"), _defineProperty(_title$callingOptions, "ringoutHint", "Chiamami prima alla mia postazione, poi connetti la persona chiamata"), _defineProperty(_title$callingOptions, "myLocationLabel", "La mia postazione"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "Chiedimi di comporre 1 prima di connettere la chiamata"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), "Usa questa opzione per effettuare e ricevere chiamate usando il microfono e l'altoparlante del computer."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), "Usa questa opzione per effettuare e ricevere chiamate usando l'app {brand} per desktop."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip"), "Usa questa opzione per effettuare chiamate usando il tuo telefono {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip1"), "Per la chiamata effettuata, squillerà prima il tuo telefono {brand} e poi quello della persona chiamata."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip"), "Usa questa opzione per effettuare chiamate con i tuoi altri telefoni, ad esempio quello di casa o un cellulare che hai aggiunto al tuo interno {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip1"), "Per la chiamata effettuata, squillerà prima questo telefono e poi quello della persona chiamata."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip"), "Usa questa opzione per effettuare chiamate con qualsiasi telefono inserendo un numero di telefono valido nel campo qui sotto."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip1"), "Per la chiamata effettuata, squillerà prima questo telefono e poi quello della persona chiamata."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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


exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
