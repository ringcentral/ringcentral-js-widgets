"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _meetingStatus = _interopRequireDefault(require("ringcentral-integration/modules/Meeting/meetingStatus"));

var _meetingStatus$emptyT;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "Escriba el tema de la reunión."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "Indique la contraseña de la reunión."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "{application} no tiene el permiso {permissionName}."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "La reunión se ha programado."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "Error interno, no se pudo programar la reunión. Inténtelo de nuevo más tarde."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@


exports["default"] = _default;
//# sourceMappingURL=es-419.js.map
