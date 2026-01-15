"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agentStatesColors = void 0;
var agentStatesColors = exports.agentStatesColors = {
  // green
  AVAILABLE: 'green',
  // red
  'AUX-UNAVAIL-OFFHOOK': 'red',
  'AUX-UNAVAIL-NO-OFFHOOK': 'red',
  OFFLINE: 'red',
  // grey
  'ON-BREAK': 'grey',
  AWAY: 'grey',
  LUNCH: 'grey',
  // blue
  ENGAGED: 'blue',
  // yellow
  WORKING: 'yellow',
  TRAINING: 'yellow',
  TRANSITION: 'yellow',
  // TODO: should check with color
  'RNA-STATE': 'yellow'
};
//# sourceMappingURL=agentStatesColors.js.map
