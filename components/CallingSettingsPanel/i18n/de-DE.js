"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _title$callingOptions;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_title$callingOptions = {
  title: "Anrufen"
}, _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.softphone, "{brand} für Desktop"), _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.browser, "Browser"), _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.jupiter, "{brand}"), _defineProperty(_title$callingOptions, "makeCallsWith", "Anrufe ausführen mit"), _defineProperty(_title$callingOptions, "ringoutHint", "Zunächst am Standort anklingeln, dann Verbindung zum Anrufempfänger herstellen"), _defineProperty(_title$callingOptions, "myLocationLabel", "Mein Standort"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "Vor dem Verbinden des Anrufs zum Wählen von \"1\" auffordern"), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.browser, "Tooltip"), "Verwenden Sie diese Option, um Anrufe über das Mikrofon und die Lautsprecher Ihres Computers zu tätigen und entgegenzunehmen."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.softphone, "Tooltip"), "Verwenden Sie diese Option, um Anrufe über die {brand} zu tätigen und entgegenzunehmen."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip"), "Verwenden Sie diese Option, um Anrufe mit Ihrer gewählten oder eingegebenen Nummer zu tätigen."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip1"), "Bei einem Anruf, den Sie tätigen, klingelt zunächst dieses Telefon und dann das Telefon der angerufenen Person."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.jupiter, "Tooltip"), "Verwenden Sie diese Option, um Anrufe über die {brand} zu tätigen und entgegenzunehmen."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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
//# sourceMappingURL=de-DE.js.map
