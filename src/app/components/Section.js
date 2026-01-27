"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Section = void 0;
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["label", "tag", "children", "classes", "info", "headerEndAdornment"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Section = exports.Section = function Section(_ref) {
  var label = _ref.label,
    tag = _ref.tag,
    children = _ref.children,
    classes = _ref.classes,
    info = _ref.info,
    headerEndAdornment = _ref.headerEndAdornment,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement("div", rest, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-1 mb-1"
  }, label && /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "typography-descriptorMini text-neutral-b0",
    component: "p",
    title: label
  }, label), tag && /*#__PURE__*/_react["default"].createElement(_springUi.Tag, {
    color: "neutral",
    variant: "inverted"
  }, tag), info && /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    title: info
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    "data-sign": "call-log-info-icon",
    symbol: _springIcon.InfoMd,
    size: "small",
    color: "neutral",
    variant: "icon"
  })), headerEndAdornment), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('rounded-lg overflow-hidden bg-neutral-b5/90 [&>*:nth-child(1)>[data-divider]]:hidden', classes === null || classes === void 0 ? void 0 : classes.content)
  }, children));
};
//# sourceMappingURL=Section.js.map
