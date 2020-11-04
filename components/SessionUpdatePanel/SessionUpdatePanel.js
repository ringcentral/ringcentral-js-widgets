"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionUpdatePanel = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

var _BasicSessionPanel = require("../BasicSessionPanel");

var _SelectList = require("../SelectList");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SessionUpdatePanel = function SessionUpdatePanel(_ref) {
  var currentLocale = _ref.currentLocale,
      goToSettingsPageWhetherSessionChanged = _ref.goToSettingsPageWhetherSessionChanged,
      onSaveUpdate = _ref.onSaveUpdate,
      rest = _objectWithoutProperties(_ref, ["currentLocale", "goToSettingsPageWhetherSessionChanged", "onSaveUpdate"]);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_SelectList.BackHeader, {
    currentLocale: currentLocale,
    title: _i18n["default"].getString('editSession', currentLocale),
    onBackClick: goToSettingsPageWhetherSessionChanged
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement(_BasicSessionPanel.BasicSessionPanel, _extends({}, rest, {
    currentLocale: currentLocale,
    classes: {
      root: _styles["default"].basicSessionPanel
    }
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "saveUpdate",
    fullWidth: true,
    size: "medium",
    onClick: onSaveUpdate,
    classes: {
      root: _styles["default"].saveUpdateButton
    }
  }, _i18n["default"].getString('saveUpdate', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "cancel",
    fullWidth: true,
    size: "medium",
    onClick: goToSettingsPageWhetherSessionChanged,
    variant: "outlined"
  }, _i18n["default"].getString('cancel', currentLocale))));
};

exports.SessionUpdatePanel = SessionUpdatePanel;
//# sourceMappingURL=SessionUpdatePanel.js.map
