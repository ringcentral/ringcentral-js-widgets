import React from 'react';
import PropTypes from 'prop-types';
import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

function CallingSettingsAlert({
  message: { message },
  currentLocale,
  brand,
  onCallingSettingsLinkClick,
 }) {
  switch (message) {
    case callingSettingsMessages.saveSuccess:
    case callingSettingsMessages.saveSuccessWithSoftphone:
    case callingSettingsMessages.firstLogin:
    case callingSettingsMessages.firstLoginOther:
    case callingSettingsMessages.webphonePermissionRemoved:
    case callingSettingsMessages.emergencyCallingNotAvailable:
      return (
        <FormattedMessage
          message={i18n.getString(message)}
          values={{ brand }}
        />
      );

    case callingSettingsMessages.permissionChanged:
    case callingSettingsMessages.phoneNumberChanged: {
      const link = onCallingSettingsLinkClick ?
        (
          <a
            onClick={(e) => {
              e.preventDefault();
              onCallingSettingsLinkClick();
            }}>
            {i18n.getString('link', currentLocale)}
          </a>
        ) :
        i18n.getString('link', currentLocale);
      return (
        <FormattedMessage
          message={i18n.getString(message, currentLocale)}
          values={{ link }}
        />
      );
    }
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
  onCallingSettingsLinkClick: PropTypes.func,
};
CallingSettingsAlert.defaultProps = {
  onCallingSettingsLinkClick: undefined,
};
CallingSettingsAlert.handleMessage = ({ message }) => (
  message === callingSettingsMessages.saveSuccess ||
  message === callingSettingsMessages.saveSuccessWithSoftphone ||
  message === callingSettingsMessages.firstLogin ||
  message === callingSettingsMessages.firstLoginOther ||
  message === callingSettingsMessages.permissionChanged ||
  message === callingSettingsMessages.webphonePermissionRemoved ||
  message === callingSettingsMessages.phoneNumberChanged
);

export default CallingSettingsAlert;
