"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.starts-with");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationUI = void 0;
require("regenerator-runtime/runtime");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _class, _class2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ConversationUI = (_dec = (0, _di.Module)({
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
  _inherits(ConversationUI, _RcUIModuleV);
  var _super = _createSuper(ConversationUI);
  function ConversationUI(deps) {
    _classCallCheck(this, ConversationUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(ConversationUI, [{
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
        supportAttachment: supportAttachment,
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
        addAttachment: function addAttachment(attachment) {
          return _this._deps.conversations.addAttachment(attachment);
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
        onLogConversation: onLogConversation || this._deps.conversationLogger && ( /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
            var _ref3$redirect, redirect, options;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _ref3$redirect = _ref3.redirect, redirect = _ref3$redirect === void 0 ? true : _ref3$redirect, options = _objectWithoutProperties(_ref3, ["redirect"]);
                    _context.next = 3;
                    return _this._deps.conversationLogger.logConversation(_objectSpread(_objectSpread({}, options), {}, {
                      redirect: redirect
                    }));
                  case 3:
                  case "end":
                    return _context.stop();
                }
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
  return ConversationUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "_trackClickConversationHyperlink", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickConversationHyperlink"), _class2.prototype)), _class2)) || _class);
exports.ConversationUI = ConversationUI;
//# sourceMappingURL=ConversationUI.js.map
