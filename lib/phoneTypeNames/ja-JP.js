"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _phoneTypes = require("../../enums/phoneTypes");

var _phoneTypes$business$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.business, "勤務先電話"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.extension, "内線番号"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.home, "自宅の番号"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.mobile, "携帯電話"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.phone, "電話"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.unknown, "電話タイプが不明"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.company, "会社の代表番号"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.direct, "ダイレクトナンバー"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.fax, "FAX"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.other, "その他"), _phoneTypes$business$); // @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business Phone"@#@
// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Extension Number"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home Number"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile Phone"@#@
// @key: @#@"[phoneTypes.phone]"@#@ @source: @#@"Phone"@#@
// @key: @#@"[phoneTypes.unknown]"@#@ @source: @#@"Unknown Phone Type"@#@
// @key: @#@"[phoneTypes.company]"@#@ @source: @#@"Company Number"@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct Number"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
