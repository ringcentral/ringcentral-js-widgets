"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LogBasicInfo;

require("core-js/modules/es6.object.define-property");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _callResults = _interopRequireDefault(require("ringcentral-integration/enums/callResults"));

var _telephonyStatus = _interopRequireDefault(require("ringcentral-integration/enums/telephonyStatus"));

var _callLogHelpers = require("ringcentral-integration/lib/callLogHelpers");

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _formatDuration = _interopRequireDefault(require("../../lib/formatDuration"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _CallIcon = require("./CallIcon");

var _ShinyBar = require("./ShinyBar");

var _callIconMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callResults["default"].missed, _DynamicsFont["default"].missed), _defineProperty(_callIconMap, _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _defineProperty(_callIconMap, _callDirections["default"].outbound, _DynamicsFont["default"].outbound), _defineProperty(_callIconMap, _telephonyStatus["default"].ringing, _DynamicsFont["default"].callHover), _callIconMap);

function getInfoStatus(status) {
  switch (status) {
    case _telephonyStatus["default"].onHold:
      return 'onHold';

    case _telephonyStatus["default"].callConnected:
    case _telephonyStatus["default"].ringing:
      return 'active';

    default:
      return 'callEnd';
  }
}

function LogBasicInfo(props) {
  var _props$currentLog = props.currentLog,
      call = _props$currentLog.call,
      logName = _props$currentLog.logName,
      formatPhone = props.formatPhone,
      currentLocale = props.currentLocale,
      dataSign = props.dataSign,
      disableLinks = props.disableLinks,
      dateTimeFormatter = props.dateTimeFormatter,
      isWide = props.isWide;
  if (!call) return null;
  var direction = call.direction,
      to = call.to,
      from = call.from,
      startTime = call.startTime,
      offset = call.offset,
      duration = call.duration,
      result = call.result,
      telephonyStatus = call.telephonyStatus;

  function getDurationElm() {
    var durationElement = null;

    if (typeof duration === 'undefined') {
      durationElement = disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
        startTime: startTime,
        offset: offset
      });
    } else {
      durationElement = (0, _formatDuration["default"])(duration);
    }

    return durationElement;
  }

  var number = direction === _callDirections["default"].outbound ? to && (to.phoneNumber || to.extensionNumber) : from && (from.phoneNumber || from.extensionNumber);
  var formatNumber = formatPhone(number);
  var missed = (0, _callLogHelpers.isMissed)(call);
  var durationElement = getDurationElm();
  var status = result || telephonyStatus;

  var statusI18n = _i18n["default"].getString(status, currentLocale);

  var isRinging = status === _telephonyStatus["default"].ringing;
  var infoStatus = getInfoStatus(status);
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "logSection",
    className: (0, _classnames["default"])(_styles["default"].root, !isWide && _styles["default"].classic, _styles["default"][infoStatus])
  }, /*#__PURE__*/_react["default"].createElement(_ShinyBar.ShinyBar, {
    className: _styles["default"].top,
    isRinging: isRinging,
    status: infoStatus
  }), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    className: _styles["default"].leftSectionInfo
  }, /*#__PURE__*/_react["default"].createElement(_CallIcon.CallIcon, {
    title: missed ? _i18n["default"].getString(_callResults["default"].missed, currentLocale) : _i18n["default"].getString(direction, currentLocale),
    iconClassName: (0, _classnames["default"])(_styles["default"].icon, callIconMap[missed ? _callResults["default"].missed : direction])
  }), /*#__PURE__*/_react["default"].createElement("ul", {
    className: _styles["default"].callDisplay
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles["default"].info
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].logName,
    title: logName
  }, logName), /*#__PURE__*/_react["default"].createElement("p", {
    className: (0, _classnames["default"])(_styles["default"].follow, _styles["default"]['text-ellipsis'])
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: formatNumber,
    "data-sign": "phoneNumber"
  }, formatNumber), /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "callStatus",
    title: statusI18n
  }, statusI18n))), /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles["default"]['flex-fill']
  }), /*#__PURE__*/_react["default"].createElement("li", {
    className: (0, _classnames["default"])(_styles["default"].follow, _styles["default"].time)
  }, /*#__PURE__*/_react["default"].createElement("p", null, durationElement), /*#__PURE__*/_react["default"].createElement("p", null, dateTimeFormatter({
    utcTimestamp: startTime,
    locale: currentLocale
  }))))));
}

LogBasicInfo.propTypes = {
  currentLocale: _propTypes["default"].string,
  formatPhone: _propTypes["default"].func,
  currentLog: _propTypes["default"].object,
  dataSign: _propTypes["default"].string,
  disableLinks: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  isWide: _propTypes["default"].bool
};
LogBasicInfo.defaultProps = {
  formatPhone: function formatPhone(value) {
    return value;
  },
  currentLog: {},
  dataSign: undefined,
  disableLinks: false,
  isWide: true,
  currentLocale: 'en'
};
//# sourceMappingURL=LogBasicInfo.js.map
