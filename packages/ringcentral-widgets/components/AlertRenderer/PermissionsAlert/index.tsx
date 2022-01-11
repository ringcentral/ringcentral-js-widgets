import React from 'react';

import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';

import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';

type PermissionsAlertProps = {
  message: {
    message: string;
  };
  brand: string;
  application?: string;
  currentLocale: string;
};
export const PermissionsAlert: React.SFC<PermissionsAlertProps> = ({
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
PermissionsAlert.defaultProps = {
  application: undefined,
};
PermissionsAlert.handleMessage = ({ message }) =>
  message === permissionsMessages.invalidTier ||
  message === permissionsMessages.insufficientPrivilege;
export default PermissionsAlert;
