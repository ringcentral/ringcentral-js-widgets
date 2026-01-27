"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
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
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeTextView = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ComposeTextPanel = _interopRequireDefault(require("@ringcentral-integration/widgets/components/ComposeTextPanel"));
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var ComposeTextView = exports.ComposeTextView = (_dec = (0, _nextCore.injectable)({
  name: 'ComposeTextView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ComposeTextViewOptions')(target, undefined, 14);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services4.ComposeText === "undefined" ? Object : _services4.ComposeText, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof _services4.Conversations === "undefined" ? Object : _services4.Conversations, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services4.MessageSender === "undefined" ? Object : _services4.MessageSender, typeof _services4.MessageStore === "undefined" ? Object : _services4.MessageStore, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof ComposeTextViewOptions === "undefined" ? Object : ComposeTextViewOptions]), _dec5 = (0, _nextCore.dynamic)('ContactSearchView'), _dec6 = Reflect.metadata("design:type", typeof ContactSearchView === "undefined" ? Object : ContactSearchView), _dec7 = (0, _services.track)(function (that, eventName, contactType) {
  return [eventName, {
    contactType: contactType,
    location: 'SMS compose'
  }];
}), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String, String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ComposeTextView(_brand, _composeText, _connectivityMonitor, _contactSearch, _conversations, _locale, _messageSender, _messageStore, _rateLimiter, _regionSettings, _appFeatures, _router, _accountInfo, _auth, _composeTextViewOptions) {
    var _this;
    _classCallCheck(this, ComposeTextView);
    _this = _callSuper(this, ComposeTextView);
    _this._brand = _brand;
    _this._composeText = _composeText;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._contactSearch = _contactSearch;
    _this._conversations = _conversations;
    _this._locale = _locale;
    _this._messageSender = _messageSender;
    _this._messageStore = _messageStore;
    _this._rateLimiter = _rateLimiter;
    _this._regionSettings = _regionSettings;
    _this._appFeatures = _appFeatures;
    _this._router = _router;
    _this._accountInfo = _accountInfo;
    _this._auth = _auth;
    _this._composeTextViewOptions = _composeTextViewOptions;
    _initializerDefineProperty(_this, "_contactSearchView", _descriptor, _this);
    return _this;
  }
  _inherits(ComposeTextView, _RcViewModule);
  return _createClass(ComposeTextView, [{
    key: "triggerEventTracking",
    value: function () {
      var _triggerEventTracking = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(eventName, contactType) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              return _context.a(2);
          }
        }, _callee);
      }));
      function triggerEventTracking(_x, _x2) {
        return _triggerEventTracking.apply(this, arguments);
      }
      return triggerEventTracking;
    }()
  }, {
    key: "showSpinner",
    get: function get() {
      return !(this._composeText.ready && this._locale.ready && this._messageSender.ready && this._appFeatures.ready && this._contactSearch.ready);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$inputExpandable = _ref.inputExpandable,
        inputExpandable = _ref$inputExpandable === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' : _ref$inputExpandable,
        _ref$supportAttachmen = _ref.supportAttachment,
        supportAttachment = _ref$supportAttachmen === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' : _ref$supportAttachmen,
        _ref$supportEmoji = _ref.supportEmoji,
        supportEmoji = _ref$supportEmoji === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' : _ref$supportEmoji,
        _ref$useRecipientsInp = _ref.useRecipientsInputV2,
        useRecipientsInputV2 = _ref$useRecipientsInp === void 0 ? false : _ref$useRecipientsInp;
      var isContentEmpty = this._composeText.messageText.length === 0 && (!this._composeText.attachments || this._composeText.attachments.length === 0);
      return {
        brand: this._brand.name,
        currentLocale: this._locale.currentLocale,
        sendButtonDisabled: !(this._composeText.ready && this._messageSender.idle) || isContentEmpty || this._composeText['_toNumbers'].length === 0 && this._composeText.typingToNumber.length === 0 || !this._connectivityMonitor.connectivity || this._rateLimiter.restricted,
        senderNumbers: this._messageSender.senderNumbersList,
        senderNumber: this._composeText.senderNumber,
        typingToNumber: this._composeText.typingToNumber,
        toNumbers: this._composeText['_toNumbers'],
        messageText: this._composeText.messageText,
        outboundSMS: this._appFeatures.hasOutboundSMSPermission,
        searchContactList: this._contactSearch.sortedResult,
        showSpinner: this.showSpinner,
        inputExpandable: inputExpandable,
        attachments: this._composeText.attachments,
        supportAttachment: supportAttachment && this._appFeatures.hasSendMMSPermission,
        supportEmoji: supportEmoji,
        useRecipientsInputV2: useRecipientsInputV2,
        allowedCreateGroupText: this._appFeatures.hasSendMMSPermission && this._composeText['_toNumbers'].length > 1,
        createGroupChecked: this._composeText.createGroupChecked,
        maxRecipients: this._composeText.maxRecipients,
        acceptFileTypes: this._conversations.acceptFileTypes
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;
      var _ref2$formatContactPh = _ref2.formatContactPhone,
        formatContactPhone = _ref2$formatContactPh === void 0 ? function (phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            maxExtensionLength: _this2._accountInfo.maxExtensionNumberLength
          });
        } : _ref2$formatContactPh,
        phoneTypeRenderer = _ref2.phoneTypeRenderer,
        phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
        recipientsContactInfoRenderer = _ref2.recipientsContactInfoRenderer,
        recipientsContactPhoneRenderer = _ref2.recipientsContactPhoneRenderer;
      return {
        triggerEventTracking: function triggerEventTracking(eventName, contactType) {
          return _this2.triggerEventTracking(eventName, contactType);
        },
        send: function () {
          var _send = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(text, attachments) {
            var responses, conversationId, _t;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  _context2.p = 0;
                  _context2.n = 1;
                  return _this2._composeText.send(text, attachments);
                case 1:
                  responses = _context2.v;
                  if (!(!responses || responses.length === 0)) {
                    _context2.n = 2;
                    break;
                  }
                  return _context2.a(2);
                case 2:
                  _this2._messageStore.pushMessages(responses);
                  if (!(responses.length === 1)) {
                    _context2.n = 4;
                    break;
                  }
                  conversationId = responses[0] && responses[0].conversation && responses[0].conversation.id;
                  if (conversationId) {
                    _context2.n = 3;
                    break;
                  }
                  return _context2.a(2);
                case 3:
                  _this2._router.push("/conversations/".concat(conversationId));
                  _context2.n = 5;
                  break;
                case 4:
                  _this2._router.push('/messages');
                case 5:
                  _this2._conversations.relateCorrespondentEntity(responses);
                  _this2._composeText.clean();
                  return _context2.a(2);
                case 6:
                  _context2.p = 6;
                  _t = _context2.v;
                  console.log(_t);
                case 7:
                  return _context2.a(2);
              }
            }, _callee2, null, [[0, 6]]);
          }));
          function send(_x3, _x4) {
            return _send.apply(this, arguments);
          }
          return send;
        }(),
        formatPhone: formatContactPhone,
        formatContactPhone: formatContactPhone,
        detectPhoneNumbers: function () {
          var _detectPhoneNumbers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(input) {
            var promises, results, detectedNumbers;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  promises = input.split(/,\s*/g).map(/*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(item) {
                      var isValid;
                      return _regenerator().w(function (_context3) {
                        while (1) switch (_context3.n) {
                          case 0:
                            _context3.n = 1;
                            return _this2._composeText.validatePhoneNumber(item);
                          case 1:
                            isValid = _context3.v;
                            return _context3.a(2, isValid ? item : undefined);
                        }
                      }, _callee3);
                    }));
                    return function (_x6) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                  _context4.n = 1;
                  return Promise.all(promises);
                case 1:
                  results = _context4.v;
                  detectedNumbers = results.filter(function (item) {
                    return !!item;
                  });
                  detectedNumbers.forEach(function (phoneNumber) {
                    _this2._composeText.addToNumber({
                      phoneNumber: phoneNumber
                    });
                  });
                  return _context4.a(2, detectedNumbers.length > 0);
              }
            }, _callee4);
          }));
          function detectPhoneNumbers(_x5) {
            return _detectPhoneNumbers.apply(this, arguments);
          }
          return detectPhoneNumbers;
        }(),
        searchContact: function searchContact(searchString) {
          return _this2._contactSearch.debouncedSearch({
            searchString: searchString
          });
        },
        updateSenderNumber: function updateSenderNumber(_ref4) {
          var phoneNumber = _ref4.phoneNumber;
          return _this2._composeText.updateSenderNumber(phoneNumber);
        },
        updateTypingToNumber: function updateTypingToNumber(toNumber) {
          _this2._composeText.updateTypingToNumber(toNumber);
        },
        cleanTypingToNumber: function cleanTypingToNumber() {
          var _this2$_composeText;
          return (
            // TODO: fix type
            // @ts-ignore
            (_this2$_composeText = _this2._composeText).cleanTypingToNumber.apply(_this2$_composeText, arguments)
          );
        },
        // TODO: fix type
        // @ts-ignore
        addToNumber: function addToNumber() {
          var _this2$_composeText2;
          return (_this2$_composeText2 = _this2._composeText).addToNumber.apply(_this2$_composeText2, arguments);
        },
        // TODO: fix type
        // @ts-ignore
        removeToNumber: function removeToNumber() {
          var _this2$_composeText3;
          return (_this2$_composeText3 = _this2._composeText).removeToNumber.apply(_this2$_composeText3, arguments);
        },
        updateMessageText: function updateMessageText() {
          var _this2$_composeText4;
          return (
            // TODO: fix type
            // @ts-ignore
            (_this2$_composeText4 = _this2._composeText).updateMessageText.apply(_this2$_composeText4, arguments)
          );
        },
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        recipientsContactInfoRenderer: recipientsContactInfoRenderer,
        recipientsContactPhoneRenderer: recipientsContactPhoneRenderer,
        // TODO: fix type
        // @ts-ignore
        addAttachments: function addAttachments() {
          var _this2$_composeText5;
          return (_this2$_composeText5 = _this2._composeText).addAttachments.apply(_this2$_composeText5, arguments);
        },
        removeAttachment: function removeAttachment() {
          var _this2$_composeText6;
          return (
            // TODO: fix type
            // @ts-ignore
            (_this2$_composeText6 = _this2._composeText).removeAttachment.apply(_this2$_composeText6, arguments)
          );
        },
        onCreateGroupTextOptionChanged: function onCreateGroupTextOptionChanged(checked) {
          _this2._composeText.setCreateGroupChecked(checked);
        },
        onBackClick: function onBackClick() {
          _this2._router.push('/messages');
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_composeTextVie;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;

      // TODO: fix type
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_composeTextVie = this._composeTextViewOptions) === null || _this$_composeTextVie === void 0 ? void 0 : _this$_composeTextVie.component) || _ComposeTextPanel["default"];
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_contactSearchView", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "triggerEventTracking", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerEventTracking"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ComposeText.view.js.map
