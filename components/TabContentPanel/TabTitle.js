"use strict";

require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabTitle = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var TabTitle = function TabTitle(_ref) {
  var label = _ref.label,
    isActive = _ref.isActive,
    rest = _objectWithoutProperties(_ref, ["label", "isActive"]);
  return /*#__PURE__*/_react["default"].createElement("span", _extends({}, rest, {
    className: (0, _clsx["default"])(_styles["default"].tabTitle, isActive() ? _styles["default"].active : null)
  }), label);
};
exports.TabTitle = TabTitle;
//# sourceMappingURL=TabTitle.js.map
