import React from 'react';
import PropTypes from 'prop-types';
import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function WebphoneAlert(props) {
  const { message } = props.message;
  let view = (<span>{i18n.getString(message, props.currentLocale)}</span>);
  // Handle call record error
  if (message === webphoneErrors.recordError) {
    const { errorCode } = props.message.payload;
    view = (
      <FormattedMessage
        message={i18n.getString(message, props.currentLocale)}
        values={{ errorCode }}
      />
    );
  }
  if (
    message === webphoneErrors.requestTimeout ||
    message === webphoneErrors.serverTimeout ||
    message === webphoneErrors.internalServerError ||
    message === webphoneErrors.sipProvisionError ||
    message === webphoneErrors.webphoneForbidden ||
    message === webphoneErrors.unknownError
  ) {
    const { statusCode } = props.message.payload;
    // sipProvisionError does not have statusCode
    const stub = statusCode ? (
      <FormattedMessage
        message={i18n.getString('errorCode', props.currentLocale)}
        values={{ errorCode: statusCode }}
      />
    ) : i18n.getString('occurs', props.currentLocale);
    view = (
      <FormattedMessage
        message={i18n.getString('webphoneUnavailable', props.currentLocale)}
        values={{ error: stub, brandName: props.brand.name }}
      />
    );
  }
  return view;
}

WebphoneAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  brand: PropTypes.object.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

WebphoneAlert.handleMessage = ({ message }) => (
  (message === webphoneErrors.browserNotSupported) ||
  (message === webphoneErrors.webphoneCountOverLimit) ||
  (message === webphoneErrors.webphoneForbidden) ||
  (message === webphoneErrors.notOutboundCallWithoutDL) ||
  (message === webphoneErrors.toVoiceMailError) ||
  (message === webphoneErrors.connected) ||
  (message === webphoneErrors.muteError) ||
  (message === webphoneErrors.holdError) ||
  (message === webphoneErrors.flipError) ||
  (message === webphoneErrors.recordError) ||
  (message === webphoneErrors.recordDisabled) ||
  (message === webphoneErrors.transferError) ||
  (message === webphoneErrors.requestTimeout) ||
  (message === webphoneErrors.serverTimeout) ||
  (message === webphoneErrors.internalServerError) ||
  (message === webphoneErrors.sipProvisionError) ||
  (message === webphoneErrors.unknownError)
);
