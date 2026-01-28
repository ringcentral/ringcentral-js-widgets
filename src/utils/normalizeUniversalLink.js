"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeUniversalLink = normalizeUniversalLink;
require("core-js/modules/es.string.ends-with.js");
/**
 *
 * @param link URL
 * @returns URL with trailing slash
 * @description App domains defined in BSS doesn't have trailing slash, but the universal link needs to have a trailing slash
 */

function normalizeUniversalLink(link) {
  return link.endsWith('/') ? link : "".concat(link, "/");
}
//# sourceMappingURL=normalizeUniversalLink.js.map
