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
  title: "通話"
}, _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.softphone, "{brand} for Desktop"), _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.browser, "ブラウザー"), _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.jupiter, "{brand}"), _defineProperty(_title$callingOptions, "makeCallsWith", "通話発信に使用する"), _defineProperty(_title$callingOptions, "ringoutHint", "最初に自分の場所で自身を呼び出した後、通話相手に接続する"), _defineProperty(_title$callingOptions, "myLocationLabel", "自分の場所"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "通話接続前に「1」をダイヤルするように指示するメッセージを受け取る"), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.browser, "Tooltip"), "通話の発着信にコンピューターのマイクロフォンとスピーカーを使用するには、このオプションを使用します。"), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.softphone, "Tooltip"), "通話の発着信に{brand}を使用するには、このオプションを使用します。"), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip"), "このオプションを使用して、選択または入力した電話番号で発信します。"), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip1"), "発信した場合、最初にこの電話が鳴り、次に発信先の電話が鳴ります。"), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.jupiter, "Tooltip"), "通話の発着信に{brand}を使用するには、このオプションを使用します。"), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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
//# sourceMappingURL=ja-JP.js.map
