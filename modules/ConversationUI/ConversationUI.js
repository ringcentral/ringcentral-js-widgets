"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationUI = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");

var _core = require("@ringcentral-integration/core");

var _dec, _class;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ConversationUI = (_dec = (0, _di.Module)({
  name: 'ConversationUI',
  deps: ['AppFeatures', 'Brand', 'Locale', 'DateTimeFormat', 'RegionSettings', 'Conversations', 'RateLimiter', 'ConnectivityMonitor', 'MessageStore', 'RouterInteraction', {
    dep: 'ConversationLogger',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ConversationUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
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
      var _this$_deps = this._deps,
          brand = _this$_deps.brand,
          locale = _this$_deps.locale,
          conversationLogger = _this$_deps.conversationLogger,
          dateTimeFormat = _this$_deps.dateTimeFormat,
          contactMatcher = _this$_deps.contactMatcher,
          regionSettings = _this$_deps.regionSettings,
          conversations = _this$_deps.conversations,
          rateLimiter = _this$_deps.rateLimiter,
          connectivityMonitor = _this$_deps.connectivityMonitor,
          appFeatures = _this$_deps.appFeatures;
      var disableLinks = rateLimiter.throttling || !connectivityMonitor.connectivity;
      var showSpinner = !(dateTimeFormat.ready && (!contactMatcher || contactMatcher.ready) && regionSettings.ready && conversations.ready && rateLimiter.ready && connectivityMonitor.ready && (!conversationLogger || conversationLogger.ready));
      var currentConversation = conversations.currentConversation;
      var hasInputContent = conversations.messageText.length > 0 || conversations.attachments && conversations.attachments.length > 0;
      return {
        brand: brand.name,
        enableContactFallback: enableContactFallback,
        showGroupNumberName: showGroupNumberName,
        supportAttachment: supportAttachment,
        currentLocale: locale.currentLocale,
        conversationId: params.conversationId,
        sendButtonDisabled: conversations.pushing || disableLinks || !hasInputContent || showSpinner,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        showSpinner: showSpinner,
        recipients: currentConversation.recipients,
        messages: currentConversation.messages,
        messageText: conversations.messageText,
        attachments: conversations.attachments,
        conversation: currentConversation,
        disableLinks: disableLinks,
        autoLog: !!(conversationLogger === null || conversationLogger === void 0 ? void 0 : conversationLogger.autoLog),
        perPage: perPage,
        loadingNextPage: conversations.loadingOldMessages,
        inputExpandable: inputExpandable,
        enableCDC: appFeatures.isCDCEnabled
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var dateTimeFormatter = _ref2.dateTimeFormatter,
          onLogConversation = _ref2.onLogConversation,
          _ref2$conversationsPa = _ref2.conversationsPath,
          conversationsPath = _ref2$conversationsPa === void 0 ? '/messages' : _ref2$conversationsPa,
          renderExtraButton = _ref2.renderExtraButton;
      var _this$_deps2 = this._deps,
          contactMatcher = _this$_deps2.contactMatcher,
          dateTimeFormat = _this$_deps2.dateTimeFormat,
          routerInteraction = _this$_deps2.routerInteraction,
          conversationLogger = _this$_deps2.conversationLogger,
          regionSettings = _this$_deps2.regionSettings,
          conversations = _this$_deps2.conversations,
          messageStore = _this$_deps2.messageStore;
      var getMatcherContactName;
      var getMatcherContactList;
      var getMatcherContactNameList;

      if (contactMatcher && contactMatcher.ready) {
        getMatcherContactList = function getMatcherContactList(phoneNumber) {
          var matcherNames = contactMatcher.dataMapping[phoneNumber];

          if ((matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0) {
            return matcherNames.map(function (matcher) {
              return "".concat(matcher.name, " | ").concat(matcher.phoneNumbers[0].phoneType);
            });
          }

          return [];
        };

        getMatcherContactNameList = function getMatcherContactNameList(phoneNumber) {
          var matcherNames = contactMatcher.dataMapping[phoneNumber];

          if ((matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0) {
            return matcherNames.map(function (matcher) {
              return matcher.name;
            });
          }

          return [];
        };

        getMatcherContactName = function getMatcherContactName(phoneNumber) {
          var matcherNames = getMatcherContactNameList(phoneNumber);
          return (matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0 ? matcherNames.join('&') : null;
        };
      }

      return {
        replyToReceivers: function replyToReceivers(text, attachments) {
          return conversations.replyToReceivers(text, attachments);
        },
        unloadConversation: function unloadConversation() {
          return conversations.unloadConversation();
        },
        loadConversation: function loadConversation(id) {
          return conversations.loadConversation(id);
        },
        updateMessageText: function updateMessageText(text) {
          return conversations.updateMessageText(text);
        },
        addAttachment: function addAttachment(attachment) {
          return conversations.addAttachment(attachment);
        },
        removeAttachment: function removeAttachment(attachment) {
          return conversations.removeAttachment(attachment);
        },
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function (options) {
          return dateTimeFormat.formatDateTime(options);
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: regionSettings.areaCode,
            countryCode: regionSettings.countryCode
          });
        },
        getMatcherContactName: getMatcherContactName,
        getMatcherContactList: getMatcherContactList,
        getMatcherContactNameList: getMatcherContactNameList,
        onLogConversation: onLogConversation || conversationLogger && /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
            var _ref3$redirect, redirect, options;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _ref3$redirect = _ref3.redirect, redirect = _ref3$redirect === void 0 ? true : _ref3$redirect, options = _objectWithoutProperties(_ref3, ["redirect"]);
                    _context.next = 3;
                    return conversationLogger.logConversation(_objectSpread(_objectSpread({}, options), {}, {
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
          routerInteraction.push(conversationsPath);
        },
        readMessages: function readMessages(id) {
          messageStore.readMessages(id);
        },
        loadPreviousMessages: function loadPreviousMessages() {
          conversations.fetchOldMessages();
        },
        renderExtraButton: renderExtraButton
      };
    }
  }]);

  return ConversationUI;
}(_core.RcUIModuleV2)) || _class);
exports.ConversationUI = ConversationUI;
//# sourceMappingURL=ConversationUI.js.map
