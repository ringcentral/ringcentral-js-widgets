import React from 'react';
// eslint-disable-next-line
import AudioSettingsAlert from '@ringcentral-integration/widgets/components/AlertRenderer/AudioSettingsAlert';

const props = {};
props.application = 'test string';
props.currentLocale = 'en-US';
props.message = {
  message: 'test string',
};

/**
 * A example of `AudioSettingsAlert`
 */
const AudioSettingsAlertDemo = () => <AudioSettingsAlert {...props} />;
export default AudioSettingsAlertDemo;
