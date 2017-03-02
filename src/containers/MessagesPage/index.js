import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';
import { getRecipients } from 'ringcentral-integration/lib/messageHelper';

import Spinner from '../../components/Spinner';
import Panel from '../../components/Panel';
import Header from '../../components/Header';

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
      // if (phoneNumber) {
      //   const matcherNames = props.contactMatcher.dataMapping[phoneNumber];
      //   if (matcherNames && matcherNames[0]) {
      //     return matcherNames[0].name;
      //   }
      // }
      if (recipient.name) {
        return recipient.name;
      }
      return this.props.formatPhone(phoneNumber);
    });
  }

  isMatchContact(message, searchText, searchNumber) {
    const recipients = this.props.getRecipientsList(message);
    for (const number of recipients) {
      const phoneNumber = number.phoneNumber || number.extensionNumber;
      if (phoneNumber) {
        // const matcherNames = this.props.contactMatcher.dataMapping[phoneNumber];
        // if (
        //   matcherNames && matcherNames[0] && matcherNames[0].name &&
        //   matcherNames[0].name.toLowerCase().indexOf(searchText) >= 0
        // ) {
        //   return true;
        // }
        if (searchNumber && searchNumber.length > 0 && phoneNumber.indexOf(searchNumber) >= 0) {
          return true;
        }
      }
      if (number.name && number.name.toLowerCase().indexOf(searchText) >= 0) {
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
      this.isMatchContact(message, searchText, searchNumber)
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
        loading={this.props.isLoadingNextPage}
        placeholder={i18n.getString('noMessages')}
        formatDateTime={this.props.formatDateTime}
        getMessageRecipientNames={this.getMessageRecipientNames}
      />
    );
  }

  renderContent() {
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

  render() {
    const showSpinner = this.props.showSpinner;
    return (
      <div className={styles.root}>
        <Header>
          {i18n.getString('title')}
        </Header>
        {
          showSpinner ? <MessageSpiner /> : this.renderContent()
        }
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
    messages: props.messages.messages,
    allMessages: props.messageStore.conversations,
    showSpinner: (
      !props.messages.ready ||
      !props.extensionInfo.ready ||
      // !props.contactMatcher.ready ||
      !props.dateTimeIntl.ready
    ),
    isLoadingNextPage: props.messages.loading,
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
