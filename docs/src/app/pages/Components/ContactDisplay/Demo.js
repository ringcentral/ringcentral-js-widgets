import React, { Component } from 'react';
// eslint-disable-next-line
import ContactDisplay from 'ringcentral-widget/components/ContactDisplay';

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
    }
  }
  onSelectContact = (selected) => {
    const selectedIdx = contactMatches.findIndex((contact) => {
      return contact === selected;
    });
    this.setState({
      selected: selectedIdx
    });
  }
  render() {
    return (
      <ContactDisplay
        currentLocale='en-US'
        areaCode='test string'
        countryCode='test string'
        contactMatches={contactMatches}
        disabled={false}
        isLogging={false}
        selected={this.state.selected}
        onSelectContact={this.onSelectContact}
      />
    )
  }
}
export default ContactDisplayDemo;
