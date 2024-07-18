"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionConfigPanel = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _BasicSessionPanel = require("../BasicSessionPanel");
var _EvLoginHeader = require("../EvLoginHeader");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n\n  visibility: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledGoBackBack = _juno.styled.div(_templateObject(), (0, _juno.palette2)('neutral', 'b03'), function (_ref) {
  var show = _ref.show;
  return !show && 'hidden';
});
var SessionConfigPanel = function SessionConfigPanel(_ref2) {
  var currentLocale = _ref2.currentLocale,
    setConfigure = _ref2.setConfigure,
    isLoading = _ref2.isLoading,
    onAccountReChoose = _ref2.onAccountReChoose,
    selectedAgent = _ref2.selectedAgent,
    showReChooseAccount = _ref2.showReChooseAccount,
    rest = _objectWithoutProperties(_ref2, ["currentLocale", "setConfigure", "isLoading", "onAccountReChoose", "selectedAgent", "showReChooseAccount"]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_EvLoginHeader.EvLoginHeader, {
    wrapperStyle: _styles["default"].wrapperStyle,
    svgStyle: _styles["default"].svgStyle
  }), /*#__PURE__*/_react["default"].createElement(StyledGoBackBack, {
    show: showReChooseAccount
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: onAccountReChoose,
    className: _styles["default"].goBack
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    className: _styles["default"].back,
    variant: "round",
    size: "medium",
    symbol: _junoIcon.ArrowLeft2,
    color: "interactive.b02",
    "data-sign": "reChooseAccountButton"
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "body1",
    color: "interactive.f01"
  }, _i18n["default"].getString('switchAccount', currentLocale)))), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "accountInfo",
    className: _styles["default"].accountInfo
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    color: "neutral.f06",
    variant: "body1"
  }, selectedAgent === null || selectedAgent === void 0 ? void 0 : selectedAgent.accountName), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "caption1",
    color: "neutral.f04",
    "data-sign": "agentType"
  }, _i18n["default"].getString(selectedAgent === null || selectedAgent === void 0 ? void 0 : selectedAgent.agentType, currentLocale))), /*#__PURE__*/_react["default"].createElement(_BasicSessionPanel.BasicSessionPanel, _extends({
    classes: {
      root: _styles["default"].basicSession
    }
  }, rest, {
    currentLocale: currentLocale
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "setConfigure",
    fullWidth: true,
    disabled: isLoading,
    loading: isLoading,
    size: "medium",
    onClick: setConfigure,
    classes: {
      root: _styles["default"].configureButton
    }
  }, _i18n["default"].getString('continue', currentLocale)));
};
exports.SessionConfigPanel = SessionConfigPanel;
//# sourceMappingURL=SessionConfigPanel.js.map
