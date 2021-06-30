"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _permissionsMessages = require("@ringcentral-integration/commons/enums/permissionsMessages");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _defineProperty({}, _permissionsMessages.permissionsMessages.callingDisable, "발신 통화를 걸 수 있는 권한이 없습니다. {brand} 계정 관리자에게 문의하여 업그레이드하세요."); // @key: @#@"[permissionsMessages.callingDisable]"@#@ @source: @#@"You don't have permissions to place outbound calls. Please contact your {brand} account administrator for an upgrade."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
