import { PropTypes } from 'react';
import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';
import ComposeText from 'ringcentral-integration/modules/ComposeText';
import MessageStore from 'ringcentral-integration/modules/MessageStore';

import RouterInteraction from '../../modules/RouterInteraction';

import ComposeTextPanel from '../../components/ComposeTextPanel';

const ComposeTextPage = connect((state, props) => ({
  currentLocale: props.locale.currentLocale,
  sendButtonDisabled: (
    !(props.composeText.ready && props.messageSender.idle)
  ),
  senderNumbers: props.messageSender.senderNumbersList,
  // senderNumbers: [],
  senderNumber: props.composeText.senderNumber,
  typingToNumber: props.composeText.typingToNumber,
  toNumbers: props.composeText.toNumbers,
  messageText: props.composeText.messageText,
  searchContactList: props.contactSearch.searching.result,
}), (dispatch, props) => ({
  send: () =>
    props.composeText.send().then((resp) => {
      if (resp && resp.conversation) {
        props.messageStore.pushMessage(resp);
        props.composeText.clean();
        props.router.history.push(`/conversations/${resp.conversation.id}`);
      }
      return null;
    }),
  formatPhone: phoneNumber => (
    formatNumber({
      phoneNumber,
      areaCode: props.regionSettings.areaCode,
      countryCode: props.regionSettings.countryCode
    })
  ),
  searchContact: searchString => (
    props.contactSearch.search({ searchString })
  ),
  updateSenderNumber: props.composeText.updateSenderNumber,
  updateTypingToNumber: props.composeText.updateTypingToNumber,
  cleanTypingToNumber: props.composeText.cleanTypingToNumber,
  addToNumber: props.composeText.addToNumber,
  removeToNumber: props.composeText.removeToNumber,
  updateMessageText: props.composeText.updateMessageText,
}))(ComposeTextPanel);

ComposeTextPage.propTypes = {
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
  composeText: PropTypes.instanceOf(ComposeText).isRequired,
  messageStore: PropTypes.instanceOf(MessageStore).isRequired,
};

export default ComposeTextPage;
