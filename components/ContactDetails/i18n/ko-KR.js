"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");

var _dndStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Presence/dndStatus"));

var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");

var _phoneTypes$extension;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, "내선"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.direct, "직통"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.mobile, "모바일"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.home, "홈"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.business, "비즈니스"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.fax, "팩스"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.company, "회사"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.other, "기타"), _defineProperty(_phoneTypes$extension, "emailLabel", "전자 메일"), _defineProperty(_phoneTypes$extension, "call", "통화"), _defineProperty(_phoneTypes$extension, "text", "문자"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.available, "통화 가능"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.offline, "오프라인으로 표시"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.busy, "통화 중"), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, "방해 금지"), _defineProperty(_phoneTypes$extension, "notActivated", "비활성"), _defineProperty(_phoneTypes$extension, "company", "회사"), _defineProperty(_phoneTypes$extension, "jobTitle", "제목"), _defineProperty(_phoneTypes$extension, "site", "사이트"), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home"@#@
// @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.company]"@#@ @source: @#@"Company"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
// @key: @#@"notActivated"@#@ @source: @#@"Inactive"@#@
// @key: @#@"company"@#@ @source: @#@"Company"@#@
// @key: @#@"jobTitle"@#@ @source: @#@"Title"@#@
// @key: @#@"site"@#@ @source: @#@"Site"@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
