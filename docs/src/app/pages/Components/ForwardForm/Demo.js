import React from 'react';
// eslint-disable-next-line
import ForwardForm from 'ringcentral-widget/components/ForwardForm';

const props = {};
props.onCancel = () => null;
props.currentLocale = 'en-US';
props.forwardingNumbers = [];
props.formatPhone = () => null;
props.onForward = () => null;

/**
 * A example of `ForwardForm`
 */
const ForwardFormDemo = () => (
  <ForwardForm
    {...props}
  />
);
export default ForwardFormDemo;
