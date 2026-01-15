"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.function.name.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Badge = function Badge(_ref) {
  var className = _ref.className,
    name = _ref.name,
    children = _ref.children,
    onClick = _ref.onClick,
    dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    title: name,
    className: (0, _clsx["default"])(_styles["default"].root, className),
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
var _default = exports["default"] = Badge;
//# sourceMappingURL=index.js.map
