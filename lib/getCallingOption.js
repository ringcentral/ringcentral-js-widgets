"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCallingOption = void 0;
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var getCallingOption = function getCallingOption(callingMode) {
  switch (callingMode) {
    case _CallingSettings.callingModes.softphone:
      return 'RingCentral Phone';
    case _CallingSettings.callingModes.ringout:
      return 'RingOut';
    case _CallingSettings.callingModes.webphone:
      return 'Browser';
    case _CallingSettings.callingModes.jupiter:
    case _CallingSettings.callingModes.jupiterUniversalLink:
      return 'RingCentral App';
    default:
      return null;
  }
};
exports.getCallingOption = getCallingOption;
//# sourceMappingURL=getCallingOption.js.map
