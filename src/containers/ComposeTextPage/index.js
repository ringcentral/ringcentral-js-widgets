import { PropTypes } from 'react';
import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';
import ComposeText from 'ringcentral-integration/modules/ComposeText';
import MessageStore from 'ringcentral-integration/modules/MessageStore';
import RolesAndPermissions from 'ringcentral-integration/modules/RolesAndPermissions';

import RouterInteraction from '../../modules/RouterInteraction';

import ComposeTextPanel from '../../components/ComposeTextPanel';

const ComposeTextPage = connect((state, props) => ({
  currentLocale: props.locale.currentLocale,
  sendButtonDisabled: (
    !(props.composeText.ready && props.messageSender.idle) ||
    (props.composeText.messageText.length === 0) ||
    (
      props.composeText.toNumbers.length === 0 &&
      props.composeText.typingToNumber.length === 0
    )
  ),
  senderNumbers: props.messageSender.senderNumbersList,
  senderNumber: props.composeText.senderNumber,
  typingToNumber: props.composeText.typingToNumber,
  toNumbers: props.composeText.toNumbers,
  messageText: props.composeText.messageText,
  internalSMS: props.rolesAndPermissions.permissions.InternalSMS,
  searchContactList: props.contactSearch.searching.result,
}), (dispatch, props) => {
  const formatPhone = phoneNumber => (
    formatNumber({
      phoneNumber,
      areaCode: props.regionSettings.areaCode,
      countryCode: props.regionSettings.countryCode
    })
  );
  const formatContactPhone = props.formatContactPhone ?
    props.formatContactPhone :
    formatPhone;
  return {
    send: () =>
      props.composeText.send().then((responses) => {
        if (!responses || responses.length === 0) {
          return null;
        }
        props.messageStore.pushMessages(responses);
        if (responses.length === 1) {
          const conversationId =
            responses[0] && responses[0].conversation && responses[0].conversation.id;
          if (!conversationId) {
            return null;
          }
          props.router.history.push(`/conversations/${conversationId}`);
        } else {
          props.router.history.push('/messages');
        }
        props.composeText.clean();
        return null;
      }),
    formatPhone,
    formatContactPhone,
    searchContact: searchString => (
      props.contactSearch.search({ searchString })
    ),
    updateSenderNumber: props.composeText.updateSenderNumber,
    updateTypingToNumber: props.composeText.updateTypingToNumber,
    cleanTypingToNumber: props.composeText.cleanTypingToNumber,
    addToNumber: props.composeText.addToNumber,
    removeToNumber: props.composeText.removeToNumber,
    updateMessageText: props.composeText.updateMessageText,
  };
})(ComposeTextPanel);

ComposeTextPage.propTypes = {
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
  composeText: PropTypes.instanceOf(ComposeText).isRequired,
  messageStore: PropTypes.instanceOf(MessageStore).isRequired,
  rolesAndPermissions: PropTypes.instanceOf(RolesAndPermissions).isRequired,
};

export default ComposeTextPage;
