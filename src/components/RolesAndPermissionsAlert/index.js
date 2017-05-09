import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import permissionsMessages from
  'ringcentral-integration/modules/RolesAndPermissions/permissionsMessages';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function RolesAndPermissionsAlert({
  message: {
    message
  },
  currentLocale,
  brand,
  application,
}) {
  let msg;
  switch (message) {
    case permissionsMessages.invalidTier:
      msg = (
        <FormattedMessage
          message={i18n.getString(message, currentLocale)}
          values={{ brand, application }} />
      );
      break;
    default:
      msg = i18n.getString(message, currentLocale);
      break;
  }
  return (
    <div>
      {msg}
    </div>
  );
}
RolesAndPermissionsAlert.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  brand: PropTypes.string.isRequired,
  application: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
};
RolesAndPermissionsAlert.handleMessage = ({ message }) => (
  message === permissionsMessages.invalidTier
);
