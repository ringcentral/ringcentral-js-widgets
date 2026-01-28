"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHostPath = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.last-index-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
/**
 * Returns the host URL of the given href.
 *
 * @param href - The URL string.
 * @returns The host URL.
 */
var getHostPath = exports.getHostPath = function getHostPath() {
  var href = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.href;
  var url = new URL(href);
  url.hash = ''; // Remove the hash part
  url.search = ''; // Remove the search part
  return url.href.substring(0, url.href.lastIndexOf('/') + 1);
};
//# sourceMappingURL=getHostPath.js.map
