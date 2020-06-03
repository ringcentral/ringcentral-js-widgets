"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transferErrors = void 0;

var _Enum = require("ringcentral-integration/lib/Enum");

var transferErrors = (0, _Enum.createEnum)(['TYPE_ERROR', 'AGENT_ID_ERROR', 'CONTACT_ID_ERROR', 'RECIPIENT_NUMBER_ERROR', 'TRANSFER_ERROR', 'SEND_VOICEMAIL_ERROR']);
exports.transferErrors = transferErrors;
//# sourceMappingURL=transferErrors.js.map
