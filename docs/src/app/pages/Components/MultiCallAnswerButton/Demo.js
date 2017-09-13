import React from 'react';
// eslint-disable-next-line
import MultiCallAnswerButton from 'ringcentral-widget/components/MultiCallAnswerButton';

const props = {};
props.title = 'test string';
props.onClick = () => alert('clicked');

/**
 * A example of `MultiCallAnswerButton`
 */
const MultiCallAnswerButtonDemo = () => (
  <MultiCallAnswerButton
    {...props}
  />
);
export default MultiCallAnswerButtonDemo;
