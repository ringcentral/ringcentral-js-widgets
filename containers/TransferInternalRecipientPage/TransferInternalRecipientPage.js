"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferInternalRecipientPage = void 0;
var _TransferCallRecipient = require("../../components/TransferCallRecipient");
var _connectModule = require("../../lib/connectModule");
var TransferInternalRecipientPage = exports.TransferInternalRecipientPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evTransferCallUI;
})(_TransferCallRecipient.InternalPanel);
//# sourceMappingURL=TransferInternalRecipientPage.js.map
