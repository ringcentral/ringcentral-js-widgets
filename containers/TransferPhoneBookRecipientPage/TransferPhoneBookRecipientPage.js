"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferPhoneBookRecipientPage = void 0;
var _TransferCallRecipient = require("../../components/TransferCallRecipient");
var _connectModule = require("../../lib/connectModule");
var TransferPhoneBookRecipientPage = exports.TransferPhoneBookRecipientPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evTransferCallUI;
})(_TransferCallRecipient.PhoneBookPanel);
//# sourceMappingURL=TransferPhoneBookRecipientPage.js.map
