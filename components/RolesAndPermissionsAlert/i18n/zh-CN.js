"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _permissionsMessages = _interopRequireDefault(require("ringcentral-integration/modules/RolesAndPermissions/permissionsMessages"));

var _permissionMessages$i;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_permissionMessages$i = {}, _defineProperty(_permissionMessages$i, _permissionsMessages["default"].invalidTier, "您的版本不支持 {application} 集成。请联系您的账户代表升级您的 {brand} 版本。"), _defineProperty(_permissionMessages$i, _permissionsMessages["default"].insufficientPrivilege, "权限不足。请联系您的账户代表进行升级。"), _permissionMessages$i); // @key: @#@"[permissionMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
