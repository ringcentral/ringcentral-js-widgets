"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agentStateTypes = void 0;
var agentStateTypes = {
  working: 'WORKING',
  available: 'AVAILABLE',
  away: 'AWAY',
  onBreak: 'ON-BREAK',
  lunch: 'LUNCH',
  allowOffhook: 'AUX-UNAVAIL-OFFHOOK',
  disconnectOffhook: 'AUX-UNAVAIL-NO-OFFHOOK',
  // call status
  training: 'TRAINING',
  transition: 'TRANSITION',
  engaged: 'ENGAGED',
  breakAfterCall: 'BREAK-AFTER-CALL'
};
exports.agentStateTypes = agentStateTypes;
//# sourceMappingURL=agentStateTypes.js.map
