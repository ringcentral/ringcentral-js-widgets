"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ConversationsPage = void 0;
var _ConversationsPanel = require("../../components/ConversationsPanel");
var _phoneContext = require("../../lib/phoneContext");
var ConversationsPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conversationsUI;
})(_ConversationsPanel.ConversationsPanel);
exports.ConversationsPage = exports["default"] = ConversationsPage;
//# sourceMappingURL=index.js.map
