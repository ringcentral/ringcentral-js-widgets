"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferManualEntryRecipientPage = void 0;
var _TransferCallRecipient = require("../../components/TransferCallRecipient");
var _connectModule = require("../../lib/connectModule");
var TransferManualEntryRecipientPage = exports.TransferManualEntryRecipientPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evTransferCallUI;
})(_TransferCallRecipient.ManualEntryPanel);
//# sourceMappingURL=TransferManualEntryRecipientPage.js.map
