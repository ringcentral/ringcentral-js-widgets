'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CallCtrlContainer = exports.mapToFunctions = exports.mapToProps = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _ramda = require('ramda');

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _phoneContext = require('../../lib/phoneContext');

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _CallCtrlContainer = require('./CallCtrlContainer');

var _CallCtrlContainer2 = _interopRequireDefault(_CallCtrlContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      params = _ref.params,
      children = _ref.children;

  var sessionId = params && params.sessionId;
  var currentSession = void 0;

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
  var nameMatches = currentSession.direction === _callDirections2.default.outbound ? toMatches : fromMatches;

  var isWebRTC = callingSettings.callingMode === _callingModes2.default.webphone;
  var isInboundCall = currentSession.direction === _callDirections2.default.inbound;

  var isOnConference = false;
  var hasConferenceCall = false;
  var isMerging = false;
  var conferenceCallParties = void 0;
  var conferenceCallId = null;
  var lastCallInfo = conferenceCall && conferenceCall.lastCallInfo;
  var isConferenceCallOverload = false;
  var conferenceCallEquipped = !!(conferenceCall && rolesAndPermissions.hasConferenceCallPermission);
  if (conferenceCallEquipped) {
    isOnConference = conferenceCall.isConferenceSession(currentSession.id);
    var conferenceData = (0, _values2.default)(conferenceCall.conferences)[0];

    isMerging = conferenceCall.isMerging;

    if (conferenceData && isWebRTC) {
      conferenceCallId = conferenceData.conference.id;
      isConferenceCallOverload = conferenceCall.isOverload(conferenceCallId);
    }

    hasConferenceCall = !!conferenceData;
    conferenceCallParties = conferenceCall.partyProfiles;

    var fromSessionId = conferenceCall.mergingPair.fromSessionId;

    if (!isInboundCall && fromSessionId && fromSessionId !== currentSession.id && lastCallInfo && lastCallInfo.status && lastCallInfo.status !== _sessionStatus2.default.finished) {
      // for mergeCtrl page, we don't show any children (container) component.
      children = null;
    }
  }

  return {
    brand: brand.fullName,
    nameMatches: nameMatches,
    currentLocale: locale.currentLocale,
    session: currentSession,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    flipNumbers: forwardingNumber.flipNumbers,
    showBackButton: true, // callMonitor.calls.length > 0,
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
    isConferenceCallOverload: isConferenceCallOverload
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      webphone = _ref2$phone.webphone,
      regionSettings = _ref2$phone.regionSettings,
      contactSearch = _ref2$phone.contactSearch,
      conferenceCall = _ref2$phone.conferenceCall,
      routerInteraction = _ref2$phone.routerInteraction,
      callMonitor = _ref2$phone.callMonitor,
      getAvatarUrl = _ref2.getAvatarUrl,
      onBackButtonClick = _ref2.onBackButtonClick,
      phoneTypeRenderer = _ref2.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
      recipientsContactInfoRenderer = _ref2.recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer = _ref2.recipientsContactPhoneRenderer;

  return {
    getInitialLayout: function getInitialLayout(_ref3) {
      var conferenceCallEquipped = _ref3.conferenceCallEquipped,
          isOnConference = _ref3.isOnConference,
          lastCallInfo = _ref3.lastCallInfo,
          session = _ref3.session;

      var layout = _callCtrlLayouts2.default.normalCtrl;

      if (!conferenceCallEquipped) {
        return layout;
      }

      if (isOnConference) {
        return _callCtrlLayouts2.default.conferenceCtrl;
      }
      var isInboundCall = session.direction === _callDirections2.default.inbound;

      var fromSessionId = conferenceCall.mergingPair.fromSessionId;

      var fromSession = (0, _ramda.find)(function (x) {
        return x.id === fromSessionId;
      }, webphone.sessions);

      var activeSessionId = webphone && webphone.activeSession && webphone.activeSession.id;

      if (!isOnConference && !isInboundCall && fromSession && fromSessionId !== session.id && lastCallInfo && (session.callStatus !== _sessionStatus2.default.onHold || session.callStatus === _sessionStatus2.default.onHold && session.id === activeSessionId)) {
        // enter merge ctrl page.
        layout = _callCtrlLayouts2.default.mergeCtrl;
      }

      return layout;
    },

    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    onHangup: function onHangup(sessionId, layout) {
      webphone.hangup(sessionId);
      if (layout && layout === _callCtrlLayouts2.default.mergeCtrl) {
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
    onTransfer: function onTransfer(transferNumber, sessionId) {
      return webphone.transfer(transferNumber, sessionId);
    },
    onPark: function onPark(sessionId) {
      return webphone.park(sessionId);
    },
    searchContact: function searchContact(searchString) {
      return contactSearch.debouncedSearch({ searchString: searchString });
    },
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    recipientsContactInfoRenderer: recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer: recipientsContactPhoneRenderer,
    onAdd: function onAdd(sessionId) {
      // track user click add on call control
      callMonitor.callControlClickAddTrack();
      var session = (0, _ramda.find)(function (x) {
        return x.id === sessionId;
      }, webphone.sessions);
      if (!session || !conferenceCall.validateCallRecording(session)) {
        return;
      }
      var otherOutboundCalls = (0, _ramda.filter)(function (call) {
        return call.direction === _callDirections2.default.outbound && call.webphoneSession && call.webphoneSession.id !== session.id;
      }, callMonitor.allCalls);
      if (otherOutboundCalls.length) {
        // goto 'calls on hold' page
        routerInteraction.push('/conferenceCall/callsOnhold/' + session.fromNumber + '/' + session.id);
      } else {
        if (conferenceCall) {
          conferenceCall.setMergeParty({ fromSessionId: sessionId });
        }
        // goto dialer directly
        routerInteraction.push('/conferenceCall/dialer/' + session.fromNumber + '/' + sessionId);
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
        var conferenceData = (0, _values2.default)(conferenceCall.conferences)[0];
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
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sessionId) {
        var sessions;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return conferenceCall.parseMergingSessions({ sessionId: sessionId });

              case 2:
                sessions = _context.sent;

                if (!sessions) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return conferenceCall.mergeSessions(sessions);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onMerge(_x) {
        return _ref4.apply(this, arguments);
      }

      return onMerge;
    }(),
    gotoParticipantsCtrl: function gotoParticipantsCtrl() {
      routerInteraction.push('/conferenceCall/participants');
      // track user click participant area on call control
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

var CallCtrlPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallCtrlContainer2.default));

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.CallCtrlContainer = _CallCtrlContainer2.default;
exports.default = CallCtrlPage;
//# sourceMappingURL=index.js.map
