"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallMonitorUI = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _di = require("ringcentral-integration/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class, _temp;

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

var CallMonitorUI = (_dec = (0, _di.Module)({
  name: 'CallMonitorUI',
  deps: ['Brand', 'CallMonitor', 'CallLogger', 'ConnectivityMonitor', 'ContactMatcher', 'ContactSearch', 'ComposeText', 'DateTimeFormat', 'Locale', 'RateLimiter', 'RegionSettings', 'RolesAndPermissions', 'RouterInteraction', 'Webphone']
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcUIModule) {
  _inherits(CallMonitorUI, _RcUIModule);

  var _super = _createSuper(CallMonitorUI);

  function CallMonitorUI(_ref) {
    var _this;

    var brand = _ref.brand,
        callMonitor = _ref.callMonitor,
        callLogger = _ref.callLogger,
        connectivityMonitor = _ref.connectivityMonitor,
        contactMatcher = _ref.contactMatcher,
        contactSearch = _ref.contactSearch,
        composeText = _ref.composeText,
        dateTimeFormat = _ref.dateTimeFormat,
        locale = _ref.locale,
        rateLimiter = _ref.rateLimiter,
        regionSettings = _ref.regionSettings,
        rolesAndPermissions = _ref.rolesAndPermissions,
        routerInteraction = _ref.routerInteraction,
        webphone = _ref.webphone,
        options = _objectWithoutProperties(_ref, ["brand", "callMonitor", "callLogger", "connectivityMonitor", "contactMatcher", "contactSearch", "composeText", "dateTimeFormat", "locale", "rateLimiter", "regionSettings", "rolesAndPermissions", "routerInteraction", "webphone"]);

    _classCallCheck(this, CallMonitorUI);

    _this = _super.call(this, _objectSpread({}, options));
    _this._brand = void 0;
    _this._locale = void 0;
    _this._callMonitor = void 0;
    _this._regionSettings = void 0;
    _this._connectivityMonitor = void 0;
    _this._rateLimiter = void 0;
    _this._rolesAndPermissions = void 0;
    _this._callLogger = void 0;
    _this._dateTimeFormat = void 0;
    _this._composeText = void 0;
    _this._contactMatcher = void 0;
    _this._routerInteraction = void 0;
    _this._contactSearch = void 0;
    _this._webphone = void 0;
    _this._brand = brand;
    _this._locale = locale;
    _this._callMonitor = callMonitor;
    _this._regionSettings = regionSettings;
    _this._connectivityMonitor = connectivityMonitor;
    _this._rateLimiter = rateLimiter;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._callLogger = callLogger;
    _this._dateTimeFormat = dateTimeFormat;
    _this._composeText = composeText;
    _this._contactMatcher = contactMatcher;
    _this._routerInteraction = routerInteraction;
    _this._contactSearch = contactSearch;
    _this._webphone = webphone;
    return _this;
  }

  _createClass(CallMonitorUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _ref2$enableContactFa = _ref2.enableContactFallback,
          enableContactFallback = _ref2$enableContactFa === void 0 ? false : _ref2$enableContactFa;
      return {
        enableContactFallback: enableContactFallback,
        active: true,
        brand: this._brand.fullName,
        title: _i18n["default"].getString('title', this._locale.currentLocale),
        currentLocale: this._locale.currentLocale,
        calls: this._callMonitor.calls,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        disableLinks: !this._connectivityMonitor.connectivity || this._rateLimiter.throttling,
        outboundSmsPermission: !!(this._rolesAndPermissions.permissions && this._rolesAndPermissions.permissions.OutboundSMS),
        internalSmsPermission: !!(this._rolesAndPermissions.permissions && this._rolesAndPermissions.permissions.InternalSMS),
        loggingMap: this._callLogger && this._callLogger.loggingMap,
        showSpinner: !(this._locale.ready && this._callMonitor.ready && this._regionSettings.ready && this._connectivityMonitor.ready && this._dateTimeFormat.ready && (!this._callLogger || this._callLogger.ready) && (!this._rolesAndPermissions || this._rolesAndPermissions.ready) && (!this._composeText || this._composeText.ready)),
        autoLog: !!(this._callLogger && this._callLogger.autoLog)
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;

      var onViewContact = _ref3.onViewContact,
          onCreateContact = _ref3.onCreateContact,
          _ref3$dateTimeFormatt = _ref3.dateTimeFormatter,
          dateTimeFormatter = _ref3$dateTimeFormatt === void 0 ? function (_ref4) {
        var utcTimestamp = _ref4.utcTimestamp;
        return _this2._dateTimeFormat.formatDateTime({
          utcTimestamp: utcTimestamp
        });
      } : _ref3$dateTimeFormatt,
          onLogCall = _ref3.onLogCall,
          isLoggedContact = _ref3.isLoggedContact,
          _ref3$composeTextRout = _ref3.composeTextRoute,
          composeTextRoute = _ref3$composeTextRout === void 0 ? '/composeText' : _ref3$composeTextRout;
      return {
        dateTimeFormatter: dateTimeFormatter,
        onViewContact: onViewContact ? /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref5) {
            var phoneNumber, contact, hasMatchNumber;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    phoneNumber = _ref5.phoneNumber, contact = _ref5.contact;
                    _context.next = 3;
                    return _this2._contactMatcher.hasMatchNumber({
                      phoneNumber: phoneNumber,
                      ignoreCache: true
                    });

                  case 3:
                    hasMatchNumber = _context.sent;

                    if (!hasMatchNumber) {
                      _context.next = 7;
                      break;
                    }

                    _context.next = 7;
                    return onViewContact({
                      phoneNumber: phoneNumber,
                      contact: contact
                    });

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref6.apply(this, arguments);
          };
        }() : undefined,
        onCreateContact: onCreateContact ? /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref7) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    phoneNumber = _ref7.phoneNumber, name = _ref7.name, entityType = _ref7.entityType;
                    _context2.next = 3;
                    return _this2._contactMatcher.hasMatchNumber({
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
                    return _this2._contactMatcher.forceMatchNumber({
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
            return _ref8.apply(this, arguments);
          };
        }() : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall || this._callLogger && /*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref9) {
            var call, contact, _ref9$redirect, redirect;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    call = _ref9.call, contact = _ref9.contact, _ref9$redirect = _ref9.redirect, redirect = _ref9$redirect === void 0 ? true : _ref9$redirect;
                    _context3.next = 3;
                    return _this2._callLogger.logCall({
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
            return _ref10.apply(this, arguments);
          };
        }(),
        onClickToSms: this._composeText ? /*#__PURE__*/function () {
          var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(contact) {
            var isDummyContact,
                _args4 = arguments;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    isDummyContact = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;

                    if (_this2._routerInteraction) {
                      _this2._routerInteraction.push(composeTextRoute);
                    }

                    if (contact.name && contact.phoneNumber && isDummyContact) {
                      _this2._composeText.updateTypingToNumber(contact.name);

                      _this2._contactSearch.search({
                        searchString: contact.name
                      });
                    } else {
                      _this2._composeText.addToNumber(contact);

                      if (_this2._composeText.typingToNumber === contact.phoneNumber) {
                        _this2._composeText.cleanTypingToNumber();
                      }
                    }

                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          return function (_x4) {
            return _ref11.apply(this, arguments);
          };
        }() : undefined,
        webphoneAnswer: function webphoneAnswer() {
          var _this2$_webphone;

          return _this2._webphone && (_this2$_webphone = _this2._webphone).answer.apply(_this2$_webphone, arguments);
        },
        webphoneReject: function webphoneReject() {
          var _this2$_webphone2;

          return _this2._webphone && (_this2$_webphone2 = _this2._webphone).reject.apply(_this2$_webphone2, arguments);
        },
        webphoneHangup: function webphoneHangup() {
          var _this2$_webphone3;

          return _this2._webphone && (_this2$_webphone3 = _this2._webphone).hangup.apply(_this2$_webphone3, arguments);
        },
        webphoneResume: function webphoneResume() {
          var _this2$_webphone4;

          return _this2._webphone && (_this2$_webphone4 = _this2._webphone).resume.apply(_this2$_webphone4, arguments);
        }
      };
    }
  }]);

  return CallMonitorUI;
}(_RcUIModule2["default"]), _temp)) || _class);
exports.CallMonitorUI = CallMonitorUI;
//# sourceMappingURL=CallMonitorUI.js.map
