"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopTrack = exports.stopStream = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
/**
 * Stops single track on the stream.
 * If notify === true, also invokes track.onended handler
 */
var stopTrack = exports.stopTrack = function stopTrack(track) {
  var notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  track.stop();
  if (notify) {
    var event = new Event('ended');
    try {
      if (typeof track.onended === 'function') {
        track.onended(event);
        track.onended = null;
      }
    } finally {
      track.dispatchEvent(event);
    }
  }
};

/**
 * Stops all tracks on the stream.
 * If notify === true, also invokes track.onended handler for each track
 */
var stopStream = exports.stopStream = function stopStream(stream) {
  var notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  stream.getTracks().forEach(function (track) {
    return stopTrack(track, notify);
  });
};
//# sourceMappingURL=stream.js.map
