"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionConfigPanel = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

var _ArrowLeft = _interopRequireDefault(require("@ringcentral/juno/icon/ArrowLeft2"));

var _classnames = _interopRequireDefault(require("classnames"));

var _EvLoginHeader = require("../EvLoginHeader");

var _BasicSessionPanel = require("../BasicSessionPanel");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SessionConfigPanel = function SessionConfigPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      setConfigure = _ref.setConfigure,
      isLoading = _ref.isLoading,
      onAccountReChoose = _ref.onAccountReChoose,
      selectedAgent = _ref.selectedAgent,
      showReChooseAccount = _ref.showReChooseAccount,
      rest = _objectWithoutProperties(_ref, ["currentLocale", "setConfigure", "isLoading", "onAccountReChoose", "selectedAgent", "showReChooseAccount"]);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_EvLoginHeader.EvLoginHeader, {
    wrapperStyle: _styles["default"].wrapperStyle,
    svgStyle: _styles["default"].svgStyle
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].goBackBg, !showReChooseAccount && _styles["default"].hideGoBack)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: onAccountReChoose,
    className: _styles["default"].goBack
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    className: _styles["default"].back,
    variant: "round",
    size: "medium",
    symbol: _ArrowLeft["default"],
    color: "primary",
    "data-sign": "reChooseAccountButton"
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "body1",
    className: _styles["default"].backText
  }, _i18n["default"].getString('switchAccount', currentLocale)))), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "accountInfo",
    className: _styles["default"].accountInfo
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "body1",
    className: _styles["default"].accountName
  }, selectedAgent === null || selectedAgent === void 0 ? void 0 : selectedAgent.accountName), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "caption1",
    className: _styles["default"].agentType,
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
