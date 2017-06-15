import React from 'react';
// eslint-disable-next-line
import ContactDropdownList from 'ringcentral-widget/components/ContactDropdownList';
import styles from './styles.scss';


const props = {};
props.visibility = false;
props.items = [{
  name: '{name}',
  entityType: '{entityType}',
  phoneType: '{phoneType}',
  phoneNumber: '{phoneNumber}'
}];
props.formatContactPhone = (value) => value;
props.addToRecipients = () => null;
props.setSelectedIndex = () => null;
props.selectedIndex = 0;
props.className = styles.root;

/**
 * A example of `ContactDropdownList`
 */
const ContactDropdownListDemo = () => (
  <ContactDropdownList
    {...props}
  />
);
export default ContactDropdownListDemo;
