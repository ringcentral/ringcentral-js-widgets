import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
import { includes } from 'ramda';
import React from 'react';

import FormattedMessage from '../../FormattedMessage';

import i18n from './i18n';

type AudioSettingsAlertProps = {
  application: string;
  currentLocale: string;
  message: {
    message: string;
  };
};
const AudioSettingsAlert: React.FC<AudioSettingsAlertProps> = ({
  application,
  currentLocale,
  message,
}) => {
  if (message.message === audioSettingsErrors.checkMediaPermission) {
    return null;
  }

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
  includes(message, [
    audioSettingsErrors.userMediaPermission,
    audioSettingsErrors.ringtoneSizeOverLimit,
    audioSettingsErrors.duplicateRingtone,
    audioSettingsErrors.uploadRingtoneFailed,
    audioSettingsErrors.deleteRingtoneFailed,
    audioSettingsErrors.checkMediaPermission,
  ]);
export default AudioSettingsAlert;
