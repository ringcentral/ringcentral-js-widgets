"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localStorageDataTrackingTimestamp = void 0;
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var DATA_TRACKING_TIMESTAMP_STORAGE_KEY = 'environment.enabledDataTrackingTimestamp';

/**
 * Local storage for data tracking timestamp
 *
 * use local storage to get state be `synchronously`
 */
var localStorageDataTrackingTimestamp = exports.localStorageDataTrackingTimestamp = {
  get: function get() {
    if (typeof localStorage === 'undefined') return null;
    var value = localStorage.getItem(DATA_TRACKING_TIMESTAMP_STORAGE_KEY);
    return value ? +value : null;
  },
  set: function set(timestamp) {
    if (typeof localStorage === 'undefined') return null;
    if (timestamp === null) {
      localStorage.removeItem(DATA_TRACKING_TIMESTAMP_STORAGE_KEY);
      return;
    }
    localStorage.setItem(DATA_TRACKING_TIMESTAMP_STORAGE_KEY, timestamp.toString());
  }
};
//# sourceMappingURL=enabledDataTrackingTimestamp.js.map
