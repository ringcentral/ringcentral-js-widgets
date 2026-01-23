"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;
var _Tooltip = require("@ringcentral/juno/es6/components/Tooltip/Tooltip.js");
var _react = _interopRequireDefault(require("react"));
var _styles = require("./styles");
var _excluded = ["children", "title", "size"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Tooltip = exports.Tooltip = function Tooltip(_ref) {
  var children = _ref.children,
    title = _ref.title,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    rest = _objectWithoutProperties(_ref, _excluded);
  if (!title) return children;
  return /*#__PURE__*/_react["default"].createElement(_Tooltip.RcTooltip, _extends({
    size: size,
    title: /*#__PURE__*/_react["default"].createElement(_styles.StyledTitle, null, title)
  }, rest), children);
};
//# sourceMappingURL=Tooltip.js.map
