import React from 'react';
// eslint-disable-next-line
import Environment from 'ringcentral-widget/components/Environment';

const props = {};
props.server = 'test string';
props.recordingHost = 'test string';
props.enabled = false;
props.onSetData = () => null;

/**
 * A example of `Environment`
 */
const EnvironmentDemo = () => (
  <Environment
    {...props}
  />
);
export default EnvironmentDemo;
