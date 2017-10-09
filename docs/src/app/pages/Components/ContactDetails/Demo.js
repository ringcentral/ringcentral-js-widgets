import React from 'react';
// eslint-disable-next-line
import ContactDetails from 'ringcentral-widget/components/ContactDetails';

const props = {};
props.currentLocale = 'en-US';
props.contactItem = {
  id: '1234',
  type: 'company',
  phoneNumber: '123456',
  phoneNumbers: [],
  firstName: 'Eson',
  lastName: 'Chen',
};
props.getAvatarUrl = async () => null;
props.getPresence = async () => null;

/**
 * A example of `ContactDetails`
 */
const ContactDetailsDemo = () => (
  <ContactDetails
    {...props}
  />
);
export default ContactDetailsDemo;
