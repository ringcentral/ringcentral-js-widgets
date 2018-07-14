import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DialPad from '../DialPad';
import RecipientsInput from '../RecipientsInput';
import BackHeader from '../BackHeader';
import CircleButton from '../CircleButton';
import TransferIcon from '../../assets/images/Transfer.svg';
import styles from './styles.scss';
import i18n from './i18n';

export default class TransferPanel extends PureComponent {
  static propTypes = {
    onTransfer: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    toggleTransferPanel: PropTypes.func.isRequired,
    searchContactList: PropTypes.array.isRequired,
    searchContact: PropTypes.func.isRequired,
    formatPhone: PropTypes.func.isRequired,
    phoneTypeRenderer: PropTypes.func,
    recipientsContactInfoRenderer: PropTypes.func,
    recipientsContactPhoneRenderer: PropTypes.func,
    isOnTransfer: PropTypes.bool,
    autoFocus: PropTypes.bool,
  };

  static defaultProps = {
    phoneTypeRenderer: undefined,
    recipientsContactInfoRenderer: undefined,
    recipientsContactPhoneRenderer: undefined,
    isOnTransfer: false,
    autoFocus: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      toNumber: '',
      recipient: null,
    };
  }

  _getTransferNumber() {
    return (
      (this.state.recipient && this.state.recipient.phoneNumber) ||
      this.state.toNumber
    );
  }

  onButtonOutput = (key) => {
    if (this.state.recipient) {
      return;
    }
    this.setState((preState) => {
      const value = preState.toNumber + key;
      return { toNumber: value };
    });
  }

  onTransfer = () => {
    this.props.onTransfer(this._getTransferNumber());
  }

  onToNumberChange = (toNumber) => {
    this.setState({
      toNumber
    });
  }

  clearToNumber = () => {
    this.setState({
      toNumber: '',
    });
  }

  setRecipient = (recipient) => {
    this.setState({
      recipient,
      toNumber: '',
    });
  }

  clearRecipient = () => {
    this.setState({ recipient: null });
  }

  render() {
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.toggleTransferPanel}>
          {i18n.getString('transferTo', this.props.currentLocale)}
        </BackHeader>
        <RecipientsInput
          className={styles.dialInput}
          value={this.state.toNumber}
          onChange={this.onToNumberChange}
          onClean={this.clearToNumber}
          recipient={this.state.recipient}
          addToRecipients={this.setRecipient}
          removeFromRecipients={this.clearRecipient}
          searchContact={this.props.searchContact}
          searchContactList={this.props.searchContactList}
          formatContactPhone={this.props.formatPhone}
          currentLocale={this.props.currentLocale}
          phoneTypeRenderer={this.props.phoneTypeRenderer}
          contactInfoRenderer={this.props.recipientsContactInfoRenderer}
          contactPhoneRenderer={this.props.recipientsContactPhoneRenderer}
          titleEnabled
          autoFocus={this.props.autoFocus}
        />
        <div className={styles.padContainer}>
          <DialPad
            className={styles.dialPad}
            onButtonOutput={this.onButtonOutput}
          />
          <div className={styles.buttonRow}>
            <div className={styles.button}>
              <CircleButton
                className={this.props.isOnTransfer ? styles.disabled : undefined}
                onClick={this.onTransfer}
                icon={TransferIcon}
                disabled={this.props.isOnTransfer}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
