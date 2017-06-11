import React from 'react';
import PropTypes from 'prop-types';
import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
import i18n from './i18n';

export default function WebphoneAlert(props) {
  const message = props.message.message;
  return (
    <span>{i18n.getString(message, props.currentLocale)}</span>
  );
}

WebphoneAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

WebphoneAlert.handleMessage = ({ message }) => (
  (message === webphoneErrors.browserNotSupported) ||
  (message === webphoneErrors.webphoneCountOverLimit) ||
  (message === webphoneErrors.notOutboundCallWithoutDL)
);
