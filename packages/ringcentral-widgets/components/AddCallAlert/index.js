import React from 'react';
import recordStatus from 'ringcentral-integration/modules/Webphone/recordStatus';
import PropTypes from 'prop-types';
import i18n from './i18n';

export default function AddCallAlert({
  currentLocale,
  message: {
    message,
  },
}) {
  return (<span>{i18n.getString(message, currentLocale)}</span>);
}
AddCallAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};
AddCallAlert.handleMessage = ({ message }) => (
  message !== recordStatus.idle
);
