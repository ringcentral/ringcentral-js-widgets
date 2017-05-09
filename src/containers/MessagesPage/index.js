import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// import formatNumber from 'ringcentral-integration/lib/formatNumber';
// import { getRecipients } from 'ringcentral-integration/lib/messageHelper';
import Header from '../../components/Header';
import SpinnerOverlay from '../../components/SpinnerOverlay';
// import Panel from '../../components/Panel';

import MessageList from '../../components/MessageList';
// import SearchInput from '../../components/SearchInput';

import styles from './styles.scss';
import i18n from './i18n';

// class MessagesPanel extends Component {
//   constructor(props) {
//     super(props);
//     this.onSearchChange = (e) => {
//       const value = e.currentTarget.value;
//       this.props.updateSearchingString(value);
//     };

//     this.searchMessage = this.searchMessage.bind(this);
//     this.getMessageRecipientNames = this.getMessageRecipientNames.bind(this);
//   }

//   getMessageRecipientNames(message) {
//     let recipients = message.recipients;
//     if (!recipients || recipients.length === 0) {
//       recipients = this.props.getRecipientsList(message);
//     }
//     return recipients.map((recipient) => {
//       const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
//       if (phoneNumber && this.props.matcherContactName) {
//         if (recipient.matchedNames && recipient.matchedNames[0]) {
//           return recipient.matchedNames[0];
//         }
//         const matcherName = this.props.matcherContactName(phoneNumber);
//         if (matcherName) {
//           return matcherName;
//         }
//         return this.props.formatPhone(phoneNumber);
//       }
//       if (recipient.name) {
//         return recipient.name;
//       }
//       return this.props.formatPhone(phoneNumber);
//     });
//   }

//   isMatchRecipients(message, searchText, searchNumber) {
//     const recipients = this.props.getRecipientsList(message);
//     for (const recipient of recipients) {
//       const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
//       let recipientName = null;
//       if (phoneNumber) {
//         if (searchNumber && searchNumber.length > 0 && phoneNumber.indexOf(searchNumber) >= 0) {
//           return true;
//         }
//         if (this.props.matcherContactName) {
//           const matcherName = this.props.matcherContactName(phoneNumber);
//           if (matcherName) {
//             recipientName = matcherName;
//           } else {
//             recipientName = phoneNumber;
//           }
//         }
//       }
//       if (!recipientName && recipient.name) {
//         recipientName = recipient.name;
//       }
//       if (recipientName && recipientName.toLowerCase().indexOf(searchText) >= 0) {
//         return true;
//       }
//     }
//     return false;
//   }

//   searchMessage() {
//     const searchString = this.props.searchingString;
//     if (searchString.length < 3) {
//       this.props.updateSearchResults([]);
//       return;
//     }
//     const searchText = searchString.toLowerCase().trim();
//     let searchNumber = searchString.replace(/[^\d]/g, '');
//     if (searchString.length !== searchNumber.length && searchNumber.length < 2) {
//       searchNumber = null;
//     }
//     const searchTextResults = this.props.searchMessagesText(searchText).reverse();
//     const searchContactresults = this.props.allMessages.filter(message =>
//       this.isMatchRecipients(message, searchText, searchNumber)
//     ).reverse();
//     const results = [];
//     const searchMap = {};
//     const addSearchResultToResult = (message) => {
//       if (searchMap[message.conversationId]) {
//         return;
//       }
//       searchMap[message.conversationId] = 1;
//       results.push(message);
//     };
//     searchContactresults.forEach(addSearchResultToResult);
//     searchTextResults.forEach(addSearchResultToResult);
//     this.props.updateSearchResults(results);
//   }

//   renderMessageList() {
//     if (this.props.searchingString.length >= 3) {
//       return (
//         <MessageList
//           messages={this.props.searchingResults}
//           loadNextPageMessages={() => null}
//           loading={false}
//           placeholder={i18n.getString('noSearchResults')}
//           formatDateTime={this.props.formatDateTime}
//           getMessageRecipientNames={this.getMessageRecipientNames}
//         />
//       );
//     }
//     return (
//       <MessageList
//         messages={this.props.messages}
//         loadNextPageMessages={this.props.loadNextPageMessages}
//         placeholder={i18n.getString('noMessages')}
//         formatDateTime={this.props.formatDateTime}
//         getMessageRecipientNames={this.getMessageRecipientNames}
//       />
//     );
//   }

