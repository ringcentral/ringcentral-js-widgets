"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ConversationPage = void 0;
var _ConversationPanel = _interopRequireDefault(require("../../components/ConversationPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ConversationPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conversationUI;
})(_ConversationPanel["default"]);
exports.ConversationPage = exports["default"] = ConversationPage;
//# sourceMappingURL=index.js.map
