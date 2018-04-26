import React, { Component } from 'react';
// eslint-disable-next-line
import ContactDisplay from 'ringcentral-widgets/components/ContactDisplay';

/**
 * A example of `ContactDisplay`
 */
const contactMatches = [{
  name: 'Harry Potter',
  entityType: 'Contact',
}, {
  name: 'Ron Weasley',
  entityType: 'Account',
}];

class ContactDisplayDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  onSelectContact = (selected) => {
    const selectedIdx = contactMatches.findIndex(contact => contact === selected);
    this.setState({
      selected: selectedIdx
    });
  }
  render() {
    return (
      <ContactDisplay
        currentLocale="en-US"
        areaCode="657"
        countryCode="1"
        contactMatches={contactMatches}
        disabled={false}
        isLogging={false}
        selected={this.state.selected}
        onSelectContact={this.onSelectContact}
      />
    );
  }
}
export default ContactDisplayDemo;
