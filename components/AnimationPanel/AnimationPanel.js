"use strict";

require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationPanel = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var AnimationPanel = function AnimationPanel(_ref) {
  var children = _ref.children,
    className = _ref.className,
    open = _ref.open,
    style = _ref.style,
    rest = _objectWithoutProperties(_ref, ["children", "className", "open", "style"]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, open ? _styles["default"].active : null, className),
    style: style,
    "data-sign": rest['data-sign']
  }, children);
};
exports.AnimationPanel = AnimationPanel;
//# sourceMappingURL=AnimationPanel.js.map
