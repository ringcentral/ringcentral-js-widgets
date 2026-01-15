"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubjectRender = void 0;
var _linkifyReact = _interopRequireDefault(require("linkify-react"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SubjectRender = exports.SubjectRender = function SubjectRender(_ref) {
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
//# sourceMappingURL=SubjectRender.js.map
