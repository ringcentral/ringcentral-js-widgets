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

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "Insira um tópico de reunião."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "Forneça uma senha para a reunião."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "{application} não tem a permissão {permissionName}."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "A reunião está agendada."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].updatedSuccess, "Reunião atualizada."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "Erro interno, o agendamento da reunião falhou. Tente novamente mais tarde."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting is updated."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@


exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
