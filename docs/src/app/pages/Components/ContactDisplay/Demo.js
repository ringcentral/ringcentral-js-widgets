import React from 'react';
// eslint-disable-next-line
import ContactDisplay from 'ringcentral-widget/components/ContactDisplay';

const props = {};
props.contactMatches = [];
props.selected = 0;
props.disabled = false;
props.isLogging = false;
props.areaCode = 'test string';
props.countryCode = 'test string';
props.currentLocale = 'en-US';

/**
 * A example of `ContactDisplay`
 */
const ContactDisplayDemo = () => (
  <ContactDisplay
    {...props}
  />
);
export default ContactDisplayDemo;
