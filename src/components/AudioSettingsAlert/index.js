import React from 'react';
import PropTypes from 'prop-types';
import audioSettingsErrors from 'ringcentral-integration/modules/AudioSettings/audioSettingsErrors';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function AudioSettingsAlert({ application, currentLocale, message }) {
  const view = (
    <FormattedMessage
      message={i18n.getString(message.message, currentLocale)}
      values={{ application }}
    />
  );
  return (
    <span>{view}</span>
  );
}

AudioSettingsAlert.propTypes = {
  application: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

AudioSettingsAlert.handleMessage = ({ message }) => (
  message === audioSettingsErrors.userMediaPermission
);
