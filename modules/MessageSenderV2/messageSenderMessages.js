"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageSenderMessages = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var messageSenderMessages = _ObjectMap.ObjectMap.prefixKeys(['sendSuccess', 'sendError', 'numberValidateError', 'textEmpty', 'textTooLong', 'multipartTextTooLong', 'noPermission', 'senderEmpty', 'noToNumber', 'recipientsEmpty', 'recipientNumberInvalids', 'senderNumberInvalid', 'noAreaCode', 'specialNumber', 'internalError', 'notAnExtension', 'networkError', 'notSmsToExtension', 'internationalSMSNotSupported', 'noInternalSMSPermission', 'noSMSPermission', 'sending', 'attachmentSizeLimitation', 'attachmentCountLimitation', 'noAttachmentToExtension'], 'message-sender-msg');

exports.messageSenderMessages = messageSenderMessages;
var _default = messageSenderMessages;
exports["default"] = _default;
//# sourceMappingURL=messageSenderMessages.js.map
