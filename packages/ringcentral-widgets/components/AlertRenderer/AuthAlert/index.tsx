import React from 'react';

import { includes } from 'ramda';

import { authMessages } from '@ringcentral-integration/commons/modules/Auth';

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
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
AuthAlert.handleMessage = ({ message }: any) =>
  includes(message, [
    authMessages.accessDenied,
    authMessages.internalError,
    authMessages.sessionExpired,
    authMessages.beforeLogoutError,
    authMessages.logoutError,
    authMessages.siteAccessForbidden,
  ]);
export default AuthAlert;
