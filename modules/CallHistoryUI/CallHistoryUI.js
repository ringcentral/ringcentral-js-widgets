"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryUI = void 0;

require("core-js/modules/es6.regexp.search");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

/**
 * TODO:
 * * Add type info for getUIProps and getUIFunctions when CallsPanel is refactored into ts.
 */
var CallHistoryUI = (_dec = (0, _di.Module)({
  name: 'CallHistoryUI',
  deps: ['Locale', 'Brand', 'CallHistory', 'RegionSettings', 'ConnectivityMonitor', 'RateLimiter', 'DateTimeFormat', 'AppFeatures', {
    dep: 'CallLogger',
    optional: true
  }, {
    dep: 'Call',
    optional: true
  }, {
    dep: 'ComposeText',
    optional: true
  }, {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'ExtensionInfo',
    optional: true
  }, 'ContactMatcher', 'RouterInteraction', 'ContactSearch', 'ConnectivityManager']
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(CallHistoryUI, _RcUIModuleV);

  var _super = _createSuper(CallHistoryUI);

  function CallHistoryUI(deps) {
    _classCallCheck(this, CallHistoryUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(CallHistoryUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _extensionInfo$site$c, _extensionInfo$site, _extensionInfo$isMult;

      var _ref$enableContactFal = _ref.enableContactFallback,
          enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
          _ref$useNewList = _ref.useNewList,
          useNewList = _ref$useNewList === void 0 ? false : _ref$useNewList;
      var _this$_deps = this._deps,
          locale = _this$_deps.locale,
          brand = _this$_deps.brand,
          callHistory = _this$_deps.callHistory,
          regionSettings = _this$_deps.regionSettings,
          extensionInfo = _this$_deps.extensionInfo,
          connectivityMonitor = _this$_deps.connectivityMonitor,
          connectivityManager = _this$_deps.connectivityManager,
          rateLimiter = _this$_deps.rateLimiter,
          call = _this$_deps.call,
          callLogger = _this$_deps.callLogger,
          dateTimeFormat = _this$_deps.dateTimeFormat,
          composeText = _this$_deps.composeText,
          appFeatures = _this$_deps.appFeatures;
      return {
        enableContactFallback: enableContactFallback,
        brand: brand.name,
        title: _i18n["default"].getString('title', locale.currentLocale),
        currentLocale: locale.currentLocale,
        calls: callHistory.latestCalls,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        currentSiteCode: (_extensionInfo$site$c = extensionInfo === null || extensionInfo === void 0 ? void 0 : (_extensionInfo$site = extensionInfo.site) === null || _extensionInfo$site === void 0 ? void 0 : _extensionInfo$site.code) !== null && _extensionInfo$site$c !== void 0 ? _extensionInfo$site$c : '',
        isMultipleSiteEnabled: (_extensionInfo$isMult = extensionInfo === null || extensionInfo === void 0 ? void 0 : extensionInfo.isMultipleSiteEnabled) !== null && _extensionInfo$isMult !== void 0 ? _extensionInfo$isMult : false,
        disableLinks: connectivityManager.isOfflineMode || connectivityManager.isVoipOnlyMode || rateLimiter.throttling,
        disableCallButton: connectivityManager.isOfflineMode || connectivityManager.isWebphoneUnavailableMode || connectivityManager.isWebphoneInitializing || rateLimiter.throttling,
        disableClickToDial: !(call && call.isIdle),
        outboundSmsPermission: appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: appFeatures.hasInternalSMSPermission,
        loggingMap: callLogger && callLogger.loggingMap,
        showSpinner: !(callHistory.ready && locale.ready && regionSettings.ready && dateTimeFormat.ready && connectivityMonitor.ready && appFeatures.ready && (!call || call.ready) && (!composeText || composeText.ready) && (!callLogger || callLogger.ready)),
        autoLog: !!(callLogger && callLogger.autoLog),
        useNewList: useNewList,
        enableCDC: appFeatures.isCDCEnabled
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;

      var onCreateContact = _ref2.onCreateContact,
          _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
          dateTimeFormatter = _ref2$dateTimeFormatt === void 0 ? function () {
        var _this$_deps$dateTimeF;

        return (_this$_deps$dateTimeF = _this._deps.dateTimeFormat).formatDateTime.apply(_this$_deps$dateTimeF, arguments);
      } : _ref2$dateTimeFormatt,
          onLogCall = _ref2.onLogCall,
          isLoggedContact = _ref2.isLoggedContact,
          _ref2$dialerRoute = _ref2.dialerRoute,
          dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute,
          _ref2$composeTextRout = _ref2.composeTextRoute,
          composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
          onViewContact = _ref2.onViewContact;
      var _this$_deps2 = this._deps,
          callLogger = _this$_deps2.callLogger,
          contactMatcher = _this$_deps2.contactMatcher,
          call = _this$_deps2.call,
          dialerUI = _this$_deps2.dialerUI,
          contactDetailsUI = _this$_deps2.contactDetailsUI,
          composeText = _this$_deps2.composeText,
          routerInteraction = _this$_deps2.routerInteraction,
          contactSearch = _this$_deps2.contactSearch,
          callHistory = _this$_deps2.callHistory,
          appFeatures = _this$_deps2.appFeatures;
      return {
        dateTimeFormatter: dateTimeFormatter,
        onViewContact: onViewContact || function (_ref3) {
          var _ref3$contact = _ref3.contact,
              type = _ref3$contact.type,
              id = _ref3$contact.id;

          if (contactDetailsUI) {
            contactDetailsUI.showContactDetails({
              type: type,
              id: id,
              direct: true
            });
          }
        },
        onCreateContact: onCreateContact ? /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    phoneNumber = _ref4.phoneNumber, name = _ref4.name, entityType = _ref4.entityType;
                    _context.next = 3;
                    return contactMatcher.hasMatchNumber({
                      phoneNumber: phoneNumber,
                      ignoreCache: true
                    });

                  case 3:
                    hasMatchNumber = _context.sent;

                    if (hasMatchNumber) {
                      _context.next = 9;
                      break;
                    }

                    _context.next = 7;
                    return onCreateContact({
                      phoneNumber: phoneNumber,
                      name: name,
                      entityType: entityType
                    });

                  case 7:
                    _context.next = 9;
                    return contactMatcher.forceMatchNumber({
                      phoneNumber: phoneNumber
                    });

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }() : undefined,
        onClickToDial: dialerUI && appFeatures.isCallingEnabled ? function (recipient) {
          if (call.isIdle) {
            routerInteraction.push(dialerRoute);
            dialerUI.call({
              recipient: recipient
            });
            callHistory.onClickToCall();
          }
        } : undefined,
        onClickToSms: composeText ?
        /*#__PURE__*/
        // TODO: find a better way to define contact type
        function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(contact) {
            var isDummyContact,
                _args2 = arguments;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    isDummyContact = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

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
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x2) {
            return _ref6.apply(this, arguments);
          };
        }() : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall || callLogger && /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
            var call, contact, _ref7$redirect, redirect;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    call = _ref7.call, contact = _ref7.contact, _ref7$redirect = _ref7.redirect, redirect = _ref7$redirect === void 0 ? true : _ref7$redirect;
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

          return function (_x3) {
            return _ref8.apply(this, arguments);
          };
        }()
      };
    }
  }]);

  return CallHistoryUI;
}(_core.RcUIModuleV2)) || _class);
exports.CallHistoryUI = CallHistoryUI;
//# sourceMappingURL=CallHistoryUI.js.map
