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
      rest = _objectWithoutProperties(_ref, ["currentLocale", "setConfigure", "isLoading"]);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_EvLoginHeader.EvLoginHeader, {
    wrapperStyle: _styles["default"].wrapperStyle,
    svgStyle: _styles["default"].svgStyle
  }), /*#__PURE__*/_react["default"].createElement(_BasicSessionPanel.BasicSessionPanel, _extends({}, rest, {
    currentLocale: currentLocale
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "setConfigure",
    fullWidth: true,
    disabled: isLoading,
    loading: isLoading,
    size: "medium",
    onClick: setConfigure,
    classes: {
      root: _styles["default"].button
    }
  }, _i18n["default"].getString('continue', currentLocale)));
};

exports.SessionConfigPanel = SessionConfigPanel;
//# sourceMappingURL=SessionConfigPanel.js.map
