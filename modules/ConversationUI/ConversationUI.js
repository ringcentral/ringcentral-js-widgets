"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _dec, _dec2, _class, _class2;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
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
        onLogConversation: onLogConversation || this._deps.conversationLogger && /*#__PURE__*/function () {
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
        }(),
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
