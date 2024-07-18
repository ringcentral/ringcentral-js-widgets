"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _telephonySessionStatus = require("@ringcentral-integration/commons/enums/telephonySessionStatus");
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _recordStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/recordStatus"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx23 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _Dialpad = _interopRequireDefault(require("../../assets/images/Dialpad.svg"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _EndAnswer = _interopRequireDefault(require("../../assets/images/EndAnswer.svg"));
var _Forward_white = _interopRequireDefault(require("../../assets/images/Forward_white.svg"));
var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));
var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));
var _MergeIntoConferenceIcon = _interopRequireDefault(require("../../assets/images/MergeIntoConferenceIcon.svg"));
var _MoreIcon = _interopRequireDefault(require("../../assets/images/MoreIcon.svg"));
var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));
var _RecordOff = _interopRequireDefault(require("../../assets/images/RecordOff.svg"));
var _RecordOn = _interopRequireDefault(require("../../assets/images/RecordOn.svg"));
var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));
var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));
var _CircleButton = require("../CircleButton");
var _CallLogDialpad = require("./CallLogDialpad");
var _MoreActionComponent = require("./MoreActionComponent");
var _MoreActionWithIncomingCall = require("./MoreActionWithIncomingCall");
var _i18n = _interopRequireDefault(require("./i18n"));
var _style = require("./style");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable jsx-a11y/no-static-element-interactions */ /* eslint-disable jsx-a11y/click-events-have-key-events */
var recodingVoiceTime = 6781;
var CallLogCallCtrlComponent = function CallLogCallCtrlComponent(props) {
  var _clsx19, _clsx20, _clsx21, _clsx22;
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
    onAddCall = props.onAddCall,
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
    allowPickupCall = props.allowPickupCall,
    showConferenceCall = props.showConferenceCall,
    isCurrentCall = props.isCurrentCall,
    onMergeCall = props.onMergeCall; // reject conditions: call direction is inbound & call status is ringing
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
    var _clsx, _clsx2, _clsx3, _clsx4, _clsx5, _clsx8, _clsx9, _clsx11, _clsx12, _clsx13, _clsx14;
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
      iconClassName: (0, _clsx23["default"])((_clsx = {}, _defineProperty(_clsx, _styles["default"].moreActionIcon, true), _defineProperty(_clsx, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _defineProperty(_clsx, _styles["default"].moreActionIconActive, isOnMute), _clsx)),
      disabled: disableLinks || disabledCtrl,
      text: _i18n["default"].getString(muteTitle, currentLocale)
    }, {
      icon: _Dialpad["default"],
      key: keypadText,
      onClick: function onClick() {
        handleClose();
        toggleDialpadShow();
      },
      iconClassName: (0, _clsx23["default"])((_clsx2 = {}, _defineProperty(_clsx2, _styles["default"].moreActionIcon, true), _defineProperty(_clsx2, _styles["default"].buttonDisabled, isInComingCall || disableLinks), _defineProperty(_clsx2, _styles["default"].moreActionIconActive, dialpadShow), _clsx2)),
      disabled: disableLinks || isInComingCall,
      text: _i18n["default"].getString(keypadText, currentLocale)
    }, {
      icon: _junoIcon.Hold,
      key: onHoldText,
      onClick: holdAction,
      iconClassName: (0, _clsx23["default"])((_clsx3 = {}, _defineProperty(_clsx3, _styles["default"].moreActionIcon, true), _defineProperty(_clsx3, _styles["default"].holdActive, isOnHold), _clsx3)),
      disabled: holdDisabled,
      text: _i18n["default"].getString(onHoldText, currentLocale)
    }, {
      icon: isRecording ? _RecordOn["default"] : _RecordOff["default"],
      key: recordingText,
      onClick: recordAction,
      iconClassName: (0, _clsx23["default"])((_clsx4 = {}, _defineProperty(_clsx4, _styles["default"].moreActionIcon, true), _defineProperty(_clsx4, _styles["default"].recordingIcon, true), _defineProperty(_clsx4, _styles["default"].recordingDisabled, recordPendingState), _clsx4)),
      disabled: recordDisabled,
      text: _i18n["default"].getString(recordingText, currentLocale)
    }, {
      icon: _End["default"],
      key: endTitle,
      onClick: function onClick() {
        handleClose();
        endAction === null || endAction === void 0 ? void 0 : endAction();
      },
      iconClassName: (0, _clsx23["default"])((_clsx5 = {}, _defineProperty(_clsx5, _styles["default"].buttonDisabled, disableLinks), _defineProperty(_clsx5, _styles["default"].endIcon, true), _clsx5)),
      disabled: disableLinks,
      text: _i18n["default"].getString(endTitle, currentLocale)
    }];
    var conferenceItem = showConferenceCall ? [{
      icon: _junoIcon.CallAdd,
      key: 'add',
      onClick: onAddCall,
      iconClassName: (0, _clsx23["default"])(_defineProperty({}, _styles["default"].moreActionIcon, true)),
      text: _i18n["default"].getString('add', currentLocale)
    }] : [];
    var moreActions = [].concat(conferenceItem, [{
      icon: _junoIcon.TransferCall,
      key: 'transfer',
      onClick: onTransfer,
      iconClassName: (0, _clsx23["default"])(_defineProperty({}, _styles["default"].moreActionIcon, true)),
      text: _i18n["default"].getString('transfer', currentLocale)
    }, {
      icon: _junoIcon.Hold,
      key: onHoldText,
      onClick: holdAction,
      iconClassName: (0, _clsx23["default"])((_clsx8 = {}, _defineProperty(_clsx8, _styles["default"].moreActionIcon, true), _defineProperty(_clsx8, _styles["default"].holdActive, isOnHold), _clsx8)),
      disabled: holdDisabled,
      text: _i18n["default"].getString(onHoldText, currentLocale)
    }, {
      icon: isRecording ? _RecordOn["default"] : _RecordOff["default"],
      key: recordingText,
      onClick: recordAction,
      iconClassName: (0, _clsx23["default"])((_clsx9 = {}, _defineProperty(_clsx9, _styles["default"].moreActionIcon, true), _defineProperty(_clsx9, _styles["default"].recordingIcon, true), _defineProperty(_clsx9, _styles["default"].recordingDisabled, recordPendingState), _clsx9)),
      disabled: recordDisabled,
      text: _i18n["default"].getString(recordingText, currentLocale)
    }]);
    var rootButtonProps = {
      icon: _MoreIcon["default"],
      junoIcon: _junoIcon.CallMore,
      tooltip: _i18n["default"].getString('more', currentLocale)
    };
    var DialPadCom = dialpadShow && /*#__PURE__*/_react["default"].createElement(_CallLogDialpad.CallLogDialpad, {
      className: (0, _clsx23["default"])(_styles["default"].smallDialpad, _defineProperty({}, _styles["default"].smallDiapadShow, dialpadShow)),
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
        className: (0, _clsx23["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
      }, /*#__PURE__*/_react["default"].createElement(_style.CompleteTransferButton, {
        $isWide: isWide,
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
      className: (0, _clsx23["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
    }, showConferenceCall && isWide && !isCurrentCall && /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
      title: _i18n["default"].getString('mergeCall', currentLocale),
      dataSign: "mergeCall",
      icon: _MergeIntoConferenceIcon["default"],
      onClick: onMergeCall,
      className: (0, _clsx23["default"])((_clsx11 = {}, _defineProperty(_clsx11, _styles["default"].button, true), _defineProperty(_clsx11, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _clsx11)),
      disabled: disableLinks || disabledCtrl
    }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
      title: _i18n["default"].getString(muteTitle, currentLocale),
      dataSign: muteTitle,
      icon: muteIcon,
      onClick: muteAction,
      className: (0, _clsx23["default"])((_clsx12 = {}, _defineProperty(_clsx12, _styles["default"].button, true), _defineProperty(_clsx12, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _clsx12)),
      disabled: disableLinks || disabledCtrl
    }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
      title: _i18n["default"].getString(keypadText, currentLocale),
      dataSign: keypadText,
      icon: _Dialpad["default"],
      className: (0, _clsx23["default"])((_clsx13 = {}, _defineProperty(_clsx13, _styles["default"].button, true), _defineProperty(_clsx13, _styles["default"].buttonDisabled, isInComingCall || disableLinks), _defineProperty(_clsx13, _styles["default"].dialpadIconActive, dialpadShow), _clsx13)),
      disabled: disableLinks || isInComingCall,
      onClick: toggleDialpadShow
    }), /*#__PURE__*/_react["default"].createElement(_MoreActionComponent.MoreActionComponent, {
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
    }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
      title: _i18n["default"].getString(endTitle, currentLocale),
      dataSign: endTitle,
      showBorder: false,
      icon: _End["default"],
      onClick: endAction,
      className: (0, _clsx23["default"])((_clsx14 = {}, _defineProperty(_clsx14, _styles["default"].hangup, true), _defineProperty(_clsx14, _styles["default"].button, true), _defineProperty(_clsx14, _styles["default"].buttonDisabled, disableLinks), _clsx14)),
      disabled: disableLinks
    })), DialPadCom);
  }
  if ((allowPickupCall || isWebRTCCall) && isInComingCall && !onGoingActiveCalls) {
    var _clsx15, _clsx16, _clsx17;
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
      className: (0, _clsx23["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
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
    }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
      title: _i18n["default"].getString('ignore', currentLocale),
      dataSign: "ignore",
      icon: _junoIcon.Ignore,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      className: (0, _clsx23["default"])((_clsx15 = {}, _defineProperty(_clsx15, _styles["default"].button, true), _defineProperty(_clsx15, _styles["default"].buttonDisabled, disableLinks || !isWebRTCCall), _clsx15)),
      disabled: disableLinks || !isWebRTCCall,
      onClick: ignore
    }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
      title: _i18n["default"].getString('voicemail', currentLocale),
      dataSign: "toVoiceMail",
      showBorder: false,
      icon: _junoIcon.Voicemail,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: endAction,
      className: (0, _clsx23["default"])((_clsx16 = {}, _defineProperty(_clsx16, _styles["default"].hangup, true), _defineProperty(_clsx16, _styles["default"].button, true), _defineProperty(_clsx16, _styles["default"].buttonDisabled, disableLinks), _clsx16)),
      disabled: disableLinks
    }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
      title: _i18n["default"].getString('answer', currentLocale),
      dataSign: "answer",
      showBorder: false,
      icon: _Answer["default"],
      onClick: answer,
      className: (0, _clsx23["default"])((_clsx17 = {}, _defineProperty(_clsx17, _styles["default"].button, true), _defineProperty(_clsx17, _styles["default"].answer, true), _defineProperty(_clsx17, _styles["default"].buttonDisabled, disableLinks), _clsx17)),
      disabled: disableLinks
    }));
  }
  if ((allowPickupCall || isWebRTCCall) && isInComingCall && onGoingActiveCalls) {
    var _clsx18;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx23["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
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
    }, /*#__PURE__*/_react["default"].createElement(_EndAnswer["default"], null)), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
      title: _i18n["default"].getString('voicemail', currentLocale),
      dataSign: "voicemail",
      showBorder: false,
      icon: _junoIcon.Voicemail,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: endAction,
      className: (0, _clsx23["default"])((_clsx18 = {}, _defineProperty(_clsx18, _styles["default"].hangup, true), _defineProperty(_clsx18, _styles["default"].button, true), _defineProperty(_clsx18, _styles["default"].buttonDisabled, disableLinks), _clsx18)),
      disabled: disableLinks
    }), /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "holdAndAnswer",
      title: _i18n["default"].getString('answerAndHold', currentLocale),
      className: _styles["default"].answerButton,
      onClick: answerAndHold
    }, /*#__PURE__*/_react["default"].createElement(_HoldAnswer["default"], null)));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx23["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].root)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
    title: _i18n["default"].getString(muteTitle, currentLocale),
    dataSign: muteTitle,
    icon: muteIcon,
    onClick: muteAction,
    className: (0, _clsx23["default"])((_clsx19 = {}, _defineProperty(_clsx19, _styles["default"].button, true), _defineProperty(_clsx19, _styles["default"].buttonDisabled, disableLinks || disabledCtrl), _clsx19)),
    disabled: disableLinks || disabledCtrl
  }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
    ref: transferRef,
    title: _i18n["default"].getString('transfer', currentLocale),
    dataSign: "transfer",
    icon: _Transfer["default"],
    onClick: onTransfer,
    className: (0, _clsx23["default"])((_clsx20 = {}, _defineProperty(_clsx20, _styles["default"].button, true), _defineProperty(_clsx20, _styles["default"].buttonActive, isOnTransfer), _defineProperty(_clsx20, _styles["default"].buttonDisabled, disableLinks || isInComingCall), _clsx20)),
    disabled: disableLinks || isInComingCall
  }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
    title: _i18n["default"].getString(holdTitle, currentLocale),
    dataSign: holdTitle,
    icon: _Hold["default"],
    onClick: holdAction,
    className: (0, _clsx23["default"])((_clsx21 = {}, _defineProperty(_clsx21, _styles["default"].button, true), _defineProperty(_clsx21, _styles["default"].buttonActive, isOnHold), _defineProperty(_clsx21, _styles["default"].buttonDisabled, isInComingCall || disableLinks || isOutboundCallConnecting), _clsx21)),
    disabled: disableLinks || isInComingCall || isOutboundCallConnecting
  }), /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
    title: _i18n["default"].getString(endTitle, currentLocale),
    dataSign: endTitle,
    showBorder: false,
    icon: _End["default"],
    onClick: endAction,
    className: (0, _clsx23["default"])((_clsx22 = {}, _defineProperty(_clsx22, _styles["default"].hangup, true), _defineProperty(_clsx22, _styles["default"].button, true), _defineProperty(_clsx22, _styles["default"].buttonDisabled, disableLinks), _clsx22)),
    disabled: disableLinks
  }));
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
  dialpadToggleTrack: function dialpadToggleTrack() {},
  clickForwardTrack: function clickForwardTrack() {},
  realOutboundCallStatus: ''
};
var _default = CallLogCallCtrlComponent;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
