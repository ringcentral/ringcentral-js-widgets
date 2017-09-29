import React from 'react';
// eslint-disable-next-line
import FormattedMessage from 'ringcentral-widget/components/FormattedMessage';

const props = {};
props.message = 'test string: {param}';
props.values = {
  param: 'params',
};
/**
 * A example of `FormattedMessage`
 */
const FormattedMessageDemo = () => (
  <FormattedMessage
    {...props}
  />
);
export default FormattedMessageDemo;
