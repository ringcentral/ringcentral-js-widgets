"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequeueCallGroupItemPage = void 0;

var _RequeueCallGroupPanel = require("../../components/RequeueCallPanel/RequeueCallGroupPanel");

var _connectModule = require("../../lib/connectModule");

var RequeueCallGroupItemPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evTransferCallUI;
})(_RequeueCallGroupPanel.RequeueCallGroupDetailPanel);
exports.RequeueCallGroupItemPage = RequeueCallGroupItemPage;
//# sourceMappingURL=RequeueCallGroupItemPage.js.map
