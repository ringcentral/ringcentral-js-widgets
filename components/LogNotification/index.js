"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LogNotification;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Button = require("../Button");

var _LogBasicInfo = _interopRequireDefault(require("../LogBasicInfo"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _i18n2 = _interopRequireDefault(require("../SmCallControl/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function LogNotification(_ref) {
  var formatPhone = _ref.formatPhone,
      currentLog = _ref.currentLog,
      currentLocale = _ref.currentLocale,
      showLogButton = _ref.showLogButton,
      isExpand = _ref.isExpand,
      onStay = _ref.onStay,
      onDiscard = _ref.onDiscard,
      onSave = _ref.onSave,
      onExpand = _ref.onExpand,
      currentSession = _ref.currentSession,
      onReject = _ref.onReject,
      onHangup = _ref.onHangup,
      showEndButton = _ref.showEndButton,
      disableLinks = _ref.disableLinks;
  var extraButtons = null;

  if (showEndButton && showLogButton) {
    var endButton = null;

    if (currentSession) {
      var _classnames;

      var callStatus = currentSession.callStatus,
          direction = currentSession.direction;
      var isInComingCall = _callDirections["default"].inbound === direction && _telephonyStatus["default"].ringing === callStatus;
      var endTitle = isInComingCall ? 'reject' : 'hangup';
      var endAction = isInComingCall ? onReject : onHangup;
      endButton = /*#__PURE__*/_react["default"].createElement("span", {
        title: _i18n2["default"].getString(endTitle, currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        dataSign: endTitle,
        showBorder: false,
        icon: _End["default"],
        onClick: endAction,
        className: (0, _classnames2["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].hangup, true), _defineProperty(_classnames, _styles["default"].endButton, true), _defineProperty(_classnames, _styles["default"].buttonDisabled, disableLinks), _classnames)),
        disabled: disableLinks
      }));
    }

    extraButtons = /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].extraButtonBox
    }, endButton, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      tooltip: _i18n["default"].getString('log', currentLocale),
      disabled: isExpand,
      className: (0, _classnames2["default"])(_styles["default"].expandButtonWithEnd, isExpand && _styles["default"].expandDisableButton),
      onClick: function onClick() {
        return onExpand();
      }
    }, _i18n["default"].getString('log', currentLocale)));
  } else if (showLogButton) {
    extraButtons = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      disabled: isExpand,
      className: (0, _classnames2["default"])(_styles["default"].expandButton, isExpand && _styles["default"].expandDisableButton),
      onClick: function onClick() {
        return onExpand();
      }
    }, _i18n["default"].getString('log', currentLocale));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].basicInfo
  }, /*#__PURE__*/_react["default"].createElement(_LogBasicInfo["default"], {
    currentLog: currentLog,
    currentLocale: currentLocale,
    formatPhone: formatPhone
  }), extraButtons), isExpand ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].confirmationContainer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].confirmationInfo
  }, _i18n["default"].getString('confirmationInfo', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].confirmationButtons
  }, onSave ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    tooltip: _i18n["default"].getString('save', currentLocale),
    className: (0, _classnames2["default"])(_styles["default"].saveButton, _styles["default"].selected),
    onClick: function onClick() {
      return onSave();
    }
  }, _i18n["default"].getString('save', currentLocale)) : null, onDiscard ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    tooltip: _i18n["default"].getString('discard', currentLocale),
    className: _styles["default"].discardButton,
    onClick: function onClick() {
      return onDiscard();
    }
  }, _i18n["default"].getString('discard', currentLocale)) : null, onStay ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    tooltip: _i18n["default"].getString('stay', currentLocale),
    className: _styles["default"].stayButton,
    onClick: function onClick() {
      return onStay();
    }
  }, _i18n["default"].getString('stay', currentLocale)) : null)) : null);
}

LogNotification.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  showLogButton: _propTypes["default"].bool,
  currentLog: _propTypes["default"].object,
  formatPhone: _propTypes["default"].func,
  isExpand: _propTypes["default"].bool,
  onStay: _propTypes["default"].func,
  onDiscard: _propTypes["default"].func,
  onSave: _propTypes["default"].func,
  onExpand: _propTypes["default"].func,
  currentSession: _propTypes["default"].object,
  onReject: _propTypes["default"].func,
  onHangup: _propTypes["default"].func,
  showEndButton: _propTypes["default"].bool,
  disableLinks: _propTypes["default"].bool
};
LogNotification.defaultProps = {
  showLogButton: true,
  currentLog: {},
  formatPhone: undefined,
  isExpand: undefined,
  onStay: undefined,
  onDiscard: undefined,
  onSave: undefined,
  onExpand: undefined,
  currentSession: undefined,
  onReject: function onReject() {
    return null;
  },
  onHangup: function onHangup() {
    return null;
  },
  showEndButton: false,
  disableLinks: false
};
//# sourceMappingURL=index.js.map
