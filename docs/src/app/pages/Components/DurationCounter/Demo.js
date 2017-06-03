import React from 'react';
// eslint-disable-next-line
import DurationCounter from 'ringcentral-widget/components/DurationCounter';

const props = {};
props.startTime = 0;

/**
 * A example of `DurationCounter`
 */
const DurationCounterDemo = () => (
  <DurationCounter
    {...props}
  />
);
export default DurationCounterDemo;
