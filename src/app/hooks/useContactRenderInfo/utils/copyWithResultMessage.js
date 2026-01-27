"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyWithResultMessage = void 0;
var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));
var _i18n = require("../i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var copyWithResultMessage = exports.copyWithResultMessage = function copyWithResultMessage(phoneNumber) {
  if (phoneNumber && (0, _copyToClipboard["default"])(phoneNumber)) {
    return (0, _i18n.t)('copyNumberSuccess');
  }
  return false;
};
//# sourceMappingURL=copyWithResultMessage.js.map
