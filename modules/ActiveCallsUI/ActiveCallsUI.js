"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallsUI = void 0;

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/formatNumber"));

var _helpers = require("@ringcentral-integration/commons/modules/ActiveCallControlV2/helpers");

var _callingModes = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingModes"));

var _webphoneHelper = require("@ringcentral-integration/commons/modules/Webphone/webphoneHelper");

var _core = require("@ringcentral-integration/core");

var _ActiveCallItemV = require("../../components/ActiveCallItemV2");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ModalContentRendererID = 'ActiveCallsUI.ModalContentRenderer';
var ActiveCallsUI = (_dec = (0, _di.Module)({
  name: 'ActiveCallsUI',
  deps: ['Brand', 'Locale', 'CallMonitor', 'RateLimiter', 'ContactSearch', 'RegionSettings', 'ContactMatcher', 'CallingSettings', 'RouterInteraction', 'AppFeatures', 'ConnectivityMonitor', {
    dep: 'ModalUI',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'CallLogger',
    optional: true
  }, {
    dep: 'ComposeText',
    optional: true
  }, {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ActiveCallsUI, _RcUIModuleV);

  var _super = _createSuper(ActiveCallsUI);

  function ActiveCallsUI(deps) {
    var _this$_deps$modalUI;

    var _this;

    _classCallCheck(this, ActiveCallsUI);

    _this = _super.call(this, {
      deps: deps
    });
    (_this$_deps$modalUI = _this._deps.modalUI) === null || _this$_deps$modalUI === void 0 ? void 0 : _this$_deps$modalUI.registerRenderer(ModalContentRendererID, function (_ref) {
      var currentLocale = _ref.currentLocale,
          contactName = _ref.contactName;
      return /*#__PURE__*/_react["default"].createElement(_ActiveCallItemV.ModalContent, {
        currentLocale: currentLocale,
        contactName: contactName
      });
    });
    return _this;
  }

  _createClass(ActiveCallsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this$_deps$activeCal, _this$_deps$conferenc, _this$_deps$webphone, _this$_deps$callLogge;

      var _ref2$showContactDisp = _ref2.showContactDisplayPlaceholder,
          showContactDisplayPlaceholder = _ref2$showContactDisp === void 0 ? false : _ref2$showContactDisp,
          _ref2$showRingoutCall = _ref2.showRingoutCallControl,
          showRingoutCallControl = _ref2$showRingoutCall === void 0 ? false : _ref2$showRingoutCall,
          _ref2$showSwitchCall = _ref2.showSwitchCall,
          showSwitchCall = _ref2$showSwitchCall === void 0 ? false : _ref2$showSwitchCall,
          _ref2$showTransferCal = _ref2.showTransferCall,
          showTransferCall = _ref2$showTransferCal === void 0 ? true : _ref2$showTransferCal,
          _ref2$showHoldOnOther = _ref2.showHoldOnOtherDevice,
          showHoldOnOtherDevice = _ref2$showHoldOnOther === void 0 ? false : _ref2$showHoldOnOther,
          useV2 = _ref2.useV2,
          useCallControl = _ref2.useCallControl;
      var isWebRTC = this._deps.callingSettings.callingMode === _callingModes["default"].webphone;
      var controlBusy = ((_this$_deps$activeCal = this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.busy) || false;
      return {
        currentLocale: this._deps.locale.currentLocale,
        activeRingCalls: this._deps.callMonitor.activeRingCalls,
        activeOnHoldCalls: this._deps.callMonitor.activeOnHoldCalls,
        activeCurrentCalls: this._deps.callMonitor.activeCurrentCalls,
        otherDeviceCalls: this._deps.callMonitor.otherDeviceCalls,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
        showSpinner: !!((_this$_deps$conferenc = this._deps.conferenceCall) === null || _this$_deps$conferenc === void 0 ? void 0 : _this$_deps$conferenc.isMerging),
        brand: this._deps.brand.name,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        showRingoutCallControl: showRingoutCallControl,
        showTransferCall: showTransferCall,
        showHoldOnOtherDevice: showHoldOnOtherDevice,
        showSwitchCall: showSwitchCall && isWebRTC && ((_this$_deps$webphone = this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : _this$_deps$webphone.connected),
        autoLog: !!((_this$_deps$callLogge = this._deps.callLogger) === null || _this$_deps$callLogge === void 0 ? void 0 : _this$_deps$callLogge.autoLog),
        isWebRTC: isWebRTC,
        conferenceCallParties: this._deps.conferenceCall ? this._deps.conferenceCall.partyProfiles : null,
        useV2: useV2,
        disableLinks: !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling || controlBusy,
        useCallControl: useCallControl,
        isWide: this.isWide
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
          useV2 = _ref3.useV2,
          useCallControl = _ref3.useCallControl;
      // Toggle to control if use new call control API, should using the ActiveCallControlV2 module same time,
      // when you set this toggle to true (https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession)
      var useActiveCallControl = !!(useCallControl && this._deps.activeCallControl);
      return {
        modalConfirm: function modalConfirm(props) {
          var _this2$_deps$modalUI;

          return (_this2$_deps$modalUI = _this2._deps.modalUI) === null || _this2$_deps$modalUI === void 0 ? void 0 : _this2$_deps$modalUI.confirm(_objectSpread(_objectSpread({}, props), {}, {
            content: ModalContentRendererID
          }));
        },
        modalClose: function modalClose(id) {
          var _this2$_deps$modalUI2;

          return (_this2$_deps$modalUI2 = _this2._deps.modalUI) === null || _this2$_deps$modalUI2 === void 0 ? void 0 : _this2$_deps$modalUI2.close(id);
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: _this2._deps.regionSettings.areaCode,
            countryCode: _this2._deps.regionSettings.countryCode
          });
        },
        webphoneAnswer: function () {
          var _webphoneAnswer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionId, telephonySessionId) {
            var isHoldAndAnswer,
                session,
                _args = arguments;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    isHoldAndAnswer = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;

                    if (!useActiveCallControl) {
                      _context.next = 5;
                      break;
                    }

                    isHoldAndAnswer && _this2._deps.activeCallControl.answerAndHold ? _this2._deps.activeCallControl.answerAndHold(telephonySessionId) : _this2._deps.activeCallControl.answer(telephonySessionId);
                    _context.next = 10;
                    break;

                  case 5:
                    if (_this2._deps.webphone) {
                      _context.next = 7;
                      break;
                    }

                    return _context.abrupt("return");

                  case 7:
                    session = _this2._deps.webphone.sessions.find(function (session) {
                      return session.id === sessionId;
                    });

                    if (_this2._deps.conferenceCall && session && session.direction === _callDirections["default"].inbound) {
                      _this2._deps.conferenceCall.closeMergingPair();
                    }

                    _this2._deps.webphone.answer(sessionId);

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function webphoneAnswer(_x, _x2) {
            return _webphoneAnswer.apply(this, arguments);
          }

          return webphoneAnswer;
        }(),
        webphoneToVoicemail: function webphoneToVoicemail(sessionId, telephonySessionId) {
          var _this2$_deps$webphone;

          if (useActiveCallControl) {
            return _this2._deps.activeCallControl.reject(telephonySessionId);
          }

          return (_this2$_deps$webphone = _this2._deps.webphone) === null || _this2$_deps$webphone === void 0 ? void 0 : _this2$_deps$webphone.toVoiceMail(sessionId);
        },
        webphoneReject: function webphoneReject(sessionId) {
          var _this2$_deps$webphone2;

          return (_this2$_deps$webphone2 = _this2._deps.webphone) === null || _this2$_deps$webphone2 === void 0 ? void 0 : _this2$_deps$webphone2.reject(sessionId);
        },
        webphoneHangup: function webphoneHangup(sessionId, telephonySessionId) {
          var _this2$_deps$webphone3;

          // user action track
          _this2._deps.callMonitor.allCallsClickHangupTrack();

          if (useActiveCallControl) {
            return _this2._deps.activeCallControl.hangUp(telephonySessionId);
          }

          return (_this2$_deps$webphone3 = _this2._deps.webphone) === null || _this2$_deps$webphone3 === void 0 ? void 0 : _this2$_deps$webphone3.hangup(sessionId);
        },
        webphoneResume: function () {
          var _webphoneResume = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sessionId, telephonySessionId) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!useActiveCallControl) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return", _this2._deps.activeCallControl.unhold(telephonySessionId));

                  case 2:
                    if (_this2._deps.webphone) {
                      _context2.next = 4;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 4:
                    _context2.next = 6;
                    return _this2._deps.webphone.resume(sessionId);

                  case 6:
                    if (_this2._deps.routerInteraction.currentPath !== callCtrlRoute && !useV2) {
                      _this2._deps.routerInteraction.push(callCtrlRoute);
                    }

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function webphoneResume(_x3, _x4) {
            return _webphoneResume.apply(this, arguments);
          }

          return webphoneResume;
        }(),
        webphoneHold: function webphoneHold(sessionId, telephonySessionId) {
          var _this2$_deps$webphone4;

          // user action track
          _this2._deps.callMonitor.allCallsClickHoldTrack();

          if (useActiveCallControl) {
            return _this2._deps.activeCallControl.hold(telephonySessionId);
          }

          return (_this2$_deps$webphone4 = _this2._deps.webphone) === null || _this2$_deps$webphone4 === void 0 ? void 0 : _this2$_deps$webphone4.hold(sessionId);
        },
        webphoneSwitchCall: function () {
          var _webphoneSwitchCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(activeCall) {
            var session;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!useActiveCallControl) {
                      _context3.next = 2;
                      break;
                    }

                    return _context3.abrupt("return", _this2._deps.activeCallControl["switch"](activeCall.telephonySessionId));

                  case 2:
                    if (_this2._deps.webphone) {
                      _context3.next = 4;
                      break;
                    }

                    return _context3.abrupt("return");

                  case 4:
                    _context3.next = 6;
                    return _this2._deps.webphone.switchCall(activeCall, _this2._deps.regionSettings.homeCountryId);

                  case 6:
                    session = _context3.sent;
                    return _context3.abrupt("return", session);

                  case 8:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function webphoneSwitchCall(_x5) {
            return _webphoneSwitchCall.apply(this, arguments);
          }

          return webphoneSwitchCall;
        }(),
        webphoneIgnore: function webphoneIgnore(telephonySessionId) {
          var _this2$_deps$activeCa;

          return (_this2$_deps$activeCa = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa === void 0 ? void 0 : _this2$_deps$activeCa.ignore(telephonySessionId);
        },
        ringoutHangup: function () {
          var _ringoutHangup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var _this2$_deps$activeCa2;

            var _len,
                args,
                _key,
                _args4 = arguments;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    // user action track
                    _this2._deps.callMonitor.allCallsClickHangupTrack();

                    for (_len = _args4.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                      args[_key] = _args4[_key];
                    }

                    return _context4.abrupt("return", (_this2$_deps$activeCa2 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa2 === void 0 ? void 0 : _this2$_deps$activeCa2.hangUp.apply(_this2$_deps$activeCa2, args));

                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function ringoutHangup() {
            return _ringoutHangup.apply(this, arguments);
          }

          return ringoutHangup;
        }(),
        ringoutTransfer: function ringoutTransfer(sessionId) {
          _this2._deps.routerInteraction.push("/transfer/".concat(sessionId, "/active"));
        },
        ringoutReject: function () {
          var _ringoutReject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(sessionId) {
            var _this2$_deps$activeCa3;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    // user action track
                    _this2._deps.callMonitor.allCallsClickRejectTrack();

                    return _context5.abrupt("return", (_this2$_deps$activeCa3 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa3 === void 0 ? void 0 : _this2$_deps$activeCa3.reject(sessionId));

                  case 2:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));

          function ringoutReject(_x6) {
            return _ringoutReject.apply(this, arguments);
          }

          return ringoutReject;
        }(),
        onViewContact: showViewContact ? onViewContact || function (_ref4) {
          var _this2$_deps$contactD;

          var contact = _ref4.contact;
          var id = contact.id,
              type = contact.type;
          (_this2$_deps$contactD = _this2._deps.contactDetailsUI) === null || _this2$_deps$contactD === void 0 ? void 0 : _this2$_deps$contactD.showContactDetails({
            type: type,
            id: id,
            direct: true
          });
        } : null,
        onClickToSms: this._deps.composeText ? /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(contact) {
            var isDummyContact,
                _ref6,
                name,
                _args6 = arguments;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    isDummyContact = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : false;

                    if (_this2._deps.routerInteraction) {
                      _this2._deps.routerInteraction.push(composeTextRoute);
                    }

                    _this2._deps.composeText.clean();

                    _ref6 = contact, name = _ref6.name;

                    if (name && contact.phoneNumber && isDummyContact) {
                      _this2._deps.composeText.updateTypingToNumber(name);

                      _this2._deps.contactSearch.search({
                        searchString: name
                      });
                    } else {
                      _this2._deps.composeText.addToRecipients(contact);
                    }

                  case 5:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));

          return function (_x7) {
            return _ref5.apply(this, arguments);
          };
        }() : undefined,
        onCreateContact: onCreateContact ? /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref7) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    phoneNumber = _ref7.phoneNumber, name = _ref7.name, entityType = _ref7.entityType;
                    _context7.next = 3;
                    return _this2._deps.contactMatcher.hasMatchNumber({
                      phoneNumber: phoneNumber,
                      ignoreCache: true
                    });

                  case 3:
                    hasMatchNumber = _context7.sent;

                    if (hasMatchNumber) {
                      _context7.next = 9;
                      break;
                    }

                    _context7.next = 7;
                    return onCreateContact({
                      phoneNumber: phoneNumber,
                      name: name,
                      entityType: entityType
                    });

                  case 7:
                    _context7.next = 9;
                    return _this2._deps.contactMatcher.forceMatchNumber({
                      phoneNumber: phoneNumber
                    });

                  case 9:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));

          return function (_x8) {
            return _ref8.apply(this, arguments);
          };
        }() : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall || this._deps.callLogger && /*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref9) {
            var call, contact, _ref9$redirect, redirect;

            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    call = _ref9.call, contact = _ref9.contact, _ref9$redirect = _ref9.redirect, redirect = _ref9$redirect === void 0 ? true : _ref9$redirect;
                    _context8.next = 3;
                    return _this2._deps.callLogger.logCall({
                      call: call,
                      contact: contact,
                      redirect: redirect
                    });

                  case 3:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          }));

          return function (_x9) {
            return _ref10.apply(this, arguments);
          };
        }(),
        onCallsEmpty: onCallsEmpty || function () {
          var isWebRTC = _this2._deps.callingSettings.callingMode === _callingModes["default"].webphone;

          if (isWebRTC && !_this2._deps.webphone.sessions.length) {
            _this2._deps.routerInteraction.push('/dialer');
          }
        },
        isSessionAConferenceCall: function isSessionAConferenceCall(sessionId) {
          var _this2$_deps$conferen;

          return !!((_this2$_deps$conferen = _this2._deps.conferenceCall) === null || _this2$_deps$conferen === void 0 ? void 0 : _this2$_deps$conferen.isConferenceSession(sessionId));
        },
        onCallItemClick: function onCallItemClick(call) {
          if (!call.webphoneSession) {
            // For ringout call
            if ((0, _callLogHelpers.isRingingInboundCall)(call)) {
              return;
            }

            var telephonySessionId = call.telephonySessionId; // to track the call item be clicked.

            _this2._deps.callMonitor.callItemClickTrack();

            _this2._deps.routerInteraction.push("/simplifycallctrl/".concat(telephonySessionId));
          } else {
            // For webphone call
            // show the ring call modal when click a ringing call.
            if ((0, _callLogHelpers.isRingingInboundCall)(call)) {
              _this2._deps.webphone.toggleMinimized(call.webphoneSession.id);

              return;
            }

            if (call.webphoneSession && call.webphoneSession.id) {
              // to track the call item be clicked.
              _this2._deps.callMonitor.callItemClickTrack();

              _this2._deps.routerInteraction.push("".concat(callCtrlRoute, "/").concat(call.webphoneSession.id));
            }
          }
        },
        getAvatarUrl: getAvatarUrl,
        updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
          return _this2._deps.webphone.updateSessionMatchedContact(sessionId, contact);
        },
        // function to check if a call is on hold status
        isOnHold: function isOnHold(webphoneSession) {
          if (useActiveCallControl) {
            var call = _this2._deps.callMonitor.calls.find(function (call) {
              return call.webphoneSession === webphoneSession;
            }) || {};
            var telephonySession = call.telephonySession;
            return (0, _helpers.isHolding)(telephonySession);
          }

          return (0, _webphoneHelper.isOnHold)(webphoneSession);
        },
        clickSwitchTrack: function clickSwitchTrack() {
          var _this2$_deps$activeCa4, _this2$_deps$activeCa5;

          (_this2$_deps$activeCa4 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa4 === void 0 ? void 0 : (_this2$_deps$activeCa5 = _this2$_deps$activeCa4.clickSwitchTrack) === null || _this2$_deps$activeCa5 === void 0 ? void 0 : _this2$_deps$activeCa5.call(_this2$_deps$activeCa4);
        }
      };
    }
  }, {
    key: "isWide",
    get: function get() {
      return true;
    }
  }]);

  return ActiveCallsUI;
}(_core.RcUIModuleV2)) || _class);
exports.ActiveCallsUI = ActiveCallsUI;
//# sourceMappingURL=ActiveCallsUI.js.map
