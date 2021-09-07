import React from 'react';
import PropTypes from 'prop-types';
import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';

export const PermissionsAlert = ({
  message: { message },
  currentLocale,
  brand,
  application,
}) => {
  let msg;
  switch (message) {
    case permissionsMessages.invalidTier:
      msg = (
        <FormattedMessage
          message={i18n.getString(message, currentLocale)}
          values={{ brand, application }}
        />
      );
      break;
    default:
      msg = i18n.getString(message, currentLocale);
      break;
  }
  return <div>{msg}</div>;
};
PermissionsAlert.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  brand: PropTypes.string.isRequired,
  application: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
};

PermissionsAlert.defaultProps = {
  application: undefined,
};

PermissionsAlert.handleMessage = ({ message }) =>
  message === permissionsMessages.invalidTier ||
  message === permissionsMessages.insufficientPrivilege;

export default PermissionsAlert;
