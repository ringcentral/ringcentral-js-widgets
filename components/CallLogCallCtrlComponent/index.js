"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _classnames16 = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));

var _recordStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/recordStatus"));

var _TransferCall = _interopRequireDefault(require("@ringcentral/juno/icon/TransferCall"));

var _Hold = _interopRequireDefault(require("@ringcentral/juno/icon/Hold"));

var _Ignore = _interopRequireDefault(require("@ringcentral/juno/icon/Ignore"));

var _Voicemail = _interopRequireDefault(require("@ringcentral/juno/icon/Voicemail"));

var _telephonySessionStatus = require("@ringcentral-integration/commons/enums/telephonySessionStatus");

var _Forward_white = _interopRequireDefault(require("../../assets/images/Forward_white.svg"));

var _RecordOff = _interopRequireDefault(require("../../assets/images/RecordOff.svg"));

var _RecordOn = _interopRequireDefault(require("../../assets/images/RecordOn.svg"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _MoreActionComponent = require("./MoreActionComponent");

var _CallLogDialpad = require("./CallLogDialpad");

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Hold2 = _interopRequireDefault(require("../../assets/images/Hold.svg"));

var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));

var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));

var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));

var _Dialpad = _interopRequireDefault(require("../../assets/images/Dialpad.svg"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _MoreIcon = _interopRequireDefault(require("../../assets/images/MoreIcon.svg"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _MoreActionWithForward = require("./MoreActionWithForward");

var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));

var _EndAnswer = _interopRequireDefault(require("../../assets/images/EndAnswer.svg"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var recodingVoiceTime = 6781;

var CallLogCallCtrlComponent = function CallLogCallCtrlComponent(props) {
  var _classnames12, _classnames13, _classnames14, _classnames15;

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
      sendDTMF = props.sendDTMF,
      forward = props.forward,
      answer = props.answer,
      forwardingNumbers = props.forwardingNumbers,
      ignore = props.ignore,
      otherActiveCalls = props.otherActiveCalls,
      answerAndHold = props.answerAndHold,
      answerAndEnd = props.answerAndEnd,
      realOutboundCallStatus = props.realOutboundCallStatus,
      dialpadToggleTrack = props.dialpadToggleTrack,
      clickForwardTrack = props.clickForwardTrack; // reject conditions: call direction is inbound & call status is ringing

  var isInComingCall = _callDirections["default"].inbound === callDirection && _telephonyStatus["default"].ringing === callStatus; // real outbound call status

  var isOutboundCallConnecting = realOutboundCallStatus === _telephonySessionStatus.telephonySessionStatus.proceeding;
  var isOutboundCallOnVoiceMail = realOutboundCallStatus === _telephonySessionStatus.telephonySessionStatus.voicemail;
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
    dialpadToggleTrack(!dialpadShow);
    onDialpadShow(!dialpadShow);
  }; // WebRTC logic


  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      anchorEl = _useState4[0],
      setAnchorEl = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      recordPendingState = _useState6[0],
      setRecordPendingState = _useState6[1];

  var timer;

  var startRecordAction = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var res,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return startRecord.apply(void 0, _args);

            case 2:
              res = _context.sent;

              if (res) {
                setRecordPendingState(true);
                timer = setTimeout(function () {
                  setRecordPendingState(false);
                }, recodingVoiceTime);
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function startRecordAction() {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    return function () {
      timer && clearTimeout(timer);
      timer = null;
    };
  });

  var _handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  var isWebRTCCall = isCurrentDeviceCall;
  var onGoingActiveCalls = otherActiveCalls;

  if (isWebRTCCall && _callDirections["default"].outbound === callDirection || isWebRTCCall && _callDirections["default"].inbound === callDirection && callStatus !== _telephonyStatus["default"].ringing) {
    var _classnames2, _classnames3, _classnames4, _classnames5, _classnames6;

    var isRecording = recordStatus === _recordStatus["default"].recording;
    var recordingText = isRecording ? 'stopRecord' : 'record';
    var recordAction = isRecording ? stopRecord : startRecordAction;
    var keypadText = dialpadShow ? 'hideKeypad' : 'showKeypad';
    var onHoldText = isOnHold ? 'unHold' : 'hold';
    var recordDisabled = recordPendingState || isOnHold || isOutboundCallConnecting || isOutboundCallOnVoiceMail;
    var holdDisabled = disableLinks || isOutboundCallConnecting;
    var moreActions = [{
      icon: _TransferCall["default"],
      key: 'transfer',
      onClick: onTransfer,
      iconClassName: (0, _classnames16["default"])(_defineProperty({}, _styles["default"].moreActionIcon, true)),
      text: _i18n["default"].getString('transfer', currentLocale)
    }, {
      icon: _Hold["default"],
      key: onHoldText,
      onClick: holdAction,
      iconClassName: (0, _classnames16["default"])((_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].moreActionIcon, true), _defineProperty(_classnames2, _styles["default"].holdActive, isOnHold), _classnames2)),
      disabled: holdDisabled,
      text: _i18n["default"].getString(onHoldText, currentLocale)
    }, {
      icon: isRecording ? _RecordOn["default"] : _RecordOff["default"],
      key: recordingText,
      onClick: recordAction,
      iconClassName: (0, _classnames16["default"])((_classnames3 = {}, _defineProperty(_classnames3, _styles["default"].moreActionIcon, true), _defineProperty(_classnames3, _styles["default"].recordingIcon, true), _defineProperty(_classnames3, _styles["default"].recordingDisabled, recordPendingState), _classnames3)),
      disabled: recordDisabled,
      text: _i18n["default"].getString(recordingText, currentLocale)
    }];
    var rootButtonProps = {
      icon: _MoreIcon["default"],
      tooltip: _i18n["default"].getString('more', currentLocale)
    };
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames16["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
    }, /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString(muteTitle, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: muteTitle,
      icon: muteIcon,
      onClick: muteAction,
      className: (0, _classnames16["default"])((_classnames4 = {}, _defineProperty(_classnames4, _styles["default"].button, true), _defineProperty(_classnames4, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _classnames4)),
      disabled: disableLinks || disabledCtrl
    })), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString(keypadText, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: keypadText,
      icon: _Dialpad["default"],
      className: (0, _classnames16["default"])((_classnames5 = {}, _defineProperty(_classnames5, _styles["default"].button, true), _defineProperty(_classnames5, _styles["default"].buttonDisabled, isInComingCall || disableLinks), _defineProperty(_classnames5, _styles["default"].dialpadIconActive, dialpadShow), _classnames5)),
      disabled: disableLinks || isInComingCall,
      onClick: toggleDialpadShow
    })), /*#__PURE__*/_react["default"].createElement(_MoreActionComponent.MoreActionComponent, {
      dataSign: "more",
      rootButtonProps: rootButtonProps,
      actionsList: moreActions,
      currentLocale: currentLocale,
      disabled: disableLinks || disabledCtrl,
      handleClick: _handleClick,
      handleClose: handleClose,
      anchorEl: anchorEl
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString(endTitle, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: endTitle,
      showBorder: false,
      icon: _End["default"],
      onClick: endAction,
      className: (0, _classnames16["default"])((_classnames6 = {}, _defineProperty(_classnames6, _styles["default"].hangup, true), _defineProperty(_classnames6, _styles["default"].button, true), _defineProperty(_classnames6, _styles["default"].buttonDisabled, disableLinks), _classnames6)),
      disabled: disableLinks
    }))), dialpadShow && /*#__PURE__*/_react["default"].createElement(_CallLogDialpad.CallLogDialpad, {
      className: (0, _classnames16["default"])(_styles["default"].smallDialpad, _defineProperty({}, _styles["default"].smallDiapadShow, dialpadShow)),
      onChange: function onChange(e) {
        sendDTMF(e);
      },
      onClose: toggleDialpadShow,
      isWide: isWide
    }));
  }

  if (isWebRTCCall && isInComingCall && !onGoingActiveCalls) {
    var _classnames9, _classnames10;

    var forwardTitle = _i18n["default"].getString('forward', currentLocale);

    var onForward = function onForward(e) {
      e.stopPropagation();
      handleClose();
      var selectdValue = e.currentTarget.attributes['data-value'].value;
      forward(selectdValue);
    };

    var forwardList = forwardingNumbers.map(function (phoneNumber) {
      return {
        key: phoneNumber.phoneNumber,
        text: phoneNumber.label,
        subText: phoneNumber.phoneNumber,
        onClick: function onClick(e) {
          return onForward(e);
        }
      };
    });
    forwardList.push({
      key: 'custom',
      text: _i18n["default"].getString('custom', currentLocale),
      onClick: function onClick(e) {
        return onForward(e);
      }
    });
    var _rootButtonProps = {
      icon: _Forward_white["default"],
      className: !!anchorEl && _styles["default"].rootButtonActive,
      tooltip: forwardTitle
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames16["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
    }, /*#__PURE__*/_react["default"].createElement(_MoreActionComponent.MoreActionComponent, {
      dataSign: !anchorEl ? 'forward' : 'forwardActive',
      rootButtonProps: _rootButtonProps,
      actionsList: forwardList,
      currentLocale: currentLocale,
      handleClick: function handleClick(e) {
        clickForwardTrack();

        _handleClick(e);
      },
      handleClose: handleClose,
      anchorEl: anchorEl,
      withSubText: true,
      popoverClasses: {
        paper: _styles["default"].forwardPopover
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('ignore', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "ignore",
      icon: _Ignore["default"],
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      className: (0, _classnames16["default"])(_defineProperty({}, _styles["default"].button, true)),
      disabled: disableLinks,
      onClick: ignore
    })), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('voicemail', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "voicemail",
      showBorder: false,
      icon: _Voicemail["default"],
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: endAction,
      className: (0, _classnames16["default"])((_classnames9 = {}, _defineProperty(_classnames9, _styles["default"].hangup, true), _defineProperty(_classnames9, _styles["default"].button, true), _defineProperty(_classnames9, _styles["default"].buttonDisabled, disableLinks), _classnames9)),
      disabled: disableLinks
    })), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('answer', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "answer",
      showBorder: false,
      icon: _Answer["default"],
      onClick: answer,
      className: (0, _classnames16["default"])((_classnames10 = {}, _defineProperty(_classnames10, _styles["default"].button, true), _defineProperty(_classnames10, _styles["default"].answer, true), _defineProperty(_classnames10, _styles["default"].buttonDisabled, disableLinks), _classnames10)),
      disabled: disableLinks
    })));
  }

  if (isWebRTCCall && onGoingActiveCalls && isInComingCall) {
    var _classnames11;

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames16["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
    }, /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "endAndAnswer",
      title: _i18n["default"].getString('answerAndEnd', currentLocale),
      className: _styles["default"].answerButton,
      onClick: answerAndEnd
    }, /*#__PURE__*/_react["default"].createElement(_EndAnswer["default"], null)), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('voicemail', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "voicemail",
      showBorder: false,
      icon: _Voicemail["default"],
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: endAction,
      className: (0, _classnames16["default"])((_classnames11 = {}, _defineProperty(_classnames11, _styles["default"].hangup, true), _defineProperty(_classnames11, _styles["default"].button, true), _defineProperty(_classnames11, _styles["default"].buttonDisabled, disableLinks), _classnames11)),
      disabled: disableLinks
    })), /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "holdAndAnswer",
      title: _i18n["default"].getString('answerAndHold', currentLocale),
      className: _styles["default"].answerButton,
      onClick: answerAndHold
    }, /*#__PURE__*/_react["default"].createElement(_HoldAnswer["default"], null)), /*#__PURE__*/_react["default"].createElement(_MoreActionWithForward.MoreActionWithForward, {
      currentLocale: currentLocale,
      disabled: disableLinks,
      forwardingNumbers: forwardingNumbers,
      forward: forward,
      ignore: ignore,
      clickForwardTrack: clickForwardTrack
    }));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames16["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(muteTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: muteTitle,
    icon: muteIcon,
    onClick: muteAction,
    className: (0, _classnames16["default"])((_classnames12 = {}, _defineProperty(_classnames12, _styles["default"].button, true), _defineProperty(_classnames12, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _classnames12)),
    disabled: disableLinks || disabledCtrl
  })), /*#__PURE__*/_react["default"].createElement("span", {
    ref: transferRef,
    title: _i18n["default"].getString('transfer', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: "transfer",
    icon: _Transfer["default"],
    onClick: onTransfer,
    className: (0, _classnames16["default"])((_classnames13 = {}, _defineProperty(_classnames13, _styles["default"].button, true), _defineProperty(_classnames13, _styles["default"].buttonActive, isOnTransfer), _defineProperty(_classnames13, _styles["default"].buttonDisabled, disableLinks || isInComingCall), _classnames13)),
    disabled: disableLinks || isInComingCall
  })), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(holdTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: holdTitle,
    icon: _Hold2["default"],
    onClick: holdAction,
    className: (0, _classnames16["default"])((_classnames14 = {}, _defineProperty(_classnames14, _styles["default"].button, true), _defineProperty(_classnames14, _styles["default"].buttonActive, isOnHold), _defineProperty(_classnames14, _styles["default"].buttonDisabled, isInComingCall || disableLinks || isOutboundCallConnecting), _classnames14)),
    disabled: disableLinks || isInComingCall || isOutboundCallConnecting
  })), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(endTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: endTitle,
    showBorder: false,
    icon: _End["default"],
    onClick: endAction,
    className: (0, _classnames16["default"])((_classnames15 = {}, _defineProperty(_classnames15, _styles["default"].hangup, true), _defineProperty(_classnames15, _styles["default"].button, true), _defineProperty(_classnames15, _styles["default"].buttonDisabled, disableLinks), _classnames15)),
    disabled: disableLinks
  })));
};

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
  sendDTMF: _propTypes["default"].func,
  forward: _propTypes["default"].func,
  answer: _propTypes["default"].func,
  forwardingNumbers: _propTypes["default"].array,
  ignore: _propTypes["default"].func,
  otherActiveCalls: _propTypes["default"].bool,
  answerAndHold: _propTypes["default"].func,
  answerAndEnd: _propTypes["default"].func,
  dialpadToggleTrack: _propTypes["default"].func,
  clickForwardTrack: _propTypes["default"].func,
  realOutboundCallStatus: _propTypes["default"].string
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
  sendDTMF: function sendDTMF() {},
  forward: function forward() {},
  answer: function answer() {},
  forwardingNumbers: [],
  ignore: function ignore() {},
  otherActiveCalls: false,
  answerAndEnd: function answerAndEnd() {},
  answerAndHold: function answerAndHold() {},
  dialpadToggleTrack: function dialpadToggleTrack(i) {},
  clickForwardTrack: function clickForwardTrack() {},
  realOutboundCallStatus: ''
};
var _default = CallLogCallCtrlComponent;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
