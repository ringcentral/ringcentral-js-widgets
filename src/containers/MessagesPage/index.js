import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import SpinnerOverlay from '../../components/SpinnerOverlay';
import MessageList from '../../components/MessageList';
import withPhone from '../../lib/withPhone';
import styles from './styles.scss';
import i18n from './i18n';

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

MessagesPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool,
  showTitle: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
};
MessagesPanel.defaultProps = {
  showSpinner: false,
  showTitle: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
};

function mapToProps(_, {
  phone: {
    brand,
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
  },
  showTitle = false,
  enableContactFallback = false,
}) {
  return ({
    showTitle,
    enableContactFallback,
    brand: brand.fullName,
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
    autoLog: !!(conversationLogger && conversationLogger.autoLog),
  });
}

function mapToFunctions(_, {
  phone: {
    dateTimeFormat,
    messages,
    conversationLogger,
    contactMatcher,
    call,
    routerInteraction,
  },
  dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
  dialerRoute = '/dialer',
  onCreateContact,
  onLogConversation,
  isLoggedContact,
  onViewContact,
  conversationDetailRoute = '/conversations/{conversationId}',
}) {
  return {
    dateTimeFormatter,
    onViewContact: onViewContact || (({ contact }) => {
      const id = contact.id;
      const type = contact.type;
      routerInteraction.push(`/contacts/${type}/${id}?direct=true`);
    }),
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
        routerInteraction.push(dialerRoute);
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
      routerInteraction.push(
        conversationDetailRoute.replace('{conversationId}', conversationId)
      );
    },
  };
}
export default withPhone(connect(
  mapToProps,
  mapToFunctions,
)(MessagesPanel));
