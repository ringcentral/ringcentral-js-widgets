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
  title: "통화 중"
}, _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.softphone, "데스크톱용 {brand}"), _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.browser, "브라우저"), _defineProperty(_title$callingOptions, _CallingSettings.callingOptions.jupiter, "{brand}"), _defineProperty(_title$callingOptions, "makeCallsWith", "다음으로 내 전화 걸기"), _defineProperty(_title$callingOptions, "ringoutHint", "먼저 내 위치에서 울린 다음 호출한 상대방에게 연결"), _defineProperty(_title$callingOptions, "myLocationLabel", "내 위치"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "통화 연결 전에 1번을 누르도록 알림"), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.browser, "Tooltip"), "컴퓨터의 마이크와 스피커를 사용하여 전화를 걸고 받으려면 이 옵션을 사용합니다."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.softphone, "Tooltip"), "{brand}을(를) 사용하여 전화를 걸고 받으려면 이 옵션을 사용합니다."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip"), "선택하거나 입력한 전화번호를 사용하여 전화를 걸려면 이 옵션을 사용합니다."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.ringout, "Tooltip1"), "전화를 걸면 먼저 이 전화벨이 울린 다음 호출한 상대방의 벨이 울립니다."), _defineProperty(_title$callingOptions, "".concat(_CallingSettings.callingOptions.jupiter, "Tooltip"), "{brand}을(를) 사용하여 전화를 걸고 받으려면 이 옵션을 사용합니다."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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
//# sourceMappingURL=ko-KR.js.map
