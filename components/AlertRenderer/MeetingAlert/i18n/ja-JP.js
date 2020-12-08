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

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "会議のトピックを入力してください。"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "会議のパスワードを入力してください。"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "{application}には{permissionName}のアクセス許可がありません。"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "追加された会議"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].updatedSuccess, "更新された会議"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].meetingIsDeleted, "会議は削除されました"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "申し訳ありませんが、問題が発生しました。もう一度試してください。"), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
