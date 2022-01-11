import React from 'react';

import messages from '@ringcentral-integration/commons/modules/Conference/messages';

import i18n from './i18n';

type ConferenceAlertProps = {
  currentLocale: string;
  message: {
    message: string;
  };
};
const ConferenceAlert: React.SFC<ConferenceAlertProps> = (props) => {
  const msg = i18n.getString(props.message.message, props.currentLocale);
  return <span>{msg}</span>;
};
ConferenceAlert.handleMessage = ({ message }) =>
  message === messages.requireAdditionalNumbers ||
  message === messages.scheduledSuccess;
export default ConferenceAlert;
