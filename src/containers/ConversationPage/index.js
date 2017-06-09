import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';

import ConversationPanel from '../../components/ConversationPanel';

class ConversationPage extends Component {
  getChildContext() {
    return {
      formatPhone: this.props.formatNumber,
      changeDefaultRecipient: this.props.changeDefaultRecipient,
      changeMatchedNames: this.props.changeMatchedNames,
      getRecipientName: recipient => (this.getRecipientName(recipient)),
      getMatcherContactList: this.props.getMatcherContactList,
      getMatcherContactNameList: this.props.getMatcherContactNameList,
    };
  }

  componentDidMount() {
    this.loadConversation();
  }

  componentWillUnmount() {
    this.props.unloadConversation();
  }

  getRecipientName(recipient) {
    const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
    if (phoneNumber && this.props.getMatcherContactName) {
      const matcherName = this.props.getMatcherContactName(phoneNumber);
      if (matcherName) {
        return matcherName;
      }
      return this.props.formatNumber(phoneNumber);
    }
    if (recipient.name) {
      return recipient.name;
    }
    return this.props.formatNumber(phoneNumber);
  }

  loadConversation() {
    const id = this.props.conversationId;
    this.props.loadConversationById(id);
  }

  render() {
    return (
      <ConversationPanel
        countryCode={this.props.countryCode}
        areaCode={this.props.areaCode}
        disableLinks={this.props.disableLinks}
        conversationId={this.props.conversationId}
        currentLocale={this.props.currentLocale}
        messages={this.props.messages}
        conversation={this.props.conversation}
        onLogConversation={this.props.onLogConversation}
        isLoggedContact={this.props.isLoggedContact}
        recipients={this.props.recipients}
        showSpinner={this.props.showSpinner}
        replyToReceivers={this.props.replyToReceivers}
        sendButtonDisabled={this.props.sendButtonDisabled}
        autoLog={this.props.autoLog}
        dateTimeFormatter={this.props.dateTimeFormatter}
        goBack={this.props.goBack}
      />
    );
  }
}

ConversationPage.propTypes = {
  conversationId: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  sendButtonDisabled: PropTypes.bool.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  messages: ConversationPanel.propTypes.messages,
  recipients: ConversationPanel.propTypes.recipients,
  replyToReceivers: PropTypes.func.isRequired,
  unloadConversation: PropTypes.func.isRequired,
  loadConversationById: PropTypes.func.isRequired,
  changeDefaultRecipient: PropTypes.func.isRequired,
  formatNumber: PropTypes.func.isRequired,
  getMatcherContactName: PropTypes.func,
  getMatcherContactList: PropTypes.func,
  getMatcherContactNameList: PropTypes.func,
  changeMatchedNames: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
};

ConversationPage.defaultProps = {
  getMatcherContactName: null,
  getMatcherContactList: () => [],
  getMatcherContactNameList: () => [],
};

ConversationPage.childContextTypes = {
  formatPhone: PropTypes.func.isRequired,
  getRecipientName: PropTypes.func.isRequired,
  changeDefaultRecipient: PropTypes.func.isRequired,
  changeMatchedNames: PropTypes.func.isRequired,
  getMatcherContactList: PropTypes.func.isRequired,
  getMatcherContactNameList: PropTypes.func.isRequired,
};

function mapToProps(_, {
  locale,
  params,
  conversation,
  conversationLogger,
  dateTimeFormat,
  contactMatcher,
  regionSettings,
  messages,
  rateLimiter,
  connectivityMonitor,
  enableContactFallback = false,
}) {
  return ({
    enableContactFallback,
    currentLocale: locale.currentLocale,
    conversationId: params.conversationId,
    sendButtonDisabled: conversation.pushing,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    showSpinner: !(
      dateTimeFormat.ready &&
      (!contactMatcher || contactMatcher.ready) &&
      conversation.ready &&
      regionSettings.ready &&
      messages.ready &&
      rateLimiter.ready &&
      connectivityMonitor.ready &&
      conversationLogger.ready
    ),
    recipients: conversation.recipients,
    messages: conversation.messages,
    conversation: messages.allConversations.find(item => (
      item.conversationId === params.conversationId
    )),
    disableLinks: (
      rateLimiter.isThrottling ||
      !connectivityMonitor.connectivity
    ),
    autoLog: conversationLogger.autoLog,
  });
}

function mapToFunctions(_, {
  contactMatcher,
  conversation,
  dateTimeFormat,
  dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
  regionSettings,
  isLoggedContact,
  conversationLogger,
  onLogConversation,
  router,
}) {
  let getMatcherContactName;
  let getMatcherContactList;
  let getMatcherContactNameList;
  if (contactMatcher && contactMatcher.ready) {
    getMatcherContactList = (phoneNumber) => {
      const matcherNames = contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(matcher =>
          `${matcher.name} | ${matcher.phoneNumbers[0].phoneType}`
        );
      }
      return [];
    };
    getMatcherContactNameList = (phoneNumber) => {
      const matcherNames = contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(matcher => matcher.name);
      }
      return [];
    };
    getMatcherContactName = (phoneNumber) => {
      const matcherNames = getMatcherContactNameList(phoneNumber);
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.join('&');
      }
      return null;
    };
  }

  return {
    replyToReceivers: (...args) => conversation.replyToReceivers(...args),
    changeDefaultRecipient: (...args) => conversation.changeDefaultRecipient(...args),
    changeMatchedNames: (...args) => conversation.changeMatchedNames(...args),
    unloadConversation: () => conversation.unloadConversation(),
    loadConversationById: id => conversation.loadConversationById(id),
    dateTimeFormatter,
    formatNumber: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    getMatcherContactName,
    getMatcherContactList,
    getMatcherContactNameList,
    isLoggedContact,
    onLogConversation: onLogConversation ||
    (conversationLogger && (async ({ redirect = true, ...options }) => {
      await conversationLogger.logConversation({
        ...options,
        redirect,
      });
    })),
    goBack: () => {
      router.goBack();
    },
  };
}

export default connect(
  mapToProps,
  mapToFunctions,
)(ConversationPage);
