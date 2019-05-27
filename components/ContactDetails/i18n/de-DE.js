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

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes["default"].extension, "Durchw."), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].direct, "Direkt"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].mobile, "Mobil"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].home, "Privat"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].business, "Arbeit"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].fax, "Fax"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].other, "Andere"), _defineProperty(_phoneTypes$extension, "emailLabel", "E-Mail"), _defineProperty(_phoneTypes$extension, "call", "Anruf"), _defineProperty(_phoneTypes$extension, "text", "Textn."), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].available, "Verfügbar"), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].offline, "Unsichtbar"), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].busy, "Belegt"), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, "Nicht stören"), _defineProperty(_phoneTypes$extension, "notActivated", "Inaktiv"), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
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
//# sourceMappingURL=de-DE.js.map
