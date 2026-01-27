"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalTrackEvent$ = void 0;
exports.trackEvent = trackEvent;
var _rxjs = require("rxjs");
var globalTrackEvent$ = exports.globalTrackEvent$ = new _rxjs.Subject();

/**
 * Track an event with type-safe properties directly.
 *
 * @param eventName - The event name to track.
 * @param properties - The properties for the event, type-checked by event name.
 */
function trackEvent(eventName, properties) {
  if (!globalTrackEvent$.observed) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('No observers for globalTrackEvent$. Please ensure you have subscribed to it before tracking events.');
    }
    return;
  }
  globalTrackEvent$.next([eventName, properties]);
}
//# sourceMappingURL=trackEvent.js.map
