import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

function CallingSettingsAlert({ message: { message }, currentLocale, brand, callingSettingsUrl }) {
  switch (message) {
    case callingSettingsMessages.saveSuccess:
    case callingSettingsMessages.saveSuccessWithSoftphone:
    case callingSettingsMessages.firstLogin:
    case callingSettingsMessages.firstLoginOther:
      return (
        <FormattedMessage
          message={i18n.getString(message)}
          values={{ brand: brand }}
        />
      );

    case callingSettingsMessages.permissionChanged:
    case callingSettingsMessages.phoneNumberChanged:
      return (
        <FormattedMessage
          message={i18n.getString(message)}
          values={{ link: <Link to={callingSettingsUrl}>{i18n.getString('link')}</Link> }}
        />
      );
    default:
      return null;
  }
}
CallingSettingsAlert.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  callingSettingsUrl: PropTypes.string.isRequired,
};
CallingSettingsAlert.handleMessage = ({ message }) => {
  switch (message) {
    case callingSettingsMessages.saveSuccess:
    case callingSettingsMessages.saveSuccessWithSoftphone:
    case callingSettingsMessages.firstLogin:
    case callingSettingsMessages.firstLoginOther:
    case callingSettingsMessages.permissionChanged:
    case callingSettingsMessages.phoneNumberChanged:
      return true;
    default:
      return false;
  }
};

export default CallingSettingsAlert;
