"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SanitizeHtml = void 0;
var _linkifyHtml = _interopRequireDefault(require("linkify-html"));
var _react = _interopRequireDefault(require("react"));
var _useSanitizeHtml = require("./useSanitizeHtml");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DEFAULT_LINKIFY_OPTIONS = {
  target: '_blank',
  rel: 'noopener noreferrer'
};

/**
 * Component that safely renders text or sanitized HTML content.
 * Uses memoization internally to optimize performance.
 */
var SanitizeHtml = exports.SanitizeHtml = function SanitizeHtml(_ref) {
  var content = _ref.content,
    linkifyOptions = _ref.linkifyOptions;
  var sanitizedContent = (0, _useSanitizeHtml.useSanitizeHtml)(content);
  if (!sanitizedContent) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: "whitespace-pre-wrap break-words [&_a]:sui-link [&_a]:sui-link-root [&_a]:sui-link-primary [&_a]:sui-link-always",
    dangerouslySetInnerHTML: {
      __html: (0, _linkifyHtml["default"])(sanitizedContent, linkifyOptions !== null && linkifyOptions !== void 0 ? linkifyOptions : DEFAULT_LINKIFY_OPTIONS)
    }
  });
};
//# sourceMappingURL=SanitizeHtml.js.map
