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

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes["default"].extension, "Poste"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].direct, "Direct"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].mobile, "Appareil mobile"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].home, "Domicile"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].business, "Bureau"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].fax, "Télécopieur"), _defineProperty(_phoneTypes$extension, _phoneTypes["default"].other, "Autre"), _defineProperty(_phoneTypes$extension, "emailLabel", "Courriel"), _defineProperty(_phoneTypes$extension, "call", "Appeler"), _defineProperty(_phoneTypes$extension, "text", "Texto"), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].available, "Disponible"), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].offline, "Invisible"), _defineProperty(_phoneTypes$extension, _presenceStatus["default"].busy, "Occupé"), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, "Ne pas déranger"), _defineProperty(_phoneTypes$extension, "notActivated", "Inactif"), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
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
//# sourceMappingURL=fr-CA.js.map
