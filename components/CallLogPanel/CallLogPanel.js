"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _ConferenceCallParticipants = require("../ConferenceCallParticipants");
var _LogBasicInfoV = _interopRequireDefault(require("../LogBasicInfoV2"));
var _NotificationSection = _interopRequireDefault(require("../NotificationSection"));
var _NotificationSectionV = _interopRequireDefault(require("../NotificationSectionV2"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _WebRTCNotificationSection = _interopRequireDefault(require("../WebRTCNotificationSection"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Call log enhancement
 */
var getWarmTransferSession = function getWarmTransferSession(_ref) {
  var _transferLog$call;
  var mainLog = _ref.mainLog,
    transferLog = _ref.transferLog,
    activeTelephonySessionId = _ref.activeTelephonySessionId;
  if (!transferLog || !(transferLog === null || transferLog === void 0 ? void 0 : transferLog.call) || (transferLog === null || transferLog === void 0 ? void 0 : (_transferLog$call = transferLog.call) === null || _transferLog$call === void 0 ? void 0 : _transferLog$call.telephonySessionId) !== activeTelephonySessionId) {
    return {
      activeLog: mainLog,
      subLog: transferLog
    };
  }
  return {
    activeLog: transferLog,
    subLog: mainLog
  };
};
var CallLogPanel = exports["default"] = /*#__PURE__*/function (_Component) {
  function CallLogPanel(props) {
    var _this;
    _classCallCheck(this, CallLogPanel);
    _this = _callSuper(this, CallLogPanel, [props]);
    _this.toggleConference = function (open) {
      if (open) {
        var _this$props$clickPart, _this$props;
        (_this$props$clickPart = (_this$props = _this.props).clickParticipantsIconTrack) === null || _this$props$clickPart === void 0 ? void 0 : _this$props$clickPart.call(_this$props);
      }
      _this.setState({
        showConferenceCallParticipants: open
      });
    };
    _this.toggleLeaveConferenceCallComponent = function (open) {
      _this.setState({
        showLeaveConferenceCallComponent: open
      });
    };
    _this.editSectionRef = /*#__PURE__*/_react["default"].createRef();
    _this.editSectionScrollBy = function (top) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      _this.editSectionRef.current.scrollBy({
        top: top,
        behavior: 'smooth'
      });
    };
    _this.state = {
      showConferenceCallParticipants: false,
      showLeaveConferenceCallComponent: false
    };
    return _this;
  }
  _inherits(CallLogPanel, _Component);
  return _createClass(CallLogPanel, [{
    key: "UNSAFE_componentWillMount",
    value:
    // TODO: use react function component to refactor with react hook
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function UNSAFE_componentWillMount() {
      var pushLogPageStatus = this.props.pushLogPageStatus;
      if (pushLogPageStatus) {
        pushLogPageStatus(true);
      }
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var pushLogPageStatus = this.props.pushLogPageStatus;
      if (pushLogPageStatus) {
        pushLogPageStatus(false);
      }
    }
  }, {
    key: "renderLogSection",
    value: function renderLogSection() {
      var _this$props2 = this.props,
        currentLog = _this$props2.currentLog,
        currentLocale = _this$props2.currentLocale,
        warmTransferLog = _this$props2.warmTransferLog,
        warmTransferActiveTelephonySessionId = _this$props2.warmTransferActiveTelephonySessionId,
        renderEditLogSection = _this$props2.renderEditLogSection,
        editSection = _this$props2.classes.editSection,
        renderKeypadPanel = _this$props2.renderKeypadPanel;
      if (!currentLog) return null;
      var showSpinner = this.props.showSpinner;
      if (currentLog.showSpinner || showSpinner) {
        return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
          className: _styles["default"].spinner
        });
      }
      var _getWarmTransferSessi = getWarmTransferSession({
          mainLog: currentLog,
          transferLog: warmTransferLog,
          activeTelephonySessionId: warmTransferActiveTelephonySessionId
        }),
        activeLog = _getWarmTransferSessi.activeLog;
      var call = activeLog.call;
      // @ts-expect-error TS(2339): Property 'telephonySessionId' does not exist on ty... Remove this comment to see the full error message
      var telephonySessionId = call.telephonySessionId,
        webphoneSession = call.webphoneSession;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.renderLogNotification(), this.renderLogBasicInfo(), this.renderConferenceCallParticipants(), /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.editSectionRef,
        className: (0, _clsx["default"])(_styles["default"].editSection, editSection)
      }, renderEditLogSection && this.getEditLogSection()), renderKeypadPanel && renderKeypadPanel(), this.getCallControlButtons());
    }
  }, {
    key: "getCallControlButtons",
    value: function getCallControlButtons() {
      var _this$props3 = this.props,
        currentLog = _this$props3.currentLog,
        _this$props3$classes$ = _this$props3.classes.callLogCallControl,
        callLogCallControl = _this$props3$classes$ === void 0 ? null : _this$props3$classes$,
        callLogCallControlRef = _this$props3.refs.callLogCallControl,
        renderCallLogCallControl = _this$props3.renderCallLogCallControl,
        isWide = _this$props3.isWide,
        enableReply = _this$props3.enableReply,
        showSmallCallControl = _this$props3.showSmallCallControl,
        warmTransferLog = _this$props3.warmTransferLog,
        warmTransferActiveTelephonySessionId = _this$props3.warmTransferActiveTelephonySessionId;
      var _getWarmTransferSessi2 = getWarmTransferSession({
          mainLog: currentLog,
          transferLog: warmTransferLog,
          activeTelephonySessionId: warmTransferActiveTelephonySessionId
        }),
        activeLog = _getWarmTransferSessi2.activeLog;
      var call = activeLog.call;
      // @ts-expect-error TS(2339): Property 'telephonySessionId' does not exist on ty... Remove this comment to see the full error message
      var telephonySessionId = call.telephonySessionId,
        webphoneSession = call.webphoneSession;
      var isCurrentDeviceCall = !!webphoneSession;
      if (showSmallCallControl) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          ref: callLogCallControlRef,
          className: (0, _clsx["default"])(_styles["default"].callControlRoot, callLogCallControl),
          "data-sign": "smallCallControl"
        }, renderCallLogCallControl && renderCallLogCallControl(telephonySessionId,
        // @ts-expect-error TS(2345): Argument of type 'boolean | undefined' is not assi... Remove this comment to see the full error message
        isWide, enableReply, isCurrentDeviceCall, warmTransferActiveTelephonySessionId));
      }
      return null;
    }
  }, {
    key: "getEditLogSection",
    value: function getEditLogSection() {
      var _this$props4 = this.props,
        renderEditLogSection = _this$props4.renderEditLogSection,
        currentLocale = _this$props4.currentLocale,
        onSaveCallLog = _this$props4.onSaveCallLog,
        onUpdateCallLog = _this$props4.onUpdateCallLog,
        onSelectViewVisible = _this$props4.onSelectViewVisible,
        currentLog = _this$props4.currentLog,
        currentDelaySavingState = _this$props4.currentDelaySavingState,
        additionalInfo = _this$props4.additionalInfo,
        subjectDropdownsTracker = _this$props4.subjectDropdownsTracker,
        contactSearch = _this$props4.contactSearch,
        showFoundFromServer = _this$props4.showFoundFromServer,
        appName = _this$props4.appName,
        isSearching = _this$props4.isSearching,
        startAdornmentRender = _this$props4.startAdornmentRender,
        objectTypeIconsMap = _this$props4.objectTypeIconsMap;
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return renderEditLogSection({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        onUpdateCallLog: onUpdateCallLog,
        onSelectViewVisible: onSelectViewVisible,
        currentLog: currentLog,
        currentDelaySavingState: currentDelaySavingState,
        additionalInfo: additionalInfo,
        subjectDropdownsTracker: subjectDropdownsTracker,
        contactSearch: contactSearch,
        showFoundFromServer: showFoundFromServer,
        appName: appName,
        isSearching: isSearching,
        editSectionScrollBy: this.editSectionScrollBy,
        startAdornmentRender: startAdornmentRender,
        objectTypeIconsMap: objectTypeIconsMap
      });
    }
  }, {
    key: "renderLogBasicInfo",
    value: function renderLogBasicInfo() {
      var _this$props5 = this.props,
        isWide = _this$props5.isWide,
        currentLog = _this$props5.currentLog,
        warmTransferLog = _this$props5.warmTransferLog,
        currentLocale = _this$props5.currentLocale,
        formatPhone = _this$props5.formatPhone,
        dateTimeFormatter = _this$props5.dateTimeFormatter,
        renderBasicInfo = _this$props5.renderBasicInfo,
        logBasicInfo = _this$props5.classes.logBasicInfo,
        showRecordingIndicator = _this$props5.showRecordingIndicator,
        openEntityDetailLinkTrack = _this$props5.openEntityDetailLinkTrack,
        openEntityDetailLink = _this$props5.openEntityDetailLink,
        warmTransferActiveTelephonySessionId = _this$props5.warmTransferActiveTelephonySessionId,
        onSwitchWarmTransferSession = _this$props5.onSwitchWarmTransferSession;
      if (renderBasicInfo) {
        return renderBasicInfo({
          formatPhone: formatPhone,
          dateTimeFormatter: dateTimeFormatter,
          currentLog: currentLog
        });
      }
      var _getWarmTransferSessi3 = getWarmTransferSession({
          mainLog: currentLog,
          transferLog: warmTransferLog,
          activeTelephonySessionId: warmTransferActiveTelephonySessionId
        }),
        activeLog = _getWarmTransferSessi3.activeLog,
        subLog = _getWarmTransferSessi3.subLog;
      return /*#__PURE__*/_react["default"].createElement(_LogBasicInfoV["default"], {
        dataSign: "leftSectionInfo",
        isWide: isWide,
        currentLog: activeLog,
        toggleConference: this.toggleConference,
        conferenceParticipantsIsOpen: this.state.showConferenceCallParticipants,
        subCallLog: subLog,
        currentLocale: currentLocale,
        formatPhone: formatPhone
        // @ts-expect-error TS(2322): Type '(({ utcTimestamp, locale, type, }: DateTimeF... Remove this comment to see the full error message
        ,
        dateTimeFormatter: dateTimeFormatter,
        className: logBasicInfo,
        showRecordingIndicator: showRecordingIndicator,
        openEntityDetailLinkTrack: openEntityDetailLinkTrack,
        openEntityDetailLink: openEntityDetailLink,
        onSwitchWarmTransferSession: onSwitchWarmTransferSession
      });
    }
  }, {
    key: "genSaveLogButtonV2",
    value: function genSaveLogButtonV2() {
      var _this$props6 = this.props,
        renderSaveLogButton = _this$props6.renderSaveLogButton,
        currentLocale = _this$props6.currentLocale,
        onSaveCallLog = _this$props6.onSaveCallLog,
        currentLog = _this$props6.currentLog,
        isWide = _this$props6.isWide,
        showSpinner = _this$props6.showSpinner,
        currentDelaySavingState = _this$props6.currentDelaySavingState;
      var loading = showSpinner || currentLog && currentLog.showSpinner;
      return renderSaveLogButton({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        currentLog: currentLog,
        loading: loading,
        isWide: isWide,
        disabled: currentLog === null || currentLog === void 0 ? void 0 : currentLog.disableSaveLog,
        currentDelaySavingState: currentDelaySavingState
      });
    }
  }, {
    key: "renderLogNotification",
    value: function renderLogNotification() {
      var _this$props7 = this.props,
        formatPhone = _this$props7.formatPhone,
        currentLocale = _this$props7.currentLocale,
        logNotification = _this$props7.logNotification,
        onCloseNotification = _this$props7.onCloseNotification,
        onSaveNotification = _this$props7.onSaveNotification,
        onExpandNotification = _this$props7.onExpandNotification,
        onDiscardNotification = _this$props7.onDiscardNotification,
        currentNotificationIdentify = _this$props7.currentNotificationIdentify,
        currentSession = _this$props7.currentSession,
        activeSession = _this$props7.activeSession,
        onReject = _this$props7.onReject,
        onHangup = _this$props7.onHangup,
        shrinkNotification = _this$props7.shrinkNotification,
        disableLinks = _this$props7.disableLinks,
        useNewNotification = _this$props7.useNewNotification,
        showNotiLogButton = _this$props7.showNotiLogButton,
        isWebRTC = _this$props7.isWebRTC,
        isWide = _this$props7.isWide,
        onIgnore = _this$props7.onIgnore,
        onForward = _this$props7.onForward,
        endAndAnswer = _this$props7.endAndAnswer,
        holdAndAnswer = _this$props7.holdAndAnswer,
        toVoicemail = _this$props7.toVoicemail,
        forwardingNumbers = _this$props7.forwardingNumbers,
        answer = _this$props7.answer,
        clickForwardTrack = _this$props7.clickForwardTrack,
        renderCallNotificationAvatar = _this$props7.renderCallNotificationAvatar,
        getAvatarUrl = _this$props7.getAvatarUrl,
        openEntityDetailLinkTrack = _this$props7.openEntityDetailLinkTrack,
        openEntityDetailLink = _this$props7.openEntityDetailLink,
        enableReply = _this$props7.enableReply,
        reply = _this$props7.reply;
      var showNotification = logNotification.showNotification,
        call = logNotification.call,
        logName = logNotification.logName,
        subContactNameDisplay = logNotification.subContactNameDisplay,
        displayEntity = logNotification.displayEntity,
        entityType = logNotification.entityType,
        entityDetailLinkId = logNotification.entityDetailLinkId,
        showLogOptions = logNotification.showLogOptions;
      if (!showNotification) {
        return null;
      }
      if (isWebRTC) {
        if (!call || !call.webphoneSession || call.webphoneSession.callStatus !== 'webphone-session-connecting') {
          return null;
        }
        var isCallQueueCall = !!call.webphoneSession.callQueueName;
        return /*#__PURE__*/_react["default"].createElement(_WebRTCNotificationSection["default"], {
          formatPhone: formatPhone,
          currentLocale: currentLocale,
          call: call,
          logName: logName,
          subContactNameDisplay: subContactNameDisplay,
          displayEntity: displayEntity,
          entityType: entityType,
          entityDetailLinkId: entityDetailLinkId,
          openEntityDetailLink: openEntityDetailLink
          // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
          ,
          onCloseNotification: onCloseNotification
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          ,
          currentNotificationIdentify: currentNotificationIdentify
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          ,
          isWide: isWide,
          onIgnore: onIgnore,
          onForward: onForward,
          endAndAnswer: endAndAnswer,
          holdAndAnswer: holdAndAnswer,
          showToVoicemail: !isCallQueueCall,
          toVoicemail: toVoicemail,
          forwardingNumbers: forwardingNumbers,
          hasActiveSession: !!activeSession,
          answer: answer,
          clickForwardTrack: clickForwardTrack
          // @ts-expect-error TS(2322): Type '((contact: IContact, entityType: string) => ... Remove this comment to see the full error message
          ,
          renderCallNotificationAvatar: renderCallNotificationAvatar
          // @ts-expect-error TS(2322): Type '((contact: IContact) => Promise<string>) | u... Remove this comment to see the full error message
          ,
          getAvatarUrl: getAvatarUrl,
          openEntityDetailLinkTrack: openEntityDetailLinkTrack,
          enableReply: enableReply,
          disableLinks: disableLinks,
          reply: reply
        });
      }
      if (useNewNotification) {
        return /*#__PURE__*/_react["default"].createElement(_NotificationSectionV["default"], {
          formatPhone: formatPhone,
          currentLocale: currentLocale,
          logNotification: logNotification,
          showNotiLogButton: showNotiLogButton,
          onCloseNotification: onCloseNotification,
          onSaveNotification: onSaveNotification,
          onExpandNotification: onExpandNotification,
          onDiscardNotification: onDiscardNotification,
          currentNotificationIdentify: currentNotificationIdentify,
          currentSession: currentSession,
          onReject: onReject,
          onHangup: onHangup,
          shrinkNotification: shrinkNotification,
          showLogOptions: showLogOptions
        });
      }
      return /*#__PURE__*/_react["default"].createElement(_NotificationSection["default"], {
        formatPhone: formatPhone,
        currentLocale: currentLocale,
        logNotification: logNotification,
        showNotiLogButton: showNotiLogButton,
        onCloseNotification: onCloseNotification,
        onSaveNotification: onSaveNotification,
        onExpandNotification: onExpandNotification,
        onDiscardNotification: onDiscardNotification,
        currentNotificationIdentify: currentNotificationIdentify,
        currentSession: currentSession,
        onReject: onReject,
        onHangup: onHangup,
        disableLinks: disableLinks,
        openEntityDetailLinkTrack: openEntityDetailLinkTrack
      });
    }
  }, {
    key: "renderConferenceCallParticipants",
    value: function renderConferenceCallParticipants() {
      var isOpen = this.state.showConferenceCallParticipants;
      var _this$props8 = this.props,
        currentLocale = _this$props8.currentLocale,
        getConferenceCallParticipantName = _this$props8.getConferenceCallParticipantName,
        currentLog = _this$props8.currentLog,
        onRemoveParticipant = _this$props8.onRemoveParticipant,
        renderConferenceParticipantsAvatar = _this$props8.renderConferenceParticipantsAvatar,
        clickRemoveParticipantTrack = _this$props8.clickRemoveParticipantTrack,
        openEntityDetailLink = _this$props8.openEntityDetailLink;
      var call = currentLog.call;
      if (!(call === null || call === void 0 ? void 0 : call.isConferenceCall) || !isOpen) return null;
      return /*#__PURE__*/_react["default"].createElement(_ConferenceCallParticipants.ConferenceCallParticipants, {
        openEntityDetailLink: openEntityDetailLink,
        isOpen: !call.result && isOpen,
        currentLocale: currentLocale,
        toggleConference: this.toggleConference,
        renderAvatar: renderConferenceParticipantsAvatar,
        getContactNameInfo: getConferenceCallParticipantName,
        participants: call.conferenceParticipants,
        currentTelephonySessionId: call.telephonySessionId,
        onRemoveParticipant: onRemoveParticipant,
        clickRemoveParticipantTrack: clickRemoveParticipantTrack
      });
    }
  }, {
    key: "goBack",
    value: function goBack() {
      var goBack = this.props.goBack;
      goBack();
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props9 = this.props,
        currentIdentify = _this$props9.currentIdentify,
        currentLocale = _this$props9.currentLocale,
        _this$props9$classes = _this$props9.classes,
        root = _this$props9$classes.root,
        backHeader = _this$props9$classes.backHeader,
        rootRef = _this$props9.refs.root,
        backIcon = _this$props9.backIcon,
        header = _this$props9.header,
        headerTitle = _this$props9.headerTitle,
        isInTransferPage = _this$props9.isInTransferPage,
        isWide = _this$props9.isWide,
        children = _this$props9.children,
        getRenderLogButton = _this$props9.getRenderLogButton,
        rootLayout = _this$props9.rootLayout;
      if (!currentIdentify || isInTransferPage) return null;
      var _root = typeof rootLayout === 'boolean' ? rootLayout ? _styles["default"].callLogPanelClassLeftNav : _styles["default"].callLogPanelClass : undefined;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: rootRef,
        className: (0, _clsx["default"])(_styles["default"].root, !isWide ? _styles["default"].classic : null, _root, root)
      }, header && /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
        currentLocale: currentLocale,
        backIcon: backIcon,
        isWide: isWide,
        rightIcon: (getRenderLogButton === null || getRenderLogButton === void 0 ? void 0 : getRenderLogButton()) || this.genSaveLogButtonV2()
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        ,
        title: _i18n["default"].getString(headerTitle, currentLocale),
        className: (0, _clsx["default"])(_styles["default"].header, backHeader),
        onBackClick: function onBackClick() {
          return _this2.goBack();
        }
      }), this.renderLogSection(), children);
    }
  }]);
}(_react.Component);
CallLogPanel.defaultProps = {
  currentLog: {
    nameEntities: [],
    relatedToEntities: [],
    associatedEntities: []
  },
  currentIdentify: '',
  currentLocale: _lib.environment.defaultLocale,
  classes: {},
  refs: {},
  // Notification
  currentNotificationIdentify: '',
  shrinkNotification: function shrinkNotification() {
    return null;
  },
  header: true,
  headerTitle: 'createCallLog',
  showSmallCallControl: false,
  isInTransferPage: false,
  showSpinner: true,
  isWide: true,
  enableReply: false,
  showNotiLogButton: true,
  disableLinks: false,
  useNewNotification: false,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type '(({ searchS... Remove this comment to see the full error message
  contactSearch: null,
  showFoundFromServer: false,
  isSearching: false,
  logNotification: {
    showNotification: false,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Call'.
    call: null,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
    logName: null,
    notificationIsExpand: false,
    subContactNameDisplay: '',
    displayEntity: null,
    entityType: '',
    entityDetailLinkId: ''
  },
  showRecordingIndicator: false,
  // @ts-expect-error TS(2322): Type '() => null' is not assignable to type '(cont... Remove this comment to see the full error message
  renderCallNotificationAvatar: function renderCallNotificationAvatar() {
    return null;
  },
  // @ts-expect-error TS(2322): Type '() => null' is not assignable to type '(cont... Remove this comment to see the full error message
  getAvatarUrl: function getAvatarUrl() {
    return null;
  }
};
//# sourceMappingURL=CallLogPanel.js.map
