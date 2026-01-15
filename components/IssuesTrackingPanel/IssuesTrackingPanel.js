"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IssuesTrackingPanel = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _PageHeader = require("../BackHeader/PageHeader");
var _Tooltip = require("../Rcui/Tooltip");
var _IssuesTrackingConfirmPanel = require("./IssuesTrackingConfirmPanel");
var _i18n = _interopRequireDefault(require("./i18n"));
var _templateObject;
var _excluded = ["currentLocale", "downloading", "enabled", "goBack", "toggleEnable", "downloadLog", "ConfirmPanelProps"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _IssuesTrackingPanel = function _IssuesTrackingPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    downloading = _ref.downloading,
    enabled = _ref.enabled,
    goBack = _ref.goBack,
    toggleEnable = _ref.toggleEnable,
    downloadLog = _ref.downloadLog,
    ConfirmPanelProps = _ref.ConfirmPanelProps,
    rest = _objectWithoutProperties(_ref, _excluded);
  var initEnabledRef = (0, _react.useRef)(enabled);
  var downloadDisabled = !initEnabledRef.current || !enabled || downloading;
  (0, _react.useEffect)(function () {
    // the behavior is make user need enter page again to enable
    // so when become not enable, set the first time enable to false
    if (!enabled) {
      initEnabledRef.current = false;
    }
  }, [enabled]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
    onClick: function onClick() {
      return goBack();
    }
  }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, _i18n["default"].getString('header', currentLocale)), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement("main", rest, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcSwitch, {
    "data-sign": "issuesTrackingSwitch",
    formControlLabelProps: {
      labelPlacement: 'start'
    },
    checked: enabled,
    onChange: function onChange(_, checked) {
      return toggleEnable(checked);
    },
    label: /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      color: "action.grayDark",
      weight: "bold"
    }, _i18n["default"].getString('toggleTitle', currentLocale))
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    color: "action.grayDark"
  }, _i18n["default"].getString('toggleDescription', currentLocale))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    color: "action.grayDark",
    weight: "bold",
    paragraph: true
  }, _i18n["default"].getString('downloadTitle', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    "data-sign": "downloadButtonTooltip",
    title: enabled ? _i18n["default"].getString('needLeavePage', currentLocale) : _i18n["default"].getString('downloadDisabledTitle', currentLocale),
    tooltipForceHide: !downloadDisabled || downloading
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    fullWidth: true,
    "data-sign": "downloadButton",
    disabled: downloadDisabled,
    variant: downloadDisabled ? 'outlined' : 'contained',
    radius: "round",
    onClick: downloadLog
  }, _i18n["default"].getString(downloading ? 'downloading' : 'downloadButton', currentLocale))))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    color: "action.grayDark",
    weight: "bold"
  }, _i18n["default"].getString('sendTitle', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    color: "action.grayDark",
    paragraph: true,
    "data-sign": "createSupportTicketDesc"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    href: "https://support.ringcentral.com/new-case.html",
    target: "_blank",
    variant: "inherit"
  }, _i18n["default"].getString('createSupportTicket', currentLocale)), _i18n["default"].getString('sendDescription', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    color: "neutral.f03",
    variant: "caption1",
    "data-sign": "privacyNoticeDesc"
  }, _i18n["default"].getString('privacyNotice', currentLocale), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    href: "https://www.ringcentral.com/legal/last-update-september-1-2023/eulatos.html",
    "data-sign": "privacyNoticeLink",
    target: "_blank",
    variant: "inherit"
  }, _i18n["default"].getString('privacyNoticeLink', currentLocale)), _i18n["default"].getString('and', currentLocale), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    href: "https://www.ringcentral.com/legal/privacy-notice.html",
    "data-sign": "privacyNoticeEnd",
    target: "_blank",
    variant: "inherit"
  }, _i18n["default"].getString('privacyNoticeEnd', currentLocale))))), /*#__PURE__*/_react["default"].createElement(_IssuesTrackingConfirmPanel.IssuesTrackingCloseConfirmPanel, ConfirmPanelProps));
};
var IssuesTrackingPanel = exports.IssuesTrackingPanel = (0, _juno.styled)(_IssuesTrackingPanel)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: ", ";\n  display: flex;\n  flex-direction: column;\n  gap: ", ";\n  overflow: auto;\n\n  ", " {\n    margin: ", ";\n    width: 100%;\n    justify-content: space-between;\n\n    ", " {\n      margin-right: 0;\n    }\n  }\n"])), (0, _juno.spacing)(4, 5), (0, _juno.spacing)(6), _juno.RcFormControlLabel, (0, _juno.spacing)(-3, 0, -1, 0), _juno.RcSwitch);
//# sourceMappingURL=IssuesTrackingPanel.js.map
