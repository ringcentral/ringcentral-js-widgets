"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByTime = exports.flattenToRecords = exports.filterPhoneNumber = exports.dedup = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
var filterPhoneNumber = exports.filterPhoneNumber = function filterPhoneNumber(call) {
  return function (_ref) {
    var phoneNumber = _ref.phoneNumber;
    return phoneNumber === call.from.phoneNumber || phoneNumber === call.to.phoneNumber || phoneNumber === call.from.extensionNumber || phoneNumber === call.to.extensionNumber;
  };
};
var flattenToRecords = exports.flattenToRecords = function flattenToRecords(items) {
  return items.reduce(function (acc, _ref2) {
    var records = _ref2.records;
    return acc.concat(records);
  }, []);
};

// Sort by time in descending order
// TODO: fix type optional in `@rc-ex/core/definitions`
var sortByTime = exports.sortByTime = function sortByTime(a, b) {
  return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
};
var dedup = exports.dedup = function dedup(calls) {
  var hash = {};
  return calls.reduce(function (acc, cur) {
    if (hash[cur.id]) return acc;
    hash[cur.id] = true;
    return acc.concat(cur);
  }, []);
};
//# sourceMappingURL=RecentCallsHelper.js.map
