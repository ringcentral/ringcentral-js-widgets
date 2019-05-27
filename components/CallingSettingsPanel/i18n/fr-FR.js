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
  title: "Appel"
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, "{brand} pour ordinateur de bureau"), _defineProperty(_title$callingOptions, _callingOptions["default"].myphone, "Mon téléphone {brand}"), _defineProperty(_title$callingOptions, _callingOptions["default"].otherphone, "Autre téléphone"), _defineProperty(_title$callingOptions, _callingOptions["default"].customphone, "Téléphone habituel"), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, "Navigateur"), _defineProperty(_title$callingOptions, "makeCallsWith", "Passer mes appels sortants avec"), _defineProperty(_title$callingOptions, "ringoutHint", "Appeler d'abord à mon emplacement, puis connecter le destinataire."), _defineProperty(_title$callingOptions, "myLocationLabel", "Mon emplacement"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "Me demander de composer le 1 avant d'établir la connexion"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), "Utilisez cette option pour passer et recevoir des appels en utilisant le microphone et le haut-parleur de votre ordinateur."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), "Utilisez cette option pour passer et recevoir des appels à l'aide de votre application de bureau {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip"), "Utilisez cette option pour passer des appels à l'aide de votre téléphone {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip1"), "Pour l'appel que vous passez, votre téléphone {brand} sonne d'abord, suivi du groupe que vous avez appelé."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip"), "Utilisez cette option pour passer des appels à l'aide de vos autres téléphones, tels que les téléphones personnels ou mobiles que vous avez ajoutés dans votre extension {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip1"), "Pour l'appel que vous passez, ce téléphone sonne d'abord, suivi du groupe que vous avez appelé."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip"), "Utilisez cette option pour passer des appels à l'aide du téléphone de votre choix en saisissant un numéro de téléphone correct dans le champ situé ci-dessous."), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip1"), "Pour l'appel que vous passez, ce téléphone sonne d'abord, suivi du groupe que vous avez appelé."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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
//# sourceMappingURL=fr-FR.js.map
