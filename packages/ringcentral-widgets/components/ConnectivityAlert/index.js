import React from 'react';
import PropTypes from 'prop-types';
import connectivityTypes from
  'ringcentral-widgets/modules/ConnectivityManager/connectivityTypes';
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
  message === connectivityTypes.networkLoss ||
  message === connectivityTypes.offline ||
  message === connectivityTypes.serverUnavailable ||
  message === connectivityTypes.voipOnly ||
  message === connectivityTypes.survival ||
  message === connectivityTypes.webphoneUnavailable
);
