"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContactRenderInfoFromConversation = exports.useContactRenderInfoFromCallHistory = exports.useContactRenderInfoFromCall = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _callResults = require("@ringcentral-integration/commons/enums/callResults");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");
var _components = require("@ringcentral-integration/micro-auth/src/app/components");
var _components2 = require("@ringcentral-integration/micro-contacts/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _helpers = require("@ringcentral-integration/micro-message/src/app/views/ConversationsViewSpring/ConversationsPage/ConversationsListItem/helpers");
var _nextCore = require("@ringcentral-integration/next-core");
var _DurationCounter = require("@ringcentral-integration/widgets/components/DurationCounter");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _helpers2 = require("../../services/ActiveCallControl/helpers");
var _CallHistory = require("../../services/CallHistory");
var _components3 = require("./components");
var _ContactAvatarByRenderInfo = require("./components/ContactAvatarByRenderInfo");
var _i18n = _interopRequireDefault(require("./i18n"));
var _utils = require("./utils");
var _excluded = ["mode"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var useContactRenderInfoFromCall = exports.useContactRenderInfoFromCall = function useContactRenderInfoFromCall(call) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var contactRendererOptions = (0, _nextCore.useContainer)('ContactRendererOptions');
  var isQueue = (0, _helpers2.isQueueCall)(call);
  var callQueueName = (0, _helpers2.getDisplayCallQueueName)(call);
  var callFrom = call.from || {};
  var callTo = call.to || {};
  var direction = call.direction,
    webphoneSession = call.webphoneSession,
    startTime = call.startTime,
    offset = call.offset;
  var isInbound = (0, _callLogHelpers.isInbound)(call);
  var ringing = (0, _helpers2.isRingingCall)(call);
  var otherDevice = (0, _helpers2.isOtherDeviceCall)(call);
  var holding = (0, _helpers2.isHoldingCall)(call);
  var controllable = !!webphoneSession;
  var _options$phoneNumberD = options.phoneNumberDisplayMode,
    phoneNumberDisplayMode = _options$phoneNumberD === void 0 ? 'phoneNumber' : _options$phoneNumberD;
  var extensionNumber = isInbound ? callFrom.extensionNumber : callTo.extensionNumber;
  var phoneNumber = isInbound ? callFrom.phoneNumber : callTo.phoneNumber;
  var matches = isInbound ? call.fromMatches : call.toMatches;

  // const activeCallControlCallerIdName = isInbound ? callFrom.name : callTo.name;

  // active call control api return the wrong data during the call process in XMN-up, so we use webphone data only for webphone call, not have correct callerIdName, so we use the webphone data
  var callerId = isInbound ? webphoneSession === null || webphoneSession === void 0 ? void 0 : webphoneSession.fromUserName : webphoneSession === null || webphoneSession === void 0 ? void 0 : webphoneSession.toUserName;
  var callSelectionInfo = call.callSelectionInfo;
  var renderInfo = (0, _utils.getContactDisplayInfo)({
    callerId: callerId,
    queueName: callQueueName,
    matches: matches,
    phoneNumber: phoneNumber,
    extensionNumber: extensionNumber,
    phoneNumberDisplayMode: phoneNumberDisplayMode,
    displaySelection: callSelectionInfo === null || callSelectionInfo === void 0 ? void 0 : callSelectionInfo.displayedSelection,
    selections: callSelectionInfo === null || callSelectionInfo === void 0 ? void 0 : callSelectionInfo.selections,
    getDefaultCrmMatch: contactRendererOptions === null || contactRendererOptions === void 0 ? void 0 : contactRendererOptions.getDefaultCrmMatch
  });
  var getContactDisplayTextFn = (0, _components3.useGetContactDisplayTextFn)();

  // TODO: the conference view able still not support
  var conferenceParticipantsInfoFnList = (0, _react.useMemo)(function () {
    var _call$conferenceParti;
    return (_call$conferenceParti = call.conferenceParticipants) === null || _call$conferenceParti === void 0 ? void 0 : _call$conferenceParti.map(function (conferenceParticipant, index) {
      return function () {
        var _call$conferenceParti2, _participantRenderInf;
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          phoneNumberDisplayMode = _ref.phoneNumberDisplayMode;
        var participantQueueName = conferenceParticipant.queueName;
        var participantRenderInfo = (0, _utils.getContactDisplayInfo)({
          // active call control api return the wrong data during the call process in XMN-up, so we use webphone data only for webphone call, not have correct callerIdName, so we use the webphone data
          // conferenceParticipant.info.name,
          callerId: undefined,
          queueName: callQueueName,
          phoneNumber: conferenceParticipant.info.phoneNumber,
          extensionNumber: conferenceParticipant.info.extensionNumber,
          matches: (_call$conferenceParti2 = call.conferenceParticipantsMatchesList) === null || _call$conferenceParti2 === void 0 ? void 0 : _call$conferenceParti2[index],
          phoneNumberDisplayMode: phoneNumberDisplayMode
        });
        var participantBeQueue = Boolean(participantQueueName || ((_participantRenderInf = participantRenderInfo.matchedContact) === null || _participantRenderInf === void 0 ? void 0 : _participantRenderInf.isCallQueueNumber));
        var Avatar = function Avatar(_ref2) {
          var size = _ref2.size;
          return /*#__PURE__*/_react["default"].createElement(_ContactAvatarByRenderInfo.ContactAvatarByRenderInfo, {
            isQueue: participantBeQueue,
            isConferenceCall: false,
            renderInfo: participantRenderInfo,
            size: size
          });
        };
        return {
          data: conferenceParticipant,
          renderInfo: participantRenderInfo,
          result: /*#__PURE__*/_react["default"].createElement(_components3.ContactDisplayRender, {
            info: participantRenderInfo,
            callQueueName: participantQueueName
            // TODO: conference call display control not implemented
            // displayControl={{
            //   viewable: false,
            // }}
          }),
          /**
           * plain text display name
           */
          displayName: getContactDisplayTextFn({
            renderInfo: participantRenderInfo,
            callQueueName: participantQueueName
          }),
          Avatar: Avatar
        };
      };
    });
  }, [call, callQueueName, getContactDisplayTextFn]);
  var isConferenceCall = Boolean(call.isConferenceCall);
  var fromInfo = (0, _components3.useFormatExtOrPhoneNumber)(callFrom);
  var fromInfoHideBlocked = (0, _components3.useFormatExtOrPhoneNumber)(callFrom, true);
  var toInfo = (0, _components3.useFormatExtOrPhoneNumber)(callTo);
  var callStatusText = (0, _react.useMemo)(function () {
    if (ringing) return t('Inbound');
    if (holding) return t('onHold');
    return t('activeCall');
  }, [holding, ringing, t]);
  var CallStatus = (0, _react.useCallback)(function (_ref3) {
    var children = _ref3.children;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx["default"])(ringing && 'text-success-f', holding && 'text-warning-high-contrast', !ringing && !holding && 'text-danger-f')
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "mr-1"
    }, callStatusText), children);
  }, [ringing, holding, callStatusText]);
  var OnOtherDevice = (0, _react.useCallback)(function (_ref4) {
    var _ref4$mode = _ref4.mode,
      mode = _ref4$mode === void 0 ? 'text' : _ref4$mode,
      rest = _objectWithoutProperties(_ref4, _excluded);
    if (mode === 'icon') return /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
      title: t('otherDevice'),
      placement: "top"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      "data-sign": "onOtherDevice",
      symbol: _springIcon.MobileMd,
      size: "small"
    }));
    return /*#__PURE__*/_react["default"].createElement(_springUi.Tag, _extends({
      "data-sign": "onOtherDevice",
      color: "neutral",
      variant: "inverted"
    }, rest), t('otherDevice'));
  }, [t]);
  var Avatar = (0, _react.useCallback)(function (_ref5) {
    var size = _ref5.size;
    return /*#__PURE__*/_react["default"].createElement(_ContactAvatarByRenderInfo.ContactAvatarByRenderInfo, {
      isQueue: isQueue,
      isConferenceCall: isConferenceCall,
      renderInfo: renderInfo,
      size: size
    });
  }, [isConferenceCall, renderInfo, isQueue]);
  return {
    DisplayName: function DisplayName(props) {
      if (isConferenceCall) {
        var text = conferenceParticipantsInfoFnList === null || conferenceParticipantsInfoFnList === void 0 ? void 0 : conferenceParticipantsInfoFnList.map(function (fn) {
          return (
            // the conference call participant show the phone number for group name
            fn({
              phoneNumberDisplayMode: 'phoneNumber'
            })
          );
        }).filter(function (x) {
          return !x.data.isHost;
        }).map(function (x) {
          return x.displayName;
        }).join(', ');
        // TODO: the conference view able still not support
        return /*#__PURE__*/_react["default"].createElement("span", {
          title: text,
          className: "truncate"
        }, text);
      }
      return /*#__PURE__*/_react["default"].createElement(_components3.ContactDisplayRender, _extends({
        info: renderInfo,
        callQueueName: callQueueName
      }, props));
    },
    displayPhoneNumber: isInbound ? (options === null || options === void 0 ? void 0 : options.hideBlockedFromInfo) ? fromInfoHideBlocked : fromInfo : toInfo,
    Avatar: Avatar,
    myCallerId: isInbound ? toInfo : fromInfo,
    duration: /*#__PURE__*/_react["default"].createElement(_DurationCounter.DurationCounter, {
      startTime: startTime,
      offset: offset
    }),
    CallStatus: CallStatus,
    OnOtherDevice: otherDevice ? OnOtherDevice : null,
    // basic info
    direction: direction,
    isInbound: isInbound,
    ringing: ringing,
    holding: holding,
    controllable: controllable,
    conferenceParticipantsInfoFnList: conferenceParticipantsInfoFnList,
    callQueueName: callQueueName
  };
};
var useContactRenderInfoFromCallHistory = exports.useContactRenderInfoFromCallHistory = function useContactRenderInfoFromCallHistory(currentCallLog) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref6$startTimeMode = _ref6.startTimeMode,
    startTimeMode = _ref6$startTimeMode === void 0 ? 'withTime' : _ref6$startTimeMode,
    _ref6$hideBlockedFrom = _ref6.hideBlockedFromInfo,
    hideBlockedFromInfo = _ref6$hideBlockedFrom === void 0 ? false : _ref6$hideBlockedFrom,
    _ref6$showLogInfo = _ref6.showLogInfo,
    showLogInfo = _ref6$showLogInfo === void 0 ? false : _ref6$showLogInfo,
    _ref6$phoneNumberDisp = _ref6.phoneNumberDisplayMode,
    phoneNumberDisplayMode = _ref6$phoneNumberDisp === void 0 ? 'unknown' : _ref6$phoneNumberDisp,
    delaySavingState = _ref6.delaySavingState,
    DelayComponent = _ref6.DelayComponent;
  var _useLocale2 = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale2.t;
  var formattedPhoneNumberFn = (0, _components.useFormattedPhoneNumberFn)();
  var contactRendererOptions = (0, _nextCore.useContainer)('ContactRendererOptions');
  var result = currentCallLog.result;
  var direction = currentCallLog.direction;
  var isInbound = currentCallLog && (0, _callLogHelpers.isInbound)(currentCallLog);
  var isMissed = isInbound && currentCallLog && (0, _callLogHelpers.isMissed)({
    result: currentCallLog.result
  });
  var startTime = (0, _utils.useFormattedDateFromNow)(currentCallLog.startTime, startTimeMode);
  var duration = (0, _react.useMemo)(function () {
    return (0, _formatDuration.formatDurationWithLocale)(currentCallLog.duration, {
      day: t('day'),
      hr: t('hr'),
      min: t('min'),
      sec: t('sec')
    });
  }, [currentCallLog.duration, t]);
  var ringingElsewhere = result === _callResults.callResults.ringingElsewhere;
  // TODO: maybe need upgrade `@rc-ex/core`
  var queueCallDisplayMode = result === _callResults.callResults.answeredElsewhere || ringingElsewhere;
  var answeredByDelegate = currentCallLog.delegate;
  var hasAiNotes = currentCallLog.hasSmartNote;
  var Status = (0, _react.useCallback)(function (_ref7) {
    var _ref7$mode = _ref7.mode,
      mode = _ref7$mode === void 0 ? 'text' : _ref7$mode;
    if (!result || !direction) return null;
    var queueCallRender = function queueCallRender() {
      var answeredByText = answeredByDelegate ? "".concat(t('answeredBy'), " ").concat(answeredByDelegate === null || answeredByDelegate === void 0 ? void 0 : answeredByDelegate.name) : undefined;
      var queueCallDisplayModeNode = answeredByDelegate ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "truncate",
        "data-sign": "answered-by",
        title: answeredByText
      }, answeredByText) : /*#__PURE__*/_react["default"].createElement("span", null, t(result));
      return queueCallDisplayModeNode;
    };
    if (mode === 'text') {
      if (queueCallDisplayMode) {
        return queueCallRender();
      }
      var displayDuration = duration ? "(".concat(duration, ")") : '';
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: isMissed ? 'text-danger-f' : 'text-success-f',
        "data-sign": "callDetailInfoResult"
      }, isMissed ? t('Missed') : "".concat(t(direction), " ").concat(displayDuration));
    }
    if (queueCallDisplayMode) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex gap-1 items-center pt-0.5",
        "data-sign": result
      }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
        size: "small",
        "data-sign": answeredByDelegate ? 'delegate-icon' : 'active-call-icon',
        symbol: answeredByDelegate ? _springIcon.DelegatedCallsMd : _springIcon.ActiveCallMd
      }), queueCallRender());
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx["default"])('flex gap-1 items-center pt-0.5', isMissed && 'text-danger'),
      "data-sign": "status-".concat(isMissed ? 'missed' : direction.toLowerCase())
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      size: "small",
      "data-sign": isMissed ? 'missed-icon' : isInbound ? 'incoming-icon' : 'outgoing-icon',
      symbol: isMissed ? _springIcon.MissedCallMd : isInbound ? _springIcon.IncomingCallMd : _springIcon.OutgoingCallMd,
      className: isMissed ? 'text-inherit' : undefined
    }), /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "duration"
    }, isMissed ? t('Missed') : duration), hasAiNotes && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      size: "small",
      symbol: _springIcon.SmartNotesMd
    }), /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "aiNote"
    }, t('notes'))));
  }, [queueCallDisplayMode, answeredByDelegate, direction, duration, hasAiNotes, isInbound, isMissed, result, t]);
  var isQueue = (0, _CallHistory.isQueueHistoryCall)(currentCallLog);
  var callQueueName = (0, _helpers2.getDisplayCallQueueName)(currentCallLog);
  var callFrom = currentCallLog.from || {};
  var callTo = currentCallLog.to || {};
  var signalSourceInfo = isInbound ? callFrom : callTo;
  var phoneNumber = signalSourceInfo.phoneNumber;
  var extensionNumber = isInbound ? callFrom.extensionNumber : callTo.extensionNumber;
  var matches = isInbound ? currentCallLog.fromMatches : currentCallLog.toMatches;
  var serverName = isInbound ? callFrom.name : callTo.name;
  var callSelectionInfo = currentCallLog.callSelectionInfo;
  var renderInfo = (0, _utils.getContactDisplayInfo)({
    serverName: serverName,
    queueName: callQueueName,
    matches: matches,
    phoneNumber: phoneNumber,
    extensionNumber: extensionNumber,
    phoneNumberDisplayMode: phoneNumberDisplayMode,
    displaySelection: callSelectionInfo === null || callSelectionInfo === void 0 ? void 0 : callSelectionInfo.displayedSelection,
    selections: callSelectionInfo === null || callSelectionInfo === void 0 ? void 0 : callSelectionInfo.selections,
    getDefaultCrmMatch: contactRendererOptions === null || contactRendererOptions === void 0 ? void 0 : contactRendererOptions.getDefaultCrmMatch
  });
  var isConferenceCall = Boolean(currentCallLog.isConferenceCall);
  var fromInfo = (0, _components3.useFormatExtOrPhoneNumber)(callFrom);
  var fromInfoHideBlocked = (0, _components3.useFormatExtOrPhoneNumber)(callFrom, hideBlockedFromInfo);
  var toInfo = (0, _components3.useFormatExtOrPhoneNumber)(callTo);
  var isLogged = currentCallLog.isLogged;
  var formattedPhoneNumber = renderInfo.dialToPhoneNumber ? formattedPhoneNumberFn(renderInfo.dialToPhoneNumber) : '';
  var Avatar = (0, _react.useCallback)(function (_ref8) {
    var size = _ref8.size;
    return /*#__PURE__*/_react["default"].createElement(_ContactAvatarByRenderInfo.ContactAvatarByRenderInfo, {
      isConferenceCall: isConferenceCall,
      isQueue: isQueue,
      renderInfo: renderInfo,
      size: size
    });
  }, [isConferenceCall, isQueue, renderInfo]);
  var copyNumber = function copyNumber() {
    return (0, _utils.copyWithResultMessage)(formattedPhoneNumber);
  };

  /**
   * get info when want to call the entity or send message to the entity
   */
  var getActionInfo = function getActionInfo() {
    var matchedContact = renderInfo.matchedContact;
    if (matchedContact === null || matchedContact === void 0 ? void 0 : matchedContact.name) {
      return {
        phoneNumber: formattedPhoneNumber,
        name: matchedContact.name,
        type: matchedContact.type
      };
    }
    if (formattedPhoneNumber) {
      return {
        phoneNumber: formattedPhoneNumber
      };
    }
    return undefined;
  };
  return {
    DisplayName: function DisplayName(props) {
      // in call history be conference call, we show that be conference call
      if (isConferenceCall) return /*#__PURE__*/_react["default"].createElement("span", null, t('conferenceCall'));
      return /*#__PURE__*/_react["default"].createElement(_components3.ContactDisplayRender, _extends({
        info: renderInfo,
        callQueueName: callQueueName,
        isMissed: isMissed
      }, props));
    },
    displayPhoneNumber: isInbound ? hideBlockedFromInfo ? fromInfoHideBlocked : fromInfo : toInfo,
    Avatar: Avatar,
    myCallerIdTitle: isInbound ? t('to') : t('from'),
    myCallerId: isInbound ? toInfo : fromInfo,
    startTime: startTime,
    duration: duration,
    Status: Status,
    callQueueName: callQueueName,
    isConferenceCall: isConferenceCall,
    // basic info
    isInbound: isInbound,
    renderInfo: renderInfo,
    signalSourceInfo: signalSourceInfo,
    formattedPhoneNumber: formattedPhoneNumber,
    logged: showLogInfo ? /*#__PURE__*/_react["default"].createElement(_components3.LogInfo, {
      logged: isLogged,
      delaySavingState: delaySavingState,
      DelayComponent: DelayComponent
    }) : null,
    showViewLogIcon: Boolean(showLogInfo && isLogged),
    ringingElsewhere: ringingElsewhere,
    answeredByDelegate: answeredByDelegate,
    copyNumber: copyNumber,
    getActionInfo: getActionInfo
  };
};
var useContactRenderInfoFromConversation = exports.useContactRenderInfoFromConversation = function useContactRenderInfoFromConversation(conversation) {
  var _conversation$faxAtta, _conversation$voicema, _displayInfoList$;
  var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref9$timePresentatio = _ref9.timePresentationMode,
    timePresentationMode = _ref9$timePresentatio === void 0 ? 'withTime' : _ref9$timePresentatio,
    _ref9$displayLogStatu = _ref9.displayLogStatus,
    displayLogStatus = _ref9$displayLogStatu === void 0 ? false : _ref9$displayLogStatu,
    _ref9$hasCrmLogged = _ref9.hasCrmLogged,
    hasCrmLogged = _ref9$hasCrmLogged === void 0 ? false : _ref9$hasCrmLogged,
    _ref9$phoneNumberDisp = _ref9.phoneNumberDisplayMode,
    phoneNumberDisplayMode = _ref9$phoneNumberDisp === void 0 ? 'phoneNumber' : _ref9$phoneNumberDisp,
    _ref9$isOptOut = _ref9.isOptOut,
    isOptOut = _ref9$isOptOut === void 0 ? false : _ref9$isOptOut;
  var _useLocale3 = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale3.t;
  var formattedPhoneNumberFn = (0, _components.useFormattedPhoneNumberFn)();
  var contactRendererOptions = (0, _nextCore.useContainer)('ContactRendererOptions');
  var isInbound = (0, _callLogHelpers.isInbound)(conversation);
  var isTextMessage = (0, _messageHelper.messageIsTextMessage)(conversation);
  var isFax = (0, _messageHelper.messageIsFax)(conversation);
  var isVoicemail = (0, _messageHelper.messageIsVoicemail)(conversation);
  var markAble =
  // TODO: currently we not support mark text message, so we just mark voicemail and fax
  // the mark text message in jupiter that just mark the first message of the conversation
  // isTextMessage ||
  isVoicemail || isFax && isInbound;
  var messageStatus = conversation.messageStatus;
  var faxAttachmentExist = Boolean(isFax && (messageStatus === 'Sent' || messageStatus === 'Received') && ((_conversation$faxAtta = conversation.faxAttachment) === null || _conversation$faxAtta === void 0 ? void 0 : _conversation$faxAtta.uri));
  var voicemailAttachmentExist = Boolean(isVoicemail && ((_conversation$voicema = conversation.voicemailAttachment) === null || _conversation$voicema === void 0 ? void 0 : _conversation$voicema.uri));
  var creationTime = (0, _utils.useFormattedDateFromNow)(conversation.creationTime, timePresentationMode);
  var callFrom = conversation.from;
  var callTo = conversation.to;
  var callSelf = conversation.self;
  var fromInfo = (0, _components3.useFormatExtOrPhoneNumber)(callFrom);
  var toInfo = (0, _components3.useFormatExtOrPhoneNumber)(callSelf);
  var correspondents = conversation.correspondents,
    lastMatchedCorrespondentEntity = conversation.lastMatchedCorrespondentEntity,
    conversationMatches = conversation.conversationMatches,
    correspondentMatches = conversation.correspondentMatches,
    correspondentMatchesList = conversation.correspondentMatchesList;
  var singleCorrespondent = correspondents.length === 1;
  var multiMatchForSingleCorrespondent = singleCorrespondent && correspondentMatchesList.length === 1 && correspondentMatchesList[0].length > 1;
  var selectedIndex = (0, _react.useMemo)(function () {
    // when not multi-match for singleCorrespondent, should select the first one
    if (!multiMatchForSingleCorrespondent) return 0;
    var correspondentMatchId = lastMatchedCorrespondentEntity && lastMatchedCorrespondentEntity.id || conversationMatches[0] && conversationMatches[0].id;
    if (correspondentMatchId) {
      var index = correspondentMatches.findIndex(function (contact) {
        return contact.id === correspondentMatchId;
      });
      if (index > -1) return index;
    }
    // index return undefined means not selected yet
  }, [multiMatchForSingleCorrespondent, lastMatchedCorrespondentEntity, conversationMatches, correspondentMatches]);
  var _useMemo = (0, _react.useMemo)(function () {
      if (!correspondents.length) {
        // some record like block number will not have correspondents or from/to data
        return {
          displayInfoList: [(0, _utils.getContactDisplayInfo)({
            queueName: undefined,
            phoneNumber: undefined,
            extensionNumber: undefined,
            matches: [],
            phoneNumberDisplayMode: phoneNumberDisplayMode,
            getDefaultCrmMatch: contactRendererOptions === null || contactRendererOptions === void 0 ? void 0 : contactRendererOptions.getDefaultCrmMatch
          })]
        };
      }
      var correspondentsDisplayInfoMap = new Map();
      var displayInfoList = correspondents.map(function (correspondent, index) {
        var isMultipleCorrespondent = !singleCorrespondent;
        var nonSupportSelectionType = isFax || isVoicemail || isMultipleCorrespondent;
        var renderInfo = (0, _utils.getContactDisplayInfo)({
          serverName: correspondent.name,
          queueName: undefined,
          phoneNumber: correspondent.phoneNumber,
          extensionNumber: correspondent.extensionNumber,
          matches: correspondentMatchesList[index],
          displaySelection: (contactRendererOptions === null || contactRendererOptions === void 0 ? void 0 : contactRendererOptions.getDisplayedSelectedEntity) ? contactRendererOptions === null || contactRendererOptions === void 0 ? void 0 : contactRendererOptions.getDisplayedSelectedEntity(conversationMatches, conversation.conversationId) : selectedIndex ? correspondentMatchesList[index][selectedIndex] : undefined,
          selections: nonSupportSelectionType ? undefined : conversationMatches,
          // TODO: support the multiple match display in multiple correspondents scenario
          alwaysShowFirstMatch: isMultipleCorrespondent,
          phoneNumberDisplayMode: phoneNumberDisplayMode,
          getDefaultCrmMatch: contactRendererOptions === null || contactRendererOptions === void 0 ? void 0 : contactRendererOptions.getDefaultCrmMatch
        });
        if (renderInfo.dialToPhoneNumber) {
          correspondentsDisplayInfoMap.set(renderInfo.dialToPhoneNumber, renderInfo);
        }
        return renderInfo;
      });
      return {
        displayInfoList: displayInfoList,
        correspondentsDisplayInfoMap: correspondentsDisplayInfoMap
      };
    }, [correspondents, phoneNumberDisplayMode, contactRendererOptions, singleCorrespondent, isFax, isVoicemail, correspondentMatchesList, conversationMatches, conversation.conversationId, selectedIndex]),
    displayInfoList = _useMemo.displayInfoList,
    correspondentsDisplayInfoMap = _useMemo.correspondentsDisplayInfoMap;
  var detail = (0, _helpers.getDetail)(conversation);
  var _getIconInfo = (0, _helpers.getIconInfo)(conversation),
    icon = _getIconInfo.icon;
  var displayDescription = /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex items-center gap-1'),
    "data-sign": "summary"
  }, isOptOut ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    title: t('optOutAlertTooltip')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: _springIcon.InfoMd,
    className: "text-warning-f",
    size: "small"
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "truncate",
    title: t('optedOut')
  }, t('optedOut'))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    size: "small",
    symbol: icon
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "truncate",
    title: detail
  }, detail)));
  var unreadCounts = conversation.unreadCounts || 0;
  var signalTo =
  // when self fx, will not have to data
  !callTo || callTo.length === 1;

  // currently we only support one of contact able to select matchedContact, for multiple correspondents, we not show those related function
  // TODO: when support multiple contact select in one conversation, we need to change the logic
  var matchedContact = (_displayInfoList$ = displayInfoList[0]) === null || _displayInfoList$ === void 0 ? void 0 : _displayInfoList$.matchedContact;
  var signalSourceInfo = (0, _react.useMemo)(function () {
    if (signalTo) {
      return isInbound ? callFrom : callTo ? callTo[0] : undefined;
    }
    return undefined;
  }, [callFrom, callTo, isInbound, signalTo]);
  var displayName = displayInfoList.map(function (info) {
    if (info.type === 'phoneNumber') {
      return formattedPhoneNumberFn(info.displayName);
    }
    return info.displayName;
  }).join(', ');
  var Avatar = (0, _react.useCallback)(function (_ref0) {
    var size = _ref0.size;
    return signalTo ? /*#__PURE__*/_react["default"].createElement(_components2.ContactAvatar, _extends({
      size: size
    }, matchedContact ? {
      contact: {
        id: matchedContact.id,
        type: matchedContact.type
      },
      contactName: matchedContact.name,
      phoneNumber: matchedContact.phoneNumber
    } : {
      contactName: displayInfoList[0].type === 'callerIdName' ? displayName : undefined,
      phoneNumber: displayInfoList[0].dialToPhoneNumber
    })) : /*#__PURE__*/_react["default"].createElement(_components2.ContactAvatar, {
      size: size,
      symbol: _springIcon.MeetingMd
    });
  }, [displayInfoList, displayName, matchedContact, signalTo]);
  var dialToPhoneNumber = signalTo ? displayInfoList[0].dialToPhoneNumber : undefined;
  var formattedPhoneNumber = dialToPhoneNumber ? formattedPhoneNumberFn(dialToPhoneNumber) : '';
  var copyNumber = function copyNumber() {
    return (0, _utils.copyWithResultMessage)(formattedPhoneNumber);
  };

  /**
   * get info when want to call the entity or send message to the entity
   */
  var getActionInfo = function getActionInfo() {
    if (signalSourceInfo) {
      if (matchedContact === null || matchedContact === void 0 ? void 0 : matchedContact.name) {
        return {
          phoneNumber: formattedPhoneNumber,
          name: matchedContact.name,
          type: matchedContact.type
        };
      }
      if (formattedPhoneNumber) {
        return {
          phoneNumber: formattedPhoneNumber
        };
      }
    }
    return undefined;
  };
  return {
    DisplayName: function DisplayName(props) {
      if ((displayInfoList === null || displayInfoList === void 0 ? void 0 : displayInfoList.length) > 1 || displayInfoList[0].type === 'phoneNumber') {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "truncate self-stretch",
          title: displayName
        }, displayName);
      }
      return /*#__PURE__*/_react["default"].createElement(_components3.ContactDisplayRender, _extends({
        info: displayInfoList[0]
      }, props));
    },
    formattedPhoneNumber: formattedPhoneNumber,
    correspondentsDisplayInfoMap: correspondentsDisplayInfoMap,
    displayType: signalTo ? displayInfoList[0].type : 'multiple',
    displayDescription: displayDescription,
    Unread: function Unread(props) {
      return unreadCounts > 0 ? /*#__PURE__*/_react["default"].createElement(_springUi.Badge, _extends({
        variant: "contained",
        type: "dot",
        size: "medium",
        color: "warning",
        count: unreadCounts
      }, props)) : null;
    },
    Avatar: Avatar,
    creationTime: creationTime,
    // basic info
    signalSourceInfo: signalSourceInfo,
    matchedContact: matchedContact,
    isInbound: isInbound,
    isTextMessage: isTextMessage,
    isFax: isFax,
    isVoicemail: isVoicemail,
    markAble: markAble,
    unreadCounts: unreadCounts,
    faxAttachmentExist: faxAttachmentExist,
    faxAttachmentUri: faxAttachmentExist ? conversation.faxAttachment.uri : undefined,
    faxAttachmentDownloadUri: faxAttachmentExist ? "".concat(conversation.faxAttachment.uri, "&contentDisposition=Attachment") : undefined,
    voicemailAttachmentExist: voicemailAttachmentExist,
    voicemailAttachmentUri: voicemailAttachmentExist ? conversation.voicemailAttachment.uri : undefined,
    signalTo: signalTo,
    logged: displayLogStatus ? /*#__PURE__*/_react["default"].createElement(_components3.LogInfo, {
      logged: hasCrmLogged
    }) : null,
    myCallerIdTitle: isInbound ? t('to') : t('from'),
    myCallerId: isInbound ? toInfo : fromInfo,
    copyNumber: copyNumber,
    getActionInfo: getActionInfo
  };
};
//# sourceMappingURL=useContactRenderInfo.js.map
