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
  title: "Soittaminen"
}, _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.softphone, "{brand} -työpöytäsovellus"), _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.browser, "Selain"), _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.jupiter, "{brand}"), _defineProperty(_title$callingOptions, "makeCallsWith", "Soita puhelut sovelluksella"), _defineProperty(_title$callingOptions, "ringoutHint", "Soita ensin omaan sijaintiini ja yhdistä sitten puhelukumppani"), _defineProperty(_title$callingOptions, "myLocationLabel", "Oma sijainti"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "Pyydä minua valitsemaan 1 ennen puhelun yhdistämistä"), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.browser, "Tooltip"), "Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita tietokoneen mikrofonin ja kaiuttimen avulla."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.softphone, "Tooltip"), "Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita sovelluksella {brand}."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip"), "Valitse tämä vaihtoehto, jos haluat soittaa puheluita valitsemastasi tai antamastasi puhelinnumerosta."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip1"), "Kun soitat puhelun, tämä puhelin soi ensin. Tämän jälkeen soitetaan puhelukumppanillesi."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.jupiter, "Tooltip"), "Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita sovelluksella {brand}."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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
//# sourceMappingURL=fi-FI.js.map
