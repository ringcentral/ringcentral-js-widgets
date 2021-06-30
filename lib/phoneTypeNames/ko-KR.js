"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");

var _phoneTypes$business$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.business, "비즈니스 전화"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.extension, "내선 번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.home, "집 전화번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.mobile, "휴대폰"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.phone, "전화"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.unknown, "알 수 없는 전화 유형"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.company, "회사 번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.direct, "직통 번호"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.fax, "팩스"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.other, "기타"), _phoneTypes$business$); // @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business Phone"@#@
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
//# sourceMappingURL=ko-KR.js.map
