import React, { PropTypes } from 'react';
import connectivityMonitorMessages from
  'ringcentral-integration/modules/ConnectivityMonitor/connectivityMonitorMessages';
import i18n from './i18n';

export default function ConnectivityAlert({
  message: {
    message,
  },
  currentLocale,
}) {
  return (
    <div>
      {i18n.getString(message, currentLocale)}
    </div>
  );
}

ConnectivityAlert.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
};

ConnectivityAlert.handleMessage = ({ message }) => (
  message === connectivityMonitorMessages.disconnected
);
