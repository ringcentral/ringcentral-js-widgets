"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationsUI = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.search.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _excluded = ["redirect"];
var _dec, _class;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ConversationsUI = exports.ConversationsUI = (_dec = (0, _di.Module)({
  name: 'ConversationsUI',
  deps: ['Brand', 'Locale', 'Conversations', 'DateTimeFormat', 'RegionSettings', 'AppFeatures', 'ConnectivityMonitor', 'RateLimiter', 'MessageStore', 'ConnectivityManager', 'ExtensionInfo', 'RouterInteraction', 'ComposeText', 'ContactSearch', 'AccountInfo', {
    dep: 'Call',
    optional: true
  }, {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ConversationLogger',
    optional: true
  }, {
    dep: 'ConversationsUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  function ConversationsUI(deps) {
    _classCallCheck(this, ConversationsUI);
    return _callSuper(this, ConversationsUI, [{
      deps: deps
    }]);
  }
  _inherits(ConversationsUI, _RcUIModuleV);
  return _createClass(ConversationsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5;
      var _ref$showTitle = _ref.showTitle,
        showTitle = _ref$showTitle === void 0 ? false : _ref$showTitle,
        _ref$enableContactFal = _ref.enableContactFallback,
        enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
        _ref$showGroupNumberN = _ref.showGroupNumberName,
        showGroupNumberName = _ref$showGroupNumberN === void 0 ? false : _ref$showGroupNumberN;
      return {
        showTitle: showTitle,
        enableContactFallback: enableContactFallback,
        showGroupNumberName: showGroupNumberName,
        brand: this._deps.brand.name,
        currentLocale: this._deps.locale.currentLocale,
        currentSiteCode: (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
        isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
        conversations: this._deps.conversations.pagingConversations,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        disableLinks: this._deps.connectivityManager.isOfflineMode || this._deps.connectivityManager.isVoipOnlyMode || this._deps.rateLimiter.throttling,
        disableCallButton: this._deps.connectivityManager.isOfflineMode || this._deps.connectivityManager.isWebphoneUnavailableMode || this._deps.connectivityManager.isWebphoneInitializing || this._deps.rateLimiter.throttling,
        disableClickToDial: !(this._deps.call && this._deps.call.isIdle),
        outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
        composeTextPermission: this._deps.appFeatures.hasComposeTextPermission,
        loggingMap: this._deps.conversationLogger && this._deps.conversationLogger.loggingMap,
        showSpinner: !(this._deps.locale.ready && this._deps.conversations.ready && (!this._deps.contactMatcher || this._deps.contactMatcher.ready) && this._deps.dateTimeFormat.ready && this._deps.regionSettings.ready && this._deps.appFeatures.ready && this._deps.connectivityMonitor.ready && this._deps.rateLimiter.ready && (!this._deps.call || this._deps.call.ready) && (!this._deps.conversationLogger || this._deps.conversationLogger.ready)),
        searchInput: this._deps.conversations.searchInput,
        autoLog: !!(this._deps.conversationLogger && this._deps.conversationLogger.autoLog),
        typeFilter: this._deps.conversations.typeFilter,
        textUnreadCounts: this._deps.messageStore.textUnreadCounts,
        voiceUnreadCounts: this._deps.messageStore.voiceUnreadCounts,
        faxUnreadCounts: this._deps.messageStore.faxUnreadCounts,
        readTextPermission: this._deps.appFeatures.hasReadTextPermission,
        readVoicemailPermission: this._deps.appFeatures.hasVoicemailPermission,
        readFaxPermission: this._deps.appFeatures.hasReadFaxPermission,
        loadingNextPage: this._deps.conversations.loadingOldConversations,
        enableCDC: this._deps.appFeatures.isCDCEnabled,
        maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var _ref2$showViewContact = _ref2.showViewContact,
        showViewContact = _ref2$showViewContact === void 0 ? true : _ref2$showViewContact,
        dateTimeFormatter = _ref2.dateTimeFormatter,
        _ref2$dialerRoute = _ref2.dialerRoute,
        dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute,
        onCreateContact = _ref2.onCreateContact,
        onLogConversation = _ref2.onLogConversation,
        onViewContact = _ref2.onViewContact,
        _ref2$conversationDet = _ref2.conversationDetailRoute,
        conversationDetailRoute = _ref2$conversationDet === void 0 ? '/conversations/{conversationId}' : _ref2$conversationDet,
        _ref2$composeTextRout = _ref2.composeTextRoute,
        composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
        _previewFaxMessages = _ref2.previewFaxMessages,
        onFaxDownload = _ref2.onFaxDownload;
      return {
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
        // @ts-expect-error TS(2322): Type '(options: Partial<FormatDateTimeOptions>) =>... Remove this comment to see the full error message
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function () {
          var _this$_deps$dateTimeF;
          return (_this$_deps$dateTimeF = _this._deps.dateTimeFormat).formatDateTime.apply(_this$_deps$dateTimeF, arguments);
        },
        // @ts-expect-error TS(2322): Type '((options: OnViewContactOptions) => void) | ... Remove this comment to see the full error message
        onViewContact: showViewContact ? onViewContact || function (_ref3) {
          var _ref3$contact = _ref3.contact,
            id = _ref3$contact.id,
            type = _ref3$contact.type;
          if (_this._deps.contactDetailsUI) {
            _this._deps.contactDetailsUI.showContactDetails({
              id: id,
              type: type,
              direct: true
            });
          }
        } : null,
        // @ts-expect-error TS(2322): Type '(({ phoneNumber, name, entityType }: OnCreat... Remove this comment to see the full error message
        onCreateContact: onCreateContact ? (/*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref4) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  phoneNumber = _ref4.phoneNumber, name = _ref4.name, entityType = _ref4.entityType;
                  _context.n = 1;
                  return _this._deps.contactMatcher.hasMatchNumber({
                    phoneNumber: phoneNumber,
                    ignoreCache: true
                  });
                case 1:
                  hasMatchNumber = _context.v;
                  if (hasMatchNumber) {
                    _context.n = 3;
                    break;
                  }
                  _context.n = 2;
                  return onCreateContact({
                    phoneNumber: phoneNumber,
                    name: name,
                    entityType: entityType
                  });
                case 2:
                  _context.n = 3;
                  return _this._deps.contactMatcher.forceMatchNumber({
                    phoneNumber: phoneNumber
                  });
                case 3:
                  return _context.a(2);
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }()) : undefined,
        onClickToDial: this._deps.dialerUI && this._deps.appFeatures.isCallingEnabled ? function (recipient) {
          if (_this._deps.call.isIdle) {
            _this._deps.routerInteraction.push(dialerRoute);
            // for track router
            _this._deps.messageStore.onClickToCall({
              fromType: recipient.fromType
            });
            _this._deps.dialerUI.call({
              recipient: recipient
            });
          }
        } : undefined,
        onClickToSms: this._deps.appFeatures.hasComposeTextPermission ? function (contact) {
          var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (_this._deps.routerInteraction) {
            _this._deps.routerInteraction.push(composeTextRoute);
          }
          // if contact autocomplete, if no match fill the number only
          if (contact.name && contact.phoneNumber && isDummyContact) {
            _this._deps.composeText.updateTypingToNumber(contact.name);
            _this._deps.contactSearch.search({
              searchString: contact.name
            });
          } else {
            _this._deps.composeText.addToNumber(contact);
            if (_this._deps.composeText.typingToNumber === contact.phoneNumber) {
              _this._deps.composeText.cleanTypingToNumber();
            }
          }
          // for track
          _this._deps.messageStore.onClickToSMS();
        } : undefined,
        onLogConversation: onLogConversation || this._deps.conversationLogger && (/*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref6) {
            var _ref6$redirect, redirect, options;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _ref6$redirect = _ref6.redirect, redirect = _ref6$redirect === void 0 ? true : _ref6$redirect, options = _objectWithoutProperties(_ref6, _excluded);
                  _context2.n = 1;
                  return _this._deps.conversationLogger.logConversation(_objectSpread(_objectSpread({}, options), {}, {
                    redirect: redirect
                  }));
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          return function (_x2) {
            return _ref7.apply(this, arguments);
          };
        }()),
        onSearchInputChange: function onSearchInputChange(e) {
          _this._deps.conversations.updateSearchInput(e.currentTarget.value);
        },
        showConversationDetail: function showConversationDetail(conversationId) {
          _this._deps.routerInteraction.push(conversationDetailRoute.replace('{conversationId}', conversationId));
        },
        readMessage: function readMessage(conversationId) {
          _this._deps.messageStore.readMessages(conversationId);
        },
        markMessage: function markMessage(conversationId) {
          _this._deps.messageStore.unreadMessage(conversationId);
        },
        unmarkMessage: function unmarkMessage(conversationId) {
          _this._deps.messageStore.readMessages(conversationId);
          _this._deps.messageStore.onUnmarkMessages();
        },
        goToComposeText: function goToComposeText() {
          return _this._deps.routerInteraction.push(composeTextRoute);
        },
        updateTypeFilter: function updateTypeFilter(type) {
          return _this._deps.conversations.updateTypeFilter(type);
        },
        deleteMessage: function deleteMessage(conversationId) {
          _this._deps.conversations.deleteConversation(conversationId);
        },
        previewFaxMessages: function previewFaxMessages(uri, conversationId) {
          if (!_previewFaxMessages) {
            window.open(uri);
          } else {
            _previewFaxMessages(uri);
          }
          _this._deps.messageStore.readMessages(conversationId);
        },
        loadNextPage: function () {
          var _loadNextPage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  _context3.n = 1;
                  return _this._deps.conversations.loadNextPage();
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          function loadNextPage() {
            return _loadNextPage.apply(this, arguments);
          }
          return loadNextPage;
        }(),
        onUnmount: function onUnmount() {
          if (_this._deps.conversations.currentPage > 2) {
            _this._deps.conversations.resetCurrentPage();
          }
        },
        // @ts-expect-error TS(2322): Type '((options: { uri: string; }) => void) | unde... Remove this comment to see the full error message
        onFaxDownload: onFaxDownload
      };
    }
  }]);
}(_core.RcUIModuleV2)) || _class);
//# sourceMappingURL=ConversationsUI.js.map
