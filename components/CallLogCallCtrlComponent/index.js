"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CallLogCallCtrlComponent;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

var _classnames12 = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _telephonyStatus = _interopRequireDefault(require("ringcentral-integration/enums/telephonyStatus"));

var _recordStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/recordStatus"));

var _iconTransferCall = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-transfer-call.svg"));

var _iconHold = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-hold.svg"));

var _RecordOff = _interopRequireDefault(require("../../assets/images/RecordOff.svg"));

var _RecordOn = _interopRequireDefault(require("../../assets/images/RecordOn.svg"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _MoreActionComponent = require("./MoreActionComponent");

var _CallLogDialpad = require("./CallLogDialpad");

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));

var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));

var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));

var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));

var _Dialpad = _interopRequireDefault(require("../../assets/images/Dialpad.svg"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CallLogCallCtrlComponent(props) {
  var _classnames8, _classnames9, _classnames10, _classnames11;

  var onMute = props.onMute,
      onUnmute = props.onUnmute,
      onHangup = props.onHangup,
      onReject = props.onReject,
      isOnMute = props.isOnMute,
      callStatus = props.callStatus,
      recordStatus = props.recordStatus,
      currentLocale = props.currentLocale,
      callDirection = props.callDirection,
      onTransfer = props.onTransfer,
      isOnTransfer = props.isOnTransfer,
      isOnHold = props.isOnHold,
      onUnHold = props.onUnHold,
      onHold = props.onHold,
      startRecord = props.startRecord,
      stopRecord = props.stopRecord,
      disableLinks = props.disableLinks,
      isWide = props.isWide,
      transferRef = props.transferRef,
      isCurrentDeviceCall = props.isCurrentDeviceCall,
      sendDTMF = props.sendDTMF; // reject conditions: call direction is inbound & call status is ringing

  var isInComingCall = _callDirections["default"].inbound === callDirection && _telephonyStatus["default"].ringing === callStatus;
  var muteIcon = isOnMute ? _Mute["default"] : _Unmute["default"];
  var muteAction = isOnMute ? onUnmute : onMute;
  var muteTitle = isOnMute ? 'unmute' : 'mute';
  var holdTitle = isOnHold ? 'onHold' : 'hold';
  var holdAction = isOnHold ? onUnHold : onHold;
  var endTitle = isInComingCall ? 'reject' : 'hangup';
  var endAction = isInComingCall ? onReject : onHangup;
  var disabledCtrl = callStatus === _telephonyStatus["default"].ringing;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      dialpadShow = _useState2[0],
      onDialpadShow = _useState2[1];

  var toggleDialpadShow = function toggleDialpadShow() {
    onDialpadShow(!dialpadShow);
  }; // WebRTC logic


  if (isCurrentDeviceCall && _callDirections["default"].outbound === callDirection) {
    var _classnames2, _classnames4, _classnames5, _classnames6;

    var isRecording = recordStatus === _recordStatus["default"].recording;
    var recordingText = isRecording ? 'stopRecord' : 'record';
    var recordAction = isRecording ? stopRecord : startRecord;
    var keypadText = dialpadShow ? 'hideKeypad' : 'showKeypad';
    var moreActions = [{
      icon: _iconTransferCall["default"],
      text: 'transfer',
      onClick: onTransfer,
      iconClassName: (0, _classnames12["default"])(_defineProperty({}, _styles["default"].moreActionIcon, true))
    }, {
      icon: _iconHold["default"],
      text: isOnHold ? 'unHold' : 'hold',
      onClick: holdAction,
      iconClassName: (0, _classnames12["default"])((_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].moreActionIcon, true), _defineProperty(_classnames2, _styles["default"].holdActive, isOnHold), _classnames2))
    }, {
      icon: isRecording ? _RecordOn["default"] : _RecordOff["default"],
      text: recordingText,
      onClick: recordAction,
      iconClassName: (0, _classnames12["default"])(_defineProperty({}, _styles["default"].moreActionIcon, true))
    }];
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames12["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
    }, /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString(muteTitle, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: muteTitle,
      icon: muteIcon,
      onClick: muteAction,
      className: (0, _classnames12["default"])((_classnames4 = {}, _defineProperty(_classnames4, _styles["default"].button, true), _defineProperty(_classnames4, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _classnames4)),
      disabled: disableLinks || disabledCtrl
    })), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString(keypadText, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      icon: _Dialpad["default"],
      className: (0, _classnames12["default"])((_classnames5 = {}, _defineProperty(_classnames5, _styles["default"].button, true), _defineProperty(_classnames5, _styles["default"].buttonDisabled, isInComingCall || disableLinks), _defineProperty(_classnames5, _styles["default"].dialpadIconActive, dialpadShow), _classnames5)),
      disabled: disableLinks || isInComingCall,
      onClick: toggleDialpadShow
    })), /*#__PURE__*/_react["default"].createElement(_MoreActionComponent.MoreActionComponent, {
      actionsList: moreActions,
      currentLocale: currentLocale,
      disabled: disableLinks || disabledCtrl
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString(endTitle, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: endTitle,
      showBorder: false,
      icon: _End["default"],
      onClick: endAction,
      className: (0, _classnames12["default"])((_classnames6 = {}, _defineProperty(_classnames6, _styles["default"].hangup, true), _defineProperty(_classnames6, _styles["default"].button, true), _defineProperty(_classnames6, _styles["default"].buttonDisabled, disableLinks), _classnames6)),
      disabled: disableLinks
    }))), dialpadShow && /*#__PURE__*/_react["default"].createElement(_CallLogDialpad.CallLogDialpad, {
      className: (0, _classnames12["default"])(_styles["default"].smallDialpad, _defineProperty({}, _styles["default"].smallDiapadShow, dialpadShow)),
      onChange: function onChange(e) {
        sendDTMF(e);
      },
      onClose: toggleDialpadShow,
      isWide: isWide
    }));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames12["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(muteTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: muteTitle,
    icon: muteIcon,
    onClick: muteAction,
    className: (0, _classnames12["default"])((_classnames8 = {}, _defineProperty(_classnames8, _styles["default"].button, true), _defineProperty(_classnames8, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _classnames8)),
    disabled: disableLinks || disabledCtrl
  })), /*#__PURE__*/_react["default"].createElement("span", {
    ref: transferRef,
    title: _i18n["default"].getString('transfer', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: "transfer",
    icon: _Transfer["default"],
    onClick: onTransfer,
    className: (0, _classnames12["default"])((_classnames9 = {}, _defineProperty(_classnames9, _styles["default"].button, true), _defineProperty(_classnames9, _styles["default"].buttonActive, isOnTransfer), _defineProperty(_classnames9, _styles["default"].buttonDisabled, disableLinks || isInComingCall), _classnames9)),
    disabled: disableLinks || isInComingCall
  })), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(holdTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: holdTitle,
    icon: _Hold["default"],
    onClick: holdAction,
    className: (0, _classnames12["default"])((_classnames10 = {}, _defineProperty(_classnames10, _styles["default"].button, true), _defineProperty(_classnames10, _styles["default"].buttonActive, isOnHold), _defineProperty(_classnames10, _styles["default"].buttonDisabled, isInComingCall || disableLinks), _classnames10)),
    disabled: disableLinks || isInComingCall
  })), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(endTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: endTitle,
    showBorder: false,
    icon: _End["default"],
    onClick: endAction,
    className: (0, _classnames12["default"])((_classnames11 = {}, _defineProperty(_classnames11, _styles["default"].hangup, true), _defineProperty(_classnames11, _styles["default"].button, true), _defineProperty(_classnames11, _styles["default"].buttonDisabled, disableLinks), _classnames11)),
    disabled: disableLinks
  })));
}

