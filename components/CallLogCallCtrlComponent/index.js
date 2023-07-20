"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _classnames21 = _interopRequireDefault(require("classnames"));
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _telephonySessionStatus = require("@ringcentral-integration/commons/enums/telephonySessionStatus");
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _recordStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/recordStatus"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _Dialpad = _interopRequireDefault(require("../../assets/images/Dialpad.svg"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _EndAnswer = _interopRequireDefault(require("../../assets/images/EndAnswer.svg"));
var _Forward_white = _interopRequireDefault(require("../../assets/images/Forward_white.svg"));
var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));
var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));
var _MoreIcon = _interopRequireDefault(require("../../assets/images/MoreIcon.svg"));
var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));
var _RecordOff = _interopRequireDefault(require("../../assets/images/RecordOff.svg"));
var _RecordOn = _interopRequireDefault(require("../../assets/images/RecordOn.svg"));
var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));
var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _CallLogDialpad = require("./CallLogDialpad");
var _i18n = _interopRequireDefault(require("./i18n"));
var _MoreActionComponent = require("./MoreActionComponent");
var _MoreActionWithIncomingCall = require("./MoreActionWithIncomingCall");
var _style = require("./style");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var recodingVoiceTime = 6781;
var CallLogCallCtrlComponent = function CallLogCallCtrlComponent(props) {
  var _classnames17, _classnames18, _classnames19, _classnames20;
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
    onCompleteWarmTransfer = props.onCompleteWarmTransfer,
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
    reply = props.reply,
    forwardingNumbers = props.forwardingNumbers,
    ignore = props.ignore,
    otherActiveCalls = props.otherActiveCalls,
    answerAndHold = props.answerAndHold,
    answerAndEnd = props.answerAndEnd,
    realOutboundCallStatus = props.realOutboundCallStatus,
    dialpadToggleTrack = props.dialpadToggleTrack,
    clickForwardTrack = props.clickForwardTrack,
    warmTransferActiveTelephonySessionId = props.warmTransferActiveTelephonySessionId,
    enableReply = props.enableReply,
    allowPickupCall = props.allowPickupCall; // reject conditions: call direction is inbound & call status is ringing
  var isInComingCall = _callDirections["default"].inbound === callDirection && _telephonyStatus["default"].ringing === callStatus;
  // real outbound call status
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
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    dialpadToggleTrack(!dialpadShow);
    onDialpadShow(!dialpadShow);
  };
  // WebRTC logic
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
    // @ts-expect-error TS(2345): Argument of type 'EventTarget & HTMLButtonElement'... Remove this comment to see the full error message
    setAnchorEl(event.currentTarget);
  };
  var handleClose = function handleClose() {
    setAnchorEl(null);
  };
  var isWebRTCCall = isCurrentDeviceCall;
  var onGoingActiveCalls = otherActiveCalls;
  var warmTransferCall = !!warmTransferActiveTelephonySessionId;
  var showExtraCallControl = warmTransferCall || isWebRTCCall;
  if (showExtraCallControl && _callDirections["default"].outbound === callDirection || showExtraCallControl && _callDirections["default"].inbound === callDirection && callStatus !== _telephonyStatus["default"].ringing) {
    var _classnames, _classnames2, _classnames3, _classnames4, _classnames5, _classnames7, _classnames8, _classnames10, _classnames11, _classnames12;
    var isRecording = recordStatus === _recordStatus["default"].recording;
    var recordingText = isRecording ? 'stopRecord' : 'record';
    var recordAction = isRecording ? stopRecord : startRecordAction;
    var keypadText = dialpadShow ? 'hideKeypad' : 'showKeypad';
    var onHoldText = isOnHold ? 'unHold' : 'hold';
    var recordDisabled = recordPendingState || isOnHold || isOutboundCallConnecting || isOutboundCallOnVoiceMail;
    var holdDisabled = disableLinks || isOutboundCallConnecting;
    var warmTransferMoreActions = [{
      icon: muteIcon,
      key: muteTitle,
      onClick: muteAction,
      iconClassName: (0, _classnames21["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].moreActionIcon, true), _defineProperty(_classnames, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _defineProperty(_classnames, _styles["default"].moreActionIconActive, isOnMute), _classnames)),
      disabled: disableLinks || disabledCtrl,
      text: _i18n["default"].getString(muteTitle, currentLocale)
    }, {
      icon: _Dialpad["default"],
      key: keypadText,
      onClick: function onClick() {
        handleClose();
        toggleDialpadShow();
      },
      iconClassName: (0, _classnames21["default"])((_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].moreActionIcon, true), _defineProperty(_classnames2, _styles["default"].buttonDisabled, isInComingCall || disableLinks), _defineProperty(_classnames2, _styles["default"].moreActionIconActive, dialpadShow), _classnames2)),
      disabled: disableLinks || isInComingCall,
      text: _i18n["default"].getString(keypadText, currentLocale)
    }, {
      icon: _junoIcon.Hold,
      key: onHoldText,
      onClick: holdAction,
      iconClassName: (0, _classnames21["default"])((_classnames3 = {}, _defineProperty(_classnames3, _styles["default"].moreActionIcon, true), _defineProperty(_classnames3, _styles["default"].holdActive, isOnHold), _classnames3)),
      disabled: holdDisabled,
      text: _i18n["default"].getString(onHoldText, currentLocale)
    }, {
      icon: isRecording ? _RecordOn["default"] : _RecordOff["default"],
      key: recordingText,
      onClick: recordAction,
      iconClassName: (0, _classnames21["default"])((_classnames4 = {}, _defineProperty(_classnames4, _styles["default"].moreActionIcon, true), _defineProperty(_classnames4, _styles["default"].recordingIcon, true), _defineProperty(_classnames4, _styles["default"].recordingDisabled, recordPendingState), _classnames4)),
      disabled: recordDisabled,
      text: _i18n["default"].getString(recordingText, currentLocale)
    }, {
      icon: _End["default"],
      key: endTitle,
      onClick: function onClick() {
        handleClose();
        endAction === null || endAction === void 0 ? void 0 : endAction();
      },
      iconClassName: (0, _classnames21["default"])((_classnames5 = {}, _defineProperty(_classnames5, _styles["default"].buttonDisabled, disableLinks), _defineProperty(_classnames5, _styles["default"].endIcon, true), _classnames5)),
      disabled: disableLinks,
      text: _i18n["default"].getString(endTitle, currentLocale)
    }];
    var moreActions = [{
      icon: _junoIcon.TransferCall,
      key: 'transfer',
      onClick: onTransfer,
      iconClassName: (0, _classnames21["default"])(_defineProperty({}, _styles["default"].moreActionIcon, true)),
      text: _i18n["default"].getString('transfer', currentLocale)
    }, {
      icon: _junoIcon.Hold,
      key: onHoldText,
      onClick: holdAction,
      iconClassName: (0, _classnames21["default"])((_classnames7 = {}, _defineProperty(_classnames7, _styles["default"].moreActionIcon, true), _defineProperty(_classnames7, _styles["default"].holdActive, isOnHold), _classnames7)),
      disabled: holdDisabled,
      text: _i18n["default"].getString(onHoldText, currentLocale)
    }, {
      icon: isRecording ? _RecordOn["default"] : _RecordOff["default"],
      key: recordingText,
      onClick: recordAction,
      iconClassName: (0, _classnames21["default"])((_classnames8 = {}, _defineProperty(_classnames8, _styles["default"].moreActionIcon, true), _defineProperty(_classnames8, _styles["default"].recordingIcon, true), _defineProperty(_classnames8, _styles["default"].recordingDisabled, recordPendingState), _classnames8)),
      disabled: recordDisabled,
      text: _i18n["default"].getString(recordingText, currentLocale)
    }];
    var rootButtonProps = {
      icon: _MoreIcon["default"],
      junoIcon: _junoIcon.CallMore,
      tooltip: _i18n["default"].getString('more', currentLocale)
    };
    var DialPadCom = dialpadShow && /*#__PURE__*/_react["default"].createElement(_CallLogDialpad.CallLogDialpad, {
      className: (0, _classnames21["default"])(_styles["default"].smallDialpad, _defineProperty({}, _styles["default"].smallDiapadShow, dialpadShow)),
      onChange: function onChange(e) {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        sendDTMF(e);
      },
      onClose: toggleDialpadShow,
      isWide: isWide
    });
    if (warmTransferActiveTelephonySessionId) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButtonGroup, {
        "data-sign": "warmTransferControlButtonsWrap",
        className: (0, _classnames21["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
      }, /*#__PURE__*/_react["default"].createElement(_style.CompleteTransferButton, {
        isWide: isWide,
        "data-sign": "completeTransfer",
        disabled: disableLinks || disabledCtrl,
        color: "positive",
        radius: "round",
        disabledVariant: "mask",
        fullWidth: true,
        onClick: onCompleteWarmTransfer
      }, _i18n["default"].getString('completeTransfer', currentLocale)), /*#__PURE__*/_react["default"].createElement(_MoreActionComponent.MoreActionComponent, {
        dataSign: "more"
        // @ts-expect-error TS(2741): Property 'className' is missing in type '{ icon: a... Remove this comment to see the full error message
        ,
        rootButtonProps: rootButtonProps
        // @ts-expect-error TS(2322): Type '({ icon: any; key: string; onClick: ((...arg... Remove this comment to see the full error message
        ,
        actionsList: warmTransferMoreActions
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        ,
        currentLocale: currentLocale,
        disabled: disableLinks || disabledCtrl
        // @ts-expect-error TS(2322): Type '(event: React.MouseEvent<HTMLButtonElement>)... Remove this comment to see the full error message
        ,
        handleClick: _handleClick,
        handleClose: handleClose,
        anchorEl: anchorEl,
        useJunoIcon: true
      })), DialPadCom);
    }
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames21["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
    }, /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString(muteTitle, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: muteTitle,
      icon: muteIcon,
      onClick: muteAction,
      className: (0, _classnames21["default"])((_classnames10 = {}, _defineProperty(_classnames10, _styles["default"].button, true), _defineProperty(_classnames10, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _classnames10)),
      disabled: disableLinks || disabledCtrl
    })), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString(keypadText, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: keypadText,
      icon: _Dialpad["default"],
      className: (0, _classnames21["default"])((_classnames11 = {}, _defineProperty(_classnames11, _styles["default"].button, true), _defineProperty(_classnames11, _styles["default"].buttonDisabled, isInComingCall || disableLinks), _defineProperty(_classnames11, _styles["default"].dialpadIconActive, dialpadShow), _classnames11)),
      disabled: disableLinks || isInComingCall,
      onClick: toggleDialpadShow
    })), /*#__PURE__*/_react["default"].createElement(_MoreActionComponent.MoreActionComponent, {
      dataSign: "more"
      // @ts-expect-error TS(2322): Type '{ icon: any; junoIcon: React.MemoExoticCompo... Remove this comment to see the full error message
      ,
      rootButtonProps: rootButtonProps
      // @ts-expect-error TS(2322): Type '({ icon: MemoExoticComponent<ForwardRefExoti... Remove this comment to see the full error message
      ,
      actionsList: moreActions
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      currentLocale: currentLocale,
      disabled: disableLinks || disabledCtrl
      // @ts-expect-error TS(2322): Type '(event: React.MouseEvent<HTMLButtonElement>)... Remove this comment to see the full error message
      ,
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
      className: (0, _classnames21["default"])((_classnames12 = {}, _defineProperty(_classnames12, _styles["default"].hangup, true), _defineProperty(_classnames12, _styles["default"].button, true), _defineProperty(_classnames12, _styles["default"].buttonDisabled, disableLinks), _classnames12)),
      disabled: disableLinks
    }))), DialPadCom);
  }
  if ((allowPickupCall || isWebRTCCall) && isInComingCall && !onGoingActiveCalls) {
    var _classnames13, _classnames14, _classnames15;
    var forwardTitle = _i18n["default"].getString('forward', currentLocale);
    var onForward = function onForward(e) {
      e.stopPropagation();
      handleClose();
      var selectdValue = e.currentTarget.attributes['data-value'].value;
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      forward(selectdValue);
    };
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
    // @ts-expect-error TS(2345): Argument of type '{ key: string; text: string; onC... Remove this comment to see the full error message
    forwardList.push({
      key: 'custom',
      text: _i18n["default"].getString('custom', currentLocale),
      onClick: function onClick(e) {
        return onForward(e);
      }
    });
    var _rootButtonProps = {
      icon: _Forward_white["default"],
      tooltip: forwardTitle
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames21["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
    }, enableReply ? /*#__PURE__*/_react["default"].createElement(_MoreActionWithIncomingCall.MoreActionWithIncomingCall
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    , {
      currentLocale: currentLocale
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      disabled: disableLinks
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      forwardingNumbers: forwardingNumbers
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      forward: forward,
      enableReply: enableReply
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      reply: reply,
      clickForwardTrack: clickForwardTrack
    }) : /*#__PURE__*/_react["default"].createElement(_MoreActionComponent.MoreActionComponent, {
      dataSign: !anchorEl ? 'forward' : 'forwardActive'
      // @ts-expect-error TS(2322): Type '{ icon: any; className: boolean; tooltip: st... Remove this comment to see the full error message
      ,
      rootButtonProps: _rootButtonProps
      // @ts-expect-error TS(2322): Type '{ key: any; text: any; subText: any; onClick... Remove this comment to see the full error message
      ,
      actionsList: forwardList
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      currentLocale: currentLocale
      // @ts-expect-error TS(2322): Type '(e: any) => void' is not assignable to type ... Remove this comment to see the full error message
      ,
      handleClick: function handleClick(e) {
        clickForwardTrack();
        _handleClick(e);
      },
      handleClose: handleClose,
      anchorEl: anchorEl,
      withSubText: true
      // @ts-expect-error TS(2741): Property 'root' is missing in type '{ paper: strin... Remove this comment to see the full error message
      ,
      popoverClasses: {
        paper: _styles["default"].forwardPopover
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('ignore', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "ignore",
      icon: _junoIcon.Ignore,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      className: (0, _classnames21["default"])((_classnames13 = {}, _defineProperty(_classnames13, _styles["default"].button, true), _defineProperty(_classnames13, _styles["default"].buttonDisabled, disableLinks || !isWebRTCCall), _classnames13)),
      disabled: disableLinks || !isWebRTCCall,
      onClick: ignore
    })), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('voicemail', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "toVoiceMail",
      showBorder: false,
      icon: _junoIcon.Voicemail,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: endAction,
      className: (0, _classnames21["default"])((_classnames14 = {}, _defineProperty(_classnames14, _styles["default"].hangup, true), _defineProperty(_classnames14, _styles["default"].button, true), _defineProperty(_classnames14, _styles["default"].buttonDisabled, disableLinks), _classnames14)),
      disabled: disableLinks
    })), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('answer', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "answer",
      showBorder: false,
      icon: _Answer["default"],
      onClick: answer,
      className: (0, _classnames21["default"])((_classnames15 = {}, _defineProperty(_classnames15, _styles["default"].button, true), _defineProperty(_classnames15, _styles["default"].answer, true), _defineProperty(_classnames15, _styles["default"].buttonDisabled, disableLinks), _classnames15)),
      disabled: disableLinks
    })));
  }
  if ((allowPickupCall || isWebRTCCall) && isInComingCall && onGoingActiveCalls) {
    var _classnames16;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames21["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
    }, /*#__PURE__*/_react["default"].createElement(_MoreActionWithIncomingCall.MoreActionWithIncomingCall, {
      disableIgnore: !isWebRTCCall
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      currentLocale: currentLocale
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      disabled: disableLinks
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      forwardingNumbers: forwardingNumbers
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      forward: forward,
      ignore: ignore,
      enableReply: enableReply
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      ,
      reply: reply,
      clickForwardTrack: clickForwardTrack
    }), /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "endAndAnswer",
      title: _i18n["default"].getString('answerAndEnd', currentLocale),
      className: _styles["default"].answerButton,
      onClick: answerAndEnd
    }, /*#__PURE__*/_react["default"].createElement(_EndAnswer["default"], null)), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('voicemail', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "voicemail",
      showBorder: false,
      icon: _junoIcon.Voicemail,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: endAction,
      className: (0, _classnames21["default"])((_classnames16 = {}, _defineProperty(_classnames16, _styles["default"].hangup, true), _defineProperty(_classnames16, _styles["default"].button, true), _defineProperty(_classnames16, _styles["default"].buttonDisabled, disableLinks), _classnames16)),
      disabled: disableLinks
    })), /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "holdAndAnswer",
      title: _i18n["default"].getString('answerAndHold', currentLocale),
      className: _styles["default"].answerButton,
      onClick: answerAndHold
    }, /*#__PURE__*/_react["default"].createElement(_HoldAnswer["default"], null)));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames21["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(muteTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: muteTitle,
    icon: muteIcon,
    onClick: muteAction,
    className: (0, _classnames21["default"])((_classnames17 = {}, _defineProperty(_classnames17, _styles["default"].button, true), _defineProperty(_classnames17, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _classnames17)),
    disabled: disableLinks || disabledCtrl
  })), /*#__PURE__*/_react["default"].createElement("span", {
    ref: transferRef,
    title: _i18n["default"].getString('transfer', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: "transfer",
    icon: _Transfer["default"],
    onClick: onTransfer,
    className: (0, _classnames21["default"])((_classnames18 = {}, _defineProperty(_classnames18, _styles["default"].button, true), _defineProperty(_classnames18, _styles["default"].buttonActive, isOnTransfer), _defineProperty(_classnames18, _styles["default"].buttonDisabled, disableLinks || isInComingCall), _classnames18)),
    disabled: disableLinks || isInComingCall
  })), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(holdTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: holdTitle,
    icon: _Hold["default"],
    onClick: holdAction,
    className: (0, _classnames21["default"])((_classnames19 = {}, _defineProperty(_classnames19, _styles["default"].button, true), _defineProperty(_classnames19, _styles["default"].buttonActive, isOnHold), _defineProperty(_classnames19, _styles["default"].buttonDisabled, isInComingCall || disableLinks || isOutboundCallConnecting), _classnames19)),
    disabled: disableLinks || isInComingCall || isOutboundCallConnecting
  })), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString(endTitle, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: endTitle,
    showBorder: false,
    icon: _End["default"],
    onClick: endAction,
    className: (0, _classnames21["default"])((_classnames20 = {}, _defineProperty(_classnames20, _styles["default"].hangup, true), _defineProperty(_classnames20, _styles["default"].button, true), _defineProperty(_classnames20, _styles["default"].buttonDisabled, disableLinks), _classnames20)),
    disabled: disableLinks
  })));
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
