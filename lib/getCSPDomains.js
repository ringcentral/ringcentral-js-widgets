"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCSPDomains = void 0;
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
// remove this when dynamic configs has been phased out
var getCSPDomains = exports.getCSPDomains = function getCSPDomains(loaderBaseUrl) {
  var domains = new Set();
  if (loaderBaseUrl) {
    var urlObj = new URL(loaderBaseUrl);
    domains.add(urlObj.origin);
  }
  domains.add('https://apps.ringcentral.com');
  return Array.from(domains).join(' ');
};
//# sourceMappingURL=getCSPDomains.js.map
