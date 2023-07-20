"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.name");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.search");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsListUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var CallsListUI = (_dec = (0, _di.Module)({
  name: 'CallsListUI',
  deps: ['Brand', 'CallMonitor', 'Locale', 'RegionSettings', 'CallHistory', 'ConnectivityMonitor', 'RateLimiter', 'DateTimeFormat', 'Call', 'ExtensionInfo', 'ContactMatcher', 'ContactSearch', 'RouterInteraction', 'AppFeatures', 'AccountInfo', {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'CallLogger',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'ComposeText',
    optional: true
  }, {
    dep: 'CallsListUIOptions',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(CallsListUI, _RcUIModuleV);
  var _super = _createSuper(CallsListUI);
  function CallsListUI(deps) {
    _classCallCheck(this, CallsListUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(CallsListUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5, _this$_deps$accountIn;
      var _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
        showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? false : _ref$showContactDispl,
        _ref$enableContactFal = _ref.enableContactFallback,
        enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal;
      return {
        currentSiteCode: (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
        isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
        maxExtensionLength: (_this$_deps$accountIn = this._deps.accountInfo) === null || _this$_deps$accountIn === void 0 ? void 0 : _this$_deps$accountIn.maxExtensionNumberLength,
        currentLocale: this._deps.locale.currentLocale,
        activeRingCalls: this._deps.callMonitor.activeRingCalls,
        activeOnHoldCalls: this._deps.callMonitor.activeOnHoldCalls,
        activeCurrentCalls: this._deps.callMonitor.activeCurrentCalls,
        otherDeviceCalls: this._deps.callMonitor.otherDeviceCalls,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
        brand: this._deps.brand.name,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        autoLog: !!(this._deps.callLogger && this._deps.callLogger.autoLog),
        enableContactFallback: enableContactFallback,
        calls: this._deps.callHistory.latestCalls,
        disableLinks: !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling,
        disableClickToDial: !(this._deps.call && this._deps.call.isIdle),
        // @ts-expect-error TS(2322): Type 'Record<string, boolean> | undefined' is not ... Remove this comment to see the full error message
        loggingMap: this._deps.callLogger && this._deps.callLogger.loggingMap,
        showSpinner: !(this._deps.callHistory.ready && this._deps.locale.ready && this._deps.regionSettings.ready && this._deps.dateTimeFormat.ready && this._deps.connectivityMonitor.ready && this._deps.appFeatures.ready && (!this._deps.call || this._deps.call.ready) && (!this._deps.composeText || this._deps.composeText.ready) && (!this._deps.callLogger || this._deps.callLogger.ready)),
        readTextPermission: this._deps.appFeatures.hasReadTextPermission,
        enableCDC: this._deps.appFeatures.isCDCEnabled
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var _ref2$composeTextRout = _ref2.composeTextRoute,
        composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
        _ref2$callCtrlRoute = _ref2.callCtrlRoute,
        callCtrlRoute = _ref2$callCtrlRoute === void 0 ? '/calls/active' : _ref2$callCtrlRoute,
        onCreateContact = _ref2.onCreateContact,
        onLogCall = _ref2.onLogCall,
        isLoggedContact = _ref2.isLoggedContact,
        onViewContact = _ref2.onViewContact,
        dateTimeFormatter = _ref2.dateTimeFormatter,
        _ref2$dialerRoute = _ref2.dialerRoute,
        dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute;
      return {
        // @ts-expect-error TS(2322): Type '(phoneNumber: string) => string | null | und... Remove this comment to see the full error message
        formatPhone: function formatPhone(phoneNumber) {
          var _this$_deps$extension6;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this._deps.regionSettings.areaCode,
            countryCode: _this._deps.regionSettings.countryCode,
            maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength,
            isMultipleSiteEnabled: _this._deps.extensionInfo.isMultipleSiteEnabled,
            siteCode: (_this$_deps$extension6 = _this._deps.extensionInfo.site) === null || _this$_deps$extension6 === void 0 ? void 0 : _this$_deps$extension6.code
          });
        },
        // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
        webphoneAnswer: function webphoneAnswer(sessionId) {
          var _this$_deps$webphone;
          return (_this$_deps$webphone = _this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : _this$_deps$webphone.answer(sessionId);
        },
        // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
        webphoneToVoicemail: function webphoneToVoicemail(sessionId) {
          var _this$_deps$webphone2;
          return (_this$_deps$webphone2 = _this._deps.webphone) === null || _this$_deps$webphone2 === void 0 ? void 0 : _this$_deps$webphone2.toVoiceMail(sessionId);
        },
        // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
        webphoneReject: function webphoneReject(sessionId) {
          var _this$_deps$webphone3;
          return (_this$_deps$webphone3 = _this._deps.webphone) === null || _this$_deps$webphone3 === void 0 ? void 0 : _this$_deps$webphone3.reject(sessionId);
        },
        // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
        webphoneHangup: function webphoneHangup(sessionId) {
          var _this$_deps$webphone4;
          return (_this$_deps$webphone4 = _this._deps.webphone) === null || _this$_deps$webphone4 === void 0 ? void 0 : _this$_deps$webphone4.hangup(sessionId);
        },
        webphoneResume: function () {
          var _webphoneResume = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionId) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (_this._deps.webphone) {
                      _context.next = 2;
                      break;
                    }
                    return _context.abrupt("return");
                  case 2:
                    _context.next = 4;
                    return _this._deps.webphone.resume(sessionId);
                  case 4:
                    if (_this._deps.routerInteraction.currentPath !== callCtrlRoute) {
                      _this._deps.routerInteraction.push(callCtrlRoute);
                    }
                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          function webphoneResume(_x) {
            return _webphoneResume.apply(this, arguments);
          }
          return webphoneResume;
        }(),
        // @ts-expect-error TS(2322): Type '(({ phoneNumber, name, entityType }: OnCreat... Remove this comment to see the full error message
        onCreateContact: onCreateContact ? /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    phoneNumber = _ref3.phoneNumber, name = _ref3.name, entityType = _ref3.entityType;
                    _context2.next = 3;
                    return _this._deps.contactMatcher.hasMatchNumber({
                      phoneNumber: phoneNumber,
                      ignoreCache: true
                    });
                  case 3:
                    hasMatchNumber = _context2.sent;
                    if (hasMatchNumber) {
                      _context2.next = 9;
                      break;
                    }
                    _context2.next = 7;
                    return onCreateContact({
                      phoneNumber: phoneNumber,
                      name: name,
                      entityType: entityType
                    });
                  case 7:
                    _context2.next = 9;
                    return _this._deps.contactMatcher.forceMatchNumber({
                      phoneNumber: phoneNumber
                    });
                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          return function (_x2) {
            return _ref4.apply(this, arguments);
          };
        }() : undefined,
        // @ts-expect-error TS(2322): Type '((...args: any) => boolean) | undefined' is ... Remove this comment to see the full error message
        isLoggedContact: isLoggedContact,
        // @ts-expect-error TS(2322): Type '((options: OnLogCallOptions) => Promise<void... Remove this comment to see the full error message
        onLogCall: onLogCall || this._deps.callLogger && /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
            var call, contact, _ref5$redirect, redirect;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    call = _ref5.call, contact = _ref5.contact, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
                    _context3.next = 3;
                    return _this._deps.callLogger.logCall({
                      call: call,
                      contact: contact,
                      redirect: redirect
                    });
                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));
          return function (_x3) {
            return _ref6.apply(this, arguments);
          };
        }(),
        // @ts-expect-error TS(2322): Type '({ utcTimestamp }: Partial<FormatDateTimeOpt... Remove this comment to see the full error message
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function (_ref7) {
          var utcTimestamp = _ref7.utcTimestamp;
          return _this._deps.dateTimeFormat.formatDateTime({
            utcTimestamp: utcTimestamp
          });
        },
        onViewContact: onViewContact || function (_ref8) {
          var _ref8$contact = _ref8.contact,
            type = _ref8$contact.type,
            id = _ref8$contact.id;
          if (_this._deps.contactDetailsUI) {
            _this._deps.contactDetailsUI.showContactDetails({
              type: type,
              id: id,
              direct: true
            });
          }
        },
        // @ts-expect-error TS(2322): Type '((recipient: any) => void) | undefined' is n... Remove this comment to see the full error message
        onClickToDial: this._deps.dialerUI ?
        // TODO: fix type in dialerUI
        function (recipient) {
          if (_this._deps.call.isIdle) {
            _this._deps.routerInteraction.push(dialerRoute);
            _this._deps.dialerUI.call({
              recipient: recipient
            });
            _this._deps.callHistory.onClickToCall();
          }
        } : undefined,
        // @ts-expect-error TS(2322): Type '((contact: ToNumber & { name?: string | unde... Remove this comment to see the full error message
        onClickToSms: this._deps.composeText ? /*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(contact) {
            var isDummyContact,
              _args4 = arguments;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    isDummyContact = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;
                    if (_this._deps.routerInteraction) {
                      _this._deps.routerInteraction.push(composeTextRoute);
                    }
                    // if contact autocomplete, if no match fill the number only
                    if (contact.name && contact.phoneNumber && isDummyContact) {
                      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                      _this._deps.composeText.updateTypingToNumber(contact.name);
                      _this._deps.contactSearch.search({
                        searchString: contact.name
                      });
                    } else {
                      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                      _this._deps.composeText.addToNumber(contact);
                      if (
                      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                      _this._deps.composeText.typingToNumber === contact.phoneNumber) {
                        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                        _this._deps.composeText.cleanTypingToNumber();
                      }
                    }
                    _this._deps.callHistory.onClickToSMS();
                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));
          return function (_x4) {
            return _ref9.apply(this, arguments);
          };
        }() : undefined
      };
    }
  }]);
  return CallsListUI;
}(_core.RcUIModuleV2)) || _class);
exports.CallsListUI = CallsListUI;
//# sourceMappingURL=CallsListUI.js.map
