import React, { Component } from 'react';
// eslint-disable-next-line
import ComposeTextPanel from 'ringcentral-widgets/components/ComposeTextPanel';
import styles from './styles.scss';


/**
 * A example of `ComposeTextPanel`
 */
class ComposeTextPanelDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typingToNumber: '',
      messageText: '',
      toNumbers: [],
      senderNumber: '7654321',
    };
  }
  updateMessageText = (messageText) => {
    this.setState({
      messageText
    });
  }
  updateTypingToNumber = (typingToNumber) => {
    this.setState({
      typingToNumber
    });
  }
  removeToNumber = ({ phoneNumber }) => {
    const { toNumbers } = this.state;
    this.setState({
      toNumbers: toNumbers.filter(toNumber => toNumber.phoneNumber !== phoneNumber)
    });
  }
  addToNumber = (toNumber) => {
    const { toNumbers } = this.state;
    toNumbers.push(toNumber);
    this.setState({
      toNumbers
    });
  }
  cleanTypingToNumber = () => {
    this.setState({
      typingToNumber: ''
    });
  }
  updateSenderNumber = (senderNumber) => {
    this.setState({
      senderNumber: senderNumber.phoneNumber,
    });
  }
  render() {
    const searchContactList = [{
      name: 'test string',
      entityType: 'Account',
      phoneType: 'Business Phone',
      phoneNumber: '7654321'
    }, {
      name: 'test string2',
      entityType: 'Account',
      phoneType: 'Business Phone',
      phoneNumber: '7112234'
    }];
    return (
      <div style={{
        position: 'relative',
        height: '500px',
        width: '300px',
        border: '1px solid #f3f3f3',
      }}>
        <ComposeTextPanel
          currentLocale="en-US"
          className={styles.root}
          send={() => null}
          senderNumbers={[{
            phoneNumber: '7654321',
            usageType: 'Main',
          }]}
          sendButtonDisabled={false}
          formatPhone={phoneNumber => phoneNumber}
          formatContactPhone={phoneNumber => phoneNumber}
          searchContact={value => value}
          searchContactList={searchContactList}
          updateSenderNumber={this.updateSenderNumber}
          senderNumber={this.state.senderNumber}
          updateTypingToNumber={this.updateTypingToNumber}
          cleanTypingToNumber={this.cleanTypingToNumber}
          addToNumber={this.addToNumber}
          removeToNumber={this.removeToNumber}
          updateMessageText={this.updateMessageText}
          toNumbers={this.state.toNumbers}
          typingToNumber={this.state.typingToNumber}
          messageText={this.state.messageText}
        />
      </div>
    );
  }
}

export default ComposeTextPanelDemo;
