'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _ComposeText = require('ringcentral-integration/modules/ComposeText');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _MessageStore = require('ringcentral-integration/modules/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _RolesAndPermissions = require('ringcentral-integration/modules/RolesAndPermissions');

var _RolesAndPermissions2 = _interopRequireDefault(_RolesAndPermissions);

var _RouterInteraction = require('../../modules/RouterInteraction');

var _RouterInteraction2 = _interopRequireDefault(_RouterInteraction);

var _ComposeTextPanel = require('../../components/ComposeTextPanel');

var _ComposeTextPanel2 = _interopRequireDefault(_ComposeTextPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var composeText = _ref.composeText,
      connectivityMonitor = _ref.connectivityMonitor,
      contactSearch = _ref.contactSearch,
      locale = _ref.locale,
      messageSender = _ref.messageSender,
      rateLimiter = _ref.rateLimiter,
      rolesAndPermissions = _ref.rolesAndPermissions;

  return {
    currentLocale: locale.currentLocale,
    sendButtonDisabled: !(composeText.ready && messageSender.idle) || composeText.messageText.length === 0 || composeText.toNumbers.length === 0 && composeText.typingToNumber.length === 0 || !connectivityMonitor.connectivity || rateLimiter.throttling,
    senderNumbers: messageSender.senderNumbersList,
    senderNumber: composeText.senderNumber,
    typingToNumber: composeText.typingToNumber,
    toNumbers: composeText.toNumbers,
    messageText: composeText.messageText,
    outboundSMS: rolesAndPermissions.permissions.OutboundSMS,
    searchContactList: contactSearch.searching.result,
    showSpinner: !(composeText.ready && locale.ready && messageSender.ready && rolesAndPermissions.ready && contactSearch.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var composeText = _ref2.composeText,
      contactSearch = _ref2.contactSearch,
      messageStore = _ref2.messageStore,
      regionSettings = _ref2.regionSettings,
      router = _ref2.router,
      _ref2$formatContactPh = _ref2.formatContactPhone,
      formatContactPhone = _ref2$formatContactPh === undefined ? function (phoneNumber) {
    return (0, _formatNumber2.default)({
      phoneNumber: phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode
    });
  } : _ref2$formatContactPh;

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
          router.push('/conversations/' + conversationId);
        } else {
          router.push('/messages');
        }
        composeText.clean();
        return null;
      });
    },
    formatPhone: formatContactPhone,
    formatContactPhone: formatContactPhone,
    searchContact: function searchContact(searchString) {
      return contactSearch.search({ searchString: searchString });
    },
    updateSenderNumber: function updateSenderNumber() {
      return composeText.updateSenderNumber.apply(composeText, arguments);
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
    }
  };
}

var ComposeTextPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ComposeTextPanel2.default);

ComposeTextPage.propTypes = {
  router: _propTypes2.default.instanceOf(_RouterInteraction2.default).isRequired,
  composeText: _propTypes2.default.instanceOf(_ComposeText2.default).isRequired,
  messageStore: _propTypes2.default.instanceOf(_MessageStore2.default).isRequired,
  rolesAndPermissions: _propTypes2.default.instanceOf(_RolesAndPermissions2.default).isRequired
};

exports.default = ComposeTextPage;
//# sourceMappingURL=index.js.map
