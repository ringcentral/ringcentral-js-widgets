import React from 'react';
import PropTypes from 'prop-types';
import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
import i18n from './i18n';

export default function WebphoneAlert(props) {
  const message = props.message.message;
  let view = (<span>{i18n.getString(message, props.currentLocale)}</span>);
  // Handle call record error
  if (message === webphoneErrors.recordError) {
    const errorCode = props.message.payload.errorCode;
    view = (
      <span>
        {i18n.getString(message, props.currentLocale)}
        {
          errorCode ? `${i18n.getString('errorCode', props.currentLocale)} ${errorCode}` : null
        }
      </span>
    );
  }
  return view;
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
  (message === webphoneErrors.notOutboundCallWithoutDL) ||
  (message === webphoneErrors.toVoiceMailError) ||
  (message === webphoneErrors.connected) ||
  (message === webphoneErrors.muteError) ||
  (message === webphoneErrors.holdError) ||
  (message === webphoneErrors.flipError) ||
  (message === webphoneErrors.recordError)
);
