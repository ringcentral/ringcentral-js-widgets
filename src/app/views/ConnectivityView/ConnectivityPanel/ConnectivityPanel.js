"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityPanel = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["mode", "loading", "onClick", "retry"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ConnectivityPanel = exports.ConnectivityPanel = function ConnectivityPanel(_ref) {
  var mode = _ref.mode,
    loading = _ref.loading,
    onClick = _ref.onClick,
    retry = _ref.retry,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  if (!mode) return null;
  return /*#__PURE__*/_react["default"].createElement(_springUi.Announcement, _extends({
    severity: "error",
    className: "rounded-none",
    classes: {
      body: 'gap-2'
    },
    "data-sign": "ConnectivityBadge",
    action: loading ? /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
      title: t('connecting'),
      color: "danger",
      size: "small"
    }) : retry ? /*#__PURE__*/_react["default"].createElement("button", {
      className: "typography-subtitleMini hover:underline active:opacity-80",
      onClick: onClick,
      "data-sign": "ConnectivityBadgeRefresh"
    }, t('refresh')) : null
  }, rest), t(mode));
};
//# sourceMappingURL=ConnectivityPanel.js.map
