"use strict";

require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.replace");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.url");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTheSameWebSocket = isTheSameWebSocket;
exports.normalizeEventFilter = normalizeEventFilter;
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
//# sourceMappingURL=normalizeEventFilter.js.map
