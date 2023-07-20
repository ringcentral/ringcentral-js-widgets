"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.name");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.search");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
/**
 * TODO:
 * * Add type info for getUIProps and getUIFunctions when CallsPanel is refactored into ts.
 */
var CallHistoryUI = (_dec = (0, _di.Module)({
  name: 'CallHistoryUI',
  deps: ['Locale', 'Brand', 'CallHistory', 'RegionSettings', 'ConnectivityMonitor', 'RateLimiter', 'DateTimeFormat', 'AppFeatures', 'AccountInfo', {
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
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5;
      var _ref$enableContactFal = _ref.enableContactFallback,
        enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
        _ref$useNewList = _ref.useNewList,
        useNewList = _ref$useNewList === void 0 ? false : _ref$useNewList;
      return {
        enableContactFallback: enableContactFallback,
        brand: this._deps.brand.name,
        title: _i18n["default"].getString('title', this._deps.locale.currentLocale),
        currentLocale: this._deps.locale.currentLocale,
        calls: this._deps.callHistory.latestCalls,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        currentSiteCode: (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
        isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
        disableLinks: this._deps.connectivityManager.isOfflineMode || this._deps.connectivityManager.isVoipOnlyMode || this._deps.rateLimiter.throttling,
        disableCallButton: this._deps.connectivityManager.isOfflineMode || this._deps.connectivityManager.isWebphoneUnavailableMode || this._deps.connectivityManager.isWebphoneInitializing || this._deps.rateLimiter.throttling,
        disableClickToDial: !(this._deps.call && this._deps.call.isIdle),
        outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
        loggingMap: this._deps.callLogger && this._deps.callLogger.loggingMap,
        showSpinner: !(this._deps.callHistory.ready && this._deps.locale.ready && this._deps.regionSettings.ready && this._deps.dateTimeFormat.ready && this._deps.connectivityMonitor.ready && this._deps.appFeatures.ready && (!this._deps.call || this._deps.call.ready) && (!this._deps.composeText || this._deps.composeText.ready) && (!this._deps.callLogger || this._deps.callLogger.ready)),
        autoLog: !!(this._deps.callLogger && this._deps.callLogger.autoLog),
        useNewList: useNewList,
        enableCDC: this._deps.appFeatures.isCDCEnabled,
        maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength
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
      return {
        formatPhone: function formatPhone(phoneNumber) {
          var _this$_deps$extension6, _this$_deps$extension7, _this$_deps$extension8;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this._deps.regionSettings.areaCode,
            countryCode: _this._deps.regionSettings.countryCode,
            maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength,
            isMultipleSiteEnabled: (_this$_deps$extension6 = _this._deps.extensionInfo) === null || _this$_deps$extension6 === void 0 ? void 0 : _this$_deps$extension6.isMultipleSiteEnabled,
            siteCode: (_this$_deps$extension7 = _this._deps.extensionInfo) === null || _this$_deps$extension7 === void 0 ? void 0 : (_this$_deps$extension8 = _this$_deps$extension7.site) === null || _this$_deps$extension8 === void 0 ? void 0 : _this$_deps$extension8.code
          });
        },
        dateTimeFormatter: dateTimeFormatter,
        onViewContact: onViewContact || function (_ref3) {
          var _ref3$contact = _ref3.contact,
            type = _ref3$contact.type,
            id = _ref3$contact.id;
          if (_this._deps.contactDetailsUI) {
            _this._deps.contactDetailsUI.showContactDetails({
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
                    return _this._deps.contactMatcher.hasMatchNumber({
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
                    return _this._deps.contactMatcher.forceMatchNumber({
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
        onClickToDial: this._deps.dialerUI && this._deps.appFeatures.isCallingEnabled ? function (recipient) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          if (_this._deps.call.isIdle) {
            _this._deps.routerInteraction.push(dialerRoute);
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            _this._deps.dialerUI.call({
              recipient: recipient
            });
            _this._deps.callHistory.onClickToCall();
          }
        } : undefined,
        onClickToSms: this._deps.composeText ?
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
        onLogCall: onLogCall || this._deps.callLogger && /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
            var call, contact, _ref7$redirect, redirect;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    call = _ref7.call, contact = _ref7.contact, _ref7$redirect = _ref7.redirect, redirect = _ref7$redirect === void 0 ? true : _ref7$redirect;
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
