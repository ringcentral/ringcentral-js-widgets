"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.find");

var _ramda = require("ramda");

var _di = require("ringcentral-integration/lib/di");

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _callingModes = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingModes"));

var _sessionStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/sessionStatus"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallCtrlUI = (_dec = (0, _di.Module)({
  name: 'CallCtrlUI',
  deps: ['Webphone', 'Locale', 'ContactMatcher', 'RegionSettings', 'Brand', 'ContactSearch', 'CallingSettings', 'RolesAndPermissions', 'ConnectivityManager', 'ForwardingNumber', 'CallMonitor', 'ExtensionInfo', {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModule) {
  _inherits(CallCtrlUI, _RcUIModule);

  var _super = _createSuper(CallCtrlUI);

  function CallCtrlUI(_ref) {
    var _this;

    var webphone = _ref.webphone,
        locale = _ref.locale,
        contactMatcher = _ref.contactMatcher,
        regionSettings = _ref.regionSettings,
        brand = _ref.brand,
        contactSearch = _ref.contactSearch,
        conferenceCall = _ref.conferenceCall,
        callingSettings = _ref.callingSettings,
        rolesAndPermissions = _ref.rolesAndPermissions,
        connectivityManager = _ref.connectivityManager,
        forwardingNumber = _ref.forwardingNumber,
        callMonitor = _ref.callMonitor,
        routerInteraction = _ref.routerInteraction,
        extensionInfo = _ref.extensionInfo,
        options = _objectWithoutProperties(_ref, ["webphone", "locale", "contactMatcher", "regionSettings", "brand", "contactSearch", "conferenceCall", "callingSettings", "rolesAndPermissions", "connectivityManager", "forwardingNumber", "callMonitor", "routerInteraction", "extensionInfo"]);

    _classCallCheck(this, CallCtrlUI);

    _this = _super.call(this, _objectSpread({}, options));
    _this._webphone = webphone;
    _this._locale = locale;
    _this._contactMatcher = contactMatcher;
    _this._regionSettings = regionSettings;
    _this._brand = brand;
    _this._contactSearch = contactSearch;
    _this._conferenceCall = conferenceCall;
    _this._callingSettings = callingSettings;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._connectivityManager = connectivityManager;
    _this._forwardingNumber = forwardingNumber;
    _this._callMonitor = callMonitor;
    _this._routerInteraction = routerInteraction;
    _this._extensionInfo = extensionInfo;
    return _this;
  }

  _createClass(CallCtrlUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var params = _ref2.params,
          children = _ref2.children,
          _ref2$showCallQueueNa = _ref2.showCallQueueName,
          showCallQueueName = _ref2$showCallQueueNa === void 0 ? false : _ref2$showCallQueueNa;
      var sessionId = params && params.sessionId;
      var currentSession;

      if (sessionId) {
        currentSession = this._webphone.sessions.find(function (session) {
          return session.id === sessionId;
        }) || {};
      } else {
        currentSession = this._webphone.activeSession || {};
      }

      var contactMapping = this._contactMatcher && this._contactMatcher.dataMapping;
      var fromMatches = contactMapping && contactMapping[currentSession.from] || [];
      var toMatches = contactMapping && contactMapping[currentSession.to] || [];
      var nameMatches = currentSession.direction === _callDirections["default"].outbound ? toMatches : fromMatches;
      var isWebRTC = this._callingSettings.callingMode === _callingModes["default"].webphone;
      var isInboundCall = currentSession.direction === _callDirections["default"].inbound;
      var isOnConference = false;
      var hasConferenceCall = false;
      var isMerging = false;
      var conferenceCallParties;
      var conferenceCallId = null;
      var lastCallInfo = this._conferenceCall && this._conferenceCall.lastCallInfo;
      var isConferenceCallOverload = false;
      var conferenceCallEquipped = !!(this._conferenceCall && this._rolesAndPermissions.hasConferenceCallPermission);

      if (conferenceCallEquipped) {
        isOnConference = this._conferenceCall.isConferenceSession(currentSession.id);
        var conferenceData = Object.values(this._conferenceCall.conferences)[0];
        isMerging = this._conferenceCall.isMerging;

        if (conferenceData && isWebRTC) {
          conferenceCallId = conferenceData.conference.id;
          isConferenceCallOverload = this._conferenceCall.isOverload(conferenceCallId);
        }

        hasConferenceCall = !!conferenceData;
        conferenceCallParties = this._conferenceCall.partyProfiles;
        var fromSessionId = this._conferenceCall.mergingPair.fromSessionId;

        if (!isInboundCall && fromSessionId && fromSessionId !== currentSession.id && lastCallInfo && lastCallInfo.status && lastCallInfo.status !== _sessionStatus["default"].finished) {
          // for mergeCtrl page, we don't show any children (container) component.
          children = null;
        }
      }

      var disableLinks = !!(this._connectivityManager.isOfflineMode || this._connectivityManager.isVoipOnlyMode);
      return {
        brand: this._brand.fullName,
        nameMatches: nameMatches,
        currentLocale: this._locale.currentLocale,
        session: currentSession,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        showBackButton: true,
        // callMonitor.calls.length > 0,
        searchContactList: this._contactSearch.sortedResult,
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
        isConferenceCallOverload: isConferenceCallOverload,
        disableFlip: this._forwardingNumber.flipNumbers.length === 0,
        showCallQueueName: showCallQueueName
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;

      var getAvatarUrl = _ref3.getAvatarUrl,
          onBackButtonClick = _ref3.onBackButtonClick,
          phoneTypeRenderer = _ref3.phoneTypeRenderer,
          phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer;
      return {
        getInitialLayout: function getInitialLayout(_ref4) {
          var conferenceCallEquipped = _ref4.conferenceCallEquipped,
              isOnConference = _ref4.isOnConference,
              lastCallInfo = _ref4.lastCallInfo,
              session = _ref4.session;
          var layout = _callCtrlLayouts["default"].normalCtrl;

          if (!conferenceCallEquipped) {
            return layout;
          }

          if (isOnConference) {
            return _callCtrlLayouts["default"].conferenceCtrl;
          }

          var isInboundCall = session.direction === _callDirections["default"].inbound;
          var fromSessionId = _this2._conferenceCall.mergingPair.fromSessionId;
          var fromSession = (0, _ramda.find)(function (x) {
            return x.id === fromSessionId;
          }, _this2._webphone.sessions);
          var activeSessionId = _this2._webphone && _this2._webphone.activeSession && _this2._webphone.activeSession.id;

          if (!isOnConference && !isInboundCall && fromSession && fromSessionId !== session.id && lastCallInfo && (session.callStatus !== _sessionStatus["default"].onHold || session.callStatus === _sessionStatus["default"].onHold && session.id === activeSessionId)) {
            // enter merge ctrl page.
            layout = _callCtrlLayouts["default"].mergeCtrl;
          }

          return layout;
        },
        formatPhone: function formatPhone(phoneNumber) {
          var _this2$_extensionInfo, _this2$_extensionInfo2, _this2$_extensionInfo3;

          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            siteCode: (_this2$_extensionInfo = (_this2$_extensionInfo2 = _this2._extensionInfo) === null || _this2$_extensionInfo2 === void 0 ? void 0 : (_this2$_extensionInfo3 = _this2$_extensionInfo2.site) === null || _this2$_extensionInfo3 === void 0 ? void 0 : _this2$_extensionInfo3.code) !== null && _this2$_extensionInfo !== void 0 ? _this2$_extensionInfo : '',
            isMultipleSiteEnabled: _this2._extensionInfo.isMultipleSiteEnabled
          });
        },
        onHangup: function onHangup(sessionId, layout) {
          _this2._webphone.hangup(sessionId);

          if (layout && layout === _callCtrlLayouts["default"].mergeCtrl) {
            _this2._callMonitor.mergeControlClickHangupTrack();
          }
        },
        onMute: function onMute(sessionId) {
          return _this2._webphone.mute(sessionId);
        },
        onUnmute: function onUnmute(sessionId) {
          return _this2._webphone.unmute(sessionId);
        },
        onHold: function onHold(sessionId) {
          return _this2._webphone.hold(sessionId);
        },
        onUnhold: function onUnhold(sessionId) {
          _this2._webphone.unhold(sessionId);
        },
        onRecord: function onRecord(sessionId) {
          return _this2._webphone.startRecord(sessionId);
        },
        onStopRecord: function onStopRecord(sessionId) {
          return _this2._webphone.stopRecord(sessionId);
        },
        sendDTMF: function sendDTMF(value, sessionId) {
          return _this2._webphone.sendDTMF(value, sessionId);
        },
        updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
          return _this2._webphone.updateSessionMatchedContact(sessionId, contact);
        },
        getAvatarUrl: getAvatarUrl,
        onBackButtonClick: onBackButtonClick,
        onFlip: function onFlip(sessionId) {
          _this2._routerInteraction.push("/flip/".concat(sessionId));
        },
        onTransfer: function onTransfer(sessionId) {
          _this2._routerInteraction.push("/transfer/".concat(sessionId, "/webphone"));
        },
        onPark: function onPark(sessionId) {
          return _this2._webphone.park(sessionId);
        },
        searchContact: function searchContact(searchString) {
          return _this2._contactSearch.debouncedSearch({
            searchString: searchString
          });
        },
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        onAdd: function onAdd(sessionId) {
          // track user click add on call control
          _this2._callMonitor.callControlClickAddTrack();

          var session = (0, _ramda.find)(function (x) {
            return x.id === sessionId;
          }, _this2._webphone.sessions);

          if (!session || !_this2._conferenceCall.validateCallRecording(session)) {
            return;
          }

          var fromNumber = _this2._callingSettings.fromNumber;

          if (session.direction === _callDirections["default"].outbound) {
            fromNumber = session.fromNumber; // keep the same fromNumber
          }

          var otherCalls = (0, _ramda.filter)(function (call) {
            return call.webphoneSession && call.webphoneSession.id !== session.id;
          }, _this2._callMonitor.allCalls);

          if (otherCalls.length) {
            // goto 'calls on hold' page
            _this2._routerInteraction.push("/conferenceCall/callsOnhold/".concat(fromNumber, "/").concat(session.id));
          } else {
            if (_this2._conferenceCall) {
              _this2._conferenceCall.setMergeParty({
                fromSessionId: sessionId
              });
            } // goto dialer directly


            _this2._routerInteraction.push("/conferenceCall/dialer/".concat(fromNumber, "/").concat(sessionId));
          }
        },
        onBeforeMerge: function onBeforeMerge(sessionId) {
          var session = (0, _ramda.find)(function (x) {
            return x.id === sessionId;
          }, _this2._webphone.sessions);

          if (!session || !_this2._conferenceCall.validateCallRecording(session)) {
            return false;
          }

          if (_this2._conferenceCall) {
            var conferenceData = Object.values(_this2._conferenceCall.conferences)[0];

            if (conferenceData) {
              var conferenceSession = (0, _ramda.find)(function (x) {
                return x.id === conferenceData.sessionId;
              }, _this2._webphone.sessions);

              if (conferenceSession && !_this2._conferenceCall.validateCallRecording(conferenceSession)) {
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
                    return _this2._conferenceCall.parseMergingSessions({
                      sessionId: sessionId
                    });

                  case 2:
                    sessions = _context.sent;

                    if (!sessions) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 6;
                    return _this2._conferenceCall.mergeSessions(sessions);

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
          _this2._routerInteraction.push('/conferenceCall/participants'); // track user click participant area on call control


          _this2._callMonitor.callControlClickParticipantAreaTrack();
        },
        loadConference: function loadConference(confId) {
          if (_this2._conferenceCall) {
            _this2._conferenceCall.loadConference(confId);
          }
        },
        closeMergingPair: function closeMergingPair() {
          return _this2._conferenceCall && _this2._conferenceCall.closeMergingPair();
        },
        setMergeParty: function setMergeParty() {
          var _this2$_conferenceCal;

          return _this2._conferenceCall && (_this2$_conferenceCal = _this2._conferenceCall).setMergeParty.apply(_this2$_conferenceCal, arguments);
        },
        // user action track functions
        afterHideMergeConfirm: function afterHideMergeConfirm() {
          return _this2._callMonitor.confirmMergeClickCloseTrack();
        },
        afterConfirmMerge: function afterConfirmMerge() {
          return _this2._callMonitor.confirmMergeClickMergeTrack();
        },
        afterOnMerge: function afterOnMerge() {
          return _this2._callMonitor.callControlClickMergeTrack();
        }
      };
    }
  }]);

  return CallCtrlUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = CallCtrlUI;
//# sourceMappingURL=index.js.map
