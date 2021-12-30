import React from 'react';

import { contains } from 'ramda';

import conferenceCallErrors from '@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors';

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
  contains(message, [
    conferenceCallErrors.bringInFailed,
    conferenceCallErrors.makeConferenceFailed,
    conferenceCallErrors.terminateConferenceFailed,
    conferenceCallErrors.removeFromConferenceFailed,
    conferenceCallErrors.callIsRecording,
  ]);
export default ConferenceAlert;
