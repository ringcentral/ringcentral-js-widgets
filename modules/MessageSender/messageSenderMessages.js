"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Enum = _interopRequireDefault(require("../../lib/Enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _Enum.default(['sendSuccess', 'sendError', 'numberValidateError', 'textEmpty', 'textTooLong', 'multipartTextTooLong', 'noPermission', 'senderEmpty', 'noToNumber', 'recipientsEmpty', 'recipientNumberInvalids', 'senderNumberInvalid', 'noAreaCode', 'specialNumber', 'internalError', 'notAnExtension', 'networkError', 'notSmsToExtension', 'internationalSMSNotSupported', 'noInternalSMSPermission', 'noSMSPermission', 'sending'], 'message-sender-msg');

exports.default = _default;
//# sourceMappingURL=messageSenderMessages.js.map
