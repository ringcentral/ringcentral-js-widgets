"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _ramda = require("ramda");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));
var _RecordingIndicator = require("../RecordingIndicator");
var _CallIcon = require("./CallIcon");
var _i18n = _interopRequireDefault(require("./i18n"));
var _ShinyBar = require("./ShinyBar");
var _styles = require("./styles");
var _styles2 = _interopRequireDefault(require("./styles.scss"));
var _callIconMap;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
var SubCallInfoSection = function SubCallInfoSection(_ref) {
  var _ref$displayCallLog = _ref.displayCallLog,
    call = _ref$displayCallLog.call,
    logName = _ref$displayCallLog.logName,
    subContactNameDisplay = _ref$displayCallLog.subContactNameDisplay,
    entityDetailLink = _ref$displayCallLog.entityDetailLink,
    disabledSwitchButton = _ref.disabledSwitchButton,
    currentLocale = _ref.currentLocale,
    disableLinks = _ref.disableLinks,
    isWide = _ref.isWide,
    showRecordingIndicator = _ref.showRecordingIndicator,
    openEntityDetailLinkTrack = _ref.openEntityDetailLinkTrack,
    onSwitchWarmTransferSession = _ref.onSwitchWarmTransferSession;
  if (!call) return null;
  // @ts-expect-error TS(2339): Property 'offset' does not exist on type 'Call'.
  var startTime = call.startTime,
    offset = call.offset,
    duration = call.duration,
    telephonyStatus = call.telephonyStatus,
    isRecording = call.isRecording;
  function getDurationElm() {
    var durationElement = null;
    if (typeof duration === 'undefined') {
      durationElement = disableLinks ?
      // TODO: should find what is that key, this unavailable is not exist
      // i18n.getString('unavailable', currentLocale)
      'unavailable' :
      /*#__PURE__*/
      // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
      _react["default"].createElement(_DurationCounter["default"], {
        startTime: startTime,
        offset: offset
      });
    } else {
      durationElement = (0, _formatDuration.formatDuration)(duration);
    }
    return durationElement;
  }
  var durationElement = getDurationElm();
  var infoStatus = getInfoStatus(telephonyStatus);
  return /*#__PURE__*/_react["default"].createElement(_styles.StyleSubBox, null, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "subLogSection",
    className: (0, _classnames["default"])(_styles2["default"].root, !isWide && _styles2["default"].classic, _styles2["default"][infoStatus])
  }, /*#__PURE__*/_react["default"].createElement(_ShinyBar.ShinyBar, {
    className: _styles2["default"].top,
    status: infoStatus
  }), /*#__PURE__*/_react["default"].createElement(_styles.SubInfoWrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    "data-sign": "subInfoHoldIcon",
    symbol: _junoIcon.Hold,
    size: "small",
    color: "nav.f02"
  }), /*#__PURE__*/_react["default"].createElement(_styles.SubInfoName, {
    $isWide: isWide,
    className: _styles2["default"].logName,
    title: "".concat(subContactNameDisplay ? "".concat(logName, " ").concat(subContactNameDisplay) : logName),
    "data-sign": "subLogName"
  }, entityDetailLink ? /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    variant: "inherit",
    onClick: function onClick() {
      window.open(entityDetailLink, '_blank');
      openEntityDetailLinkTrack === null || openEntityDetailLinkTrack === void 0 ? void 0 : openEntityDetailLinkTrack('call log page');
    }
  }, logName) : logName, subContactNameDisplay && /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.f04",
    component: "span",
    align: "center",
    variant: "caption1"
  }, " ".concat(subContactNameDisplay))), /*#__PURE__*/_react["default"].createElement(_styles.StyledSubSide, null, /*#__PURE__*/_react["default"].createElement("p", {
    "data-sign": "subCallDuration"
  }, durationElement), showRecordingIndicator && isRecording && /*#__PURE__*/_react["default"].createElement(_styles.StyledSubRecordingIndicator, null, /*#__PURE__*/_react["default"].createElement(_RecordingIndicator.RecordingIndicator, {
    customClass: _styles2["default"].subRecordingIndicator,
    dataSign: "subRecordingIndicator"
  }))))), /*#__PURE__*/_react["default"].createElement(_styles.StyledTransferSwitchButton, {
    "data-sign": "warmTransferSwitchCallButton",
    variant: "contained",
    color: "neutral.b01",
    size: "small",
    onClick: onSwitchWarmTransferSession,
    title: _i18n["default"].getString('warmTransferSwitchCall', currentLocale),
    disabled: disableLinks || disabledSwitchButton
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    color: "interactive.b02",
    size: "inherit",
    symbol: _junoIcon.ResendFax
  })));
};
var ActiveCallInfoSection = function ActiveCallInfoSection(_ref2) {
  var _ref2$displayCallLog = _ref2.displayCallLog,
    call = _ref2$displayCallLog.call,
    logName = _ref2$displayCallLog.logName,
    subContactNameDisplay = _ref2$displayCallLog.subContactNameDisplay,
    entityDetailLink = _ref2$displayCallLog.entityDetailLink,
    formatPhone = _ref2.formatPhone,
    currentLocale = _ref2.currentLocale,
    dataSign = _ref2.dataSign,
    disableLinks = _ref2.disableLinks,
    dateTimeFormatter = _ref2.dateTimeFormatter,
    isWide = _ref2.isWide,
    className = _ref2.className,
    showRecordingIndicator = _ref2.showRecordingIndicator,
    openEntityDetailLinkTrack = _ref2.openEntityDetailLinkTrack;
  if (!call) return null;
  var direction = call.direction,
    to = call.to,
    from = call.from,
    startTime = call.startTime,
    offset = call.offset,
    duration = call.duration,
    result = call.result,
    telephonyStatus = call.telephonyStatus,
    isRecording = call.isRecording;
  function getDurationElm() {
    var durationElement = null;
    if (typeof duration === 'undefined') {
      durationElement = disableLinks ?
      // TODO: should find what is that key, this unavailable is not exist
      // i18n.getString('unavailable', currentLocale)
      'unavailable' :
      /*#__PURE__*/
      // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
      _react["default"].createElement(_DurationCounter["default"], {
        startTime: startTime,
        offset: offset
      });
    } else {
      durationElement = (0, _formatDuration.formatDuration)(duration);
    }
    return durationElement;
  }
  var number = direction === _callDirections["default"].outbound ? to && (to.phoneNumber || to.extensionNumber) : from && (from.phoneNumber || from.extensionNumber);
  var formatNumber = formatPhone === null || formatPhone === void 0 ? void 0 : formatPhone(number);
  // @ts-expect-error TS(2345): Argument of type 'Call' is not assignable to param... Remove this comment to see the full error message
  var missed = (0, _callLogHelpers.isMissed)(call);
  var durationElement = getDurationElm();
  var status = result || telephonyStatus;
  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  var statusI18n = _i18n["default"].getString(status, currentLocale);
  var isRinging = status === _telephonyStatus["default"].ringing;
  // @ts-expect-error TS(2345): Argument of type '"NoCall" | "OnHold" | "Ringing" ... Remove this comment to see the full error message
  var infoStatus = getInfoStatus(status);
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "logSection",
    className: (0, _classnames["default"])(_styles2["default"].root, !isWide && _styles2["default"].classic, _styles2["default"][infoStatus], className, _styles2["default"].logBasicInfo)
  }, /*#__PURE__*/_react["default"].createElement(_ShinyBar.ShinyBar, {
    className: _styles2["default"].top,
    isRinging: isRinging,
    status: infoStatus
  }), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    className: _styles2["default"].leftSectionInfo
  }, /*#__PURE__*/_react["default"].createElement(_CallIcon.CallIcon, {
    title: missed ? _i18n["default"].getString(_callResults["default"].missed, currentLocale) :
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    _i18n["default"].getString(direction, currentLocale),
    iconClassName: (0, _classnames["default"])(_styles2["default"].icon,
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    callIconMap[missed ? _callResults["default"].missed : direction])
  }), /*#__PURE__*/_react["default"].createElement("ul", {
    className: _styles2["default"].callDisplay
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles2["default"].info
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    className: _styles2["default"].logName,
    title: "".concat(subContactNameDisplay ? "".concat(logName, " ").concat(subContactNameDisplay) : logName),
    "data-sign": "logName"
  }, entityDetailLink ? /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    variant: "inherit",
    onClick: function onClick() {
      window.open(entityDetailLink, '_blank');
      openEntityDetailLinkTrack === null || openEntityDetailLinkTrack === void 0 ? void 0 : openEntityDetailLinkTrack('call log page');
    }
  }, logName) : logName, subContactNameDisplay && /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.f04",
    component: "span",
    align: "center",
    variant: "caption1"
  }, " ".concat(subContactNameDisplay))), /*#__PURE__*/_react["default"].createElement("p", {
    className: (0, _classnames["default"])(_styles2["default"].follow, _styles2["default"]['text-ellipsis'])
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: formatNumber,
    "data-sign": "phoneNumber"
  }, formatNumber), /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "callStatus",
    title: statusI18n
  }, statusI18n))), /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles2["default"]['flex-fill']
  }), isWide ? /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles2["default"].time
  }, /*#__PURE__*/_react["default"].createElement(_styles.StyledSide, null, durationElement, showRecordingIndicator && isRecording && /*#__PURE__*/_react["default"].createElement(_RecordingIndicator.RecordingIndicator, {
    customClass: _styles2["default"].recordingIndicator,
    dataSign: "recordingIndicator"
  })), /*#__PURE__*/_react["default"].createElement("p", null, dateTimeFormatter({
    utcTimestamp: startTime,
    locale: currentLocale
  }))) : /*#__PURE__*/_react["default"].createElement("li", {
    className: (0, _classnames["default"])(_styles2["default"].follow, _styles2["default"].time)
  }, /*#__PURE__*/_react["default"].createElement("p", null, durationElement), /*#__PURE__*/_react["default"].createElement("p", null, dateTimeFormatter({
    utcTimestamp: startTime,
    locale: currentLocale
  })), showRecordingIndicator && isRecording && /*#__PURE__*/_react["default"].createElement(_RecordingIndicator.RecordingIndicator, {
    customClass: _styles2["default"].recordingIndicator,
    dataSign: "recordingIndicator"
  })))));
};
var LogBasicInfo = /*#__PURE__*/_react["default"].memo(function (props) {
  var currentLog = props.currentLog,
    subCallLog = props.subCallLog,
    rest = _objectWithoutProperties(props, ["currentLog", "subCallLog"]); // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  var status = (currentLog === null || currentLog === void 0 ? void 0 : currentLog.call.result) || (currentLog === null || currentLog === void 0 ? void 0 : currentLog.call.telephonyStatus);
  var disabledCtrl = status === _telephonyStatus["default"].ringing;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, subCallLog && /*#__PURE__*/_react["default"].createElement(SubCallInfoSection, _extends({
    displayCallLog: subCallLog
    // @ts-expect-error TS(2783): 'disabledSwitchButton' is specified more than once... Remove this comment to see the full error message
    ,
    disabledSwitchButton: disabledCtrl
  }, rest)), /*#__PURE__*/_react["default"].createElement(ActiveCallInfoSection, _extends({
    displayCallLog: currentLog
  }, rest)));
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
  className: undefined,
  showRecordingIndicator: false
};
var _default = LogBasicInfo;
exports["default"] = _default;
//# sourceMappingURL=LogBasicInfo.js.map
