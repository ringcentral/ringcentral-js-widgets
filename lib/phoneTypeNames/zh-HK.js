"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");

var _phoneTypes$business$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.business, "商務電話"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.extension, "分機號碼"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.home, "家用電話"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.mobile, "行動電話"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.phone, "電話"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.unknown, "未知的電話類型"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.company, "公司號碼"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.direct, "直撥號碼"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.fax, "傳真"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.other, "其他"), _phoneTypes$business$); // @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business Phone"@#@
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
//# sourceMappingURL=zh-HK.js.map
