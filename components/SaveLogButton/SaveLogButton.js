"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SaveLogButton;

var _rcui = require("@ringcentral-integration/rcui");

var _iconCheck = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-check.svg"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _getButtonStatus2 = require("./getButtonStatus");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function SaveLogButton(_ref) {
  var onSaveCallLog = _ref.onSaveCallLog,
      currentLocale = _ref.currentLocale,
      currentLog = _ref.currentLog,
      loading = _ref.loading,
      isWide = _ref.isWide;

  var _getButtonStatus = (0, _getButtonStatus2.getButtonStatus)(currentLog.currentLogCall),
      buttonDisabled = _getButtonStatus.buttonDisabled,
      buttonContent = _getButtonStatus.buttonContent;

  var getContent = function getContent(buttonContent) {
    return /*#__PURE__*/_react["default"].createElement("span", null, buttonContent === 'saved' && /*#__PURE__*/_react["default"].createElement(_rcui.RcIcon, {
      color: ['primary', 'main'],
      symbol: _iconCheck["default"],
      size: "small"
    }), buttonContent === 'saving' && /*#__PURE__*/_react["default"].createElement(_rcui.RcCircularProgress, {
      size: 20
    }), buttonContent === 'save' && _i18n["default"].getString('save', currentLocale));
  };

  var content = getContent(buttonContent);
  return /*#__PURE__*/_react["default"].createElement(_rcui.RcButton, {
    className: (0, _classnames["default"])(_styles["default"].button, !isWide && _styles["default"].classic),
    variant: "text",
    size: "medium",
    disabled: buttonDisabled || loading,
    "data-sign": "saveCall",
    "data-state": buttonContent,
    onClick: function onClick() {
      return onSaveCallLog(currentLog.call);
    }
  }, content);
}

SaveLogButton.propTypes = {
  currentLog: _propTypes["default"].object,
  currentLocale: _propTypes["default"].string,
  onSaveCallLog: _propTypes["default"].func,
  loading: _propTypes["default"].bool,
  isWide: _propTypes["default"].bool
};
SaveLogButton.defaultProps = {
  currentLog: null,
  currentLocale: null,
  onSaveCallLog: function onSaveCallLog() {},
  loading: false,
  isWide: true
};
//# sourceMappingURL=SaveLogButton.js.map
