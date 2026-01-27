"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubjectRender = void 0;
var _linkifyReact = _interopRequireDefault(require("linkify-react"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Component for rendering subject text with active links.
 * Uses Linkify to convert URLs in text to clickable links.
 *
 * @component
 * @param {object} props - Component props
 * @param {Function} [props.onLinkClick] - Optional callback function triggered when a link is clicked
 * @param {React.ReactNode} props.children - Content to be rendered with active links
 * @returns {React.ReactElement} A component with linkified content
 */
var SubjectRender = exports.SubjectRender = function SubjectRender(_ref) {
  var onLinkClick = _ref.onLinkClick,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_linkifyReact["default"], {
    options: {
      target: '_blank',
      className: 'underline',
      attributes: {
        onClick: onLinkClick ? function (event) {
          var _event$target;
          var href = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.href;
          onLinkClick(href);
        } : undefined
      }
    }
  }, children);
};
//# sourceMappingURL=SubjectRender.js.map
