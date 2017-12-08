'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _ComposeTextPanel = require('../../components/ComposeTextPanel');

var _ComposeTextPanel2 = _interopRequireDefault(_ComposeTextPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      composeText = _ref$phone.composeText,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      contactSearch = _ref$phone.contactSearch,
      locale = _ref$phone.locale,
      messageSender = _ref$phone.messageSender,
      rateLimiter = _ref$phone.rateLimiter,
      rolesAndPermissions = _ref$phone.rolesAndPermissions;

  return {
    currentLocale: locale.currentLocale,
    sendButtonDisabled: !(composeText.ready && messageSender.idle) || composeText.messageText.length === 0 || composeText.toNumbers.length === 0 && composeText.typingToNumber.length === 0 || !connectivityMonitor.connectivity || rateLimiter.throttling,
    senderNumbers: messageSender.senderNumbersList,
    senderNumber: composeText.senderNumber,
    typingToNumber: composeText.typingToNumber,
    toNumbers: composeText.toNumbers,
    messageText: composeText.messageText,
    outboundSMS: rolesAndPermissions.permissions.OutboundSMS,
    searchContactList: contactSearch.sortedResult,
    showSpinner: !(composeText.ready && locale.ready && messageSender.ready && rolesAndPermissions.ready && contactSearch.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      composeText = _ref2$phone.composeText,
      contactSearch = _ref2$phone.contactSearch,
      messageStore = _ref2$phone.messageStore,
      regionSettings = _ref2$phone.regionSettings,
      routerInteraction = _ref2$phone.routerInteraction,
      _ref2$formatContactPh = _ref2.formatContactPhone,
      formatContactPhone = _ref2$formatContactPh === undefined ? function (phoneNumber) {
    return (0, _formatNumber2.default)({
      phoneNumber: phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode
    });
  } : _ref2$formatContactPh,
      phoneTypeRenderer = _ref2.phoneTypeRenderer;

  return {
    send: function send() {
      return composeText.send().then(function (responses) {
        if (!responses || responses.length === 0) {
          return null;
        }
        messageStore.pushMessages(responses);
        if (responses.length === 1) {
          var conversationId = responses[0] && responses[0].conversation && responses[0].conversation.id;
          if (!conversationId) {
            return null;
          }
          routerInteraction.push('/conversations/' + conversationId);
        } else {
          routerInteraction.push('/messages');
        }
        composeText.clean();
        return null;
      });
    },
    formatPhone: formatContactPhone,
    formatContactPhone: formatContactPhone,
    searchContact: function searchContact(searchString) {
      return contactSearch.debouncedSearch({ searchString: searchString });
    },
    updateSenderNumber: function updateSenderNumber(_ref3) {
      var phoneNumber = _ref3.phoneNumber;
      return composeText.updateSenderNumber(phoneNumber);
    },
    updateTypingToNumber: function updateTypingToNumber() {
      return composeText.updateTypingToNumber.apply(composeText, arguments);
    },
    cleanTypingToNumber: function cleanTypingToNumber() {
      return composeText.cleanTypingToNumber.apply(composeText, arguments);
    },
    addToNumber: function addToNumber() {
      return composeText.addToNumber.apply(composeText, arguments);
    },
    removeToNumber: function removeToNumber() {
      return composeText.removeToNumber.apply(composeText, arguments);
    },
    updateMessageText: function updateMessageText() {
      return composeText.updateMessageText.apply(composeText, arguments);
    },
    phoneTypeRenderer: phoneTypeRenderer
  };
}

var ComposeTextPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ComposeTextPanel2.default));

exports.default = ComposeTextPage;
//# sourceMappingURL=index.js.map
