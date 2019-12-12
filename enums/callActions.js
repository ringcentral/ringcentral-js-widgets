"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = require("../lib/HashMap");

var _default = (0, _HashMap.createHashMap)({
  '411Info': '411 Info',
  acceptCall: 'Accept Call',
  callReturn: 'Call Return',
  callingCard: 'Calling Card',
  e911Update: 'E911 Update',
  emergency: 'Emergency',
  findMe: 'FindMe',
  followMe: 'FollowMe',
  incomingFax: 'Incoming Fax',
  outgoingFax: 'Outgoing Fax',
  phoneCall: 'Phone Call',
  phoneLogin: 'Phone Login',
  ringDirectly: 'Ring Directly',
  ringMe: 'RingMe',
  ringOutMobile: 'RingOut Mobile',
  ringOutPC: 'RingOut PC',
  ringOutWeb: 'RingOut Web',
  support: 'Support',
  transfer: 'Transfer',
  unknown: 'Unknown',
  voIPCall: 'VoIP Call'
});

exports["default"] = _default;
//# sourceMappingURL=callActions.js.map
