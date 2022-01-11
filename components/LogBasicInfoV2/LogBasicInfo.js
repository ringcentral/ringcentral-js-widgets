"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ramda = require("ramda");

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));

var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));

var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");

var _recordStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/recordStatus"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _formatDuration = _interopRequireDefault(require("../../lib/formatDuration"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _RecordingIndicator = require("../RecordingIndicator");

var _CallIcon = require("./CallIcon");

var _i18n = _interopRequireDefault(require("./i18n"));

var _ShinyBar = require("./ShinyBar");

var _styles = _interopRequireDefault(require("./styles.scss"));

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

var LogBasicInfo = /*#__PURE__*/_react["default"].memo(function (props) {
  var _props$currentLog = props.currentLog,
      call = _props$currentLog.call,
      logName = _props$currentLog.logName,
      logNameAndMoreDisplay = _props$currentLog.logNameAndMoreDisplay,
      isShowEntity = _props$currentLog.isShowEntity,
      basicURL = _props$currentLog.basicURL,
      task = _props$currentLog.task,
      formatPhone = props.formatPhone,
      currentLocale = props.currentLocale,
      dataSign = props.dataSign,
      disableLinks = props.disableLinks,
      dateTimeFormatter = props.dateTimeFormatter,
      isWide = props.isWide,
      className = props.className,
      recordStatus = props.recordStatus,
      showRecordingIndicator = props.showRecordingIndicator;
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
  var isRecording = recordStatus === _recordStatus["default"].recording;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "logSection",
    className: (0, _classnames["default"])(_styles["default"].root, !isWide && _styles["default"].classic, _styles["default"][infoStatus], className, _styles["default"].logBasicInfo)
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
  }), showRecordingIndicator && isRecording && /*#__PURE__*/_react["default"].createElement(_RecordingIndicator.RecordingIndicator, {
    customClass: _styles["default"].recordingIndicator,
    dataSign: "recordingIndicator"
  }), /*#__PURE__*/_react["default"].createElement("ul", {
    className: _styles["default"].callDisplay
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles["default"].info
  }, isShowEntity && ((task === null || task === void 0 ? void 0 : task.whatid) || (task === null || task === void 0 ? void 0 : task.whoid) || logNameAndMoreDisplay) ? /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].logName,
    title: "".concat(logNameAndMoreDisplay ? "".concat(logName, "\xA0$").concat(logNameAndMoreDisplay) : logName),
    "data-sign": "logName"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: _styles["default"].SFrecordLink,
    onClick: function onClick() {
      return window.open("".concat(basicURL, "/").concat(task.whatid || task.whoid), '_blank');
    }
  }, logNameAndMoreDisplay ? /*#__PURE__*/_react["default"].createElement("span", null, logName, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].logNameAndMore
  }, logNameAndMoreDisplay)) : logName)) : /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].logName,
    title: logName,
    "data-sign": "logName"
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
}, function (prevProps, nextProps) {
  var _nextProps$currentLog, _prevProps$currentLog, _nextProps$currentLog2;

  // current call will be {} temporally when the call is ended
  // will not update log info component at that time
  if (((_nextProps$currentLog = nextProps.currentLog) === null || _nextProps$currentLog === void 0 ? void 0 : _nextProps$currentLog.call) !== ((_prevProps$currentLog = prevProps.currentLog) === null || _prevProps$currentLog === void 0 ? void 0 : _prevProps$currentLog.call) && (0, _ramda.isEmpty)((_nextProps$currentLog2 = nextProps.currentLog) === null || _nextProps$currentLog2 === void 0 ? void 0 : _nextProps$currentLog2.call)) {
    return true;
  }

  return false;
});

LogBasicInfo.defaultProps = {
  formatPhone: function formatPhone(value) {
    return value;
  },
  currentLog: {},
  dataSign: undefined,
  disableLinks: false,
  isWide: true,
  currentLocale: 'en',
  className: null,
  recordStatus: '',
  showRecordingIndicator: false
};
var _default = LogBasicInfo;
exports["default"] = _default;
//# sourceMappingURL=LogBasicInfo.js.map
