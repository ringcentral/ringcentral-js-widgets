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
    return (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      phoneNumber === call.from.phoneNumber ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      phoneNumber === call.to.phoneNumber ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      phoneNumber === call.from.extensionNumber ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      phoneNumber === call.to.extensionNumber
    );
  };
};
exports.filterPhoneNumber = filterPhoneNumber;
var flattenToRecords = function flattenToRecords(items) {
  return items.reduce(
  // @ts-expect-error TS(2769): No overload matches this call.
  function (acc, _ref2) {
    var records = _ref2.records;
    return acc.concat(records);
  }, []);
};

// Sort by time in descending order
// TODO: fix type optional in `@rc-ex/core/definitions`
exports.flattenToRecords = flattenToRecords;
var sortByTime = function sortByTime(a, b
// @ts-expect-error TS(2769): No overload matches this call.
) {
  return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
};
exports.sortByTime = sortByTime;
var dedup = function dedup(calls) {
  var hash = {};
  return calls.reduce(function (acc, cur) {
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    if (hash[cur.id]) return acc;
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    hash[cur.id] = true;
    // @ts-expect-error TS(2769): No overload matches this call.
    return acc.concat(cur);
  }, []);
};
exports.dedup = dedup;
//# sourceMappingURL=RecentCallsHelper.js.map
