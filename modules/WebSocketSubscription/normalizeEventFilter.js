"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTheSameEventFilters = isTheSameEventFilters;
exports.isTheSameWebSocket = isTheSameWebSocket;
exports.normalizeEventFilter = normalizeEventFilter;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
// const apiUrlPrefixRegex: RegExp = /^\/restapi\/v[\d]\.[\d]/;
var accountRegex = /\/account\/[\d]+/;
var extensionRegex = /\/extension\/[\d]+/;
var totalActiveCallsRegex = /&totalActiveCalls/;

/**
 * @description Convert the subscription filters from base subscription object
 *  to the generic event filters we use to subscribe
 * @param {String} filter
 * @returns {String} normalizedFilter
 */
function normalizeEventFilter() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return filter.replace(accountRegex, '/account/~').replace(extensionRegex, '/extension/~').replace(totalActiveCallsRegex, '');
}
function isTheSameWebSocket(firstUrl, secondUrl) {
  var first = new URL(firstUrl);
  var second = new URL(secondUrl);
  var isEqual = first.origin === second.origin && first.pathname === second.pathname && first.searchParams.get('access_token') === second.searchParams.get('access_token');
  return isEqual;
}
function isTheSameEventFilters(filters1, filters2) {
  return filters1.map(function (x) {
    return normalizeEventFilter(x);
  }).sort().join(',') === filters2.map(function (x) {
    return normalizeEventFilter(x);
  }).sort().join(',');
}
//# sourceMappingURL=normalizeEventFilter.js.map
