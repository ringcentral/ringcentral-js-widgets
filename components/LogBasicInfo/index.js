"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LogBasicInfo;

require("core-js/modules/es6.object.define-property");

var _ramda = require("ramda");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _callResults = _interopRequireDefault(require("ringcentral-integration/enums/callResults"));

var _telephonyStatus = _interopRequireDefault(require("ringcentral-integration/enums/telephonyStatus"));

var _callLogHelpers = require("ringcentral-integration/lib/callLogHelpers");

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _callIconMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CallIcon = function CallIcon(_ref) {
  var title = _ref.title,
      iconClassName = _ref.iconClassName;
  return _react["default"].createElement("div", {
    className: _styles["default"].callIcon,
    title: title
  }, _react["default"].createElement("span", {
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
var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callResults["default"].missed, _DynamicsFont["default"].missed), _defineProperty(_callIconMap, _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _defineProperty(_callIconMap, _callDirections["default"].outbound, _DynamicsFont["default"].outbound), _defineProperty(_callIconMap, _telephonyStatus["default"].ringing, _DynamicsFont["default"].callHover), _callIconMap);
var colorStatusMap = {
  green: [_telephonyStatus["default"].callConnected, _telephonyStatus["default"].ringing, _callResults["default"].callAccepted, _callResults["default"].accepted],
  red: [_callResults["default"].missed, _callResults["default"].voicemail, _callResults["default"].rejected, _callResults["default"].blocked, _callResults["default"].noAnswer, _callResults["default"].busy, _callResults["default"].hangUp, _callResults["default"].HangUp, _callResults["default"].declined],
  orange: [_telephonyStatus["default"].onHold, _telephonyStatus["default"].parkedCall]
};

function LogBasicInfo(props) {
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
  var green = (0, _ramda.contains)(status, colorStatusMap.green);
  var red = (0, _ramda.contains)(status, colorStatusMap.red);
  var orange = (0, _ramda.contains)(status, colorStatusMap.orange);
  var isRinging = status === _telephonyStatus["default"].ringing;
  var title = missed ? _i18n["default"].getString(_callResults["default"].missed, currentLocale) : _i18n["default"].getString(direction, currentLocale);

  var statusI18n = _i18n["default"].getString(status, currentLocale);

  var iconClassName = (0, _classnames["default"])(_styles["default"].icon, isRinging && _styles["default"].ringing, isRinging && _DynamicsFont["default"].callHover, !isRinging && !missed && callIconMap[direction], missed && _styles["default"].missed, missed && callIconMap[_callResults["default"].missed], !isRinging && active && _styles["default"].active);
  var statusClassName = (0, _classnames["default"])(_styles["default"].status, green && _styles["default"].green, red && _styles["default"].red, orange && _styles["default"].orange);
  return _react["default"].createElement("div", {
    "data-sign": "logSection",
    className: _styles["default"].root
  }, _react["default"].createElement("div", {
    "data-sign": dataSign,
    className: (0, _classnames["default"])(_styles["default"].callInfo, clickable && _styles["default"].pointer),
    onClick: clickable ? onClick : function () {}
  }, _react["default"].createElement(CallIcon, {
    title: title,
    iconClassName: iconClassName
  }), _react["default"].createElement("ul", {
    className: _styles["default"].callDisplay
  }, _react["default"].createElement("li", {
    className: _styles["default"].contact,
    title: logName
  }, logName), _react["default"].createElement("li", {
    className: _styles["default"].callDetail
  }, _react["default"].createElement("span", {
    className: _styles["default"].number,
    title: formatNumber
  }, formatNumber), formatNumber ? _react["default"].createElement("span", {
    className: _styles["default"].separator
  }, "\xA0") : null, _react["default"].createElement("span", {
    "data-sign": "callStatus",
    className: statusClassName,
    title: statusI18n
  }, statusI18n)))), _react["default"].createElement("div", {
    className: _styles["default"].extra
  }, props.extraButton));
}

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
//# sourceMappingURL=index.js.map
