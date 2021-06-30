"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callingOptions = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingOptions"));

var _title$callingOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$callingOptions = {
  title: "Appel"
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, "{brand} for Desktop"), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, "Navigateur"), _defineProperty(_title$callingOptions, _callingOptions["default"].jupiter, "{brand}"), _defineProperty(_title$callingOptions, "makeCallsWith", "Passer mes appels sortants avec"), _defineProperty(_title$callingOptions, "ringoutHint", "Appeler d'abord à mon emplacement, puis connecter le destinataire."), _defineProperty(_title$callingOptions, "myLocationLabel", "Mon emplacement"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "Me demander de composer le 1 avant d'établir la connexion"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), "Utilisez cette option pour passer et recevoir des appels en utilisant le microphone et le haut-parleur de votre ordinateur."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), "Utilisez cette option pour passer et recevoir des appels à l'aide de votre {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].ringout, "Tooltip"), "Utilisez cette option pour passer des appels en utilisant le numéro de téléphone que vous avez sélectionné ou saisi."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].ringout, "Tooltip1"), "Pour l'appel que vous passez, ce téléphone sonnera avant celui de la personne appelée."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].jupiter, "Tooltip"), "Utilisez cette option pour passer et recevoir des appels à l'aide de votre {brand}."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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
//# sourceMappingURL=fr-FR.js.map
