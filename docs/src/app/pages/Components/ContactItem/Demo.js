import React from 'react';
// eslint-disable-next-line
import ContactItem from 'ringcentral-widgets/components/ContactItem';

const props = {};
props.contact = {
  id: '123',
  name: 'Kevin',
  extensionNumber: '1234',
  type: 'company',
  profileImageUrl: null,
};
props.getAvatarUrl = async () => null;
props.getPresence = async () => null;

/**
 * A example of `ContactItem`
 */
const ContactItemDemo = () => (
  <ContactItem
    {...props}
  />
);
export default ContactItemDemo;
