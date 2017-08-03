import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import i18n from './i18n';
import styles from './styles.scss';
import RecipientsInput from '../RecipientsInput';
import Select from '../DropdownSelect';
import SpinnerOverlay from '../SpinnerOverlay';
import NoSenderAlert from './NoSenderAlert';


function SenderField(props) {
  return (
    <Select
      label={`${i18n.getString('from', props.currentLocale)}:`}
      className={styles.senderSelect}
      value={props.value}
      onChange={props.onChange}
      options={props.options}
      paddingLeft={0}
      renderValue={props.formatPhone}
      valueFunction={value => value}
      renderFunction={props.formatPhone}
    />
  );
}

SenderField.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};


class ComposeTextPanel extends Component {
  constructor(props) {
    super(props);

    this.onSenderChange = (value) => {
      this.props.updateSenderNumber(value);
    };

    this.onReceiverChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateTypingToNumber(value);
    };

    this.cleanReceiverValue = () => {
      this.props.cleanTypingToNumber();
    };

    this.onReceiverInputKeyUp = (e) => {
      this.props.searchContact(e.currentTarget.value);
    };

    this.addToRecipients = (receiver, shouldClean = true) => {
      this.props.addToNumber(receiver);
      if (shouldClean) {
        this.props.cleanTypingToNumber();
      }
    };

    this.removeFromRecipients = (phoneNumber) => {
      this.props.removeToNumber({ phoneNumber });
    };

    this.onTextChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateMessageText(value);
    };

    this.onTextAreaKeyDown = (e) => {
      console.debug('onTextAreaKeyDown', e);
      if (e.key === 'Enter') {
        e.preventDefault();
        this.props.send();
      }
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      this.props.send();
      console.debug('send message ...');
    };
  }

  hasSenderNumbers() {
    return this.props.senderNumbers.length > 0;
  }

  render() {
    if (this.props.showSpinner) {
      return (
        <div className={classnames(styles.root, this.props.className)}>
          <SpinnerOverlay />
        </div>
      );
    }
    const senderField = this.hasSenderNumbers() ?
      (
        <SenderField
          currentLocale={this.props.currentLocale}
          value={this.props.senderNumber}
          options={this.props.senderNumbers}
          formatPhone={this.props.formatPhone}
          onChange={this.onSenderChange}
        />
      ) : null;
    return (
      <div className={classnames(styles.root, this.props.className)}>
        <NoSenderAlert
          currentLocale={this.props.currentLocale}
          outboundSMS={this.props.outboundSMS}
          hasSenderNumbers={this.hasSenderNumbers()}
        />
        <form onSubmit={this.handleSubmit}>
          <div className={styles.receiverField}>
            <RecipientsInput
              value={this.props.typingToNumber}
              label={`${i18n.getString('to', this.props.currentLocale)}:`}
              onChange={this.onReceiverChange}
              onClean={this.cleanReceiverValue}
              placeholder={i18n.getString('enterNameOrNumber', this.props.currentLocale)}
              recipients={this.props.toNumbers}
              addToRecipients={this.addToRecipients}
              removeFromRecipients={this.removeFromRecipients}
              searchContactList={this.props.searchContactList}
              onKeyUp={this.onReceiverInputKeyUp}
              formatContactPhone={this.props.formatContactPhone}
              titleEnabled
            />
          </div>
          <div className={styles.senderField}>
            {senderField}
          </div>
          <div className={styles.buttomField}>
            <div className={styles.textField}>
              <textarea
                placeholder={i18n.getString('typeMessage', this.props.currentLocale)}
                value={this.props.messageText}
                maxLength="1000"
                onChange={this.onTextChange}
                onKeyPressCapture={this.onTextAreaKeyDown}
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
  className: PropTypes.string,
  send: PropTypes.func.isRequired,
  senderNumbers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  sendButtonDisabled: PropTypes.bool.isRequired,
  formatPhone: PropTypes.func.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
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
  toNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  outboundSMS: PropTypes.bool,
  showSpinner: PropTypes.bool,
};

ComposeTextPanel.defaultProps = {
  className: null,
  messageText: '',
  typingToNumber: '',
  senderNumber: '',
  outboundSMS: false,
  showSpinner: false,
};

export default ComposeTextPanel;
