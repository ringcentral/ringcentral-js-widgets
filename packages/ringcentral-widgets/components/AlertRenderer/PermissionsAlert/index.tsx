import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
import React from 'react';

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
export const PermissionsAlert: React.FC<PermissionsAlertProps> = ({
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
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
PermissionsAlert.handleMessage = ({ message }: any) =>
  message === permissionsMessages.invalidTier ||
  message === permissionsMessages.insufficientPrivilege;
export default PermissionsAlert;
