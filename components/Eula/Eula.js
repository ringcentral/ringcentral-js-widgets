"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Eula = void 0;
require("core-js/modules/es.string.link.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["className", "link", "onClick", "label", "useShortLabel"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Eula = exports.Eula = function Eula(_ref) {
  var className = _ref.className,
    _ref$link = _ref.link,
    link = _ref$link === void 0 ? 'https://www.ringcentral.com/legal/eulatos.html' : _ref$link,
    _onClick = _ref.onClick,
    label = _ref.label,
    useShortLabel = _ref.useShortLabel,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_springUi.Link, _extends({
    color: "text-primary-b",
    className: className,
    href: link,
    rel: "noopener noreferrer",
    target: "_blank",
    onClick: function onClick(e) {
      return _onClick === null || _onClick === void 0 ? void 0 : _onClick(e, link);
    }
  }, rest), label !== null && label !== void 0 ? label : t(useShortLabel ? 'eulaAbbr' : 'eula'));
};
//# sourceMappingURL=Eula.js.map
