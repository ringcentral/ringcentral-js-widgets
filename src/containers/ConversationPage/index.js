import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';

import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import Conversation from 'ringcentral-integration/modules/Conversation';
import MessageStore from 'ringcentral-integration/modules/MessageStore';
// import DateTimeIntl from 'ringcentral-integration/modules/DateTimeIntl';

import ConversationPanel from '../../components/ConversationPanel';

class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.replyToReceivers = (text) => {
      this.props.conversation.replyToReceivers(text);
    };
  }

  getChildContext() {
    return {
      formatPhone: phoneNumber => (this.formatNumber(phoneNumber)),
      getRecipientName: recipient => (this.getRecipientName(recipient)),
      formatDateTime: utcString => (this.formatDateTime(utcString)),
      changeDefaultRecipient: phoneNumber => (this.changeDefaultRecipient(phoneNumber)),
    };
  }

  componentDidMount() {
    const id = this.props.conversationId;
    this.props.messageStore.syncConversation(id).then(() => {
      this.props.conversation.loadConversationById(id);
      this.setState({
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.conversation.unloadConversation();
  }

  getRecipientName(recipient) {
    const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
    // if (phoneNumber) {
    //   const matcherNames = this.props.contactMatcher.dataMapping[phoneNumber];
    //   if (matcherNames && matcherNames[0] && matcherNames[0].name) {
    //     return matcherNames[0].name;
    //   }
    // }
    if (!name && recipient.name) {
      return recipient.name;
    }
    return this.formatNumber(phoneNumber);
  }

  changeDefaultRecipient(phoneNumber) {
    this.props.conversation.changeDefaultRecipient(phoneNumber);
  }

  formatNumber(phoneNumber) {
    const regionSettings = this.props.regionSettings;
    return formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    });
  }

  formatDateTime(utcString) {
    return utcString;
    // return this.props.dateTimeIntl.formatDateTime({
    //   utcString,
    // });
  }

  render() {
    const showSpinner = (
      this.props.showSpinner ||
      this.state.loading
    );
    return (
      <ConversationPanel
        conversationId={this.props.conversationId}
        currentLocale={this.props.currentLocale}
        messages={this.props.messages}
        freshToken={this.props.freshToken}
        recipients={this.props.recipients}
        showSpinner={showSpinner}
        replyToReceivers={this.replyToReceivers}
        sendButtonDisabled={this.props.sendButtonDisabled}
      />
    );
  }
}

ConversationPage.propTypes = {
  conversationId: PropTypes.string.isRequired,
  regionSettings: PropTypes.instanceOf(RegionSettings).isRequired,
  conversation: PropTypes.instanceOf(Conversation).isRequired,
  messageStore: PropTypes.instanceOf(MessageStore).isRequired,
  currentLocale: PropTypes.string.isRequired,
  freshToken: PropTypes.number,
  sendButtonDisabled: PropTypes.bool.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  messages: ConversationPanel.propTypes.messages,
  recipients: ConversationPanel.propTypes.recipients,
  // dateTimeIntl: PropTypes.instanceOf(DateTimeIntl).isRequired
};

ConversationPage.childContextTypes = {
  formatPhone: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  getRecipientName: PropTypes.func.isRequired,
  changeDefaultRecipient: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const conversation = props.conversation.conversation;
  const messages = (conversation && conversation.messages) || [];
  return ({
    currentLocale: props.locale.currentLocale,
    conversationId: props.params.conversationId,
    conversation: props.conversation,
    regionSettings: props.regionSettings,
    messageStore: props.messageStore,
    freshToken: props.conversation.messageStoreUpdatedAt,
    sendButtonDisabled: props.conversation.pushing,
    showSpinner: (
      // !props.dateTimeIntl.ready ||
      // !props.contactMatcher.ready ||
      !props.conversation.ready ||
      !props.regionSettings.ready
    ),
    recipients: props.conversation.recipients,
    messages,
  });
}

export default connect(mapStateToProps)(ConversationPage);
