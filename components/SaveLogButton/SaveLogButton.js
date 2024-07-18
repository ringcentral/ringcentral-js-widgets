"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _CountdownTimer = require("../CountdownTimer");
var _getButtonStatus2 = require("./getButtonStatus");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SaveLogButton = function SaveLogButton(_ref) {
  var onSaveCallLog = _ref.onSaveCallLog,
    currentLocale = _ref.currentLocale,
    currentLog = _ref.currentLog,
    loading = _ref.loading,
    isWide = _ref.isWide,
    disabled = _ref.disabled,
    currentDelaySavingState = _ref.currentDelaySavingState;
  var _getButtonStatus = (0, _getButtonStatus2.getButtonStatus)(
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    currentLog.currentLogCall),
    buttonDisabled = _getButtonStatus.buttonDisabled,
    buttonContent = _getButtonStatus.buttonContent;
  var getContent = function getContent(buttonContent) {
    return /*#__PURE__*/_react["default"].createElement("span", null, buttonContent === 'saved' && /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      color: "interactive.f01",
      symbol: _junoIcon.Check,
      size: "small"
    }), buttonContent === 'saving' && /*#__PURE__*/_react["default"].createElement(_juno.RcCircularProgress, {
      size: 20
    }), buttonContent === 'save' && _i18n["default"].getString('save', currentLocale));
  };
  var content = getContent(buttonContent);
  var SaveButton = /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    className: (0, _clsx["default"])(_styles["default"].button, !isWide && _styles["default"].classic),
    variant: "text",
    size: "medium",
    disabled: buttonDisabled || loading || disabled,
    "data-sign": "saveCall",
    "data-state": buttonContent
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    ,
    onClick: function onClick() {
      return onSaveCallLog(currentLog.call);
    }
  }, content);
  if (currentDelaySavingState) {
    return /*#__PURE__*/_react["default"].createElement(_CountdownTimer.CountdownTimer, {
      variant: "tooltip",
      creationTime: currentDelaySavingState.delayUpdatingStartTime,
      duration: currentDelaySavingState.delayUpdatingMinutes,
      currentLocale: currentLocale
    }, SaveButton);
  }
  return SaveButton;
};
SaveLogButton.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'object | un... Remove this comment to see the full error message
  currentLog: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  currentLocale: null,
  onSaveCallLog: function onSaveCallLog() {},
  loading: false,
  isWide: true,
  disabled: false
};
var _default = SaveLogButton;
exports["default"] = _default;
//# sourceMappingURL=SaveLogButton.js.map
