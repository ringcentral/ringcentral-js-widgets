"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _meetingStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Meeting/meetingStatus"));

var _meetingStatus$emptyT;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "Introduza o tópico da reunião."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "Introduza a palavra-passe da reunião."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "{application} não tem permissão {permissionName}."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "Reunião adicionada"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].updatedSuccess, "Reunião atualizada"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].meetingIsDeleted, "A reunião foi eliminada"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "Lamentamos, mas ocorreu um erro do nosso lado. Tente novamente."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@


exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
