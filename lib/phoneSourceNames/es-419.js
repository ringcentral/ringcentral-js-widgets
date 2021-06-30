"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _phoneSources = require("@ringcentral-integration/commons/enums/phoneSources");

var _phoneSources$account;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneSources$account = {}, _defineProperty(_phoneSources$account, _phoneSources.phoneSources.account, "Cuenta"), _defineProperty(_phoneSources$account, _phoneSources.phoneSources.contact, "Contacto"), _defineProperty(_phoneSources$account, _phoneSources.phoneSources.rcContact, "{brand}"), _defineProperty(_phoneSources$account, _phoneSources.phoneSources.lead, "Posible cliente"), _defineProperty(_phoneSources$account, _phoneSources.phoneSources.opportunity, "Oportunidad"), _defineProperty(_phoneSources$account, _phoneSources.phoneSources.systemUser, "Usuario del sistema"), _phoneSources$account); // @key: @#@"[phoneSources.account]"@#@ @source: @#@"Account"@#@
// @key: @#@"[phoneSources.contact]"@#@ @source: @#@"Contact"@#@
// @key: @#@"[phoneSources.rcContact]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"[phoneSources.lead]"@#@ @source: @#@"Lead"@#@
// @key: @#@"[phoneSources.opportunity]"@#@ @source: @#@"Opportunity"@#@
// @key: @#@"[phoneSources.systemUser]"@#@ @source: @#@"System User"@#@


exports["default"] = _default;
//# sourceMappingURL=es-419.js.map
