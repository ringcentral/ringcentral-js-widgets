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

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, "分机号"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.direct, "直拨"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.mobile, "移动"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.home, "家庭"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.business, "商务"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.fax, "传真"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.company, "公司"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.other, "其他"), _defineProperty(_phoneTypes$extension, "emailLabel", "电子邮件"), _defineProperty(_phoneTypes$extension, "call", "呼叫"), _defineProperty(_phoneTypes$extension, "text", "短信"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.available, "在线"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.offline, "隐身"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.busy, "忙碌"), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, "勿扰"), _defineProperty(_phoneTypes$extension, "notActivated", "停用"), _defineProperty(_phoneTypes$extension, "company", "公司"), _defineProperty(_phoneTypes$extension, "jobTitle", "职位"), _defineProperty(_phoneTypes$extension, "site", "站点"), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
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
//# sourceMappingURL=zh-CN.js.map
