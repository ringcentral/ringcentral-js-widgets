import React from 'react';
// eslint-disable-next-line
import FormattedMessage from 'ringcentral-widget/components/FormattedMessage';

const props = {};
props.message = 'test string';

/**
 * A example of `FormattedMessage`
 */
const FormattedMessageDemo = () => (
  <FormattedMessage
    {...props}
  />
);
export default FormattedMessageDemo;
