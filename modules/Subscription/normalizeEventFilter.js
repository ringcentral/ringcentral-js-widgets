"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeEventFilter = normalizeEventFilter;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
// const apiUrlPrefixRegex = /^\/restapi\/v[\d]\.[\d]/;
var accountRegex = /\/account\/[\d]+/;
var extensionRegex = /\/extension\/[\d]+/;
var totalActiveCallsRegex = /&totalActiveCalls/;

/**
 * @description Convert the subscription filters from base subscription object
 *  to the generic event filters we use to subscribe
 * @param {String[]} filters
 * @returns {String[]} normalizedFilters
 */
function normalizeEventFilter() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return filter.replace(accountRegex, '/account/~').replace(extensionRegex, '/extension/~').replace(totalActiveCallsRegex, '');
}
//# sourceMappingURL=normalizeEventFilter.js.map
