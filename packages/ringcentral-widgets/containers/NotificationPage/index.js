import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import withPhone from '../../lib/withPhone';
import NotificationPanel from '../../components/NotificationPanel';

function mapToProps(
  _,
  {
    phone: {
      callLogSection,
      locale,
      activeCallControl,
      connectivityMonitor,
      rateLimiter,
    },
  },
) {
  const {
    showNotification = false,
    notificationIsExpand = false,
    currentNotificationIdentify,
    currentIdentify,
  } = callLogSection;

  return {
    logNotification: {
      showNotification,
      notificationIsExpand,
      call: null,
      logName: null,
    },
    currentLocale: locale.currentLocale,
    currentNotificationIdentify,
    currentIdentify,
    currentSession: activeCallControl.getActiveSession(
      currentNotificationIdentify,
    ),
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
  };
}

function mapToFunctions(_, { phone }) {
  const { callLogSection, regionSettings, activeCallControl } = phone;

  return {
    // notification
    formatPhone(phoneNumber) {
      return formatNumber({
        phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
      });
    },
    onSaveNotification: () => callLogSection.saveAndHandleNotification(),
    onDiscardNotification: () => callLogSection.discardAndHandleNotification(),
    onCloseNotification: () => callLogSection.closeLogNotification(),
    onExpandNotification: () => callLogSection.expandLogNotification(),
    onReject: activeCallControl.reject.bind(activeCallControl),
    onHangup: activeCallControl.hangUp.bind(activeCallControl),
  };
}

const NotificationPage = withPhone(
  connect(
    mapToProps,
    mapToFunctions,
  )(NotificationPanel),
);

const WrapperComponent = ({ currentNotificationIdentify }) => {
  if (!currentNotificationIdentify) return null;
  return <NotificationPage />;
};

WrapperComponent.propTypes = {
  currentNotificationIdentify: PropTypes.string,
};

WrapperComponent.defaultProps = {
  currentNotificationIdentify: '',
};

export default withPhone(
  connect((_, { phone: { callLogSection } }) => ({
    currentNotificationIdentify: callLogSection.currentNotificationIdentify,
  }))(WrapperComponent),
);
