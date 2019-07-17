"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _presenceStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/presenceStatus"));

var _dndStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/dndStatus"));

var _phoneTypes = _interopRequireDefault(require("../../../enums/phoneTypes"));

var _phoneTypes$extension;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes["default"].extension, "分機"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].direct, "直撥"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].mobile, "行動"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].home, "家用"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].business, "商務"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].fax, "傳真"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].other, "其他"), _defineProperty(_phoneTypes$extension, "emailLabel", "電子郵件"), _defineProperty(_phoneTypes$extension, "call", "通話"), _defineProperty(_phoneTypes$extension, "text", "文字"), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].available, "上線"), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].offline, "隱形"), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].busy, "忙碌"), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, "勿打擾"), _defineProperty(_phoneTypes$extension, "notActivated", "非使用中"), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home"@#@
// @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
// @key: @#@"notActivated"@#@ @source: @#@"Inactive"@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
