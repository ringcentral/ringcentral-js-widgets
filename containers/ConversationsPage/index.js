"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ConversationsPage = void 0;

var _phoneContext = require("../../lib/phoneContext");

var _ConversationsPanel = _interopRequireDefault(require("../../components/ConversationsPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConversationsPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conversationsUI;
})(_ConversationsPanel["default"]);
exports["default"] = exports.ConversationsPage = ConversationsPage;
//# sourceMappingURL=index.js.map
