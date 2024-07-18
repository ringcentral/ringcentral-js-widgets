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
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _phoneTypes$business$;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.business, "비즈니스 전화"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.extension, "내선 번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.home, "집 전화번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.mobile, "휴대폰"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.phone, "전화"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.unknown, "알 수 없는 전화 유형"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.company, "회사 번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.direct, "직통 번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.contact, "연락처 전화번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.fax, "팩스"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.other, "기타"), _phoneTypes$business$); // @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business Phone"@#@
// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Extension Number"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home Number"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile Phone"@#@
// @key: @#@"[phoneTypes.phone]"@#@ @source: @#@"Phone"@#@
// @key: @#@"[phoneTypes.unknown]"@#@ @source: @#@"Unknown Phone Type"@#@
// @key: @#@"[phoneTypes.company]"@#@ @source: @#@"Company Number"@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct Number"@#@
// @key: @#@"[phoneTypes.contact]"@#@ @source: @#@"Contact Phone"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
