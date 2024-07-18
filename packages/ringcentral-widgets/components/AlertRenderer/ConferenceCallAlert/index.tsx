import { conferenceCallErrors } from '@ringcentral-integration/commons/modules/ConferenceCall';
import { includes } from 'ramda';
import React from 'react';

import i18n from './i18n';

type ConferenceCallAlertProps = {
  currentLocale: string;
  message: {
    message: string;
  };
};
const ConferenceCallAlert: React.FC<ConferenceCallAlertProps> = (props) => {
  const msg = i18n.getString(props.message.message, props.currentLocale);
  return <span>{msg}</span>;
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
ConferenceCallAlert.handleMessage = ({ message }: any) =>
  includes(message, [
    conferenceCallErrors.bringInFailed,
    conferenceCallErrors.makeConferenceFailed,
    conferenceCallErrors.terminateConferenceFailed,
    conferenceCallErrors.removeFromConferenceFailed,
    conferenceCallErrors.callIsRecording,
  ]);
export default ConferenceCallAlert;
