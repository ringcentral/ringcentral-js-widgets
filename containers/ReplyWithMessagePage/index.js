"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplyWithMessagePage = void 0;
var _ReplyWithMessagePanel = require("../../components/ReplyWithMessagePanel");
var _phoneContext = require("../../lib/phoneContext");
var ReplyWithMessagePage = exports.ReplyWithMessagePage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.replyWithMessageUI;
})(_ReplyWithMessagePanel.ReplyWithMessagePanel);
//# sourceMappingURL=index.js.map
