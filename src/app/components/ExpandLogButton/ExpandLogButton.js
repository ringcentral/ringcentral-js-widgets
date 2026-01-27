"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandLogButton = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["expanded", "onExpand", "color", "size", "iconSize", "variant"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ExpandLogButton = exports.ExpandLogButton = function ExpandLogButton(_ref) {
  var expanded = _ref.expanded,
    onExpand = _ref.onExpand,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? 'secondary' : _ref$color,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    _ref$iconSize = _ref.iconSize,
    iconSize = _ref$iconSize === void 0 ? 'medium' : _ref$iconSize,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'icon' : _ref$variant,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, _extends({
    "data-sign": "expand-log",
    "data-expanded": expanded ? 'folded' : 'unfolded',
    symbol: expanded ? _springIcon.CollapseLeftMd : _springIcon.CollapseRightMd,
    color: color,
    size: size,
    iconSize: iconSize,
    variant: variant,
    onClick: onExpand,
    TooltipProps: {
      title: t(expanded ? 'hideCallLog' : 'viewCallLog')
    }
  }, rest));
};
//# sourceMappingURL=ExpandLogButton.js.map
