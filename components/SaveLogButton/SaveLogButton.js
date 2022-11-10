"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _getButtonStatus2 = require("./getButtonStatus");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SaveLogButton = function SaveLogButton(_ref) {
  var onSaveCallLog = _ref.onSaveCallLog,
      currentLocale = _ref.currentLocale,
      currentLog = _ref.currentLog,
      loading = _ref.loading,
      isWide = _ref.isWide,
      disabled = _ref.disabled;

  var _getButtonStatus = (0, _getButtonStatus2.getButtonStatus)(currentLog.currentLogCall),
      buttonDisabled = _getButtonStatus.buttonDisabled,
      buttonContent = _getButtonStatus.buttonContent;

  var getContent = function getContent(buttonContent) {
    return /*#__PURE__*/_react["default"].createElement("span", null, buttonContent === 'saved' && /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      color: "interactive.f01",
      symbol: _icon.Check,
      size: "small"
    }), buttonContent === 'saving' && /*#__PURE__*/_react["default"].createElement(_juno.RcCircularProgress, {
      size: 20
    }), buttonContent === 'save' && _i18n["default"].getString('save', currentLocale));
  };

  var content = getContent(buttonContent);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    className: (0, _classnames["default"])(_styles["default"].button, !isWide && _styles["default"].classic),
    variant: "text",
    size: "medium",
    disabled: buttonDisabled || loading || disabled,
    "data-sign": "saveCall",
    "data-state": buttonContent,
    onClick: function onClick() {
      return onSaveCallLog(currentLog.call);
    }
  }, content);
};

SaveLogButton.defaultProps = {
  currentLog: null,
  currentLocale: null,
  onSaveCallLog: function onSaveCallLog() {},
  loading: false,
  isWide: true,
  disabled: false
};
var _default = SaveLogButton;
exports["default"] = _default;
//# sourceMappingURL=SaveLogButton.js.map
