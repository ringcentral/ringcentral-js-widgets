import React from 'react';
// eslint-disable-next-line
import RecipientsInput from 'ringcentral-widget/components/RecipientsInput';

const props = {};
props.searchContactList = [{
  name: 'test string',
  entityType: 'test string',
  phoneType: 'test string',
  phoneNumber: 'test string'
}];
props.recipients = [{
  phoneNumber: 'test string'
}];
props.value = 'test string';
props.onChange = () => null;
props.onClean = () => null;
props.addToRecipients = () => null;
props.removeFromRecipients = () => null;
props.formatContactPhone = () => null;
props.label = 'To:';

/**
 * A example of `RecipientsInput`
 */
const RecipientsInputDemo = () => (
  <RecipientsInput
    {...props}
  />
);
export default RecipientsInputDemo;
