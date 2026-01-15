"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _phoneTypes$extension;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_phoneTypes$extension = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, '내선 번호'), _phoneTypes.phoneTypes.direct, '직접'), _phoneTypes.phoneTypes.mobile, '모바일'), _phoneTypes.phoneTypes.contact, '연락처 전화번호'), _phoneTypes.phoneTypes.home, '홈'), _phoneTypes.phoneTypes.business, '비즈니스'), _phoneTypes.phoneTypes.fax, '팩스'), _phoneTypes.phoneTypes.company, '회사'), _phoneTypes.phoneTypes.other, '기타'), "emailLabel", '전자 메일'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_phoneTypes$extension, "call", '전화'), "text", '문자'), _presenceStatus.presenceStatus.available, '사용 가능'), _presenceStatus.presenceStatus.offline, '오프라인으로 표시'), _presenceStatus.presenceStatus.busy, '통화 중'), _Presence.dndStatus.doNotAcceptAnyCalls, '방해 금지'), "notActivated", '비활성'), "jobTitle", '직함'), "site", '사이트')); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
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
// @key: @#@"jobTitle"@#@ @source: @#@"Title"@#@
// @key: @#@"site"@#@ @source: @#@"Site"@#@
//# sourceMappingURL=ko-KR.js.map
