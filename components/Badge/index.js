"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Badge = function Badge(_ref) {
  var className = _ref.className,
    name = _ref.name,
    children = _ref.children,
    onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("div", {
    title: name,
    className: (0, _classnames["default"])(_styles["default"].root, className),
    onClick: onClick
  }, children);
};
Badge.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  name: null,
  onClick: function onClick() {
    return null;
  }
};
var _default = Badge;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
