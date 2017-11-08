import React from 'react';
// eslint-disable-next-line
import ContactList from 'ringcentral-widgets/components/ContactList';

const props = {};
props.currentLocale = 'en-US';
props.contactGroups = [{
  id: 'K',
  caption: 'K',
  contacts: [{
    id: '123',
    name: 'Kevin One',
    phoneNumber: '1234',
    type: 'company',
    hasProfileImage: false,
  }, {
    id: '1234',
    name: 'Kevin Two',
    phoneNumber: '12345',
    type: 'company',
    hasProfileImage: false,
  }],
}, {
  id: 'T',
  caption: 'T',
  contacts: [{
    id: '1233',
    name: 'Tyler One',
    phoneNumber: '1233',
    type: 'company',
    hasProfileImage: false,
  }],
}];
props.getAvatarUrl = async () => null;
props.getPresence = async () => null;

/**
 * A example of `ContactList`
 */
const ContactListDemo = () => (
  <ContactList
    {...props}
  />
);
export default ContactListDemo;
