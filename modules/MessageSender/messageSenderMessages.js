"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageSenderMessages = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var messageSenderMessages = exports.messageSenderMessages = _ObjectMap.ObjectMap.prefixKeys([
// TODO: should check is that still need?
'connectFailed', 'sendSuccess', 'sendError', 'numberValidateError', 'textEmpty', 'textTooLong', 'multipartTextTooLong', 'noPermission', 'senderEmpty', 'noToNumber', 'recipientsEmpty', 'recipientNumberInvalids', 'senderNumberInvalid', 'noAreaCode', 'specialNumber', 'internalError', 'notAnExtension', 'networkError', 'notSmsToExtension', 'internationalSMSNotSupported', 'noInternalSMSPermission', 'noSMSPermission', 'sending', 'attachmentSizeLimitation', 'attachmentCountLimitation', 'noAttachmentToExtension', 'shortNumbersNotAvailable'], 'message-sender-msg');
var _default = exports["default"] = messageSenderMessages;
//# sourceMappingURL=messageSenderMessages.js.map
