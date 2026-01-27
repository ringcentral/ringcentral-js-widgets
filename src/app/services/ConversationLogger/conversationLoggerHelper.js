"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conversationLogIdentityFunction = conversationLogIdentityFunction;
exports.getLogId = getLogId;
require("core-js/modules/es.array.concat.js");
function getLogId(_ref) {
  var conversationId = _ref.conversationId,
    date = _ref.date;
  return "".concat(conversationId, "/").concat(date);
}
function conversationLogIdentityFunction(conversation) {
  return conversation.conversationLogId;
}
//# sourceMappingURL=conversationLoggerHelper.js.map
