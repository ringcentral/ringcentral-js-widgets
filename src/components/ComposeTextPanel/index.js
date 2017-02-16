import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import rcFont from '../../assets/RcFont/RcFont.scss';
import i18n from './i18n';
import styles from './styles.scss';
import RecipientsInput from '../RecipientsInput';

function SenderSelectInput(props) {
  return (
    <select
      className={props.className}
      value={props.value}
      onChange={props.onChange}>
      {
        props.options.map(number => (
          <option key={number} value={number}>
            {props.formatPhone(number)}
          </option>
        ))
      }
    </select>
  );
}

SenderSelectInput.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

class ComposeTextPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSenderSetting: true,
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
      this.props.searchContact(e.currentTarget.value);
    };

    this.addToReceivers = (receiver) => {
      this.props.addToNumber(receiver);
      this.props.cleanTypingToNumber();
    };

    this.removeFromReceivers = (phoneNumber) => {
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

    this.toggleShowSenderSetting = () => {
      this.setState(prevState => (
        { showSenderSetting: !prevState.showSenderSetting }
      ));
    };
  }

  render() {
    let senderFieldClasses = styles.messageSenderField;
    if (!this.state.showSenderSetting) {
      senderFieldClasses = classnames(styles.messageSenderField, styles.hiddenField);
    }
    return (
      <div>
        <div className={styles.composeTextPanelHeader}>
          <h1>{i18n.getString('composeMessage')}</h1>
          <a href="#" className={styles.sendNumberSetting} onClick={this.toggleShowSenderSetting}>
            <span className={rcFont.icon_setting} />
          </a>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className={senderFieldClasses}>
            <label>{i18n.getString('sendMessageFrom')}</label>
            <div className={styles.valueInput}>
              <SenderSelectInput
                className={styles.select}
                value={this.props.senderNumber}
                onChange={this.onSenderChange}
                options={this.props.senderNumbers}
                formatPhone={this.props.formatPhone}
              />
            </div>
          </div>
          <div className={styles.messageReceiverField}>
            <label>{i18n.getString('to')}:</label>
            <div className={styles.rightPanel}>
              <RecipientsInput
                value={this.props.typingToNumber}
                onChange={this.onReceiverChange}
                onClean={this.cleanReceiverValue}
                placeholder={i18n.getString('enterNameOrNumber')}
                receivers={this.props.toNumbers}
                addToReceivers={this.addToReceivers}
                removeFromReceivers={this.removeFromReceivers}
                searchContacts={this.props.searchContacts}
                onKeyUp={this.onReceiverInputKeyDown}
                formatPhone={this.props.formatPhone}
              />
            </div>
          </div>
          <div className={styles.messageTextField}>
            <textarea
              placeholder={i18n.getString('typeAnyToSend')}
              value={this.props.messageText}
              maxLength="1000"
              required
              onChange={this.onTextChange}
            />
          </div>
          <input
            type="submit"
            value={i18n.getString('send')}
            className={styles.submitButton}
            disabled={this.props.sendButtonDisabled}
          />
        </form>
      </div>
    );
  }
}

ComposeTextPanel.propTypes = {
  send: PropTypes.func.isRequired,
  senderNumbers: PropTypes.array.isRequired,
  sendButtonDisabled: PropTypes.bool.isRequired,
  formatPhone: PropTypes.func.isRequired,
  searchContact: PropTypes.func.isRequired,
  searchContacts: PropTypes.array.isRequired,
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
  toNumbers: PropTypes.array,
};

export default ComposeTextPanel;
