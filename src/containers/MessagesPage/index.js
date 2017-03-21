import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';
import { getRecipients } from 'ringcentral-integration/lib/messageHelper';

import Spinner from '../../components/Spinner';
import Panel from '../../components/Panel';

import MessageList from '../../components/MessageList';
import SearchInput from '../../components/SearchInput';

import styles from './styles.scss';
import i18n from './i18n';

function MessageSpiner() {
  return (
    <div className={styles.spinerContainer}>
      <Spinner />
    </div>
  );
}

class MessagesPage extends Component {
  constructor(props) {
    super(props);
    this.onSearchChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateSearchingString(value);
    };

    this.searchMessage = this.searchMessage.bind(this);
    this.getMessageRecipientNames = this.getMessageRecipientNames.bind(this);
  }

  getMessageRecipientNames(message) {
    let recipients = message.recipients;
    if (!recipients || recipients.length === 0) {
      recipients = this.props.getRecipientsList(message);
    }
    return recipients.map((recipient) => {
      const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
      if (recipient.matchedNames) {
        const matcherName = recipient.matchedNames.map(matcher => matcher.name).join('&');
        if (matcherName.length > 0) {
          return matcherName;
        }
        return this.props.formatPhone(phoneNumber);
      }
      if (recipient.name) {
        return recipient.name;
      }
      return this.props.formatPhone(phoneNumber);
    });
  }

  isMatchRecipients(message, searchText, searchNumber) {
    const recipients = this.props.getRecipientsList(message);
    for (const recipient of recipients) {
      const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
      let recipientName = null;
      if (phoneNumber) {
        if (searchNumber && searchNumber.length > 0 && phoneNumber.indexOf(searchNumber) >= 0) {
          return true;
        }
        if (recipient.matchedNames) {
          const matcherName = recipient.matchedNames.map(matcher => matcher.name).join('&');
          if (matcherName.length > 0) {
            recipientName = matcherName;
          } else {
            recipientName = phoneNumber;
          }
        }
      }
      if (!recipientName && recipient.name) {
        recipientName = recipient.name;
      }
      if (recipientName && recipientName.toLowerCase().indexOf(searchText) >= 0) {
        return true;
      }
    }
    return false;
  }

  searchMessage() {
    const searchString = this.props.searchingString;
    if (searchString.length < 3) {
      this.props.updateSearchResults([]);
      return;
    }
    const searchText = searchString.toLowerCase().trim();
    let searchNumber = searchString.replace(/[^\d]/g, '');
    if (searchString.length !== searchNumber.length && searchNumber.length < 2) {
      searchNumber = null;
    }
    const searchTextResults = this.props.searchMessagesText(searchText).reverse();
    const searchContactresults = this.props.allMessages.filter(message =>
      this.isMatchRecipients(message, searchText, searchNumber)
    ).reverse();
    const results = [];
    const searchMap = {};
    const addSearchResultToResult = (message) => {
      if (searchMap[message.conversationId]) {
        return;
      }
      searchMap[message.conversationId] = 1;
      results.push(message);
    };
    searchContactresults.forEach(addSearchResultToResult);
    searchTextResults.forEach(addSearchResultToResult);
    this.props.updateSearchResults(results);
  }

  renderMessageList() {
    if (this.props.searchingString.length >= 3) {
      return (
        <MessageList
          messages={this.props.searchingResults}
          loadNextPageMessages={() => null}
          loading={false}
          placeholder={i18n.getString('noSearchResults')}
          formatDateTime={this.props.formatDateTime}
          getMessageRecipientNames={this.getMessageRecipientNames}
        />
      );
    }
    return (
      <MessageList
        messages={this.props.messages}
        loadNextPageMessages={this.props.loadNextPageMessages}
        placeholder={i18n.getString('noMessages')}
        formatDateTime={this.props.formatDateTime}
        getMessageRecipientNames={this.getMessageRecipientNames}
      />
    );
  }

  render() {
    const showSpinner = this.props.showSpinner;
    if (showSpinner) {
      return (
        <div className={styles.root}>
          <MessageSpiner />
        </div>
      );
    }
    return (
      <div className={styles.content}>
        <SearchInput
          value={this.props.searchingString}
          onChange={this.onSearchChange}
          onKeyUp={this.searchMessage}
          maxLength={30}
          placeholder={i18n.getString('search')}
        />
        <Panel>
          {this.renderMessageList()}
        </Panel>
      </div>
    );
  }
}

MessagesPage.propTypes = {
  messages: MessageList.propTypes.messages,
  allMessages: MessageList.propTypes.messages,
  searchingResults: MessageList.propTypes.messages,
  loadNextPageMessages: PropTypes.func.isRequired,
  updateSearchingString: PropTypes.func.isRequired,
  isLoadingNextPage: PropTypes.bool,
  showSpinner: PropTypes.bool.isRequired,
  searchingString: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  getRecipientsList: PropTypes.func.isRequired,
  searchMessagesText: PropTypes.func.isRequired,
  updateSearchResults: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  return ({
    currentLocale: props.locale.currentLocale,
    messages: props.messages.normalizedMessages,
    allMessages: props.messageStore.conversations,
    showSpinner: (
      !props.messages.ready ||
      (props.contactMatcher && !props.contactMatcher.ready) ||
      !props.extensionInfo.ready ||
      !props.dateTimeIntl.ready
    ),
    lastUpdatedAt: props.messages.lastUpdatedAt,
    searchingString: props.messages.searchingString,
    searchingResults: props.messages.searchingResults,
  });
}

function mapDispatchToProps(dispatch, props) {
  return {
    loadNextPageMessages: props.messages.loadNextPageMessages,
    updateSearchingString: props.messages.updateSearchingString,
    updateSearchResults: props.messages.updateSearchResults,
    formatDateTime: utcString => props.dateTimeIntl.formatDateTime({
      utcString
    }),
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: props.regionSettings.areaCode,
      countryCode: props.regionSettings.countryCode,
    }),
    getRecipientsList: message => getRecipients({
      message,
      myExtensionNumber: props.extensionInfo.extensionNumber,
    }),
    searchMessagesText: searchText =>
      props.messageStore.searchMessagesText(searchText),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
