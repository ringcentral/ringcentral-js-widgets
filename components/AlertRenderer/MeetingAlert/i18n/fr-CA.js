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

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "Veuillez saisir le sujet de la réunion."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "Veuillez fournir le mot de passe de la réunion."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "{application} ne possède pas la permission {permissionName}."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "La réunion est programmée."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].updatedSuccess, "La réunion est mise à jour."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "Erreur interne, échec de la programmation de la réunion. Réessayez plus tard."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting is updated."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
