'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _MessagesPanel = require('../../components/MessagesPanel');

var _MessagesPanel2 = _interopRequireDefault(_MessagesPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      brand = _ref$phone.brand,
      locale = _ref$phone.locale,
      messages = _ref$phone.messages,
      contactMatcher = _ref$phone.contactMatcher,
      dateTimeFormat = _ref$phone.dateTimeFormat,
      regionSettings = _ref$phone.regionSettings,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      call = _ref$phone.call,
      conversationLogger = _ref$phone.conversationLogger,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      rateLimiter = _ref$phone.rateLimiter,
      messageStore = _ref$phone.messageStore,
      _ref$showTitle = _ref.showTitle,
      showTitle = _ref$showTitle === undefined ? false : _ref$showTitle,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === undefined ? false : _ref$enableContactFal,
      _ref$showGroupNumberN = _ref.showGroupNumberName,
      showGroupNumberName = _ref$showGroupNumberN === undefined ? false : _ref$showGroupNumberN;
  var serviceFeatures = rolesAndPermissions.serviceFeatures,
      permissions = rolesAndPermissions.permissions;

  return {
    showTitle: showTitle,
    enableContactFallback: enableContactFallback,
    showGroupNumberName: showGroupNumberName,
    brand: brand.fullName,
    currentLocale: locale.currentLocale,
    conversations: messages.filteredConversations,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
    disableClickToDial: !(call && call.isIdle),
    outboundSmsPermission: !!(permissions && permissions.OutboundSMS),
    internalSmsPermission: !!(permissions && permissions.InternalSMS),
    composeTextPermission: !!(serviceFeatures && (serviceFeatures.Pager && serviceFeatures.Pager.enabled || serviceFeatures.SMS && serviceFeatures.SMS.enabled)),
    loggingMap: conversationLogger && conversationLogger.loggingMap,
    showSpinner: !(locale.ready && messages.ready && (!contactMatcher || contactMatcher.ready) && dateTimeFormat.ready && regionSettings.ready && rolesAndPermissions.ready && connectivityMonitor.ready && rateLimiter.ready && (!rolesAndPermissions || rolesAndPermissions.ready) && (!call || call.ready) && (!conversationLogger || conversationLogger.ready)),
    searchInput: messages.searchInput,
    autoLog: !!(conversationLogger && conversationLogger.autoLog),
    typeFilter: messages.typeFilter,
    textUnreadCounts: messageStore.textUnreadCounts,
    voiceUnreadCounts: messageStore.voiceUnreadCounts,
    readTextPermission: !!(serviceFeatures && (serviceFeatures.PagerReceiving && serviceFeatures.PagerReceiving.enabled || serviceFeatures.SMSReceiving && serviceFeatures.SMSReceiving.enabled)),
    readVoicemailPermission: !!(serviceFeatures && serviceFeatures.Voicemail && serviceFeatures.Voicemail.enabled)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var _ref2$phone = _ref2.phone,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      messages = _ref2$phone.messages,
      messageStore = _ref2$phone.messageStore,
      conversationLogger = _ref2$phone.conversationLogger,
      contactMatcher = _ref2$phone.contactMatcher,
      call = _ref2$phone.call,
      dialerUI = _ref2$phone.dialerUI,
      routerInteraction = _ref2$phone.routerInteraction,
      composeText = _ref2$phone.composeText,
      contactSearch = _ref2$phone.contactSearch,
      _ref2$showViewContact = _ref2.showViewContact,
      showViewContact = _ref2$showViewContact === undefined ? true : _ref2$showViewContact,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref2$dateTimeFormatt,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === undefined ? '/dialer' : _ref2$dialerRoute,
      onCreateContact = _ref2.onCreateContact,
      onLogConversation = _ref2.onLogConversation,
      isLoggedContact = _ref2.isLoggedContact,
      onViewContact = _ref2.onViewContact,
      _ref2$conversationDet = _ref2.conversationDetailRoute,
      conversationDetailRoute = _ref2$conversationDet === undefined ? '/conversations/{conversationId}' : _ref2$conversationDet,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout;

  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: showViewContact ? onViewContact || function (_ref3) {
      var _ref3$contact = _ref3.contact,
          id = _ref3$contact.id,
          type = _ref3$contact.type;

      routerInteraction.push('/contacts/' + type + '/' + id + '?direct=true');
    } : null,
    onCreateContact: onCreateContact ? function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref5) {
        var phoneNumber = _ref5.phoneNumber,
            name = _ref5.name,
            entityType = _ref5.entityType;
        var hasMatchNumber;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 2:
                hasMatchNumber = _context.sent;

                if (hasMatchNumber) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return onCreateContact({ phoneNumber: phoneNumber, name: name, entityType: entityType });

              case 6:
                _context.next = 8;
                return contactMatcher.forceMatchNumber({ phoneNumber: phoneNumber });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }() : undefined,
    onClickToDial: dialerUI ? function (recipient) {
      if (call.isIdle) {
        routerInteraction.push(dialerRoute);
        // for track router
        messageStore.onClickToCall({ fromType: recipient.fromType });
        dialerUI.call({ recipient: recipient });
      }
    } : undefined,
    onClickToSms: function onClickToSms(contact) {
      var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (routerInteraction) {
        routerInteraction.push(composeTextRoute);
      }
      // if contact autocomplete, if no match fill the number only
      if (contact.name && contact.phoneNumber && isDummyContact) {
        composeText.updateTypingToNumber(contact.name);
        contactSearch.search({ searchString: contact.name });
      } else {
        composeText.addToNumber(contact);
        if (composeText.typingToNumber === contact.phoneNumber) {
          composeText.cleanTypingToNumber();
        }
      }
      // for track
      messageStore.onClickToSMS();
    },
    isLoggedContact: isLoggedContact,
    onLogConversation: onLogConversation || conversationLogger && function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref7) {
        var _ref7$redirect = _ref7.redirect,
            redirect = _ref7$redirect === undefined ? true : _ref7$redirect,
            options = (0, _objectWithoutProperties3.default)(_ref7, ['redirect']);
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return conversationLogger.logConversation((0, _extends3.default)({}, options, {
                  redirect: redirect
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x3) {
        return _ref6.apply(this, arguments);
      };
    }(),
    onSearchInputChange: function onSearchInputChange(e) {
      messages.updateSearchInput(e.currentTarget.value);
    },
    showConversationDetail: function showConversationDetail(conversationId) {
      routerInteraction.push(conversationDetailRoute.replace('{conversationId}', conversationId));
    },
    readVoicemail: function readVoicemail(conversationId) {
      return messageStore.readMessages(conversationId);
    },
    markVoicemail: function markVoicemail(conversationId) {
      return messageStore.unreadMessage(conversationId);
    },
    unmarkVoicemail: function unmarkVoicemail(conversationId) {
      messageStore.readMessages(conversationId);
      messageStore.unmarkMessages();
    },
    goToComposeText: function goToComposeText() {
      return routerInteraction.push(composeTextRoute);
    },
    updateTypeFilter: function updateTypeFilter(type) {
      return messages.updateTypeFilter(type);
    },
    deleteMessage: function deleteMessage(conversationId) {
      messageStore.deleteMessage(conversationId);
    }
  };
}
exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_MessagesPanel2.default));
//# sourceMappingURL=index.js.map
