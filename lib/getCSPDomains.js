"use strict";

require("core-js/modules/es.array.from");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.url");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCSPDomains = void 0;
// remove this when dynamic configs has been phased out
var getCSPDomains = function getCSPDomains(loaderBaseUrl) {
  var domains = new Set();
  if (loaderBaseUrl) {
    var urlObj = new URL(loaderBaseUrl);
    domains.add(urlObj.origin);
  }
  domains.add('https://apps.ringcentral.com');
  return Array.from(domains).join(' ');
};
exports.getCSPDomains = getCSPDomains;
//# sourceMappingURL=getCSPDomains.js.map
