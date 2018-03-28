import React from 'react';
// eslint-disable-next-line
import ConferenceCommands from 'ringcentral-widgets/components/ConferenceCommands';

/**
 * A example of `ConferenceCommands`
 */
const ConferenceCommandsDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <ConferenceCommands
      currentLocale="en-US"
      onBack={() => null}
    />
  </div>
);
export default ConferenceCommandsDemo;
