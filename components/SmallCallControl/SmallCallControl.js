"use strict";

require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallCallControl = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _components = require("./components");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var SmallCallControl = function SmallCallControl(_ref) {
  var classes = _ref.classes,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, ["classes", "children"]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, classes === null || classes === void 0 ? void 0 : classes.root),
    "data-sign": "smallCallControl"
  }, children || /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.MuteCallButton, rest), /*#__PURE__*/_react["default"].createElement(_components.TransferCallButton, rest), /*#__PURE__*/_react["default"].createElement(_components.HoldCallButton, rest), /*#__PURE__*/_react["default"].createElement(_components.HangUpButton, rest)));
};
exports.SmallCallControl = SmallCallControl;
//# sourceMappingURL=SmallCallControl.js.map
