"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _Button = require("../Button");
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _LogBasicInfo = _interopRequireDefault(require("../LogBasicInfo"));
var _i18n = _interopRequireDefault(require("../SmCallControl/i18n"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LogNotification = function LogNotification(_ref) {
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
      // @ts-expect-error TS(2339): Property 'callStatus' does not exist on type '{}'.
      var callStatus = currentSession.callStatus,
        direction = currentSession.direction;
      var isInComingCall = _callDirections["default"].inbound === direction && _telephonyStatus["default"].ringing === callStatus;
      var endTitle = isInComingCall ? 'reject' : 'hangup';
      var endAction = isInComingCall ? onReject : onHangup;
      endButton = /*#__PURE__*/_react["default"].createElement("span", {
        title: _i18n["default"].getString(endTitle, currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        dataSign: endTitle,
        showBorder: false,
        icon: _End["default"],
        onClick: endAction,
        className: (0, _clsx2["default"])(_defineProperty(_defineProperty(_defineProperty({}, _styles["default"].hangup, true), _styles["default"].endButton, true), _styles["default"].buttonDisabled, disableLinks)),
        disabled: disableLinks
      }));
    }
    extraButtons = /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].extraButtonBox
    }, endButton, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      tooltip: _i18n2["default"].getString('log', currentLocale),
      disabled: isExpand,
      className: (0, _clsx2["default"])(_styles["default"].expandButtonWithEnd, isExpand && _styles["default"].expandDisableButton)
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      ,
      onClick: function onClick() {
        return onExpand();
      },
      dataSign: "expandNotification"
    }, _i18n2["default"].getString('log', currentLocale)));
  } else if (showLogButton) {
    extraButtons = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      disabled: isExpand,
      className: (0, _clsx2["default"])(_styles["default"].expandButton, isExpand && _styles["default"].expandDisableButton)
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      ,
      onClick: function onClick() {
        return onExpand();
      }
    }, _i18n2["default"].getString('log', currentLocale));
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
    className: _styles["default"].confirmationInfo,
    "data-sign": 'confirmationInfo'
  }, _i18n2["default"].getString('confirmationInfo', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].confirmationButtons
  }, onSave ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    tooltip: _i18n2["default"].getString('save', currentLocale),
    dataSign: "saveAndWorkOnNew",
    className: (0, _clsx2["default"])(_styles["default"].saveButton, _styles["default"].selected),
    onClick: function onClick() {
      return onSave();
    }
  }, _i18n2["default"].getString('save', currentLocale)) : null, onDiscard ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    tooltip: _i18n2["default"].getString('discard', currentLocale),
    className: _styles["default"].discardButton,
    dataSign: "discardAndWorkOnNew",
    onClick: function onClick() {
      return onDiscard();
    }
  }, _i18n2["default"].getString('discard', currentLocale)) : null, onStay ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    tooltip: _i18n2["default"].getString('stay', currentLocale),
    className: _styles["default"].stayButton,
    onClick: function onClick() {
      return onStay();
    },
    dataSign: "stayOnPreviousWork"
  }, _i18n2["default"].getString('stay', currentLocale)) : null)) : null);
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
var _default = exports["default"] = LogNotification;
//# sourceMappingURL=index.js.map
