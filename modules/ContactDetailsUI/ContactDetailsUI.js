"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetailsUI = void 0;
require("regenerator-runtime/runtime");
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _background = _interopRequireDefault(require("@ringcentral-integration/commons/lib/background"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _contactReadyStates = require("./contactReadyStates");
var _helper = require("./helper");
var _trackEvents = require("./trackEvents");
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_DIALER_ROUTE = '/dialer';
var DEFAULT_COMPOSE_TEXT_ROUTE = '/composeText';
var ContactDetailsUI = (_dec = (0, _di.Module)({
  name: 'ContactDetailsUI',
  deps: ['Locale', 'RouterInteraction', 'ContactSearch', 'Contacts', 'ExtensionInfo', 'AppFeatures', 'RateLimiter', 'RegionSettings', 'ConnectivityManager', 'Call', 'DialerUI', 'ComposeText', 'AccountInfo', {
    dep: 'ContactDetailsUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.clickToCall), _dec3 = (0, _core.track)(_trackEvents.trackEvents.clickToSMS), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ContactDetailsUI, _RcUIModuleV);
  var _super = _createSuper(ContactDetailsUI);
  function ContactDetailsUI(deps) {
    var _this;
    _classCallCheck(this, ContactDetailsUI);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "currentContact", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "currentContactReadyState", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(ContactDetailsUI, [{
    key: "_setCurrentContact",
    value: function _setCurrentContact(readyState, contact) {
      this.currentContactReadyState = readyState;
      this.currentContact = contact;
    }
  }, {
    key: "resetCurrentContact",
    value: function () {
      var _resetCurrentContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
                this._setCurrentContact(_contactReadyStates.contactReadyStates.pending, null);
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function resetCurrentContact() {
        return _resetCurrentContact.apply(this, arguments);
      }
      return resetCurrentContact;
    }()
  }, {
    key: "initCurrentContact",
    value: function () {
      var _initCurrentContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
        var contactType, contactId, contact;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                contactType = _ref.contactType, contactId = _ref.contactId;
                if (!(this.currentContactReadyState !== _contactReadyStates.contactReadyStates.pending)) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return");
              case 3:
                // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
                this._setCurrentContact(_contactReadyStates.contactReadyStates.loading, null);
                _context2.next = 6;
                return this._deps.contacts.findContact({
                  sourceName: contactType,
                  contactId: contactId
                });
              case 6:
                contact = _context2.sent;
                // hide hidden phone numbers when cdc is enabled
                // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
                if (this._deps.appFeatures.isCDCEnabled && contact.phoneNumbers.length) {
                  // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
                  contact.phoneNumbers = contact.phoneNumbers.filter(function (phone) {
                    return !phone.hidden;
                  });
                }
                // ignore result when it is reset during loading
                if (!(this.currentContactReadyState !== _contactReadyStates.contactReadyStates.loading)) {
                  _context2.next = 10;
                  break;
                }
                return _context2.abrupt("return");
              case 10:
                this._setCurrentContact(_contactReadyStates.contactReadyStates.loaded, contact);
                if (contact) {
                  this._deps.contacts.getProfileImage(contact, false);
                }
              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function initCurrentContact(_x) {
        return _initCurrentContact.apply(this, arguments);
      }
      return initCurrentContact;
    }()
  }, {
    key: "showContactDetails",
    value: function () {
      var _showContactDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref2) {
        var id, type, _ref2$direct, direct;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref2.id, type = _ref2.type, _ref2$direct = _ref2.direct, direct = _ref2$direct === void 0 ? false : _ref2$direct;
                this._deps.routerInteraction.push("/contacts/".concat(type, "/").concat(id).concat(direct ? '?direct=true' : ''));
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function showContactDetails(_x2) {
        return _showContactDetails.apply(this, arguments);
      }
      return showContactDetails;
    }()
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(contact, useCache) {
        var presence;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._deps.contacts.getPresence(contact, useCache);
              case 2:
                presence = _context4.sent;
                return _context4.abrupt("return", presence);
              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getPresence(_x3, _x4) {
        return _getPresence.apply(this, arguments);
      }
      return getPresence;
    }()
  }, {
    key: "handleClickToDial",
    value: function () {
      var _handleClickToDial = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(contact, phoneNumber) {
        var recipient, _this$_deps$contactDe, _this$_deps$contactDe2;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                recipient = _objectSpread(_objectSpread({}, contact), {}, {
                  phoneNumber: phoneNumber
                });
                if (this._deps.call.isIdle) {
                  this._deps.routerInteraction.push((_this$_deps$contactDe = (_this$_deps$contactDe2 = this._deps.contactDetailsUIOptions) === null || _this$_deps$contactDe2 === void 0 ? void 0 : _this$_deps$contactDe2.dialerRoute) !== null && _this$_deps$contactDe !== void 0 ? _this$_deps$contactDe : DEFAULT_DIALER_ROUTE);
                  this._deps.dialerUI.call({
                    recipient: recipient
                  });
                }
                this._trackClickToCall();
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function handleClickToDial(_x5, _x6) {
        return _handleClickToDial.apply(this, arguments);
      }
      return handleClickToDial;
    }()
  }, {
    key: "handleClickToSMS",
    value: function () {
      var _handleClickToSMS = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(contact, phoneNumber) {
        var _this$_deps$contactDe3, _this$_deps$contactDe4;
        var recipient;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                recipient = _objectSpread(_objectSpread({}, contact), {}, {
                  phoneNumber: phoneNumber
                });
                this._deps.routerInteraction.push((_this$_deps$contactDe3 = (_this$_deps$contactDe4 = this._deps.contactDetailsUIOptions) === null || _this$_deps$contactDe4 === void 0 ? void 0 : _this$_deps$contactDe4.composeTextRoute) !== null && _this$_deps$contactDe3 !== void 0 ? _this$_deps$contactDe3 : DEFAULT_COMPOSE_TEXT_ROUTE);
                this._deps.composeText.addToNumber(recipient);
                if (this._deps.composeText.typingToNumber === recipient.phoneNumber) {
                  this._deps.composeText.cleanTypingToNumber();
                }
                this._trackClickToSMS();
              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function handleClickToSMS(_x7, _x8) {
        return _handleClickToSMS.apply(this, arguments);
      }
      return handleClickToSMS;
    }()
  }, {
    key: "_trackClickToCall",
    value: function _trackClickToCall() {}
  }, {
    key: "_trackClickToSMS",
    value: function _trackClickToSMS() {}
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$extension, _this$_deps$connectiv, _this$_deps$connectiv2, _this$_deps$connectiv3, _this$_deps$rateLimit, _this$_deps$connectiv4, _this$_deps$connectiv5, _this$_deps$rateLimit2;
      return {
        currentLocale: this._deps.locale.currentLocale,
        contact: this.currentContact,
        isMultipleSiteEnabled: (_this$_deps$extension = this._deps.extensionInfo.isMultipleSiteEnabled) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false,
        isCallButtonDisabled: !!(((_this$_deps$connectiv = this._deps.connectivityManager) === null || _this$_deps$connectiv === void 0 ? void 0 : _this$_deps$connectiv.isOfflineMode) || ((_this$_deps$connectiv2 = this._deps.connectivityManager) === null || _this$_deps$connectiv2 === void 0 ? void 0 : _this$_deps$connectiv2.isWebphoneUnavailableMode) || ((_this$_deps$connectiv3 = this._deps.connectivityManager) === null || _this$_deps$connectiv3 === void 0 ? void 0 : _this$_deps$connectiv3.isWebphoneInitializing) || ((_this$_deps$rateLimit = this._deps.rateLimiter) === null || _this$_deps$rateLimit === void 0 ? void 0 : _this$_deps$rateLimit.throttling)),
        disableLinks: !!(((_this$_deps$connectiv4 = this._deps.connectivityManager) === null || _this$_deps$connectiv4 === void 0 ? void 0 : _this$_deps$connectiv4.isOfflineMode) || ((_this$_deps$connectiv5 = this._deps.connectivityManager) === null || _this$_deps$connectiv5 === void 0 ? void 0 : _this$_deps$connectiv5.isVoipOnlyMode) || ((_this$_deps$rateLimit2 = this._deps.rateLimiter) === null || _this$_deps$rateLimit2 === void 0 ? void 0 : _this$_deps$rateLimit2.throttling)),
        showSpinner: !(this.currentContactReadyState === _contactReadyStates.contactReadyStates.loaded && this._deps.locale.ready && this._deps.contactSearch.ready && this._deps.appFeatures.ready)
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;
      var params = _ref3.params;
      return {
        // @ts-expect-error TS(2322): Type '(phoneNumber: string) => string | null | und... Remove this comment to see the full error message
        formatNumber: function formatNumber(phoneNumber) {
          var _this2$_deps$extensio;
          return (0, _helper.formatContactPhoneNumber)({
            phoneNumber: phoneNumber,
            countryCode: _this2._deps.regionSettings.countryCode,
            isMultipleSiteEnabled: _this2._deps.extensionInfo.isMultipleSiteEnabled,
            siteCode: (_this2$_deps$extensio = _this2._deps.extensionInfo.site) === null || _this2$_deps$extensio === void 0 ? void 0 : _this2$_deps$extensio.code,
            maxExtensionNumberLength:
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            _this2._deps.accountInfo.maxExtensionNumberLength
          });
        },
        onVisitPage: function onVisitPage() {
          _this2.initCurrentContact(params);
        },
        getPresence: function () {
          var _getPresence2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(contact, useCache) {
            var result;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return _this2.getPresence(contact, useCache);
                  case 2:
                    result = _context7.sent;
                    return _context7.abrupt("return", result);
                  case 4:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));
          function getPresence(_x9, _x10) {
            return _getPresence2.apply(this, arguments);
          }
          return getPresence;
        }(),
        onLeavingPage: function onLeavingPage() {
          _this2.resetCurrentContact();
        },
        canTextButtonShow: function canTextButtonShow(phoneType) {
          var outboundSmsPermission = _this2._deps.appFeatures.hasOutboundSMSPermission;
          var internalSmsPermission = _this2._deps.appFeatures.hasInternalSMSPermission;
          // guess this statement is to avoid exception
          var isClickToTextEnabled = !!_this2._deps.composeText;
          return isClickToTextEnabled && phoneType !== _phoneTypes.phoneTypes.fax && (phoneType === _phoneTypes.phoneTypes.extension ? internalSmsPermission : outboundSmsPermission);
        },
        canCallButtonShow: function canCallButtonShow(phoneType) {
          var isClickToDialEnabled = !!(_this2._deps.dialerUI && _this2._deps.appFeatures.isCallingEnabled);
          return isClickToDialEnabled && phoneType !== _phoneTypes.phoneTypes.fax;
        },
        onBackClick: function onBackClick() {
          _this2._deps.routerInteraction.goBack();
        },
        onClickToDial: function onClickToDial(contact, phoneNumber) {
          return _this2.handleClickToDial(contact, phoneNumber);
        },
        onClickToSMS: function onClickToSMS(contact, phoneNumber) {
          return _this2.handleClickToSMS(contact, phoneNumber);
        }
      };
    }
  }]);
  return ContactDetailsUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentContact", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "currentContactReadyState", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _contactReadyStates.contactReadyStates.pending;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setCurrentContact", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetCurrentContact", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "resetCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initCurrentContact", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "initCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showContactDetails", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showContactDetails"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleClickToDial", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleClickToSMS", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackClickToCall", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackClickToSMS", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickToSMS"), _class2.prototype)), _class2)) || _class);
exports.ContactDetailsUI = ContactDetailsUI;
//# sourceMappingURL=ContactDetailsUI.js.map
