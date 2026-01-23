"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSanitizeHtml = useSanitizeHtml;
var _react = require("react");
var _utils = require("./utils");
/**
 * Hook to sanitize and memoize HTML content.
 * Returns a React node that safely renders plain text or sanitized HTML.
 *
 * @param content - The text or HTML content to sanitize and render
 * @returns Memoized React node with either plain text or sanitized HTML
 */
function useSanitizeHtml(content) {
  return (0, _react.useMemo)(function () {
    if (!content) {
      return null;
    }
    var sanitized = (0, _utils.sanitizeHtml)(content);
    return sanitized;
  }, [content]);
}
//# sourceMappingURL=useSanitizeHtml.js.map
