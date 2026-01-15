"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");
var _meetingStatus$emptyT;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.emptyTopic, '会議のトピックを入力してください。'), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.noPassword, '会議のパスワードを入力してください。'), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.insufficientPermissions, '{application}には{permissionName}のアクセス許可がありません。'), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.scheduledSuccess, '会議が追加されました'), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.updatedSuccess, '会議が更新されました'), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.meetingIsDeleted, '会議が削除されました'), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.internalError, '申し訳ありません。こちら側で問題が発生しました。もう一度やり直してください。'), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.renderInviteError, '申し訳ありません。問題が発生したため、会議の招待を追加できませんでした。後でもう一度やり直してください。'), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
