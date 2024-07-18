"use strict";

require("core-js/modules/es.array.for-each");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopTrack = exports.stopStream = void 0;
/**
 * Stops single track on the stream.
 * If notify === true, also invokes track.onended handler
 */
var stopTrack = function stopTrack(track) {
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
exports.stopTrack = stopTrack;
var stopStream = function stopStream(stream) {
  var notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  stream.getTracks().forEach(function (track) {
    return stopTrack(track, notify);
  });
};
exports.stopStream = stopStream;
//# sourceMappingURL=stream.js.map
