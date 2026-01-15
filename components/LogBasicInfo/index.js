"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
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
var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CallIcon = function CallIcon(_ref) {
  var title = _ref.title,
    iconClassName = _ref.iconClassName;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callIcon,
    title: title,
    "data-sign": "callIcon"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: iconClassName
  }));
};
CallIcon.propTypes = {
  title: _propTypes["default"].string,
  iconClassName: _propTypes["default"].string.isRequired
};
CallIcon.defaultProps = {
  title: ''
};
var callIconMap = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _callResults["default"].missed, _DynamicsFont["default"].missed), _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _callDirections["default"].outbound, _DynamicsFont["default"].outbound), _telephonyStatus["default"].ringing, _DynamicsFont["default"].callHover);
var colorStatusMap = {
  green: [_telephonyStatus["default"].callConnected, _telephonyStatus["default"].ringing, _callResults["default"].callAccepted, _callResults["default"].accepted],
  red: [_callResults["default"].missed, _callResults["default"].voicemail, _callResults["default"].rejected, _callResults["default"].blocked, _callResults["default"].noAnswer, _callResults["default"].busy, _callResults["default"].hangUp, _callResults["default"].HangUp, _callResults["default"].declined],
  orange: [_telephonyStatus["default"].onHold, _telephonyStatus["default"].parkedCall]
};
var LogBasicInfo = function LogBasicInfo(props) {
  var _props$currentLog = props.currentLog,
    call = _props$currentLog.call,
    logName = _props$currentLog.logName,
    formatPhone = props.formatPhone,
    currentLocale = props.currentLocale,
    clickable = props.clickable,
    onClick = props.onClick,
    dataSign = props.dataSign;
  if (!call) return null;
  var direction = call.direction,
    to = call.to,
    from = call.from,
    duration = call.duration,
    result = call.result,
    telephonyStatus = call.telephonyStatus;
  var number = direction === _callDirections["default"].outbound ? to && (to.phoneNumber || to.extensionNumber) : from && (from.phoneNumber || from.extensionNumber);
  var formatNumber = formatPhone(number);
  var status = result || telephonyStatus;
  var active = !duration && duration !== 0;
  var missed = (0, _callLogHelpers.isMissed)(call);
  var green = (0, _ramda.includes)(status, colorStatusMap.green);
  var red = (0, _ramda.includes)(status, colorStatusMap.red);
  var orange = (0, _ramda.includes)(status, colorStatusMap.orange);
  var isRinging = status === _telephonyStatus["default"].ringing;
  var title = missed ? _i18n["default"].getString(_callResults["default"].missed, currentLocale) : _i18n["default"].getString(direction, currentLocale);
  var statusI18n = _i18n["default"].getString(status, currentLocale);
  var iconClassName = (0, _clsx["default"])(_styles["default"].icon, isRinging && _styles["default"].ringing, isRinging && _DynamicsFont["default"].callHover,
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  !isRinging && !missed && callIconMap[direction], missed && _styles["default"].missed, missed && callIconMap[_callResults["default"].missed], !isRinging && active && _styles["default"].active);
  var statusClassName = (0, _clsx["default"])(_styles["default"].status, green && _styles["default"].green, red && _styles["default"].red, orange && _styles["default"].orange);
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "logSection",
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    className: (0, _clsx["default"])(_styles["default"].callInfo, clickable && _styles["default"].pointer),
    onClick: clickable ? onClick : function () {}
  }, /*#__PURE__*/_react["default"].createElement(CallIcon, {
    title: title,
    iconClassName: iconClassName
  }), /*#__PURE__*/_react["default"].createElement("ul", {
    className: _styles["default"].callDisplay
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles["default"].contact,
    title: logName,
    "data-sign": "entityName"
  }, logName), /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles["default"].callDetail
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].number,
    title: formatNumber,
    "data-sign": "logPhoneNumber"
  }, formatNumber), formatNumber ? /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].separator
  }, "\xA0") : null, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "logCallStatus",
    className: statusClassName,
    title: statusI18n
  }, statusI18n)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].extra
  }, props.extraButton));
};
LogBasicInfo.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  formatPhone: _propTypes["default"].func,
  currentLog: _propTypes["default"].object,
  extraButton: _propTypes["default"].object,
  clickable: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  dataSign: _propTypes["default"].string
};
LogBasicInfo.defaultProps = {
  formatPhone: function formatPhone(value) {
    return value;
  },
  currentLog: {},
  extraButton: undefined,
  clickable: false,
  onClick: function onClick() {},
  dataSign: undefined
};
var _default = exports["default"] = LogBasicInfo;
//# sourceMappingURL=index.js.map
