import React, { PropTypes, Component } from 'react';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import i18n from './i18n';
import styles from './styles.scss';
import RecipientsInput from '../RecipientsInput';
import Select from '../Select';

class ComposeTextPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: this.props.senderNumbers.length === 0
    };

    this.onSenderChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateSenderNumber(value);
    };

    this.onReceiverChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateTypingToNumber(value);
    };

    this.cleanReceiverValue = () => {
      this.props.cleanTypingToNumber();
    };

    this.onReceiverInputKeyDown = (e) => {
      if (e.key === ',' || e.key === ';' || e.key === 'Enter') {
        e.preventDefault();
        if (this.props.typingToNumber.length === 0) {
          return;
        }
        this.props.addToNumber({
          name: this.props.formatPhone(this.props.typingToNumber),
          phoneNumber: this.props.typingToNumber,
        });
        this.props.cleanTypingToNumber();
      }
    };

    this.onReceiverInputKeyUp = (e) => {
      this.props.searchContact(e.currentTarget.value);
    };

    this.addToRecipients = (receiver) => {
      this.props.addToNumber(receiver);
      this.props.cleanTypingToNumber();
    };

    this.removeFromRecipients = (phoneNumber) => {
      this.props.removeToNumber({ phoneNumber });
    };

    this.onTextChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateMessageText(value);
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      this.props.send();
      console.debug('send message ...');
    };
    this.onDismissAlert = () => {
      this.setState({
        showAlert: false
      });
    };
  }
  render() {
    const AlertDiv = this.state.showAlert ? (
      <div className={styles.root}>
        <div className={styles.alertHolder}>
          <div className={styles.alert}>
            <span>{i18n.getString('noSMSSenderNumber', this.props.currentLocale)}</span>
            <a
              href="#close-message"
              onClick={this.onDismissAlert}
              className={styles.dismiss} >
              <i className={dynamicsFont.close} />
            </a>
          </div>
        </div>
      </div>
    ) : '';
    return (
      <div className={styles.root}>
        {AlertDiv}
        <form onSubmit={this.handleSubmit}>
          <div className={styles.receiverField}>
            <label>{i18n.getString('to', this.props.currentLocale)}:</label>
            <div className={styles.rightPanel}>
              <RecipientsInput
                value={this.props.typingToNumber}
                onChange={this.onReceiverChange}
                onClean={this.cleanReceiverValue}
                placeholder={i18n.getString('enterNameOrNumber', this.props.currentLocale)}
                recipients={this.props.toNumbers}
                addToRecipients={this.addToRecipients}
                removeFromRecipients={this.removeFromRecipients}
                searchContactList={this.props.searchContactList}
                onKeyUp={this.onReceiverInputKeyUp}
                onKeyDown={this.onReceiverInputKeyDown}
                formatPhone={this.props.formatPhone}
              />
            </div>
          </div>
          <div className={styles.senderField}>
            <label>{i18n.getString('from', this.props.currentLocale)}:</label>
            <div className={styles.senderInput}>
              <Select
                className={styles.senderSelect}
                value={this.props.senderNumber}
                onChange={this.onSenderChange}
                options={this.props.senderNumbers}
                paddingLeft={0}
                valueFunction={option => option}
                renderFunction={this.props.formatPhone}
              />
            </div>
          </div>
          <div className={styles.buttomField}>
            <div className={styles.textField}>
              <textarea
                placeholder={i18n.getString('typeMessage', this.props.currentLocale)}
                value={this.props.messageText}
                maxLength="1000"
                onChange={this.onTextChange}
              />
            </div>
            <div className={styles.submitField}>
              <input
                type="submit"
                value={i18n.getString('send', this.props.currentLocale)}
                className={styles.submitButton}
                disabled={this.props.sendButtonDisabled}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ComposeTextPanel.propTypes = {
  send: PropTypes.func.isRequired,
  senderNumbers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  sendButtonDisabled: PropTypes.bool.isRequired,
  formatPhone: PropTypes.func.isRequired,
  searchContact: PropTypes.func.isRequired,
  searchContactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  currentLocale: PropTypes.string.isRequired,
  updateSenderNumber: PropTypes.func.isRequired,
  updateTypingToNumber: PropTypes.func.isRequired,
  cleanTypingToNumber: PropTypes.func.isRequired,
  addToNumber: PropTypes.func.isRequired,
  removeToNumber: PropTypes.func.isRequired,
  updateMessageText: PropTypes.func.isRequired,
  messageText: PropTypes.string,
  typingToNumber: PropTypes.string,
  senderNumber: PropTypes.string,
  toNumbers: React.PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

ComposeTextPanel.defaultProps = {
  messageText: '',
  typingToNumber: '',
  senderNumber: '',
};

export default ComposeTextPanel;
