import React from 'react';
// eslint-disable-next-line
import ContactDropdownList from 'ringcentral-widget/components/ContactDropdownList';

const props = {};
props.visibility = false;
props.items = [{
  name: 'test string',
  entityType: 'test string',
  phoneType: 'test string',
  phoneNumber: 'test string'
}];
props.formatContactPhone = () => null;
props.addToRecipients = () => null;
props.setSelectedIndex = () => null;
props.selectedIndex = 0;

/**
 * A example of `ContactDropdownList`
 */
const ContactDropdownListDemo = () => (
  <ContactDropdownList
    {...props}
  />
);
export default ContactDropdownListDemo;
