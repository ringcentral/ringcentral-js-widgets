import React from 'react';
// eslint-disable-next-line
import RecipientsInput from 'ringcentral-widgets/components/RecipientsInput';

const props = {};
props.searchContactList = [{
  name: 'Test Name',
  entityType: 'Contact',
  phoneType: 'extension',
  phoneNumber: '101'
}];
props.recipients = [{
  phoneNumber: '+1234567890'
}];
props.value = 'test';
props.onChange = () => null;
props.onClean = () => null;
props.addToRecipients = () => null;
props.removeFromRecipients = () => null;
props.formatContactPhone = () => null;
props.label = 'To:';
props.currentLocale = 'en-US';

/**
 * A example of `RecipientsInput`
 */
const RecipientsInputDemo = () => (
  <RecipientsInput
    {...props}
  />
);
export default RecipientsInputDemo;
