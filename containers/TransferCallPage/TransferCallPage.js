"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferCallPage = void 0;
var _TransferCallPanel = require("../../components/TransferCallPanel");
var _connectModule = require("../../lib/connectModule");
var TransferCallPage = exports.TransferCallPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evTransferCallUI;
})(_TransferCallPanel.TransferCallPanel);
//# sourceMappingURL=TransferCallPage.js.map
