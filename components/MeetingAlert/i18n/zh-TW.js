"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _meetingStatus$emptyT;

var _meetingStatus = require("ringcentral-integration/modules/Meeting/meetingStatus");

var _meetingStatus2 = _interopRequireDefault(_meetingStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_meetingStatus$emptyT = {}, (0, _defineProperty3.default)(_meetingStatus$emptyT, _meetingStatus2.default.emptyTopic, "請輸入會議主題。"), (0, _defineProperty3.default)(_meetingStatus$emptyT, _meetingStatus2.default.noPassword, "請提供會議密碼。"), (0, _defineProperty3.default)(_meetingStatus$emptyT, _meetingStatus2.default.scheduledSuccess, "會議已排程。"), _meetingStatus$emptyT);

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
//# sourceMappingURL=zh-TW.js.map
