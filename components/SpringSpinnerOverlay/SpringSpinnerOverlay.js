"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringSpinnerOverlay = void 0;
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["loading", "children", "className", "backdrop", "keepMounted"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SpringSpinnerOverlay = exports.SpringSpinnerOverlay = function SpringSpinnerOverlay(_ref) {
  var loading = _ref.loading,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    className = _ref.className,
    _ref$backdrop = _ref.backdrop,
    backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop,
    _ref$keepMounted = _ref.keepMounted,
    keepMounted = _ref$keepMounted === void 0 ? true : _ref$keepMounted,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, loading ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, keepMounted ? children : null, /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: (0, _springUi.twMerge)('flex justify-center items-center fixed h-full w-full top-0 left-0 z-snackbar', className, !backdrop && 'pointer-events-none'),
    "data-sign": "spinnerOverlay"
  }, rest), backdrop ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-neutral-b3/40 h-full w-full absolute left-0 top-0"
  }) : null, /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, null))) : children);
};
//# sourceMappingURL=SpringSpinnerOverlay.js.map
