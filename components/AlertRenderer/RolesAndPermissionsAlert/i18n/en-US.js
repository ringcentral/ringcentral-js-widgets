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

var _default = (_permissionMessages$i = {}, _defineProperty(_permissionMessages$i, _permissionsMessages["default"].invalidTier, 'Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition.'), _defineProperty(_permissionMessages$i, _permissionsMessages["default"].insufficientPrivilege, 'Insufficient privilege. Please contact your account representative for an upgrade.'), _permissionMessages$i);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
