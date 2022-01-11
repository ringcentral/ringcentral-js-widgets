import React from 'react';

import audioSettingsErrors from '@ringcentral-integration/commons/modules/AudioSettings/audioSettingsErrors';

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
AudioSettingsAlert.handleMessage = ({ message }) =>
  message === audioSettingsErrors.userMediaPermission;
export default AudioSettingsAlert;
