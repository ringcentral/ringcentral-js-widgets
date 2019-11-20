import React from 'react';
// eslint-disable-next-line
import FlipPanel from 'ringcentral-widgets/components/FlipPanel';

const props = {};
props.isOnFlip = false;
props.flipNumbers = [
  { id: '1222', phoneNumber: '+1234567890', label: 'Mobile' },
];
props.currentLocale = 'en-US';
props.formatPhone = (phoneNumber) => phoneNumber;
props.hideFlipPanel = () => null;
props.onFlip = () => null;
props.onComplete = () => null;
props.onBack = () => null;
props.onCallEnd = () => null;
props.sessionId = '123';

/**
 * A example of `FlipPanel`
 */
const FlipPanelDemo = () => (
  <div
    style={{
      position: 'relative',
      height: '500px',
      width: '300px',
      border: '1px solid #f3f3f3',
    }}
  >
    <FlipPanel {...props} />
  </div>
);
export default FlipPanelDemo;
