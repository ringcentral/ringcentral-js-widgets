"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCircleIconButtonTitle = getCircleIconButtonTitle;

function getCircleIconButtonTitle(_ref) {
  var isOnHold = _ref.isOnHold,
      isInComingCall = _ref.isInComingCall,
      isOnMute = _ref.isOnMute;
  return {
    holdTitle: isOnHold ? 'onHold' : 'hold',
    endTitle: isInComingCall ? 'reject' : 'hangup',
    muteTitle: isOnMute ? 'unmute' : 'mute'
  };
}
//# sourceMappingURL=help.js.map
