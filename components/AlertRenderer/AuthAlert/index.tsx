import React from 'react';

import { contains } from 'ramda';

import authMessages from '@ringcentral-integration/commons/modules/Auth/authMessages';

import i18n from './i18n';

type AuthAlertProps = {
  currentLocale: string;
  message: {
    message: string;
  };
};
const AuthAlert: React.SFC<AuthAlertProps> = (props) => {
  const msg = i18n.getString(props.message.message, props.currentLocale);
  return <span>{msg}</span>;
};
AuthAlert.handleMessage = ({ message }) =>
  contains(message, [
    authMessages.accessDenied,
    authMessages.internalError,
    authMessages.sessionExpired,
    authMessages.beforeLogoutError,
    authMessages.logoutError,
  ]);
export default AuthAlert;
