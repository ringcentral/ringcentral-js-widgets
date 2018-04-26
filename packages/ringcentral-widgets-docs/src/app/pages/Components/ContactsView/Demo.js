import React from 'react';
// eslint-disable-next-line
import ContactsView from 'ringcentral-widgets/components/ContactsView';

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
    profileImageUrl: null,
  }, {
    id: '1234',
    name: 'Kevin Two',
    phoneNumber: '12345',
    type: 'company',
    profileImageUrl: null,
  }],
}, {
  id: 'T',
  caption: 'T',
  contacts: [{
    id: '1233',
    name: 'Tyler One',
    phoneNumber: '1233',
    type: 'company',
    profileImageUrl: null,
  }],
}];
props.contactSourceNames = ['All', 'Company'];
props.getAvatarUrl = async () => null;
props.getPresence = async () => null;
props.showSpinner = false;
props.searchSource = 'All';
props.searchString = 'Kevin';

/**
 * A example of `ContactsView`
 */
const ContactsViewDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <ContactsView
      {...props}
    />
  </div>
);
export default ContactsViewDemo;
