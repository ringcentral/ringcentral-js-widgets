"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToSpringUIPresence = mapToSpringUIPresence;
function mapToSpringUIPresence(presence) {
  var dndStatus = presence.dndStatus,
    presenceStatus = presence.presenceStatus,
    telephonyStatus = presence.telephonyStatus,
    meetingStatus = presence.meetingStatus;
  if (dndStatus === 'DoNotAcceptAnyCalls') {
    return 'dnd';
  }
  if (presenceStatus === 'Offline') {
    return 'unavailable';
  }
  if (presenceStatus === 'Busy' || telephonyStatus && telephonyStatus !== 'NoCall' || meetingStatus === 'Connected') {
    return 'busy';
  }
  if (presenceStatus === 'Available') {
    return 'available';
  }
  return 'unavailable';
}
//# sourceMappingURL=mapRcPresence.js.map
