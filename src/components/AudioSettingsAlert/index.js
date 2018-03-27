import React from 'react';
import PropTypes from 'prop-types';
import audioSettingsErrors from 'ringcentral-integration/modules/AudioSettings/audioSettingsErrors';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function AudioSettingsAlert({ brand, currentLocale, message }) {
  const view = (
    <FormattedMessage
      message={i18n.getString(message.message, currentLocale)}
      values={{ brandName: brand.name }}
    />
  );
  return (
    <span>{view}</span>
  );
}

AudioSettingsAlert.propTypes = {
  brand: PropTypes.object.isRequired,
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

AudioSettingsAlert.handleMessage = ({ message }) => (
  message === audioSettingsErrors.userMediaPermission
);
