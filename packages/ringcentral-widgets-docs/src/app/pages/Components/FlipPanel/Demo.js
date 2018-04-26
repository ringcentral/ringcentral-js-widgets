import React from 'react';
// eslint-disable-next-line
import FlipPanel from 'ringcentral-widgets/components/FlipPanel';

const props = {};
props.isOnFlip = false;
props.flipNumbers = [];
props.currentLocale = 'en-US';
props.formatPhone = () => null;
props.hideFlipPanel = () => null;
props.onFlip = () => null;
props.complete = () => null;

/**
 * A example of `FlipPanel`
 */
const FlipPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <FlipPanel
      {...props}
    />
  </div>
);
export default FlipPanelDemo;
