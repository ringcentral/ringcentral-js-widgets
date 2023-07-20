"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.date.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByTime = exports.flattenToRecords = exports.filterPhoneNumber = exports.dedup = void 0;
var filterPhoneNumber = function filterPhoneNumber(call) {
  return function (_ref) {
    var phoneNumber = _ref.phoneNumber;
    return phoneNumber === call.from.phoneNumber || phoneNumber === call.to.phoneNumber || phoneNumber === call.from.extensionNumber || phoneNumber === call.to.extensionNumber;
  };
};
exports.filterPhoneNumber = filterPhoneNumber;
var flattenToRecords = function flattenToRecords(items) {
  return items.reduce(function (acc, _ref2) {
    var records = _ref2.records;
    return acc.concat(records);
  }, []);
};

// Sort by time in descending order
// TODO: fix type optional in `@rc-ex/core/definitions`
exports.flattenToRecords = flattenToRecords;
var sortByTime = function sortByTime(a, b) {
  return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
};
exports.sortByTime = sortByTime;
var dedup = function dedup(calls) {
  var hash = {};
  return calls.reduce(function (acc, cur) {
    if (hash[cur.id]) return acc;
    hash[cur.id] = true;
    return acc.concat(cur);
  }, []);
};
exports.dedup = dedup;
//# sourceMappingURL=RecentCallsHelper.js.map
