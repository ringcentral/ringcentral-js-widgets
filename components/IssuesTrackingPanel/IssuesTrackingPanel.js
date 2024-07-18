"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.string.includes");
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n  display: flex;\n  flex-direction: column;\n  gap: ", ";\n  overflow: auto;\n\n  ", " {\n    margin: ", ";\n    width: 100%;\n    justify-content: space-between;\n\n    ", " {\n      margin-right: 0;\n    }\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
var _IssuesTrackingPanel = function _IssuesTrackingPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    downloading = _ref.downloading,
    enabled = _ref.enabled,
    goBack = _ref.goBack,
    toggleEnable = _ref.toggleEnable,
    downloadLog = _ref.downloadLog,
    ConfirmPanelProps = _ref.ConfirmPanelProps,
    rest = _objectWithoutProperties(_ref, ["currentLocale", "downloading", "enabled", "goBack", "toggleEnable", "downloadLog", "ConfirmPanelProps"]);
  var initEnabledRef = (0, _react.useRef)(enabled);
  var downloadDisabled = !initEnabledRef.current || !enabled || downloading;
  (0, _react.useEffect)(function () {
    // if log download failed, the button should be kept enabled.
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
    target: "_blank",
    variant: "inherit"
  }, _i18n["default"].getString('privacyNoticeLink', currentLocale)), _i18n["default"].getString('and', currentLocale), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    href: "https://www.ringcentral.com/legal/privacy-notice.html",
    target: "_blank",
    variant: "inherit"
  }, _i18n["default"].getString('privacyNoticeEnd', currentLocale))))), /*#__PURE__*/_react["default"].createElement(_IssuesTrackingConfirmPanel.IssuesTrackingCloseConfirmPanel, ConfirmPanelProps));
};
var IssuesTrackingPanel = (0, _juno.styled)(_IssuesTrackingPanel)(_templateObject(), (0, _juno.spacing)(4, 5), (0, _juno.spacing)(6), _juno.RcFormControlLabel, (0, _juno.spacing)(-3, 0, -1, 0), _juno.RcSwitch);
exports.IssuesTrackingPanel = IssuesTrackingPanel;
//# sourceMappingURL=IssuesTrackingPanel.js.map
