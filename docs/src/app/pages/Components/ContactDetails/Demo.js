import React from 'react';
// eslint-disable-next-line
import ContactDetails from 'ringcentral-widgets/components/ContactDetails';

const props = {};
props.currentLocale = 'en-US';
props.contactItem = {
  id: '1234',
  type: 'company',
  extensionNumber: '123456',
  phoneNumbers: [
    {
      phoneNumber: '+123456789',
      phoneType: 'DirectPhone',
    },
  ],
  name: 'Eson Chen',
  profileImageUrl: null,
  emails: [
    'test@test.com'
  ],
};
props.getAvatarUrl = async () => null;
props.getPresence = async () => null;
props.formatNumber = p => p;
props.onClickToSMS = () => null;
props.onClickToDial = () => null;
props.onClickMailTo = () => null;

/**
 * A example of `ContactDetails`
 */
const ContactDetailsDemo = () => (
  <div style={{
    position: 'relative',
    height: '400px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <ContactDetails
      {...props}
    />
  </div>
);
export default ContactDetailsDemo;
