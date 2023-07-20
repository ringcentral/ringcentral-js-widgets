"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionConfigPanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _BasicSessionPanel = require("../BasicSessionPanel");
var _EvLoginHeader = require("../EvLoginHeader");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n\n  visibility: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
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
