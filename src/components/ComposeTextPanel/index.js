import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import i18n from './i18n';
import styles from './styles.scss';
import RecipientsInput from '../RecipientsInput';
import SpinnerOverlay from '../SpinnerOverlay';
import NoSenderAlert from './NoSenderAlert';
import FromField from '../FromField';


class ComposeTextPanel extends Component {
  constructor(props) {
    super(props);

    this.onSenderChange = (value) => {
      this.props.updateSenderNumber(value);
    };


    this.cleanReceiverValue = () => {
      this.props.cleanTypingToNumber();
    };

    this.addToRecipients = async (receiver, shouldClean = true) => {
      const isAdded = await this.props.addToNumber(receiver);
      if (isAdded && shouldClean) {
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
    return (
      <div className={classnames(styles.root, this.props.className)}>
        <NoSenderAlert
          currentLocale={this.props.currentLocale}
          outboundSMS={this.props.outboundSMS}
          hasSenderNumbers={this.hasSenderNumbers()}
          brand={this.props.brand}
        />
        <form onSubmit={this.handleSubmit}>
          <RecipientsInput
            value={this.props.typingToNumber}
            onChange={this.props.updateTypingToNumber}
            onClean={this.cleanReceiverValue}
            recipients={this.props.toNumbers}
            addToRecipients={this.addToRecipients}
            removeFromRecipients={this.removeFromRecipients}
            searchContact={this.props.searchContact}
            searchContactList={this.props.searchContactList}
            formatContactPhone={this.props.formatContactPhone}
            currentLocale={this.props.currentLocale}
            phoneTypeRenderer={this.props.phoneTypeRenderer}
            contactInfoRenderer={this.props.recipientsContactInfoRenderer}
            contactPhoneRenderer={this.props.recipientsContactPhoneRenderer}
            titleEnabled
            autoFocus={this.props.autoFocus}
            multiple
          />
          <div className={styles.senderField}>
            <FromField
              currentLocale={this.props.currentLocale}
              fromNumber={this.props.senderNumber}
              fromNumbers={this.props.senderNumbers}
              formatPhone={this.props.formatPhone}
              onChange={this.onSenderChange}
              hidden={!this.hasSenderNumbers()}
              showAnonymous={false}
            />
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
  brand: PropTypes.string,
  className: PropTypes.string,
  send: PropTypes.func.isRequired,
  senderNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
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
  phoneTypeRenderer: PropTypes.func,
  recipientsContactInfoRenderer: PropTypes.func,
  recipientsContactPhoneRenderer: PropTypes.func,
  autoFocus: PropTypes.bool,
};

ComposeTextPanel.defaultProps = {
  brand: 'RingCentral',
  className: null,
  messageText: '',
  typingToNumber: '',
  senderNumber: '',
  outboundSMS: false,
  showSpinner: false,
  phoneTypeRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: false,
};

export default ComposeTextPanel;
