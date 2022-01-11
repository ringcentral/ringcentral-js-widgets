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

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "모임 주제를 입력하세요."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "모임 비밀번호를 제공하세요."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "{application}에 {permissionName} 권한이 없습니다."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "모임이 추가됨"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].updatedSuccess, "모임이 업데이트됨"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].meetingIsDeleted, "모임이 삭제됨"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "죄송합니다. 당사 시스템에서 문제가 발생했습니다. 다시 시도해 주세요."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
