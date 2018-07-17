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
    extensionNumber: '1234',
    type: 'company',
    profileImageUrl: null,
  }, {
    id: '1234',
    name: 'Kevin Two',
    extensionNumber: '12345',
    type: 'company',
    profileImageUrl: null,
  }],
}, {
  id: 'T',
  caption: 'T',
  contacts: [{
    id: '1233',
    name: 'Tyler One',
    extensionNumber: '1233',
    type: 'company',
    profileImageUrl: null,
  }],
}];
props.getAvatarUrl = async () => null;
props.getPresence = async () => null;
props.width = 300;
props.height = 500;

/**
 * A example of `ContactList`
 */
const ContactListDemo = () => (
  <ContactList
    {...props}
  />
);
export default ContactListDemo;
