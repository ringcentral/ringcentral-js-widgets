import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';
import ComposeTextPanel from '../../components/ComposeTextPanel';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  phone: {
    composeText,
    connectivityMonitor,
    contactSearch,
    locale,
    messageSender,
    rateLimiter,
    rolesAndPermissions,
    brand
  },
}) {
  return {
    brand: brand.fullName,
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
    searchContactList: contactSearch.sortedResult,
    showSpinner: !(
      composeText.ready &&
      locale.ready &&
      messageSender.ready &&
      rolesAndPermissions.ready &&
      contactSearch.ready
    ),
  };
}

function mapToFunctions(_, {
  phone: {
    composeText,
    contactSearch,
    messageStore,
    regionSettings,
    routerInteraction,
    alert,
  },
  formatContactPhone = phoneNumber => formatNumber({
    phoneNumber,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
  }),
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
}) {
  return {
    send: () => {
      let hasAlertOtherMsg;
      setTimeout(() => {
        hasAlertOtherMsg = alert.messages.filter(({ level, message }) => (
          level === 'warning' &&
          Object.values(messageSenderMessages).indexOf(message) > -1
        )).length > 0;
      }, 500);
      let timeout = setTimeout(() => {
        if (routerInteraction.currentPath === '/composeText') {
          if (!hasAlertOtherMsg) composeText.alertMessageSending();
        }
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
      }, 10000);
      composeText.send().then((responses) => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        composeText.dismissMessageSending();
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
          routerInteraction.push(`/conversations/${conversationId}`);
        } else {
          routerInteraction.push('/messages');
        }
        composeText.clean();
        return null;
      });
    },
    formatPhone: formatContactPhone,
    formatContactPhone,
    searchContact: searchString => (
      contactSearch.debouncedSearch({ searchString })
    ),
    updateSenderNumber: ({ phoneNumber }) => composeText.updateSenderNumber(phoneNumber),
    updateTypingToNumber: (...args) => composeText.updateTypingToNumber(...args),
    cleanTypingToNumber: (...args) => composeText.cleanTypingToNumber(...args),
    addToNumber: (...args) => composeText.addToNumber(...args),
    removeToNumber: (...args) => composeText.removeToNumber(...args),
    updateMessageText: (...args) => composeText.updateMessageText(...args),
    phoneTypeRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  };
}

const ComposeTextPage = withPhone(connect(
  mapToProps,
  mapToFunctions
)(ComposeTextPanel));

export {
  mapToProps,
  mapToFunctions,
  ComposeTextPage as default,
};
