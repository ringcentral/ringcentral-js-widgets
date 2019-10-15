"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _reactRedux = require("react-redux");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _ConversationPanel = _interopRequireDefault(require("../../components/ConversationPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      brand = _ref$phone.brand,
      locale = _ref$phone.locale,
      conversationLogger = _ref$phone.conversationLogger,
      dateTimeFormat = _ref$phone.dateTimeFormat,
      contactMatcher = _ref$phone.contactMatcher,
      regionSettings = _ref$phone.regionSettings,
      conversations = _ref$phone.conversations,
      rateLimiter = _ref$phone.rateLimiter,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      params = _ref.params,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
      _ref$showGroupNumberN = _ref.showGroupNumberName,
      showGroupNumberName = _ref$showGroupNumberN === void 0 ? false : _ref$showGroupNumberN,
      _ref$perPage = _ref.perPage,
      perPage = _ref$perPage === void 0 ? 20 : _ref$perPage,
      inputExpandable = _ref.inputExpandable;
  var disableLinks = rateLimiter.isThrottling || !connectivityMonitor.connectivity;
  var showSpinner = !(dateTimeFormat.ready && (!contactMatcher || contactMatcher.ready) && regionSettings.ready && conversations.ready && rateLimiter.ready && connectivityMonitor.ready && (!conversationLogger || conversationLogger.ready));
  var currentConversation = conversations.currentConversation;
  return {
    brand: brand.fullName,
    enableContactFallback: enableContactFallback,
    showGroupNumberName: showGroupNumberName,
    currentLocale: locale.currentLocale,
    conversationId: params.conversationId,
    sendButtonDisabled: conversations.pushing || disableLinks || conversations.messageText.length === 0 || showSpinner,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    showSpinner: showSpinner,
    recipients: currentConversation.recipients,
    messages: currentConversation.messages,
    messageText: conversations.messageText,
    conversation: currentConversation,
    disableLinks: disableLinks,
    autoLog: !!(conversationLogger && conversationLogger.autoLog),
    perPage: perPage,
    loadingNextPage: conversations.loadingOldMessages,
    inputExpandable: inputExpandable
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      contactMatcher = _ref2$phone.contactMatcher,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      routerInteraction = _ref2$phone.routerInteraction,
      conversationLogger = _ref2$phone.conversationLogger,
      regionSettings = _ref2$phone.regionSettings,
      conversations = _ref2$phone.conversations,
      messageStore = _ref2$phone.messageStore,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === void 0 ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref2$dateTimeFormatt,
      isLoggedContact = _ref2.isLoggedContact,
      onLogConversation = _ref2.onLogConversation,
      _ref2$conversationsPa = _ref2.conversationsPath,
      conversationsPath = _ref2$conversationsPa === void 0 ? '/messages' : _ref2$conversationsPa;
  var getMatcherContactName;
  var getMatcherContactList;
  var getMatcherContactNameList;

  if (contactMatcher && contactMatcher.ready) {
    getMatcherContactList = function getMatcherContactList(phoneNumber) {
      var matcherNames = contactMatcher.dataMapping[phoneNumber];

      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(function (matcher) {
          return "".concat(matcher.name, " | ").concat(matcher.phoneNumbers[0].phoneType);
        });
      }

      return [];
    };

    getMatcherContactNameList = function getMatcherContactNameList(phoneNumber) {
      var matcherNames = contactMatcher.dataMapping[phoneNumber];

      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(function (matcher) {
          return matcher.name;
        });
      }

      return [];
    };

    getMatcherContactName = function getMatcherContactName(phoneNumber) {
      var matcherNames = getMatcherContactNameList(phoneNumber);

      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.join('&');
      }

      return null;
    };
  }

  return {
    replyToReceivers: function replyToReceivers() {
      return conversations.replyToReceivers.apply(conversations, arguments);
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
    dateTimeFormatter: dateTimeFormatter,
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber["default"])({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    getMatcherContactName: getMatcherContactName,
    getMatcherContactList: getMatcherContactList,
    getMatcherContactNameList: getMatcherContactNameList,
    isLoggedContact: isLoggedContact,
    onLogConversation: onLogConversation || conversationLogger &&
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref3) {
        var _ref3$redirect, redirect, options;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref3$redirect = _ref3.redirect, redirect = _ref3$redirect === void 0 ? true : _ref3$redirect, options = _objectWithoutProperties(_ref3, ["redirect"]);
                _context.next = 3;
                return conversationLogger.logConversation(_objectSpread({}, options, {
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
    }
  };
}

var _default = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ConversationPanel["default"]));

exports["default"] = _default;
//# sourceMappingURL=index.js.map
