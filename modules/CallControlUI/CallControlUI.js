"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallControlUI = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

var _ramda = require("ramda");

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");

var _callingModes = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingModes"));

var _sessionStatus = require("@ringcentral-integration/commons/modules/Webphone/sessionStatus");

var _core = require("@ringcentral-integration/core");

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");

var _CallControlUI = require("./CallControlUI.interface");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallControlUI = (_dec = (0, _di.Module)({
  name: 'CallControlUI',
  deps: ['Webphone', 'Locale', 'ContactMatcher', 'RegionSettings', 'Brand', 'ContactSearch', 'CallingSettings', 'ConnectivityManager', 'ForwardingNumber', 'CallMonitor', 'ExtensionInfo', 'AppFeatures', {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(CallControlUI, _RcUIModuleV);

  var _super = _createSuper(CallControlUI);

  function CallControlUI(deps) {
    var _this;

    _classCallCheck(this, CallControlUI);

    _this = _super.call(this, {
      deps: deps
    });

    _this.getInitialLayout = function (_ref) {
      var conferenceCallEquipped = _ref.conferenceCallEquipped,
          isOnConference = _ref.isOnConference,
          lastCallInfo = _ref.lastCallInfo,
          session = _ref.session;
      var _this$_deps = _this._deps,
          conferenceCall = _this$_deps.conferenceCall,
          webphone = _this$_deps.webphone;
      var layout = _callCtrlLayouts["default"].normalCtrl;

      if (session.warmTransferSessionId) {
        return _callCtrlLayouts["default"].completeTransferCtrl;
      }

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

      if (!isOnConference && !isInboundCall && fromSession && fromSessionId !== session.id && lastCallInfo && (session.callStatus !== _sessionStatus.sessionStatus.onHold || session.callStatus === _sessionStatus.sessionStatus.onHold && session.id === activeSessionId)) {
        // enter merge ctrl page.
        layout = _callCtrlLayouts["default"].mergeCtrl;
      }

      return layout;
    };

    return _this;
  }

  _createClass(CallControlUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _contactMapping$curre, _contactMapping$curre2, _conferenceCall$hasPe, _conferenceCall$mergi;

      var params = _ref2.params,
          _ref2$showCallQueueNa = _ref2.showCallQueueName,
          showCallQueueName = _ref2$showCallQueueNa === void 0 ? false : _ref2$showCallQueueNa,
          _ref2$showPark = _ref2.showPark,
          showPark = _ref2$showPark === void 0 ? false : _ref2$showPark,
          children = _ref2.children;
      var _this$_deps2 = this._deps,
          brand = _this$_deps2.brand,
          callingSettings = _this$_deps2.callingSettings,
          conferenceCall = _this$_deps2.conferenceCall,
          connectivityManager = _this$_deps2.connectivityManager,
          contactMatcher = _this$_deps2.contactMatcher,
          contactSearch = _this$_deps2.contactSearch,
          forwardingNumber = _this$_deps2.forwardingNumber,
          regionSettings = _this$_deps2.regionSettings,
          locale = _this$_deps2.locale,
          webphone = _this$_deps2.webphone;
      var sessionId = params === null || params === void 0 ? void 0 : params.sessionId;
      var currentSession = (sessionId ? (0, _ramda.find)(function (session) {
        return session.id === sessionId;
      }, webphone.sessions) : webphone.activeSession) || {};
      var contactMapping = contactMatcher === null || contactMatcher === void 0 ? void 0 : contactMatcher.dataMapping;
      var fromMatches = (_contactMapping$curre = contactMapping === null || contactMapping === void 0 ? void 0 : contactMapping[currentSession.from]) !== null && _contactMapping$curre !== void 0 ? _contactMapping$curre : [];
      var toMatches = (_contactMapping$curre2 = contactMapping === null || contactMapping === void 0 ? void 0 : contactMapping[currentSession.to]) !== null && _contactMapping$curre2 !== void 0 ? _contactMapping$curre2 : [];
      var nameMatches = currentSession.direction === _callDirections["default"].outbound ? toMatches : fromMatches;
      var isWebRTC = callingSettings.callingMode === _callingModes["default"].webphone;
      var isInboundCall = currentSession.direction === _callDirections["default"].inbound;
      var lastCallInfo = conferenceCall === null || conferenceCall === void 0 ? void 0 : conferenceCall.lastCallInfo;
      var conferenceCallEquipped = (_conferenceCall$hasPe = conferenceCall === null || conferenceCall === void 0 ? void 0 : conferenceCall.hasPermission) !== null && _conferenceCall$hasPe !== void 0 ? _conferenceCall$hasPe : false;
      var conferenceData = conferenceCallEquipped ? (0, _ramda.values)(conferenceCall.conferences)[0] : undefined;
      var isOnConference = conferenceCallEquipped ? conferenceCall.isConferenceSession(currentSession.id) : false;
      var isMerging = conferenceCallEquipped && conferenceCall.isMerging;
      var conferenceCallId = conferenceData && isWebRTC ? conferenceData.conference.id : null;
      var isConferenceCallOverload = conferenceData && isWebRTC ? conferenceCall.isOverload(conferenceCallId) : false;
      var hasConferenceCall = !!conferenceData;
      var conferenceCallParties = conferenceCallEquipped ? conferenceCall.partyProfiles : undefined; // TODO: investigate whether this can simply use isMerging

      var fromSessionId = conferenceCallEquipped ? (_conferenceCall$mergi = conferenceCall.mergingPair) === null || _conferenceCall$mergi === void 0 ? void 0 : _conferenceCall$mergi.fromSessionId : undefined;
      var hideChildren = conferenceCallEquipped && !isInboundCall && fromSessionId && fromSessionId !== currentSession.id;
      lastCallInfo && lastCallInfo.status !== _sessionStatus.sessionStatus.finished;

      if (currentSession.warmTransferSessionId) {
        var warmTransferSession = webphone.sessions.find(function (session) {
          return session.id === currentSession.warmTransferSessionId;
        });
        lastCallInfo = (0, _CallControlUI.getLastCallInfoFromWebphoneSession)(warmTransferSession);
      }

      var disableLinks = !!(connectivityManager.isOfflineMode || connectivityManager.isVoipOnlyMode);
      var phoneNumber = currentSession.direction === _callDirections["default"].outbound ? currentSession.to : currentSession.from;

      if (this._deps.appFeatures.isCDCEnabled && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, nameMatches)) {
        phoneNumber = null;
      }

      return {
        brand: brand.name,
        nameMatches: nameMatches,
        phoneNumber: phoneNumber,
        currentLocale: locale.currentLocale,
        session: currentSession,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        showBackButton: true,
        // callMonitor.calls.length > 0,
        searchContactList: contactSearch.sortedResult,
        showSpinner: isMerging,
        conferenceCallEquipped: conferenceCallEquipped,
        hasConferenceCall: hasConferenceCall,
        conferenceCallParties: conferenceCallParties,
        conferenceCallId: conferenceCallId,
        lastCallInfo: lastCallInfo,
        // TODO: investigate whether it's better to just
        // use isMerging and let the component decide whether to display children
        children: hideChildren ? null : children,
        isOnConference: isOnConference,
        isWebRTC: isWebRTC,
        disableLinks: disableLinks,
        isConferenceCallOverload: isConferenceCallOverload,
        disableFlip: forwardingNumber.flipNumbers.length === 0,
        showCallQueueName: showCallQueueName,
        showPark: showPark
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var getAvatarUrl = _ref3.getAvatarUrl,
          onBackButtonClick = _ref3.onBackButtonClick,
          phoneTypeRenderer = _ref3.phoneTypeRenderer,
          phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer;
      var _this$_deps3 = this._deps,
          conferenceCall = _this$_deps3.conferenceCall,
          webphone = _this$_deps3.webphone,
          regionSettings = _this$_deps3.regionSettings,
          extensionInfo = _this$_deps3.extensionInfo,
          callingSettings = _this$_deps3.callingSettings,
          callMonitor = _this$_deps3.callMonitor,
          routerInteraction = _this$_deps3.routerInteraction,
          contactSearch = _this$_deps3.contactSearch;
      return {
        getInitialLayout: this.getInitialLayout,
        formatPhone: function formatPhone(phoneNumber) {
          var _extensionInfo$site$c, _extensionInfo$site;

          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: regionSettings.areaCode,
            countryCode: regionSettings.countryCode,
            siteCode: (_extensionInfo$site$c = extensionInfo === null || extensionInfo === void 0 ? void 0 : (_extensionInfo$site = extensionInfo.site) === null || _extensionInfo$site === void 0 ? void 0 : _extensionInfo$site.code) !== null && _extensionInfo$site$c !== void 0 ? _extensionInfo$site$c : '',
            isMultipleSiteEnabled: extensionInfo.isMultipleSiteEnabled
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
        sendDTMF: function sendDTMF() {
          return webphone.sendDTMF.apply(webphone, arguments);
        },
        updateSessionMatchedContact: function updateSessionMatchedContact() {
          return webphone.updateSessionMatchedContact.apply(webphone, arguments);
        },
        getAvatarUrl: getAvatarUrl,
        onBackButtonClick: onBackButtonClick,
        onFlip: function onFlip(sessionId) {
          routerInteraction.push("/flip/".concat(sessionId));
        },
        onTransfer: function onTransfer(sessionId) {
          routerInteraction.push("/transfer/".concat(sessionId, "/webphone"));
        },
        onCompleteTransfer: function onCompleteTransfer(sessionId) {
          webphone.completeWarmTransfer(sessionId);
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
          var _onMerge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionId) {
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
        loadConference: function loadConference(conferenceId) {
          if (conferenceCall) {
            conferenceCall.loadConference(conferenceId);
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
  }]);

  return CallControlUI;
}(_core.RcUIModuleV2)) || _class);
exports.CallControlUI = CallControlUI;
//# sourceMappingURL=CallControlUI.js.map
