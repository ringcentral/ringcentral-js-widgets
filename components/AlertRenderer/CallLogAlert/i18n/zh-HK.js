"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callLogMessages = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callLogMessages"));

var _callLogMessages$logC;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callLogMessages$logC = {}, _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logCallLogFailed, "因為意外錯誤，無法載入通話記錄表格。請重新整理頁面然後再試一次。"), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logFailed, "抱歉，我們無法記錄您的電話。請稍後再試。"), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].fieldRequired, "請填寫必要欄位。"), _callLogMessages$logC); // @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