//   render() {
//     const showSpinner = this.props.showSpinner;
//     if (showSpinner) {
//       return (
//         <div className={styles.root}>
//           <SpinnerOverlay />
//         </div>
//       );
//     }
//     return (
//       <div className={styles.content}>
//         <SearchInput
//           value={this.props.searchingString}
//           onChange={this.onSearchChange}
//           onKeyUp={this.searchMessage}
//           maxLength={30}
//           placeholder={i18n.getString('search')}
//         />
//         <Panel>
//           {this.renderMessageList()}
//         </Panel>
//       </div>
//     );
//   }
// }

// MessagesPanel.propTypes = {
//   loadNextPageMessages: PropTypes.func.isRequired,
//   updateSearchingString: PropTypes.func.isRequired,
//   showSpinner: PropTypes.bool.isRequired,
//   searchingString: PropTypes.string.isRequired,
//   formatDateTime: PropTypes.func.isRequired,
//   formatPhone: PropTypes.func.isRequired,
//   getRecipientsList: PropTypes.func.isRequired,
//   searchMessagesText: PropTypes.func.isRequired,
//   updateSearchResults: PropTypes.func.isRequired,
//   matcherContactName: PropTypes.func,
// };

// MessagesPanel.defaultProps = {
//   matcherContactName: null,
// };


function MessagesPanel({
  currentLocale,
  showSpinner,
  showTitle,
  ...props,
}) {
  const header = showTitle ?
    (<Header>{i18n.getString('title', currentLocale)}</Header>) :
    null;
  const content = showSpinner ?
    <SpinnerOverlay /> :
    (
      <MessageList
        className={classnames(
          styles.content,
          showTitle && styles.contentWithHeader
        )}
        {...props}
        currentLocale={currentLocale}
      />
    );
  return (
    <div className={styles.root}>
      {header}
      {content}
    </div>
  );
}

function mapToProps(_, {
  locale,
  messages,
  contactMatcher,
  dateTimeFormat,
  regionSettings,
  rolesAndPermissions,
  call,
  conversationLogger,
  connectivityMonitor,
  rateLimiter,
  showTitle = false,
  detailed
}) {
  return ({
    showTitle,
    currentLocale: locale.currentLocale,
    conversations: messages.filteredConversations,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: (
      !connectivityMonitor.connectivity ||
      rateLimiter.throttling
    ),
    disableClickToDial: !(call && call.isIdle),
    outboundSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.OutboundSMS
    ),
    internalSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.InternalSMS
    ),
    loggingMap: (conversationLogger && conversationLogger.loggingMap),
    showSpinner: !(
      locale.ready &&
      messages.ready &&
      (!contactMatcher || contactMatcher.ready) &&
      dateTimeFormat.ready &&
      regionSettings.ready &&
      rolesAndPermissions.ready &&
      connectivityMonitor.ready &&
      rateLimiter.ready &&
      (!rolesAndPermissions || rolesAndPermissions.ready) &&
      (!call || call.ready) &&
      (!conversationLogger || conversationLogger.ready)
    ),
    searchInput: messages.searchInput,
  });
}

function mapToFunctions(_, {
  dateTimeFormat,
  dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
  messages,
  conversationLogger,
  contactMatcher,
  call,
  router,
  dialerRoute = '/',
  onViewContact,
  onCreateContact,
  onLogConversation,
  isLoggedContact,
  conversationDetailRoute = '/conversations/{conversationId}',
}) {
  return {
    dateTimeFormatter,
    onViewContact,
    onCreateContact: onCreateContact ?
      async ({ phoneNumber, name, entityType }) => {
        const hasMatchNumber = await contactMatcher.hasMatchNumber({
          phoneNumber,
          ignoreCache: true
        });
        // console.debug('confirm hasMatchNumber:', hasMatchNumber);
        if (!hasMatchNumber) {
          await onCreateContact({ phoneNumber, name, entityType });
          await contactMatcher.forceMatchNumber({ phoneNumber });
        }
      } :
      undefined,
    onClickToDial: call ?
      (phoneNumber) => {
        if (call.isIdle) {
          router.history.push(dialerRoute);
          call.onToNumberChange(phoneNumber);
          call.onCall();
        }
      } :
      undefined,
    isLoggedContact,
    onLogConversation: onLogConversation ||
    (conversationLogger && (async ({ redirect = true, ...options }) => {
      await conversationLogger.logConversation({
        ...options,
        redirect,
      });
    })),
    onSearchInputChange: (e) => {
      messages.updateSearchInput(e.currentTarget.value);
    },
    showConversationDetail(conversationId) {
      router.history.push(
        conversationDetailRoute.replace('{conversationId}', conversationId)
      );
    },
  };
}

export default connect(
  mapToProps,
  mapToFunctions,
)(MessagesPanel);
