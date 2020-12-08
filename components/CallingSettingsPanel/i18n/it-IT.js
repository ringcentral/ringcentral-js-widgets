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
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, "{brand} per desktop"), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, "Browser"), _defineProperty(_title$callingOptions, _callingOptions["default"].jupiter, "{brand}"), _defineProperty(_title$callingOptions, "makeCallsWith", "Effettua chiamate con"), _defineProperty(_title$callingOptions, "ringoutHint", "Chiamami prima alla mia postazione, poi connetti la persona chiamata"), _defineProperty(_title$callingOptions, "myLocationLabel", "La mia postazione"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "Chiedimi di comporre 1 prima di connettere la chiamata"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), "Usa questa opzione per effettuare e ricevere chiamate usando il microfono e l'altoparlante del computer."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), "Usa questa opzione per effettuare e ricevere chiamate usando {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].ringout, "Tooltip"), "Utilizza questa opzione per effettuare chiamate utilizzando il numero di telefono selezionato o inserito."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].ringout, "Tooltip1"), "Per la chiamata che effettui, squillerà prima questo telefono e poi quello della persona chiamata."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].jupiter, "Tooltip"), "Usa questa opzione per effettuare e ricevere chiamate usando {brand}."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"[callingOptions.jupiter]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your selected or entered phone number."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.jupiter}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@


exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
