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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.emptyTopic, "Please enter meeting topic."), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.noPassword, "Please provide meeting password."), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.insufficientPermissions, "{application} do not have {permissionName} permission."), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.scheduledSuccess, "Meeting added"), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.updatedSuccess, "Meeting updated"), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.meetingIsDeleted, "Meeting has been deleted"), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.internalError, "Sorry, something went wrong on our end. Try again."), _defineProperty(_meetingStatus$emptyT, _Meeting.meetingStatus.renderInviteError, "Sorry, there was a problem on our end and we couldn’t add the meeting invitation. Please try again later."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
exports["default"] = _default;
//# sourceMappingURL=en-GB.js.map
