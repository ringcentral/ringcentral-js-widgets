import React from 'react';
// eslint-disable-next-line
import RecipientHeader from 'ringcentral-widget/components/RecipientHeader';

const props = {};
props.recipient = {};
props.currentLocale = 'en-US';
props.dropdownClassName = 'test string';

/**
 * A example of `RecipientHeader`
 */
const RecipientHeaderDemo = () => (
  <RecipientHeader
    {...props}
  />
);
export default RecipientHeaderDemo;
