import React from 'react';
// eslint-disable-next-line
import SlideoutBar from 'ringcentral-widgets/components/SlideoutBar';

const props = {};
props.offset = 0;
props.slideout = false;

/**
 * A example of `SlideoutBar`
 */
const SlideoutBarDemo = () => (
  <SlideoutBar
    {...props}
  />
);
export default SlideoutBarDemo;
