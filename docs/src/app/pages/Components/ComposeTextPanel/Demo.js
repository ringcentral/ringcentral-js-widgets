import React, {Component} from 'react';
// eslint-disable-next-line
import ComposeTextPanel from 'ringcentral-widget/components/ComposeTextPanel';
import styles from './styles.scss';


/**
 * A example of `ComposeTextPanel`
 */
class ComposeTextPanelDemo extends Component {
  constructor(props) {
    super(props);
    this.state={
      typingToNumber: '',
      messageText: '',
      toNumbers: [],
      senderNumber: '',
    }
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
    let toNumbers = this.state.toNumbers;
    this.setState({
      toNumbers: toNumbers.filter((toNumber) => {
        return toNumber.phoneNumber !== phoneNumber
      })
    });
  }
  addToNumber = (toNumber) => {
    const toNumbers = this.state.toNumbers;
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
      senderNumber
    });
  }
  render() {
    const searchContactList = [{
      name: 'test string',
      entityType: 'Account',
      phoneType: 'Business Phone',
      phoneNumber: '7654321'
    },{
      name: 'test string2',
      entityType: 'Account',
      phoneType: 'Business Phone',
      phoneNumber: '7112234'
    }];
    return (
      <ComposeTextPanel
        currentLocale={'en-US'}
        className={styles.root}
        send={() => null}
        senderNumbers={['7654321']}
        sendButtonDisabled={false}
        formatPhone={(phoneNumber) => phoneNumber}
        formatContactPhone={(phoneNumber) => phoneNumber}
        searchContact={(value) => value}
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
    );
  }
}

export default ComposeTextPanelDemo;
