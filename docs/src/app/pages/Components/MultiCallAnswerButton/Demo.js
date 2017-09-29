import React from 'react';
// eslint-disable-next-line
import MultiCallAnswerButton from 'ringcentral-widget/components/MultiCallAnswerButton';

const props = {};
props.title = 'Answer and End';
props.onClick = () => alert('clicked');

/**
 * A example of `MultiCallAnswerButton`
 */
const MultiCallAnswerButtonDemo = () => (
  <div style={{
    position: 'relative',
    height: '200px',
    width: '200px',
  }}>
    <MultiCallAnswerButton
      {...props}
    />
  </div>
);
export default MultiCallAnswerButtonDemo;
