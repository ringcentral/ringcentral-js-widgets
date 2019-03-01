"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _permissionsMessages = _interopRequireDefault(require("ringcentral-integration/modules/RolesAndPermissions/permissionsMessages"));

var _permissionMessages$i;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_permissionMessages$i = {}, _defineProperty(_permissionMessages$i, _permissionsMessages.default.invalidTier, "お使いのエディションでは、{application}の統合がサポートされていません。{brand}のエディションをアップグレードするには、アカウント担当者にお問い合わせください。"), _defineProperty(_permissionMessages$i, _permissionsMessages.default.insufficientPrivilege, "権限が不足しています。アップグレードについてアカウント担当者にお問い合わせください。"), _permissionMessages$i); // @key: @#@"[permissionMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@


exports.default = _default;
//# sourceMappingURL=ja-JP.js.map
