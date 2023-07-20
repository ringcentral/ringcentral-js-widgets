"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferCallPage = void 0;
var _TransferCallPanel = require("../../components/TransferCallPanel");
var _connectModule = require("../../lib/connectModule");
var TransferCallPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evTransferCallUI;
})(_TransferCallPanel.TransferCallPanel);
exports.TransferCallPage = TransferCallPage;
//# sourceMappingURL=TransferCallPage.js.map
