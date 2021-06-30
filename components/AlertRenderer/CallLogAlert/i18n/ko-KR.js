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

var _default = (_callLogMessages$logC = {}, _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logCallLogFailed, "예기치 않은 오류로 인해 통화 기록을 로드하지 못했습니다. 페이지를 새로 고치고 다시 시도하세요."), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logFailed, "죄송합니다. 통화를 기록하지 못했습니다. 나중에 다시 시도하세요."), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].fieldRequired, "필수 필드가 필요합니다."), _callLogMessages$logC); // @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
