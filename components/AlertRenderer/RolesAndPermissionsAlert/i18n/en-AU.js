"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _permissionsMessages = require("@ringcentral-integration/commons/enums/permissionsMessages");

var _permissionsMessages$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_permissionsMessages$ = {}, _defineProperty(_permissionsMessages$, _permissionsMessages.permissionsMessages.invalidTier, "Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."), _defineProperty(_permissionsMessages$, _permissionsMessages.permissionsMessages.insufficientPrivilege, "Insufficient privilege. Please contact your account representative for an upgrade."), _permissionsMessages$); // @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@


exports["default"] = _default;
//# sourceMappingURL=en-AU.js.map
