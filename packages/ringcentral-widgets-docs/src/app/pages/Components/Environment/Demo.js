import React from 'react';
// eslint-disable-next-line
import { EnvironmentPanel } from '@ringcentral-integration/widgets/components/EnvironmentPanel';

const props = {};
props.server = 'test string';
props.recordingHost = 'test string';
props.enabled = false;
props.onSetData = () => null;
props.defaultHidden = false;

/**
 * A example of `Environment`
 */
const EnvironmentDemo = () => (
  <div
    style={{
      position: 'relative',
      height: '500px',
      width: '300px',
      border: '1px solid #f3f3f3',
    }}
  >
    <EnvironmentPanel {...props} />
  </div>
);
export default EnvironmentDemo;
