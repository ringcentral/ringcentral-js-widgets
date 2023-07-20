"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubjectRender = void 0;
var _react = _interopRequireDefault(require("react"));
var _linkifyReact = _interopRequireDefault(require("linkify-react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SubjectRender = function SubjectRender(_ref) {
  var subject = _ref.subject,
    onLinkClick = _ref.onLinkClick;
  return /*#__PURE__*/_react["default"].createElement(_linkifyReact["default"], {
    options: {
      target: '_blank',
      attributes: {
        onClick: function onClick(event) {
          var _event$target;
          var href = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.href;
          onLinkClick(href);
        }
      }
    }
  }, subject);
};
exports.SubjectRender = SubjectRender;
//# sourceMappingURL=SubjectRender.js.map
