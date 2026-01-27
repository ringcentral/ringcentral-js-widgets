"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizedMessage = void 0;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim-start.js");
// https://regex101.com/r/2rc7Mg/1
/**
 * Filters a string to only keep normal text and removes special characters.
 * The function performs the following operations:
 * 1. Removes leading whitespace
 * 2. Removes special characters (~@#%^&*()_+{}[]|<>/)
 * 3. Excludes emoji characters based on Unicode ranges
 *
 * @param content - The input string to be sanitized
 * @returns A string containing only emoji characters from the input, or an empty string if no emojis are found
 */
var sanitizedMessage = exports.sanitizedMessage = function sanitizedMessage(content) {
  var regex = /(?:[\0-\xA8\xAA-\xAD\xAF-\u2121\u2123-\u23E8\u23F0-\u23F2\u23F4-\u23F7\u23FB-\u24C1\u24C3-\u25B5\u25B7-\u25FF\u27C0-\u2933\u2936-\u2B04\u2B08-\u2B1A\u2B1D-\u2B4F\u2B51-\u2B54\u2B56-\u302F\u3031-\u303C\u303E-\u3296\u3298\u329A-\uD7FF\uE000-\uFFFF]|[\uD800-\uD83B\uD83F-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDC00-\uDC03\uDC05-\uDCCE\uDCD0-\uDD6F\uDD72-\uDD7D\uDD80-\uDD8D\uDD8F\uDD90\uDE52-\uDEFF]|\uD83D[\uDE50-\uDE7F\uDF00-\uDFFF]|\uD83E[\uDC00-\uDCFF\uDE00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
  var matches = content.match(regex);
  return matches ? matches.join('').trimStart().replace(/[~@#%^&*()_+{}[\]|<>/]/g, '') : '';
};
//# sourceMappingURL=sanitizedMessage.js.map
