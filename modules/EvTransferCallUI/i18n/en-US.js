"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _transferTypes = require("../../../enums/transferTypes");

var _callRecipient$phoneN;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callRecipient$phoneN = {
  callRecipient: 'Call recipient',
  phoneNumber: 'Phone number',
  callRecipientName: 'Call recipient name',
  callRecipientNumber: 'Call recipient number',
  enterThePhoneNumberPlaceholder: 'Enter the phone number',
  callRecipientNamePlaceholder: 'Please select',
  callRecipientNumberPlaceholder: 'None',
  queueGroup: 'Queue group',
  queueDetail: 'Queue'
}, _defineProperty(_callRecipient$phoneN, _transferTypes.transferTypes.internal, 'Internal transfer'), _defineProperty(_callRecipient$phoneN, _transferTypes.transferTypes.phoneBook, 'Phone book transfer'), _defineProperty(_callRecipient$phoneN, _transferTypes.transferTypes.manualEntry, 'Enter a number'), _defineProperty(_callRecipient$phoneN, _transferTypes.transferTypes.queue, 'Queue transfer'), _callRecipient$phoneN);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
