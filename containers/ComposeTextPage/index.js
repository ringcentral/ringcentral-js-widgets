'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _ComposeText = require('ringcentral-integration/modules/ComposeText');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _MessageStore = require('ringcentral-integration/modules/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _RouterInteraction = require('../../modules/RouterInteraction');

var _RouterInteraction2 = _interopRequireDefault(_RouterInteraction);

var _ComposeTextPanel = require('../../components/ComposeTextPanel');

var _ComposeTextPanel2 = _interopRequireDefault(_ComposeTextPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComposeTextPage = (0, _reactRedux.connect)(function (state, props) {
  return {
    currentLocale: props.locale.currentLocale,
    sendButtonDisabled: !(props.composeText.ready && props.messageSender.idle),
    senderNumbers: props.messageSender.senderNumbersList,
    senderNumber: props.composeText.senderNumber,
    typingToNumber: props.composeText.typingToNumber,
    toNumbers: props.composeText.toNumbers,
    messageText: props.composeText.messageText,
    searchContactList: props.contactSearch.searching.result
  };
}, function (dispatch, props) {
  return {
    send: function send() {
      return props.composeText.send().then(function (responses) {
        if (!responses || responses.length === 0) {
          return null;
        }
        props.messageStore.pushMessages(responses);
        if (responses.length === 1) {
          var conversationId = responses[0] && responses[0].conversation && responses[0].conversation.id;
          if (!conversationId) {
            return null;
          }
          props.router.history.push('/conversations/' + conversationId);
        } else {
          props.router.history.push('/messages');
        }
        props.composeText.clean();
        return null;
      });
    },
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: props.regionSettings.areaCode,
        countryCode: props.regionSettings.countryCode
      });
    },
    searchContact: function searchContact(searchString) {
      return props.contactSearch.search({ searchString: searchString });
    },
    updateSenderNumber: props.composeText.updateSenderNumber,
    updateTypingToNumber: props.composeText.updateTypingToNumber,
    cleanTypingToNumber: props.composeText.cleanTypingToNumber,
    addToNumber: props.composeText.addToNumber,
    removeToNumber: props.composeText.removeToNumber,
    updateMessageText: props.composeText.updateMessageText
  };
})(_ComposeTextPanel2.default);

ComposeTextPage.propTypes = {
  router: _react.PropTypes.instanceOf(_RouterInteraction2.default).isRequired,
  composeText: _react.PropTypes.instanceOf(_ComposeText2.default).isRequired,
  messageStore: _react.PropTypes.instanceOf(_MessageStore2.default).isRequired
};

exports.default = ComposeTextPage;
//# sourceMappingURL=index.js.map
