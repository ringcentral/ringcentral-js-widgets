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

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, "Ramal"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.direct, "Direto"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.mobile, "Disp. móvel"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.contact, "Telefone de contato"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.home, "Página principal"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.business, "Negócio"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.fax, "Fax"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.company, "Empresa"), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.other, "Outro"), _defineProperty(_phoneTypes$extension, "emailLabel", "Email"), _defineProperty(_phoneTypes$extension, "call", "Chamada"), _defineProperty(_phoneTypes$extension, "text", "Texto"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.available, "Disponível"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.offline, "Invisível"), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.busy, "Ocupado"), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, "Não perturbe"), _defineProperty(_phoneTypes$extension, "notActivated", "Inativo"), _defineProperty(_phoneTypes$extension, "company", "Empresa"), _defineProperty(_phoneTypes$extension, "jobTitle", "Título"), _defineProperty(_phoneTypes$extension, "site", "Local"), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
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
//# sourceMappingURL=pt-BR.js.map
