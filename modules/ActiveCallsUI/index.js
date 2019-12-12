"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _di = require("ringcentral-integration/lib/di");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _callLogHelpers = require("ringcentral-integration/lib/callLogHelpers");

var _callingModes = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingModes"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ActiveCallsUI = (_dec = (0, _di.Module)({
  name: 'ActiveCallsUI',
  deps: ['Brand', {
    dep: 'CallLogger',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, 'CallMonitor', 'Locale', 'RegionSettings', 'RolesAndPermissions', {
    dep: 'ConferenceCall',
    optional: true
  }, 'CallingSettings', 'ConnectivityMonitor', 'RateLimiter', {
    dep: 'ActiveCallControl',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, 'RouterInteraction', {
    dep: 'ComposeText',
    optional: true
  }, 'ContactSearch', 'ContactMatcher']
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(ActiveCallsUI, _RcUIModule);

  function ActiveCallsUI(_ref) {
    var _this;

    var brand = _ref.brand,
        callLogger = _ref.callLogger,
        callMonitor = _ref.callMonitor,
        locale = _ref.locale,
        regionSettings = _ref.regionSettings,
        rolesAndPermissions = _ref.rolesAndPermissions,
        conferenceCall = _ref.conferenceCall,
        callingSettings = _ref.callingSettings,
        connectivityMonitor = _ref.connectivityMonitor,
        rateLimiter = _ref.rateLimiter,
        activeCallControl = _ref.activeCallControl,
        webphone = _ref.webphone,
        routerInteraction = _ref.routerInteraction,
        composeText = _ref.composeText,
        contactSearch = _ref.contactSearch,
        contactMatcher = _ref.contactMatcher,
        contactDetailsUI = _ref.contactDetailsUI,
        options = _objectWithoutProperties(_ref, ["brand", "callLogger", "callMonitor", "locale", "regionSettings", "rolesAndPermissions", "conferenceCall", "callingSettings", "connectivityMonitor", "rateLimiter", "activeCallControl", "webphone", "routerInteraction", "composeText", "contactSearch", "contactMatcher", "contactDetailsUI"]);

    _classCallCheck(this, ActiveCallsUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActiveCallsUI).call(this, _objectSpread({}, options)));
    _this._brand = brand;
    _this._callLogger = callLogger;
    _this._callMonitor = callMonitor;
    _this._locale = locale;
    _this._regionSettings = regionSettings;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._conferenceCall = conferenceCall;
    _this._callingSettings = callingSettings;
    _this._connectivityMonitor = connectivityMonitor;
    _this._rateLimiter = rateLimiter;
    _this._activeCallControl = activeCallControl;
    _this._webphone = webphone;
    _this._routerInteraction = routerInteraction;
    _this._composeText = composeText;
    _this._contactSearch = contactSearch;
    _this._contactMatcher = contactMatcher;
    _this._contactDetailsUI = contactDetailsUI;
    return _this;
  }

  _createClass(ActiveCallsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _ref2$showContactDisp = _ref2.showContactDisplayPlaceholder,
          showContactDisplayPlaceholder = _ref2$showContactDisp === void 0 ? false : _ref2$showContactDisp,
          _ref2$showRingoutCall = _ref2.showRingoutCallControl,
          showRingoutCallControl = _ref2$showRingoutCall === void 0 ? false : _ref2$showRingoutCall,
          _ref2$showSwitchCall = _ref2.showSwitchCall,
          showSwitchCall = _ref2$showSwitchCall === void 0 ? false : _ref2$showSwitchCall,
          useV2 = _ref2.useV2;
      var isWebRTC = this._callingSettings.callingMode === _callingModes["default"].webphone;
      var controlBusy = this._activeCallControl && this._activeCallControl.busy || false;
      return {
        currentLocale: this._locale.currentLocale,
        activeRingCalls: this._callMonitor.activeRingCalls,
        activeOnHoldCalls: this._callMonitor.activeOnHoldCalls,
        activeCurrentCalls: this._callMonitor.activeCurrentCalls,
        otherDeviceCalls: this._callMonitor.otherDeviceCalls,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        outboundSmsPermission: !!(this._rolesAndPermissions.permissions && this._rolesAndPermissions.permissions.OutboundSMS),
        internalSmsPermission: !!(this._rolesAndPermissions.permissions && this._rolesAndPermissions.permissions.InternalSMS),
        showSpinner: !!(this._conferenceCall && this._conferenceCall.isMerging),
        brand: this._brand.fullName,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        showRingoutCallControl: showRingoutCallControl,
        showSwitchCall: showSwitchCall && isWebRTC && this._webphone && this._webphone.connected,
        autoLog: !!(this._callLogger && this._callLogger.autoLog),
        isWebRTC: isWebRTC,
        conferenceCallParties: this._conferenceCall ? this._conferenceCall.partyProfiles : null,
        useV2: useV2,
        disableLinks: !this._connectivityMonitor.connectivity || this._rateLimiter.throttling || controlBusy
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;

      var _ref3$composeTextRout = _ref3.composeTextRoute,
          composeTextRoute = _ref3$composeTextRout === void 0 ? '/composeText' : _ref3$composeTextRout,
          _ref3$callCtrlRoute = _ref3.callCtrlRoute,
          callCtrlRoute = _ref3$callCtrlRoute === void 0 ? '/calls/active' : _ref3$callCtrlRoute,
          onCreateContact = _ref3.onCreateContact,
          onLogCall = _ref3.onLogCall,
          isLoggedContact = _ref3.isLoggedContact,
          onCallsEmpty = _ref3.onCallsEmpty,
          onViewContact = _ref3.onViewContact,
          _ref3$showViewContact = _ref3.showViewContact,
          showViewContact = _ref3$showViewContact === void 0 ? true : _ref3$showViewContact,
          getAvatarUrl = _ref3.getAvatarUrl,
          useV2 = _ref3.useV2;
      return {
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode
          });
        },
        webphoneAnswer: function webphoneAnswer(sessionId) {
          var session;
          return regeneratorRuntime.async(function webphoneAnswer$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (_this2._webphone) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  session = _this2._webphone.sessions.find(function (session) {
                    return session.id === sessionId;
                  });

                  if (_this2._conferenceCall && session && session.direction === _callDirections["default"].inbound) {
                    _this2._conferenceCall.closeMergingPair();
                  }

                  _this2._webphone.answer(sessionId);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          });
        },
        webphoneToVoicemail: function webphoneToVoicemail() {
          var _this2$_webphone;

          var _args2 = arguments;
          return regeneratorRuntime.async(function webphoneToVoicemail$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", _this2._webphone && (_this2$_webphone = _this2._webphone).toVoiceMail.apply(_this2$_webphone, _args2));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          });
        },
        webphoneReject: function webphoneReject() {
          var _this2$_webphone2;

          var _args3 = arguments;
          return regeneratorRuntime.async(function webphoneReject$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", _this2._webphone && (_this2$_webphone2 = _this2._webphone).reject.apply(_this2$_webphone2, _args3));

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          });
        },
        webphoneHangup: function webphoneHangup() {
          var _this2$_webphone3;

          var _args4 = arguments;
          return regeneratorRuntime.async(function webphoneHangup$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // user action track
                  _this2._callMonitor.allCallsClickHangupTrack();

                  return _context4.abrupt("return", _this2._webphone && (_this2$_webphone3 = _this2._webphone).hangup.apply(_this2$_webphone3, _args4));

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          });
        },
        webphoneResume: function webphoneResume() {
          var _this2$_webphone4;

          var _args5 = arguments;
          return regeneratorRuntime.async(function webphoneResume$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (_this2._webphone) {
                    _context5.next = 2;
                    break;
                  }

                  return _context5.abrupt("return");

                case 2:
                  _context5.next = 4;
                  return regeneratorRuntime.awrap((_this2$_webphone4 = _this2._webphone).resume.apply(_this2$_webphone4, _args5));

                case 4:
                  if (_this2._routerInteraction.currentPath !== callCtrlRoute && !useV2) {
                    _this2._routerInteraction.push(callCtrlRoute);
                  }

                case 5:
                case "end":
                  return _context5.stop();
              }
            }
          });
        },
        webphoneHold: function webphoneHold() {
          var _this2$_webphone5;

          var _args6 = arguments;
          return regeneratorRuntime.async(function webphoneHold$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  // user action track
                  _this2._callMonitor.allCallsClickHoldTrack();

                  return _context6.abrupt("return", _this2._webphone && (_this2$_webphone5 = _this2._webphone).hold.apply(_this2$_webphone5, _args6));

                case 2:
                case "end":
                  return _context6.stop();
              }
            }
          });
        },
        webphoneSwitchCall: function webphoneSwitchCall(activeCall) {
          var session;
          return regeneratorRuntime.async(function webphoneSwitchCall$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (_this2._webphone) {
                    _context7.next = 2;
                    break;
                  }

                  return _context7.abrupt("return");

                case 2:
                  _context7.next = 4;
                  return regeneratorRuntime.awrap(_this2._webphone.switchCall(activeCall, _this2._regionSettings.homeCountryId));

                case 4:
                  session = _context7.sent;
                  return _context7.abrupt("return", session);

                case 6:
                case "end":
                  return _context7.stop();
              }
            }
          });
        },
        ringoutHangup: function ringoutHangup() {
          var _this2$_activeCallCon;

          var _args8 = arguments;
          return regeneratorRuntime.async(function ringoutHangup$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  // user action track
                  _this2._callMonitor.allCallsClickHangupTrack();

                  return _context8.abrupt("return", _this2._activeCallControl && (_this2$_activeCallCon = _this2._activeCallControl).hangUp.apply(_this2$_activeCallCon, _args8));

                case 2:
                case "end":
                  return _context8.stop();
              }
            }
          });
        },
        ringoutTransfer: function ringoutTransfer(sessionId) {
          return regeneratorRuntime.async(function ringoutTransfer$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _this2._routerInteraction.push("/transfer/".concat(sessionId, "/active"));

                case 1:
                case "end":
                  return _context9.stop();
              }
            }
          });
        },
        ringoutReject: function ringoutReject(sessionId) {
          return regeneratorRuntime.async(function ringoutReject$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  // user action track
                  _this2._callMonitor.allCallsClickRejectTrack();

                  return _context10.abrupt("return", _this2._activeCallControl && _this2._activeCallControl.reject(sessionId));

                case 2:
                case "end":
                  return _context10.stop();
              }
            }
          });
        },
        onViewContact: showViewContact ? onViewContact || function (_ref4) {
          var contact = _ref4.contact;
          var id = contact.id,
              type = contact.type;

          if (_this2._contactDetailsUI) {
            _this2._contactDetailsUI.showContactDetails({
              type: type,
              id: id,
              direct: true
            });
          }
        } : null,
        onClickToSms: this._composeText ? function _callee(contact) {
          var isDummyContact,
              _args11 = arguments;
          return regeneratorRuntime.async(function _callee$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  isDummyContact = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : false;

                  if (_this2._routerInteraction) {
                    _this2._routerInteraction.push(composeTextRoute);
                  }

                  _this2._composeText.clean();

                  if (contact.name && contact.phoneNumber && isDummyContact) {
                    _this2._composeText.updateTypingToNumber(contact.name);

                    _this2._contactSearch.search({
                      searchString: contact.name
                    });
                  } else {
                    _this2._composeText.addToRecipients(contact);
                  }

                case 4:
                case "end":
                  return _context11.stop();
              }
            }
          });
        } : undefined,
        onCreateContact: onCreateContact ? function _callee2(_ref5) {
          var phoneNumber, name, entityType, hasMatchNumber;
          return regeneratorRuntime.async(function _callee2$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  phoneNumber = _ref5.phoneNumber, name = _ref5.name, entityType = _ref5.entityType;
                  _context12.next = 3;
                  return regeneratorRuntime.awrap(_this2._contactMatcher.hasMatchNumber({
                    phoneNumber: phoneNumber,
                    ignoreCache: true
                  }));

                case 3:
                  hasMatchNumber = _context12.sent;

                  if (hasMatchNumber) {
                    _context12.next = 9;
                    break;
                  }

                  _context12.next = 7;
                  return regeneratorRuntime.awrap(onCreateContact({
                    phoneNumber: phoneNumber,
                    name: name,
                    entityType: entityType
                  }));

                case 7:
                  _context12.next = 9;
                  return regeneratorRuntime.awrap(_this2._contactMatcher.forceMatchNumber({
                    phoneNumber: phoneNumber
                  }));

                case 9:
                case "end":
                  return _context12.stop();
              }
            }
          });
        } : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall || this._callLogger && function _callee3(_ref6) {
          var call, contact, _ref6$redirect, redirect;

          return regeneratorRuntime.async(function _callee3$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  call = _ref6.call, contact = _ref6.contact, _ref6$redirect = _ref6.redirect, redirect = _ref6$redirect === void 0 ? true : _ref6$redirect;
                  _context13.next = 3;
                  return regeneratorRuntime.awrap(_this2._callLogger.logCall({
                    call: call,
                    contact: contact,
                    redirect: redirect
                  }));

                case 3:
                case "end":
                  return _context13.stop();
              }
            }
          });
        },
        onCallsEmpty: onCallsEmpty || function () {
          var isWebRTC = _this2._callingSettings.callingMode === _callingModes["default"].webphone;

          if (isWebRTC && !_this2._webphone.sessions.length) {
            _this2._routerInteraction.push('/dialer');
          }
        },
        isSessionAConferenceCall: function isSessionAConferenceCall(sessionId) {
          return !!(_this2._conferenceCall && _this2._conferenceCall.isConferenceSession(sessionId));
        },
        onCallItemClick: function onCallItemClick(call) {
          if (!call.webphoneSession) {
            // For ringout call
            if ((0, _callLogHelpers.isRingingInboundCall)(call)) {
              return;
            }

            var telephonySessionId = call.telephonySessionId; // to track the call item be clicked.

            _this2._callMonitor.callItemClickTrack();

            _this2._routerInteraction.push("/simplifycallctrl/".concat(telephonySessionId));
          } else {
            // For webphone call
            // show the ring call modal when click a ringing call.
            if ((0, _callLogHelpers.isRingingInboundCall)(call)) {
              _this2._webphone.toggleMinimized(call.webphoneSession.id);

              return;
            }

            if (call.webphoneSession && call.webphoneSession.id) {
              // to track the call item be clicked.
              _this2._callMonitor.callItemClickTrack();

              _this2._routerInteraction.push("".concat(callCtrlRoute, "/").concat(call.webphoneSession.id));
            }
          }
        },
        getAvatarUrl: getAvatarUrl,
        updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
          return _this2._webphone.updateSessionMatchedContact(sessionId, contact);
        }
      };
    }
  }]);

  return ActiveCallsUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = ActiveCallsUI;
//# sourceMappingURL=index.js.map
