import React from 'react';
// eslint-disable-next-line
import ContactItem from 'ringcentral-widget/components/ContactItem';

const props = {};
props.contact = {
  id: '123',
  name: 'Kevin',
  phoneNumber: '1234',
  type: 'company',
  hasProfileImage: false,
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
