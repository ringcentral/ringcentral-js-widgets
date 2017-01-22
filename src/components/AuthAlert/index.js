import React, { PropTypes } from 'react';
import authMessages from 'ringcentral-integration/modules/Auth/authMessages';
import i18n from './i18n';

export default function AuthAlert(props) {
  const msg = i18n.getString(props.message.message, props.currentLocale);
  return (
    <span>{msg}</span>
  );
}

AuthAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

AuthAlert.handleMessage = ({ message }) => (
  message === authMessages.accessDenied ||
  message === authMessages.internalError ||
  message === authMessages.sessionExpired
);
