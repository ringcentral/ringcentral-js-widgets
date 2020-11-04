"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _presenceStatus = require("ringcentral-integration/enums/presenceStatus.enum");

var _dndStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/dndStatus"));

var _phoneTypes = require("ringcentral-integration/enums/phoneTypes");

var _phoneTypes$extension;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, "Ext."), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.direct, "Direct"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.mobile, "Mobiel"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.home, "Thuis"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.business, "Bedrijf"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.fax, "Fax"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.company, "Bedrijf"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.other, "Anders"), _defineProperty(_phoneTypes$extension, "emailLabel", "E-mail"), _defineProperty(_phoneTypes$extension, "call", "Oproep"), _defineProperty(_phoneTypes$extension, "text", "Tekstbericht"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.available, "Beschikbaar"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.offline, "Onzichtbaar"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.busy, "Bezet"), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, "Niet storen"), _defineProperty(_phoneTypes$extension, "notActivated", "Inactief"), _defineProperty(_phoneTypes$extension, "company", "Bedrijf"), _defineProperty(_phoneTypes$extension, "jobTitle", "Titel"), _defineProperty(_phoneTypes$extension, "site", "Site"), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
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
//# sourceMappingURL=nl-NL.js.map
