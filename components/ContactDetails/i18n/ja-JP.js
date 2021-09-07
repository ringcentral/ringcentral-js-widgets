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

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, "内線"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.direct, "ダイレクト"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.mobile, "携帯電話"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.contact, "電話で連絡"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.home, "自宅"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.business, "勤務先"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.fax, "FAX"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.company, "会社"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.other, "その他"), _defineProperty(_phoneTypes$extension, "emailLabel", "Eメール"), _defineProperty(_phoneTypes$extension, "call", "通話"), _defineProperty(_phoneTypes$extension, "text", "テキスト"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.available, "オンライン"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.offline, "非表示"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.busy, "取り込み中"), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, "応答不可"), _defineProperty(_phoneTypes$extension, "notActivated", "非アクティブ"), _defineProperty(_phoneTypes$extension, "company", "会社"), _defineProperty(_phoneTypes$extension, "jobTitle", "役職"), _defineProperty(_phoneTypes$extension, "site", "サイト"), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile"@#@
// @key: @#@"[phoneTypes.contact]"@#@ @source: @#@"Contact phone"@#@
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
//# sourceMappingURL=ja-JP.js.map
