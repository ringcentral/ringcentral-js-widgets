"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _errors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageStore/errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _defineProperty({}, _errors["default"].deleteFailed, "내부 서버 오류로 인해 음성 사서함을 삭제할 수 없습니다."); // @key: @#@"[messageStoreErrors.deleteFailed]"@#@ @source: @#@"Cannot delete the voicemail due to internal server error."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
