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
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
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
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationUI = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.starts-with.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _excluded = ["redirect"];
var _dec, _dec2, _class, _class2;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var ConversationUI = exports.ConversationUI = (_dec = (0, _di.Module)({
  name: 'ConversationUI',
  deps: ['AppFeatures', 'Brand', 'Locale', 'DateTimeFormat', 'RegionSettings', 'Conversations', 'RateLimiter', 'ConnectivityMonitor', 'MessageStore', 'RouterInteraction', 'AccountInfo', 'ExtensionInfo', {
    dep: 'ConversationLogger',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ConversationUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (_, href) {
  var linkType = 'website';
  if (href.startsWith('mailto:')) {
    linkType = 'email';
  }
  return [_trackEvents.trackEvents.clickConversationHyperlink, {
    'Hyperlink type': linkType
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function ConversationUI(deps) {
    _classCallCheck(this, ConversationUI);
    return _callSuper(this, ConversationUI, [{
      deps: deps
    }]);
  }
  _inherits(ConversationUI, _RcUIModuleV);
  return _createClass(ConversationUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$conversat, _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;
      var params = _ref.params,
        _ref$enableContactFal = _ref.enableContactFallback,
        enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
        _ref$showGroupNumberN = _ref.showGroupNumberName,
        showGroupNumberName = _ref$showGroupNumberN === void 0 ? false : _ref$showGroupNumberN,
        _ref$supportAttachmen = _ref.supportAttachment,
        supportAttachment = _ref$supportAttachmen === void 0 ? false : _ref$supportAttachmen,
        _ref$supportEmoji = _ref.supportEmoji,
        supportEmoji = _ref$supportEmoji === void 0 ? false : _ref$supportEmoji,
        _ref$perPage = _ref.perPage,
        perPage = _ref$perPage === void 0 ? 20 : _ref$perPage,
        inputExpandable = _ref.inputExpandable;
      var disableLinks = this._deps.rateLimiter.throttling || !this._deps.connectivityMonitor.connectivity;
      var showSpinner = !(this._deps.dateTimeFormat.ready && (!this._deps.contactMatcher || this._deps.contactMatcher.ready) && this._deps.regionSettings.ready && this._deps.conversations.ready && this._deps.rateLimiter.ready && this._deps.connectivityMonitor.ready && (!this._deps.conversationLogger || this._deps.conversationLogger.ready));
      var currentConversation = this._deps.conversations.currentConversation;
      var hasInputContent =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.conversations.messageText.length > 0 || this._deps.conversations.attachments && this._deps.conversations.attachments.length > 0;
      return {
        brand: this._deps.brand.name,
        enableContactFallback: enableContactFallback,
        showGroupNumberName: showGroupNumberName,
        supportAttachment: this._deps.appFeatures.hasSendMMSPermission && supportAttachment,
        supportEmoji: supportEmoji,
        currentLocale: this._deps.locale.currentLocale,
        conversationId: params.conversationId,
        sendButtonDisabled: this._deps.conversations.pushing || disableLinks || !hasInputContent || showSpinner,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        showSpinner: showSpinner,
        recipients: currentConversation.recipients,
        messages: currentConversation.messages,
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        messageText: this._deps.conversations.messageText,
        // @ts-expect-error TS(2322): Type 'Attachment[] | undefined' is not assignable ... Remove this comment to see the full error message
        attachments: this._deps.conversations.attachments,
        conversation: currentConversation,
        disableLinks: disableLinks,
        autoLog: !!((_this$_deps$conversat = this._deps.conversationLogger) === null || _this$_deps$conversat === void 0 ? void 0 : _this$_deps$conversat.autoLog),
        perPage: perPage,
        loadingNextPage: this._deps.conversations.loadingOldMessages,
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        inputExpandable: inputExpandable,
        enableCDC: this._deps.appFeatures.isCDCEnabled,
        isMultipleSiteEnabled: (_this$_deps$extension = this._deps.extensionInfo) === null || _this$_deps$extension === void 0 ? void 0 : _this$_deps$extension.isMultipleSiteEnabled,
        currentSiteCode: (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code,
        maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var dateTimeFormatter = _ref2.dateTimeFormatter,
        onLogConversation = _ref2.onLogConversation,
        _ref2$conversationsPa = _ref2.conversationsPath,
        conversationsPath = _ref2$conversationsPa === void 0 ? '/messages' : _ref2$conversationsPa,
        renderExtraButton = _ref2.renderExtraButton;
      var getMatcherContactName;
      var getMatcherContactList;
      var getMatcherContactNameList;
      if (this._deps.contactMatcher && this._deps.contactMatcher.ready) {
        getMatcherContactList = function getMatcherContactList(phoneNumber) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          var matcherNames = _this._deps.contactMatcher.dataMapping[phoneNumber];
          if ((matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0) {
            return matcherNames.map(function (matcher) {
              return (// @ts-expect-error TS(2532): Object is possibly 'undefined'.
                "".concat(matcher.name, " | ").concat(matcher.phoneNumbers[0].phoneType)
              );
            });
          }
          return [];
        };
        getMatcherContactNameList = function getMatcherContactNameList(phoneNumber) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          var matcherNames = _this._deps.contactMatcher.dataMapping[phoneNumber];
          if ((matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0) {
            return matcherNames.map(function (matcher) {
              return matcher.name;
            });
          }
          return [];
        };
        // @ts-expect-error TS(2322): Type '(phoneNumber: string) => string | null' is n... Remove this comment to see the full error message
        getMatcherContactName = function getMatcherContactName(phoneNumber) {
          var matcherNames = getMatcherContactNameList(phoneNumber);
          return (matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0 ? matcherNames.join('&') : null;
        };
      }
      return {
        replyToReceivers: function replyToReceivers(text, attachments) {
          return (
            // @ts-expect-error TS(2322): Type 'Promise<GetMessageInfoResponse | null>' is n... Remove this comment to see the full error message
            _this._deps.conversations.replyToReceivers(text, attachments)
          );
        },
        unloadConversation: function unloadConversation() {
          return _this._deps.conversations.unloadConversation();
        },
        loadConversation: function loadConversation(id) {
          return _this._deps.conversations.loadConversation(id);
        },
        updateMessageText: function updateMessageText(text) {
          return (
            // @ts-expect-error TS(2322): Type 'Promise<boolean | undefined>' is not assigna... Remove this comment to see the full error message
            _this._deps.conversations.updateMessageText(text)
          );
        },
        addAttachments: function addAttachments(attachment) {
          return _this._deps.conversations.addAttachments(attachment);
        },
        removeAttachment: function removeAttachment(attachment) {
          return _this._deps.conversations.removeAttachment(attachment);
        },
        // @ts-expect-error TS(2322): Type '(options: Partial<FormatDateTimeOptions>) =>... Remove this comment to see the full error message
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function (options) {
          return _this._deps.dateTimeFormat.formatDateTime(options);
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this._deps.regionSettings.areaCode,
              countryCode: _this._deps.regionSettings.countryCode,
              maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength
            })
          );
        },
        // @ts-expect-error TS(2454): Variable 'getMatcherContactName' is used before be... Remove this comment to see the full error message
        getMatcherContactName: getMatcherContactName,
        // @ts-expect-error TS(2454): Variable 'getMatcherContactList' is used before be... Remove this comment to see the full error message
        getMatcherContactList: getMatcherContactList,
        // @ts-expect-error TS(2454): Variable 'getMatcherContactNameList' is used befor... Remove this comment to see the full error message
        getMatcherContactNameList: getMatcherContactNameList,
        onLogConversation: onLogConversation || this._deps.conversationLogger && (/*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref3) {
            var _ref3$redirect, redirect, options;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _ref3$redirect = _ref3.redirect, redirect = _ref3$redirect === void 0 ? true : _ref3$redirect, options = _objectWithoutProperties(_ref3, _excluded);
                  _context.n = 1;
                  return _this._deps.conversationLogger.logConversation(_objectSpread(_objectSpread({}, options), {}, {
                    redirect: redirect
                  }));
                case 1:
                  return _context.a(2);
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref4.apply(this, arguments);
          };
        }()),
        goBack: function goBack() {
          _this._deps.routerInteraction.push(conversationsPath);
        },
        readMessages: function readMessages(id) {
          _this._deps.messageStore.readMessages(id);
        },
        loadPreviousMessages: function loadPreviousMessages() {
          _this._deps.conversations.fetchOldMessages();
        },
        renderExtraButton: renderExtraButton,
        onLinkClick: function onLinkClick(href) {
          return _this._trackClickConversationHyperlink(href);
        }
      };
    }
  }, {
    key: "_trackClickConversationHyperlink",
    value: function _trackClickConversationHyperlink(href) {}
  }]);
}(_core.RcUIModuleV2), _applyDecoratedDescriptor(_class2.prototype, "_trackClickConversationHyperlink", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickConversationHyperlink"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ConversationUI.js.map
