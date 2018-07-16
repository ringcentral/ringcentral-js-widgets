'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _ConversationPanel = require('../../components/ConversationPanel');

var _ConversationPanel2 = _interopRequireDefault(_ConversationPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      enableContactFallback = _ref$enableContactFal === undefined ? false : _ref$enableContactFal,
      _ref$showGroupNumberN = _ref.showGroupNumberName,
      showGroupNumberName = _ref$showGroupNumberN === undefined ? false : _ref$showGroupNumberN,
      _ref$perPage = _ref.perPage,
      perPage = _ref$perPage === undefined ? 20 : _ref$perPage;

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
    loadingNextPage: conversations.loadingOldMessages
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var _ref2$phone = _ref2.phone,
      contactMatcher = _ref2$phone.contactMatcher,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      routerInteraction = _ref2$phone.routerInteraction,
      conversationLogger = _ref2$phone.conversationLogger,
      regionSettings = _ref2$phone.regionSettings,
      conversations = _ref2$phone.conversations,
      messageStore = _ref2$phone.messageStore,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref2$dateTimeFormatt,
      isLoggedContact = _ref2.isLoggedContact,
      onLogConversation = _ref2.onLogConversation,
      _ref2$conversationsPa = _ref2.conversationsPath,
      conversationsPath = _ref2$conversationsPa === undefined ? '/messages' : _ref2$conversationsPa;

  var getMatcherContactName = void 0;
  var getMatcherContactList = void 0;
  var getMatcherContactNameList = void 0;
  if (contactMatcher && contactMatcher.ready) {
    getMatcherContactList = function getMatcherContactList(phoneNumber) {
      var matcherNames = contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(function (matcher) {
          return matcher.name + ' | ' + matcher.phoneNumbers[0].phoneType;
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
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    getMatcherContactName: getMatcherContactName,
    getMatcherContactList: getMatcherContactList,
    getMatcherContactNameList: getMatcherContactNameList,
    isLoggedContact: isLoggedContact,
    onLogConversation: onLogConversation || conversationLogger && function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
        var _ref3$redirect = _ref3.redirect,
            redirect = _ref3$redirect === undefined ? true : _ref3$redirect,
            options = (0, _objectWithoutProperties3.default)(_ref3, ['redirect']);
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return conversationLogger.logConversation((0, _extends3.default)({}, options, {
                  redirect: redirect
                }));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
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

exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ConversationPanel2.default));
//# sourceMappingURL=index.js.map
