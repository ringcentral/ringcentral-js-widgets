"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _phoneTypes$extension;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, 'Ext.'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.direct, 'Direto'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.mobile, 'Telemóvel'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.contact, 'Telefone de contacto'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.home, 'Casa'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.business, 'Profissional'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.fax, 'Fax'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.company, 'Empresa'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.other, 'Outro'), _defineProperty(_phoneTypes$extension, "emailLabel", 'E-mail'), _defineProperty(_phoneTypes$extension, "call", 'Ligar'), _defineProperty(_phoneTypes$extension, "text", 'SMS'), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.available, 'Disponível'), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.offline, 'Invisível'), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.busy, 'Ocupado'), _defineProperty(_phoneTypes$extension, _Presence.dndStatus.doNotAcceptAnyCalls, 'Não incomodar'), _defineProperty(_phoneTypes$extension, "notActivated", 'Inativo'), _defineProperty(_phoneTypes$extension, "jobTitle", 'Cargo'), _defineProperty(_phoneTypes$extension, "site", 'Local'), _phoneTypes$extension); // @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
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
//# sourceMappingURL=pt-PT.js.map
