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
  title: 'Anrufen'
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, '{brand} für Desktop'), _defineProperty(_title$callingOptions, _callingOptions["default"].myphone, 'Meinem {brand}-Telefon'), _defineProperty(_title$callingOptions, _callingOptions["default"].otherphone, 'Anderem Telefon'), _defineProperty(_title$callingOptions, _callingOptions["default"].customphone, 'Benutzerdefiniertem Telefon'), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, 'Browser'), _defineProperty(_title$callingOptions, "makeCallsWith", 'Anrufe ausführen mit'), _defineProperty(_title$callingOptions, "ringoutHint", 'Zunächst am Standort anklingeln, dann Verbindung zum Anrufempfänger herstellen'), _defineProperty(_title$callingOptions, "myLocationLabel", 'Mein Standort'), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", 'Vor dem Verbinden des Anrufs zum Wählen von "1" auffordern'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), 'Verwenden Sie diese Option, um Anrufe über das Mikrofon und die Lautsprecher Ihres Computers zu tätigen und entgegenzunehmen.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), 'Verwenden Sie diese Option, um Anrufe über die {brand} für Desktop-App zu tätigen und entgegenzunehmen.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip"), 'Verwenden Sie diese Option, um Anrufe über Ihr {brand}-Telefon zu tätigen und entgegenzunehmen.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip1"), 'Wenn Sie einen Anruf tätigen, klingelt zuerst Ihr {brand}-Telefon und dann das Telefon des Anrufempfängers.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip"), 'Verwenden Sie diese Option, um Anrufe über Ihre anderen Telefone wie Festnetztelefone oder Mobiltelefone, die Sie der {brand}-Erweiterung hinzugefügt haben, zu tätigen.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip1"), 'Wenn Sie einen Anruf tätigen, klingelt zuerst dieses Telefon und dann das Telefon des Anrufempfängers.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip"), 'Verwenden Sie diese Option, um Anrufe über ein Telefon Ihrer Wahl zu tätigen, indem Sie eine gültige Telefonnummer in das Feld unten eingeben.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip1"), 'Wenn Sie einen Anruf tätigen, klingelt zuerst dieses Telefon und dann das Telefon des Anrufempfängers.'), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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
//# sourceMappingURL=de-DE.js.map