CallLogCallCtrlComponent.propTypes = {
  onMute: _propTypes["default"].func,
  onUnmute: _propTypes["default"].func,
  onHangup: _propTypes["default"].func,
  onReject: _propTypes["default"].func,
  onTransfer: _propTypes["default"].func,
  isOnMute: _propTypes["default"].bool,
  isOnHold: _propTypes["default"].bool,
  onUnHold: _propTypes["default"].func,
  onHold: _propTypes["default"].func,
  startRecord: _propTypes["default"].func,
  stopRecord: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  callStatus: _propTypes["default"].string,
  recordStatus: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string,
  callDirection: _propTypes["default"].string.isRequired,
  isWide: _propTypes["default"].bool,
  isCurrentDeviceCall: _propTypes["default"].bool,
  transferRef: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].shape({
    current: _propTypes["default"].instanceOf(Element)
  })]),
  isOnTransfer: _propTypes["default"].bool,
  sendDTMF: _propTypes["default"].func
};
CallLogCallCtrlComponent.defaultProps = {
  onMute: function onMute() {},
  onUnmute: function onUnmute() {},
  onHangup: function onHangup() {},
  onReject: function onReject() {},
  onTransfer: function onTransfer() {},
  onUnHold: function onUnHold() {},
  onHold: function onHold() {},
  startRecord: function startRecord() {},
  stopRecord: function stopRecord() {},
  isOnMute: false,
  isOnHold: false,
  callStatus: 'CallConnected',
  currentLocale: 'en-US',
  disableLinks: false,
  isWide: true,
  transferRef: undefined,
  isOnTransfer: false,
  sendDTMF: function sendDTMF() {}
};
//# sourceMappingURL=index.js.map
