import React from 'react';
// eslint-disable-next-line
import FlipPanel from 'ringcentral-widget/components/FlipPanel';

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
  <FlipPanel
    {...props}
  />
);
export default FlipPanelDemo;
