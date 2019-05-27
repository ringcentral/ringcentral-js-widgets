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

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "请输入会议主题。"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "请提供会议密码。"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "{application}没有{permissionName}权限。"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "会议已安排。"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "内部错误，会议安排失败。请稍后再试。"), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
