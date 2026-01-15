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
var _title$callingOptions;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_title$callingOptions = {
  title: 'Puhelut'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_title$callingOptions, _CallingSettings.callingOptions.softphone, '{brand} -työpöytäsovellus'), _CallingSettings.callingOptions.browser, 'Selain'), _CallingSettings.callingOptions.jupiter, '{brand}'), "makeCallsWith", 'Soita puhelut sovelluksella'), "ringoutHint", 'Soita ensin omaan sijaintiini ja yhdistä sitten puhelukumppani'), "myLocationLabel", 'Oma sijainti'), "press1ToStartCallLabel", 'Pyydä minua valitsemaan 1 ennen puhelun yhdistämistä'), "".concat(_CallingSettings.callingOptions.browser, "Tooltip"), 'Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita tietokoneen mikrofonin ja kaiuttimen avulla.'), "".concat(_CallingSettings.callingOptions.softphone, "Tooltip"), 'Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita sovelluksella {brand}.'), "".concat(_CallingSettings.callingOptions.ringout, "Tooltip"), 'Valitse tämä vaihtoehto, jos haluat soittaa puheluita valitsemastasi tai antamastasi puhelinnumerosta.'), _defineProperty(_defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip1"), 'Kun soitat puhelun, tämä puhelin soi ensin. Tämän jälkeen soitetaan puhelukumppanillesi.'), "".concat(_CallingSettings.callingOptions.jupiter, "Tooltip"), 'Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita sovelluksella {brand}.')); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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
//# sourceMappingURL=fi-FI.js.map
