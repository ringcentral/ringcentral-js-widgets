"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ConversationsPage = void 0;
var _ConversationsPanel = require("../../components/ConversationsPanel");
var _phoneContext = require("../../lib/phoneContext");
var ConversationsPage = exports.ConversationsPage = exports["default"] = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conversationsUI;
})(_ConversationsPanel.ConversationsPanel);
//# sourceMappingURL=index.js.map
