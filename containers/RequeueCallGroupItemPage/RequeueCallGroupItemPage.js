"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequeueCallGroupItemPage = void 0;
var _RequeueCallGroupPanel = require("../../components/RequeueCallPanel/RequeueCallGroupPanel");
var _connectModule = require("../../lib/connectModule");
var RequeueCallGroupItemPage = exports.RequeueCallGroupItemPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evTransferCallUI;
})(_RequeueCallGroupPanel.RequeueCallGroupDetailPanel);
//# sourceMappingURL=RequeueCallGroupItemPage.js.map
