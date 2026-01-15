"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequeueCallGroupPage = void 0;
var _RequeueCallGroupPanel = require("../../components/RequeueCallPanel/RequeueCallGroupPanel");
var _connectModule = require("../../lib/connectModule");
var RequeueCallGroupPage = exports.RequeueCallGroupPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evTransferCallUI;
})(_RequeueCallGroupPanel.RequeueCallGroupPanel);
//# sourceMappingURL=RequeueCallGroupPage.js.map
