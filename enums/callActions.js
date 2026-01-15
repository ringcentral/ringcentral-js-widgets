"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.callActions = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var callActions = exports.callActions = _ObjectMap.ObjectMap.fromObject({
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
var _default = exports["default"] = callActions;
//# sourceMappingURL=callActions.js.map
