"use strict";

require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localStorageDataTrackingTimestamp = void 0;
var DATA_TRACKING_TIMESTAMP_STORAGE_KEY = 'environment.enabledDataTrackingTimestamp';

/**
 * Local storage for data tracking timestamp
 *
 * use local storage to get state be `synchronously`
 */
var localStorageDataTrackingTimestamp = {
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
exports.localStorageDataTrackingTimestamp = localStorageDataTrackingTimestamp;
//# sourceMappingURL=enabledDataTrackingTimestamp.js.map
