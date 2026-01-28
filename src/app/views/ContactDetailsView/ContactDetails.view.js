"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetailsView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _services3 = require("@ringcentral-integration/micro-setting/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ContactDetailsView2 = require("@ringcentral-integration/widgets/components/ContactDetailsView");
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _services4 = require("../../services");
var _contactReadyStates = require("./contactReadyStates");
var _helper = require("./helper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_DIALER_ROUTE = '/dialer';
var DEFAULT_COMPOSE_TEXT_ROUTE = '/composeText';
var ContactDetailsView = exports.ContactDetailsView = (_dec = (0, _nextCore.injectable)({
  name: 'ContactDetailsView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ContactDetailsViewOptions')(target, undefined, 13);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _services4.ContactMatcher === "undefined" ? Object : _services4.ContactMatcher, typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services4.ContactSearch === "undefined" ? Object : _services4.ContactSearch, typeof _services4.Contacts === "undefined" ? Object : _services4.Contacts, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services3.IntegrationConfig === "undefined" ? Object : _services3.IntegrationConfig, typeof ContactDetailsViewOptions === "undefined" ? Object : ContactDetailsViewOptions]), _dec5 = (0, _nextCore.dynamic)('DialerView'), _dec6 = Reflect.metadata("design:type", typeof DialerView === "undefined" ? Object : DialerView), _dec7 = (0, _nextCore.dynamic)('Call'), _dec8 = Reflect.metadata("design:type", typeof Call === "undefined" ? Object : Call), _dec9 = (0, _nextCore.dynamic)('ComposeText'), _dec0 = Reflect.metadata("design:type", typeof ComposeText === "undefined" ? Object : ComposeText), _dec1 = Reflect.metadata("design:type", typeof ContactModel === "undefined" ? Object : ContactModel), _dec10 = Reflect.metadata("design:type", typeof ContactReadyState === "undefined" ? Object : ContactReadyState), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [typeof ContactReadyState === "undefined" ? Object : ContactReadyState, typeof ContactModel === "undefined" ? Object : ContactModel]), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", []), _dec16 = (0, _nextCore.delegate)('server'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof IParams === "undefined" ? Object : IParams]), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [typeof IContact === "undefined" ? Object : IContact, Boolean]), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [typeof RouteParams === "undefined" ? Object : RouteParams]), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [typeof ContactModel === "undefined" ? Object : ContactModel, String]), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [typeof ContactModel === "undefined" ? Object : ContactModel, String]), _dec31 = (0, _services.track)(_trackEvents.trackEvents.clickToCallInContactDetails), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", []), _dec34 = (0, _services.track)(_trackEvents.trackEvents.clickToSMSInContactDetails), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ContactDetailsView(_modalView, _contactMatcher, _locale, _router, _contactSearch, _contacts, _extensionInfo, _appFeatures, _rateLimiter, _regionSettings, _connectivityManager, _accountInfo, _integrationConfig, _contactDetailsViewOptions) {
    var _this;
    _classCallCheck(this, ContactDetailsView);
    _this = _callSuper(this, ContactDetailsView);
    _this._modalView = _modalView;
    _this._contactMatcher = _contactMatcher;
    _this._locale = _locale;
    _this._router = _router;
    _this._contactSearch = _contactSearch;
    _this._contacts = _contacts;
    _this._extensionInfo = _extensionInfo;
    _this._appFeatures = _appFeatures;
    _this._rateLimiter = _rateLimiter;
    _this._regionSettings = _regionSettings;
    _this._connectivityManager = _connectivityManager;
    _this._accountInfo = _accountInfo;
    _this._integrationConfig = _integrationConfig;
    _this._contactDetailsViewOptions = _contactDetailsViewOptions;
    _this.params = {};
    _initializerDefineProperty(_this, "_dialerView", _descriptor, _this);
    _initializerDefineProperty(_this, "_call", _descriptor2, _this);
    _initializerDefineProperty(_this, "_composeText", _descriptor3, _this);
    _initializerDefineProperty(_this, "currentContact", _descriptor4, _this);
    _initializerDefineProperty(_this, "currentContactReadyState", _descriptor5, _this);
    return _this;
  }
  _inherits(ContactDetailsView, _RcViewModule);
  return _createClass(ContactDetailsView, [{
    key: "_setCurrentContact",
    value: function _setCurrentContact(readyState, contact) {
      this.currentContactReadyState = readyState;
      this.currentContact = contact;
    }
  }, {
    key: "resetCurrentContact",
    value: function () {
      var _resetCurrentContact = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setCurrentContact(_contactReadyStates.contactReadyStates.pending, null);
            case 1:
              return _context.a(2);
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
      var _initCurrentContact = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref) {
        var _contact$phoneNumbers;
        var contactType, contactId, contact;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              contactType = _ref.contactType, contactId = _ref.contactId;
              if (!(this.currentContactReadyState !== _contactReadyStates.contactReadyStates.pending || !contactType || !contactId)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              this._setCurrentContact(_contactReadyStates.contactReadyStates.loading, null);
              _context2.n = 2;
              return this._contacts.findContact({
                sourceName: contactType,
                contactId: contactId
              });
            case 2:
              contact = _context2.v;
              // hide hidden phone numbers when cdc is enabled
              if (this._appFeatures.isCDCEnabled && (contact === null || contact === void 0 ? void 0 : (_contact$phoneNumbers = contact.phoneNumbers) === null || _contact$phoneNumbers === void 0 ? void 0 : _contact$phoneNumbers.length)) {
                contact.phoneNumbers = contact.phoneNumbers.filter(function (phone) {
                  return !phone.hidden;
                });
              }
              // ignore result when it is reset during loading
              if (!(this.currentContactReadyState !== _contactReadyStates.contactReadyStates.loading)) {
                _context2.n = 3;
                break;
              }
              return _context2.a(2);
            case 3:
              this._setCurrentContact(_contactReadyStates.contactReadyStates.loaded, contact);
              if (contact) {
                this._contacts.getProfileImage(contact, false);
              }
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function initCurrentContact(_x) {
        return _initCurrentContact.apply(this, arguments);
      }
      return initCurrentContact;
    }()
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(contact, useCache) {
        var presence;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._contacts.getPresence(contact, useCache);
            case 1:
              presence = _context3.v;
              return _context3.a(2, presence);
          }
        }, _callee3, this);
      }));
      function getPresence(_x2, _x3) {
        return _getPresence.apply(this, arguments);
      }
      return getPresence;
    }()
  }, {
    key: "showContactDetails",
    value: function () {
      var _showContactDetails = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref2) {
        var id, type, _ref2$direct, direct;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              id = _ref2.id, type = _ref2.type, _ref2$direct = _ref2.direct, direct = _ref2$direct === void 0 ? false : _ref2$direct;
              this._router.push("/contacts/".concat(type, "/").concat(id).concat(direct ? '?direct=true' : ''));
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function showContactDetails(_x4) {
        return _showContactDetails.apply(this, arguments);
      }
      return showContactDetails;
    }()
  }, {
    key: "handleClickToDial",
    value: function () {
      var _handleClickToDial = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(contact, phoneNumber) {
        var _this$_call;
        var recipient, _this$_contactDetails, _this$_contactDetails2, _this$_dialerView;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              recipient = _objectSpread(_objectSpread({}, contact), {}, {
                phoneNumber: phoneNumber
              });
              if ((_this$_call = this._call) === null || _this$_call === void 0 ? void 0 : _this$_call.isIdle) {
                this._router.push((_this$_contactDetails = (_this$_contactDetails2 = this._contactDetailsViewOptions) === null || _this$_contactDetails2 === void 0 ? void 0 : _this$_contactDetails2.dialerRoute) !== null && _this$_contactDetails !== void 0 ? _this$_contactDetails : DEFAULT_DIALER_ROUTE, _defineProperty({}, _views.SyncTabId.DIALPAD, 'keypad'));
                (_this$_dialerView = this._dialerView) === null || _this$_dialerView === void 0 ? void 0 : _this$_dialerView.call({
                  recipient: recipient
                });
              }
              this._trackClickToCall();
            case 1:
              return _context5.a(2);
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
      var _handleClickToSMS = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(contact, phoneNumber) {
        var _this$_contactDetails3, _this$_contactDetails4, _this$_composeText, _this$_composeText2;
        var recipient;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              recipient = _objectSpread(_objectSpread({}, contact), {}, {
                phoneNumber: phoneNumber
              });
              this._router.push((_this$_contactDetails3 = (_this$_contactDetails4 = this._contactDetailsViewOptions) === null || _this$_contactDetails4 === void 0 ? void 0 : _this$_contactDetails4.composeTextRoute) !== null && _this$_contactDetails3 !== void 0 ? _this$_contactDetails3 : DEFAULT_COMPOSE_TEXT_ROUTE);
              (_this$_composeText = this._composeText) === null || _this$_composeText === void 0 ? void 0 : _this$_composeText.addToNumber(recipient);
              if (((_this$_composeText2 = this._composeText) === null || _this$_composeText2 === void 0 ? void 0 : _this$_composeText2.typingToNumber) === recipient.phoneNumber) {
                this._composeText.cleanTypingToNumber();
              }
              this._trackClickToSMS();
            case 1:
              return _context6.a(2);
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
    value: function _trackClickToCall() {
      //
    }
  }, {
    key: "_trackClickToSMS",
    value: function _trackClickToSMS() {
      //
    }

    // TODO: fix type
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      var _this$_extensionInfo$, _this$_connectivityMa, _this$_connectivityMa2, _this$_connectivityMa3, _this$_rateLimiter, _this$_connectivityMa4, _this$_connectivityMa5, _this$_rateLimiter2;
      return {
        currentLocale: this._locale.currentLocale,
        contact: this.currentContact,
        isMultipleSiteEnabled: (_this$_extensionInfo$ = this._extensionInfo.isMultipleSiteEnabled) !== null && _this$_extensionInfo$ !== void 0 ? _this$_extensionInfo$ : false,
        isCallButtonDisabled: !!(((_this$_connectivityMa = this._connectivityManager) === null || _this$_connectivityMa === void 0 ? void 0 : _this$_connectivityMa.isOfflineMode) || ((_this$_connectivityMa2 = this._connectivityManager) === null || _this$_connectivityMa2 === void 0 ? void 0 : _this$_connectivityMa2.isWebphoneUnavailableMode) || ((_this$_connectivityMa3 = this._connectivityManager) === null || _this$_connectivityMa3 === void 0 ? void 0 : _this$_connectivityMa3.isWebphoneInitializing) || ((_this$_rateLimiter = this._rateLimiter) === null || _this$_rateLimiter === void 0 ? void 0 : _this$_rateLimiter.restricted)),
        disableLinks: !!(((_this$_connectivityMa4 = this._connectivityManager) === null || _this$_connectivityMa4 === void 0 ? void 0 : _this$_connectivityMa4.isOfflineMode) || ((_this$_connectivityMa5 = this._connectivityManager) === null || _this$_connectivityMa5 === void 0 ? void 0 : _this$_connectivityMa5.isVoipOnlyMode) || ((_this$_rateLimiter2 = this._rateLimiter) === null || _this$_rateLimiter2 === void 0 ? void 0 : _this$_rateLimiter2.restricted)),
        showSpinner: !(this.currentContactReadyState === _contactReadyStates.contactReadyStates.loaded && this._locale.ready && this._contactSearch.ready && this._appFeatures.ready)
      };
    }

    // TODO: fix type
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this2 = this;
      return {
        formatNumber: function formatNumber(phoneNumber) {
          var _this2$_extensionInfo;
          return (0, _helper.formatContactPhoneNumber)({
            phoneNumber: phoneNumber,
            countryCode: _this2._regionSettings.countryCode,
            isMultipleSiteEnabled: _this2._extensionInfo.isMultipleSiteEnabled,
            siteCode: (_this2$_extensionInfo = _this2._extensionInfo.site) === null || _this2$_extensionInfo === void 0 ? void 0 : _this2$_extensionInfo.code,
            maxExtensionNumberLength: _this2._accountInfo.maxExtensionNumberLength
          });
        },
        getPresence: function () {
          var _getPresence2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(contact, useCache) {
            var result;
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  _context7.n = 1;
                  return _this2.getPresence(contact, useCache);
                case 1:
                  result = _context7.v;
                  return _context7.a(2, result);
              }
            }, _callee7);
          }));
          function getPresence(_x9, _x0) {
            return _getPresence2.apply(this, arguments);
          }
          return getPresence;
        }(),
        canTextButtonShow: function canTextButtonShow(phoneType) {
          var outboundSmsPermission = _this2._appFeatures.hasOutboundSMSPermission;
          var internalSmsPermission = _this2._appFeatures.hasInternalSMSPermission;
          // guess this statement is to avoid exception
          var isClickToTextEnabled = !!_this2._composeText;
          return isClickToTextEnabled && phoneType !== _phoneTypes.phoneTypes.fax && (phoneType === _phoneTypes.phoneTypes.extension ? internalSmsPermission : outboundSmsPermission);
        },
        canCallButtonShow: function canCallButtonShow(phoneType) {
          var isClickToDialEnabled = !!(_this2._dialerView && _this2._appFeatures.isCallingEnabled);
          return isClickToDialEnabled && phoneType !== _phoneTypes.phoneTypes.fax;
        },
        onBackClick: function onBackClick() {
          _this2._router.goBack();
        },
        onClickToDial: function onClickToDial(contact, phoneNumber) {
          return _this2.handleClickToDial(contact, phoneNumber);
        },
        onClickToSMS: function onClickToSMS(contact, phoneNumber) {
          return _this2.handleClickToSMS(contact, phoneNumber);
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_contactDetails5;
      this.params = (0, _reactRouter.useParams)();
      (0, _react.useEffect)(function () {
        _this3.initCurrentContact(_this3.params);
        return function () {
          _this3.resetCurrentContact();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_contactDetails5 = this._contactDetailsViewOptions) === null || _this$_contactDetails5 === void 0 ? void 0 : _this$_contactDetails5.component) || _ContactDetailsView2.ContactDetailsView;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_dialerView", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_call", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_composeText", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentContact", [_nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "currentContactReadyState", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _contactReadyStates.contactReadyStates.pending;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setCurrentContact", [_nextCore.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetCurrentContact", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "resetCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initCurrentContact", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "initCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showContactDetails", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "showContactDetails"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleClickToDial", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleClickToSMS", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackClickToCall", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackClickToSMS", [_dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickToSMS"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ContactDetails.view.js.map
