import { PropTypes } from 'react';
import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';
import ComposeText from 'ringcentral-integration/modules/ComposeText';
import MessageStore from 'ringcentral-integration/modules/MessageStore';
import RolesAndPermissions from 'ringcentral-integration/modules/RolesAndPermissions';

import RouterInteraction from '../../modules/RouterInteraction';

import ComposeTextPanel from '../../components/ComposeTextPanel';


function mapToProps(_, {
composeText,
  connectivityMonitor,
  contactSearch,
  locale,
  messageSender,
  rateLimiter,
  rolesAndPermissions,
}) {
  return {
    currentLocale: locale.currentLocale,
    sendButtonDisabled: (
      !(composeText.ready && messageSender.idle) ||
      (composeText.messageText.length === 0) ||
      (
        composeText.toNumbers.length === 0 &&
        composeText.typingToNumber.length === 0
      ) ||
      !connectivityMonitor.connectivity ||
      rateLimiter.throttling
    ),
    senderNumbers: messageSender.senderNumbersList,
    senderNumber: composeText.senderNumber,
    typingToNumber: composeText.typingToNumber,
    toNumbers: composeText.toNumbers,
    messageText: composeText.messageText,
    outboundSMS: rolesAndPermissions.permissions.OutboundSMS,
    searchContactList: contactSearch.searching.result,
  };
}

function mapToFunctions(_, {
  composeText,
  contactSearch,
  messageStore,
  regionSettings,
  router,
  formatContactPhone = phoneNumber => formatNumber({
    phoneNumber,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
  }),
}) {
  return {
    send: () =>
      composeText.send().then((responses) => {
        if (!responses || responses.length === 0) {
          return null;
        }
        messageStore.pushMessages(responses);
        if (responses.length === 1) {
          const conversationId =
            responses[0] && responses[0].conversation && responses[0].conversation.id;
          if (!conversationId) {
            return null;
          }
          router.push(`/conversations/${conversationId}`);
        } else {
          router.push('/messages');
        }
        composeText.clean();
        return null;
      }),
    formatPhone: formatContactPhone,
    formatContactPhone,
    searchContact: searchString => (
      contactSearch.search({ searchString })
    ),
    updateSenderNumber: (...args) => composeText.updateSenderNumber(...args),
    updateTypingToNumber: (...args) => composeText.updateTypingToNumber(...args),
    cleanTypingToNumber: (...args) => composeText.cleanTypingToNumber(...args),
    addToNumber: (...args) => composeText.addToNumber(...args),
    removeToNumber: (...args) => composeText.removeToNumber(...args),
    updateMessageText: (...args) => composeText.updateMessageText(...args),
  };
}

const ComposeTextPage = connect(
  mapToProps,
  mapToFunctions
)(ComposeTextPanel);

ComposeTextPage.propTypes = {
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
  composeText: PropTypes.instanceOf(ComposeText).isRequired,
  messageStore: PropTypes.instanceOf(MessageStore).isRequired,
  rolesAndPermissions: PropTypes.instanceOf(RolesAndPermissions).isRequired,
};

export default ComposeTextPage;
