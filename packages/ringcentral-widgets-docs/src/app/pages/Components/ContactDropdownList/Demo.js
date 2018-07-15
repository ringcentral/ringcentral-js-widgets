import React from 'react';
// eslint-disable-next-line
import ContactDropdownList from 'ringcentral-widgets/components/ContactDropdownList';
import styles from './styles.scss';


const props = {};
props.visibility = false;
props.items = [{
  name: 'Eric',
  entityType: 'RingCentral',
  phoneType: 'Mobile',
  phoneNumber: '+123456789'
}];
props.currentLocale = 'en-US';
props.formatContactPhone = value => value;
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
