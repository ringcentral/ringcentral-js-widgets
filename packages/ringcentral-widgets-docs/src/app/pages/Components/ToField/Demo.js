import React from 'react';
// eslint-disable-next-line
import ToField from 'ringcentral-widgets/components/ToField';

const props = {};
props.label = 'To:';
props.recipients = [];
props.searchResults = [{
  name: 'Test',
  entityType: 'Contact',
  phoneNumber: '101',
  phoneType: 'extension',
}];
props.value = 'test';
props.onChange = () => null;
props.onClean = () => null;
props.addToRecipients = () => null;
props.removeFromRecipients = () => null;
props.currentLocale = 'en-US';
props.autoFocus = true;

/**
 * A example of `ToField`
 */
const ToFieldDemo = () => (
  <ToField
    {...props}
  />
);
export default ToFieldDemo;
