import React from 'react';

import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';

import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';

type AudioSettingsAlertProps = {
  application: string;
  currentLocale: string;
  message: {
    message: string;
  };
};
const AudioSettingsAlert: React.SFC<AudioSettingsAlertProps> = ({
  application,
  currentLocale,
  message,
}) => {
  const view = (
    <FormattedMessage
      message={i18n.getString(message.message, currentLocale)}
      values={{ application }}
    />
  );
  return <span>{view}</span>;
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
AudioSettingsAlert.handleMessage = ({ message }: any) =>
  message === audioSettingsErrors.userMediaPermission;
export default AudioSettingsAlert;
