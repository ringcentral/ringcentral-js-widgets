"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsListUI = void 0;

require("core-js/modules/es6.regexp.search");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/formatNumber"));

var _core = require("@ringcentral-integration/core");

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

var CallsListUI = (_dec = (0, _di.Module)({
  name: 'CallsListUI',
  deps: ['Brand', 'CallMonitor', 'Locale', 'RegionSettings', 'CallHistory', 'ConnectivityMonitor', 'RateLimiter', 'DateTimeFormat', 'Call', 'ExtensionInfo', 'ContactMatcher', 'ContactSearch', 'RouterInteraction', 'AppFeatures', {
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
      var _extensionInfo$site$c, _extensionInfo$site, _extensionInfo$isMult;

      var _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
          showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? false : _ref$showContactDispl,
          _ref$enableContactFal = _ref.enableContactFallback,
          enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal;
      var _this$_deps = this._deps,
          brand = _this$_deps.brand,
          callLogger = _this$_deps.callLogger,
          callMonitor = _this$_deps.callMonitor,
          locale = _this$_deps.locale,
          regionSettings = _this$_deps.regionSettings,
          appFeatures = _this$_deps.appFeatures,
          callHistory = _this$_deps.callHistory,
          connectivityMonitor = _this$_deps.connectivityMonitor,
          rateLimiter = _this$_deps.rateLimiter,
          dateTimeFormat = _this$_deps.dateTimeFormat,
          call = _this$_deps.call,
          composeText = _this$_deps.composeText,
          extensionInfo = _this$_deps.extensionInfo;
      return {
        currentSiteCode: (_extensionInfo$site$c = extensionInfo === null || extensionInfo === void 0 ? void 0 : (_extensionInfo$site = extensionInfo.site) === null || _extensionInfo$site === void 0 ? void 0 : _extensionInfo$site.code) !== null && _extensionInfo$site$c !== void 0 ? _extensionInfo$site$c : '',
        isMultipleSiteEnabled: (_extensionInfo$isMult = extensionInfo === null || extensionInfo === void 0 ? void 0 : extensionInfo.isMultipleSiteEnabled) !== null && _extensionInfo$isMult !== void 0 ? _extensionInfo$isMult : false,
        currentLocale: locale.currentLocale,
        activeRingCalls: callMonitor.activeRingCalls,
        activeOnHoldCalls: callMonitor.activeOnHoldCalls,
        activeCurrentCalls: callMonitor.activeCurrentCalls,
        otherDeviceCalls: callMonitor.otherDeviceCalls,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        outboundSmsPermission: appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: appFeatures.hasInternalSMSPermission,
        brand: brand.name,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        autoLog: !!(callLogger && callLogger.autoLog),
        enableContactFallback: enableContactFallback,
        calls: callHistory.latestCalls,
        disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
        disableClickToDial: !(call && call.isIdle),
        loggingMap: callLogger && callLogger.loggingMap,
        showSpinner: !(callHistory.ready && locale.ready && regionSettings.ready && dateTimeFormat.ready && connectivityMonitor.ready && appFeatures.ready && (!call || call.ready) && (!composeText || composeText.ready) && (!callLogger || callLogger.ready)),
        readTextPermission: appFeatures.hasReadTextPermission,
        enableCDC: appFeatures.isCDCEnabled
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
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
      var _this$_deps2 = this._deps,
          callLogger = _this$_deps2.callLogger,
          composeText = _this$_deps2.composeText,
          contactMatcher = _this$_deps2.contactMatcher,
          contactSearch = _this$_deps2.contactSearch,
          regionSettings = _this$_deps2.regionSettings,
          contactDetailsUI = _this$_deps2.contactDetailsUI,
          routerInteraction = _this$_deps2.routerInteraction,
          webphone = _this$_deps2.webphone,
          call = _this$_deps2.call,
          dialerUI = _this$_deps2.dialerUI,
          callHistory = _this$_deps2.callHistory,
          dateTimeFormat = _this$_deps2.dateTimeFormat;
      return {
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: regionSettings.areaCode,
            countryCode: regionSettings.countryCode
          });
        },
        webphoneAnswer: function webphoneAnswer(sessionId) {
          return webphone === null || webphone === void 0 ? void 0 : webphone.answer(sessionId);
        },
        webphoneToVoicemail: function webphoneToVoicemail(sessionId) {
          return webphone === null || webphone === void 0 ? void 0 : webphone.toVoiceMail(sessionId);
        },
        webphoneReject: function webphoneReject(sessionId) {
          return webphone === null || webphone === void 0 ? void 0 : webphone.reject(sessionId);
        },
        webphoneHangup: function webphoneHangup(sessionId) {
          return webphone === null || webphone === void 0 ? void 0 : webphone.hangup(sessionId);
        },
        webphoneResume: function webphoneResume(sessionId) {
          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (webphone) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return");

                  case 2:
                    _context.next = 4;
                    return webphone.resume(sessionId);

                  case 4:
                    if (routerInteraction.currentPath !== callCtrlRoute) {
                      routerInteraction.push(callCtrlRoute);
                    }

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        },
        onCreateContact: onCreateContact ? /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    phoneNumber = _ref3.phoneNumber, name = _ref3.name, entityType = _ref3.entityType;
                    _context2.next = 3;
                    return contactMatcher.hasMatchNumber({
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
                    return contactMatcher.forceMatchNumber({
                      phoneNumber: phoneNumber
                    });

                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x) {
            return _ref4.apply(this, arguments);
          };
        }() : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall || callLogger && /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
            var call, contact, _ref5$redirect, redirect;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    call = _ref5.call, contact = _ref5.contact, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
                    _context3.next = 3;
                    return callLogger.logCall({
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

          return function (_x2) {
            return _ref6.apply(this, arguments);
          };
        }(),
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function (_ref7) {
          var utcTimestamp = _ref7.utcTimestamp;
          return dateTimeFormat.formatDateTime({
            utcTimestamp: utcTimestamp
          });
        },
        onViewContact: onViewContact || function (_ref8) {
          var _ref8$contact = _ref8.contact,
              type = _ref8$contact.type,
              id = _ref8$contact.id;

          if (contactDetailsUI) {
            contactDetailsUI.showContactDetails({
              type: type,
              id: id,
              direct: true
            });
          }
        },
        onClickToDial: dialerUI ? // TODO: fix type in dialerUI
        function (recipient) {
          if (call.isIdle) {
            routerInteraction.push(dialerRoute);
            dialerUI.call({
              recipient: recipient
            });
            callHistory.onClickToCall();
          }
        } : undefined,
        onClickToSms: composeText ? /*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(contact) {
            var isDummyContact,
                _args4 = arguments;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    isDummyContact = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;

                    if (routerInteraction) {
                      routerInteraction.push(composeTextRoute);
                    } // if contact autocomplete, if no match fill the number only


                    if (contact.name && contact.phoneNumber && isDummyContact) {
                      composeText.updateTypingToNumber(contact.name);
                      contactSearch.search({
                        searchString: contact.name
                      });
                    } else {
                      composeText.addToNumber(contact);

                      if (composeText.typingToNumber === contact.phoneNumber) {
                        composeText.cleanTypingToNumber();
                      }
                    }

                    callHistory.onClickToSMS();

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          return function (_x3) {
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
