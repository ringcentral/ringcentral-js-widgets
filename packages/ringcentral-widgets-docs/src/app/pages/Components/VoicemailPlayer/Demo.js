import React from 'react';
// eslint-disable-next-line
import VoicemailPlayer from 'ringcentral-widgets/components/VoicemailPlayer';

const props = {};
props.uri = 'test string';
props.currentLocale = 'en-US';

/**
 * A example of `VoicemailPlayer`
 */
const VoicemailPlayerDemo = () => (
  <VoicemailPlayer
    {...props}
  />
);
export default VoicemailPlayerDemo;
