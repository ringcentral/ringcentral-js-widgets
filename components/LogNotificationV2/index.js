"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _juno = require("@ringcentral/juno");
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _Hangup = _interopRequireDefault(require("../../assets/images/Hangup.svg"));
var _LogClick = _interopRequireDefault(require("../../assets/images/LogClick.svg"));
var _LogUnclick = _interopRequireDefault(require("../../assets/images/LogUnclick.svg"));
var _VoicemailRed = _interopRequireDefault(require("../../assets/images/VoicemailRed.svg"));
var _Button = require("../Button");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _callIconMap;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var viewport = document.querySelector('div#viewport');
var CallIcon = function CallIcon(_ref) {
  var title = _ref.title,
    iconClassName = _ref.iconClassName;
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _classnames["default"])(iconClassName, _styles["default"].iconSize),
    title: title
  });
};
CallIcon.propTypes = {
  title: _propTypes["default"].string,
  iconClassName: _propTypes["default"].string.isRequired
};
CallIcon.defaultProps = {
  title: ''
};
var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _defineProperty(_callIconMap, _callDirections["default"].outbound, _DynamicsFont["default"].outbound), _callIconMap);
var LogNotification = function LogNotification(_ref2) {
  var formatPhone = _ref2.formatPhone,
    currentLog = _ref2.currentLog,
    currentLocale = _ref2.currentLocale,
    showLogButton = _ref2.showLogButton,
    isExpand = _ref2.isExpand,
    onDiscard = _ref2.onDiscard,
    onSave = _ref2.onSave,
    onExpand = _ref2.onExpand,
    currentSession = _ref2.currentSession,
    onReject = _ref2.onReject,
    onHangup = _ref2.onHangup,
    _ref2$showEndButton = _ref2.showEndButton,
    showEndButton = _ref2$showEndButton === void 0 ? true : _ref2$showEndButton,
    shrinkNotification = _ref2.shrinkNotification;
  var anchorEl = _react["default"].useRef(null);
  var renderEndButton = showEndButton && currentSession ? function () {
    var callStatus = currentSession.callStatus,
      direction = currentSession.direction;
    var isInComingCall = _callDirections["default"].inbound === direction && _telephonyStatus["default"].ringing === callStatus;
    var endTitle = isInComingCall ? _i18n["default"].getString('reject', currentLocale) : _i18n["default"].getString('hangup', currentLocale);
    var endAction = isInComingCall ? onReject : onHangup;
    var isRinging = _telephonyStatus["default"].ringing === callStatus;
    return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      tooltip: endTitle,
      onClick: endAction,
      className: (0, _classnames["default"])(_styles["default"].endBtn, _styles["default"].actionItem)
    }, isRinging ? /*#__PURE__*/_react["default"].createElement(_VoicemailRed["default"], null) : /*#__PURE__*/_react["default"].createElement(_Hangup["default"], null));
  } : null;
  var renderLogButton = showLogButton ? function () {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      ref: anchorEl
    }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      tooltip: _i18n["default"].getString('log', currentLocale),
      disabled: isExpand,
      onClick: function onClick() {
        return onExpand();
      },
      className: (0, _classnames["default"])(_styles["default"].logBtn, _styles["default"].actionItem)
    }, !isExpand ? /*#__PURE__*/_react["default"].createElement(_LogUnclick["default"], null) : /*#__PURE__*/_react["default"].createElement(_LogClick["default"], null))), /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
      open: !!anchorEl.current && isExpand,
      anchorEl: anchorEl.current,
      onClose: function onClose() {
        return shrinkNotification();
      },
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      closeAfterTransition: true,
      container: viewport,
      className: _styles["default"].modalAnimation
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, null, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      onClick: function onClick() {
        return onSave();
      },
      className: _styles["default"].menuItem
    }, _i18n["default"].getString('save', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      onClick: function onClick() {
        return onDiscard();
      },
      className: _styles["default"].menuItem
    }, _i18n["default"].getString('discard', currentLocale)))));
  } : null;
  var call = currentLog.call,
    logName = currentLog.logName;
  var direction = call.direction,
    to = call.to,
    from = call.from;
  var callIconTitle = direction === 'Inbound' ? _i18n["default"].getString('Inbound', currentLocale) : _i18n["default"].getString('Outbound', currentLocale);
  var number = direction === _callDirections["default"].outbound ? to && (to.phoneNumber || to.extensionNumber) : from && (from.phoneNumber || from.extensionNumber);
  var formatNumber = formatPhone(number);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callInfo
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callIcon
  }, /*#__PURE__*/_react["default"].createElement(CallIcon, {
    title: callIconTitle
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    ,
    iconClassName: callIconMap[direction]
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].contactInfo
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].contactName
  }, logName), /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].phoneNumber
  }, formatNumber)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callActions
  }, renderLogButton && renderLogButton(), renderEndButton && renderEndButton())));
};
LogNotification.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  showLogButton: _propTypes["default"].bool,
  currentLog: _propTypes["default"].object,
  formatPhone: _propTypes["default"].func,
  isExpand: _propTypes["default"].bool,
  onDiscard: _propTypes["default"].func,
  onSave: _propTypes["default"].func,
  onExpand: _propTypes["default"].func,
  currentSession: _propTypes["default"].object,
  onReject: _propTypes["default"].func,
  onHangup: _propTypes["default"].func,
  showEndButton: _propTypes["default"].bool,
  shrinkNotification: _propTypes["default"].func
};
LogNotification.defaultProps = {
  showLogButton: true,
  currentLog: {},
  formatPhone: undefined,
  isExpand: undefined,
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
  shrinkNotification: undefined
};
var _default = LogNotification;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
