"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InboundQueuesPage = void 0;

var _InboundQueuesPanel = require("../../components/InboundQueuesPanel");

var _connectModule = require("../../lib/connectModule");

var InboundQueuesPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evInboundQueuesUI;
})(_InboundQueuesPanel.InboundQueuesPanel);
exports.InboundQueuesPage = InboundQueuesPage;
//# sourceMappingURL=InboundQueuesPage.js.map
