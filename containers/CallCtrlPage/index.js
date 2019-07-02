"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
Object.defineProperty(exports, "CallCtrlContainer", {
  enumerable: true,
  get: function get() {
    return _CallCtrlContainer["default"];
  }
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.find");

var _ramda = require("ramda");

var _reactRedux = require("react-redux");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _callingModes = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingModes"));

var _sessionStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/sessionStatus"));

var _phoneContext = require("../../lib/phoneContext");

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _CallCtrlContainer = _interopRequireDefault(require("./CallCtrlContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      webphone = _ref$phone.webphone,
      locale = _ref$phone.locale,
      contactMatcher = _ref$phone.contactMatcher,
      regionSettings = _ref$phone.regionSettings,
      brand = _ref$phone.brand,
      forwardingNumber = _ref$phone.forwardingNumber,
      contactSearch = _ref$phone.contactSearch,
      conferenceCall = _ref$phone.conferenceCall,
      callingSettings = _ref$phone.callingSettings,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      connectivityManager = _ref$phone.connectivityManager,
      params = _ref.params,
      children = _ref.children;
  var sessionId = params && params.sessionId;
  var currentSession;

  if (sessionId) {
    currentSession = webphone.sessions.find(function (session) {
      return session.id === sessionId;
    }) || {};
  } else {
    currentSession = webphone.activeSession || {};
  }

  var contactMapping = contactMatcher && contactMatcher.dataMapping;
  var fromMatches = contactMapping && contactMapping[currentSession.from] || [];
  var toMatches = contactMapping && contactMapping[currentSession.to] || [];
  var nameMatches = currentSession.direction === _callDirections["default"].outbound ? toMatches : fromMatches;
  var isWebRTC = callingSettings.callingMode === _callingModes["default"].webphone;
  var isInboundCall = currentSession.direction === _callDirections["default"].inbound;
  var isOnConference = false;
  var hasConferenceCall = false;
  var isMerging = false;
  var conferenceCallParties;
  var conferenceCallId = null;
  var lastCallInfo = conferenceCall && conferenceCall.lastCallInfo;
  var isConferenceCallOverload = false;
  var conferenceCallEquipped = !!(conferenceCall && rolesAndPermissions.hasConferenceCallPermission);

  if (conferenceCallEquipped) {
    isOnConference = conferenceCall.isConferenceSession(currentSession.id);
    var conferenceData = Object.values(conferenceCall.conferences)[0];
    isMerging = conferenceCall.isMerging;

    if (conferenceData && isWebRTC) {
      conferenceCallId = conferenceData.conference.id;
      isConferenceCallOverload = conferenceCall.isOverload(conferenceCallId);
    }

    hasConferenceCall = !!conferenceData;
    conferenceCallParties = conferenceCall.partyProfiles;
    var fromSessionId = conferenceCall.mergingPair.fromSessionId;

    if (!isInboundCall && fromSessionId && fromSessionId !== currentSession.id && lastCallInfo && lastCallInfo.status && lastCallInfo.status !== _sessionStatus["default"].finished) {
      // for mergeCtrl page, we don't show any children (container) component.
      children = null;
    }
  }

  var disableLinks = !!(connectivityManager.isOfflineMode || connectivityManager.isVoipOnlyMode);
  return {
    brand: brand.fullName,
    nameMatches: nameMatches,
    currentLocale: locale.currentLocale,
    session: currentSession,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    flipNumbers: forwardingNumber.flipNumbers,
    showBackButton: true,
    // callMonitor.calls.length > 0,
    searchContactList: contactSearch.sortedResult,
    showSpinner: isMerging,
    conferenceCallEquipped: conferenceCallEquipped,
    hasConferenceCall: hasConferenceCall,
    conferenceCallParties: conferenceCallParties,
    conferenceCallId: conferenceCallId,
    lastCallInfo: lastCallInfo,
    children: children,
    isOnConference: isOnConference,
    isWebRTC: isWebRTC,
    disableLinks: disableLinks,
    isConferenceCallOverload: isConferenceCallOverload
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      webphone = _ref2$phone.webphone,
      regionSettings = _ref2$phone.regionSettings,
      contactSearch = _ref2$phone.contactSearch,
      conferenceCall = _ref2$phone.conferenceCall,
      callingSettings = _ref2$phone.callingSettings,
      routerInteraction = _ref2$phone.routerInteraction,
      callMonitor = _ref2$phone.callMonitor,
      getAvatarUrl = _ref2.getAvatarUrl,
      onBackButtonClick = _ref2.onBackButtonClick,
      phoneTypeRenderer = _ref2.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer;
  return {
    getInitialLayout: function getInitialLayout(_ref3) {
      var conferenceCallEquipped = _ref3.conferenceCallEquipped,
          isOnConference = _ref3.isOnConference,
          lastCallInfo = _ref3.lastCallInfo,
          session = _ref3.session;
      var layout = _callCtrlLayouts["default"].normalCtrl;

      if (!conferenceCallEquipped) {
        return layout;
      }

      if (isOnConference) {
        return _callCtrlLayouts["default"].conferenceCtrl;
      }

      var isInboundCall = session.direction === _callDirections["default"].inbound;
      var fromSessionId = conferenceCall.mergingPair.fromSessionId;
      var fromSession = (0, _ramda.find)(function (x) {
        return x.id === fromSessionId;
      }, webphone.sessions);
      var activeSessionId = webphone && webphone.activeSession && webphone.activeSession.id;

      if (!isOnConference && !isInboundCall && fromSession && fromSessionId !== session.id && lastCallInfo && (session.callStatus !== _sessionStatus["default"].onHold || session.callStatus === _sessionStatus["default"].onHold && session.id === activeSessionId)) {
        // enter merge ctrl page.
        layout = _callCtrlLayouts["default"].mergeCtrl;
      }

      return layout;
    },
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber["default"])({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    onHangup: function onHangup(sessionId, layout) {
      webphone.hangup(sessionId);

      if (layout && layout === _callCtrlLayouts["default"].mergeCtrl) {
        callMonitor.mergeControlClickHangupTrack();
      }
    },
    onMute: function onMute(sessionId) {
      return webphone.mute(sessionId);
    },
    onUnmute: function onUnmute(sessionId) {
      return webphone.unmute(sessionId);
    },
    onHold: function onHold(sessionId) {
      return webphone.hold(sessionId);
    },
    onUnhold: function onUnhold(sessionId) {
      webphone.unhold(sessionId);
    },
    onRecord: function onRecord(sessionId) {
      return webphone.startRecord(sessionId);
    },
    onStopRecord: function onStopRecord(sessionId) {
      return webphone.stopRecord(sessionId);
    },
    sendDTMF: function sendDTMF(value, sessionId) {
      return webphone.sendDTMF(value, sessionId);
    },
    updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
      return webphone.updateSessionMatchedContact(sessionId, contact);
    },
    getAvatarUrl: getAvatarUrl,
    onBackButtonClick: onBackButtonClick,
    onFlip: function onFlip(flipNumber, sessionId) {
      return webphone.flip(flipNumber, sessionId);
    },
    onTransfer: function onTransfer(sessionId) {
      routerInteraction.push("/transfer/".concat(sessionId, "/webphone"));
    },
    onPark: function onPark(sessionId) {
      return webphone.park(sessionId);
    },
    searchContact: function searchContact(searchString) {
      return contactSearch.debouncedSearch({
        searchString: searchString
      });
    },
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    onAdd: function onAdd(sessionId) {
      // track user click add on call control
      callMonitor.callControlClickAddTrack();
      var session = (0, _ramda.find)(function (x) {
        return x.id === sessionId;
      }, webphone.sessions);

      if (!session || !conferenceCall.validateCallRecording(session)) {
        return;
      }

      var fromNumber = callingSettings.fromNumber;

      if (session.direction === _callDirections["default"].outbound) {
        fromNumber = session.fromNumber; // keep the same fromNumber
      }

      var otherCalls = (0, _ramda.filter)(function (call) {
        return call.webphoneSession && call.webphoneSession.id !== session.id;
      }, callMonitor.allCalls);

      if (otherCalls.length) {
        // goto 'calls on hold' page
        routerInteraction.push("/conferenceCall/callsOnhold/".concat(fromNumber, "/").concat(session.id));
      } else {
        if (conferenceCall) {
          conferenceCall.setMergeParty({
            fromSessionId: sessionId
          });
        } // goto dialer directly


        routerInteraction.push("/conferenceCall/dialer/".concat(fromNumber, "/").concat(sessionId));
      }
    },
    onBeforeMerge: function onBeforeMerge(sessionId) {
      var session = (0, _ramda.find)(function (x) {
        return x.id === sessionId;
      }, webphone.sessions);

      if (!session || !conferenceCall.validateCallRecording(session)) {
        return false;
      }

      if (conferenceCall) {
        var conferenceData = Object.values(conferenceCall.conferences)[0];

        if (conferenceData) {
          var conferenceSession = (0, _ramda.find)(function (x) {
            return x.id === conferenceData.sessionId;
          }, webphone.sessions);

          if (conferenceSession && !conferenceCall.validateCallRecording(conferenceSession)) {
            return false;
          }
        }
      }

      return true;
    },
    onMerge: function () {
      var _onMerge = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(sessionId) {
        var sessions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return conferenceCall.parseMergingSessions({
                  sessionId: sessionId
                });

              case 2:
                sessions = _context.sent;

                if (!sessions) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return conferenceCall.mergeSessions(sessions);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onMerge(_x) {
        return _onMerge.apply(this, arguments);
      }

      return onMerge;
    }(),
    gotoParticipantsCtrl: function gotoParticipantsCtrl() {
      routerInteraction.push('/conferenceCall/participants'); // track user click participant area on call control

      callMonitor.callControlClickParticipantAreaTrack();
    },
    loadConference: function loadConference(confId) {
      if (conferenceCall) {
        conferenceCall.loadConference(confId);
      }
    },
    closeMergingPair: function closeMergingPair() {
      return conferenceCall && conferenceCall.closeMergingPair();
    },
    setMergeParty: function setMergeParty() {
      return conferenceCall && conferenceCall.setMergeParty.apply(conferenceCall, arguments);
    },
    // user action track functions
    afterHideMergeConfirm: function afterHideMergeConfirm() {
      return callMonitor.confirmMergeClickCloseTrack();
    },
    afterConfirmMerge: function afterConfirmMerge() {
      return callMonitor.confirmMergeClickMergeTrack();
    },
    afterOnMerge: function afterOnMerge() {
      return callMonitor.callControlClickMergeTrack();
    }
  };
}

var CallCtrlPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallCtrlContainer["default"]));
exports["default"] = CallCtrlPage;
//# sourceMappingURL=index.js.map
