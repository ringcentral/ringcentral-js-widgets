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
    setActiveSessionId: PropTypes.func,
    onTransfer: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
    onCallEnd: PropTypes.func.isRequired,
    searchContactList: PropTypes.array,
    searchContact: PropTypes.func.isRequired,
    formatPhone: PropTypes.func.isRequired,
    phoneTypeRenderer: PropTypes.func,
    phoneSourceNameRenderer: PropTypes.func,
    recipientsContactInfoRenderer: PropTypes.func,
    recipientsContactPhoneRenderer: PropTypes.func,
    autoFocus: PropTypes.bool,
    sessionId: PropTypes.string.isRequired,
    session: PropTypes.object,
    controlBusy: PropTypes.bool,
  };

  static defaultProps = {
    setActiveSessionId: null,
    phoneTypeRenderer: undefined,
    phoneSourceNameRenderer: undefined,
    recipientsContactInfoRenderer: undefined,
    recipientsContactPhoneRenderer: undefined,
    autoFocus: true,
    session: null,
    searchContactList: [],
    controlBusy: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      toNumber: '',
      recipient: null,
    };
  }

  componentDidMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.session && !nextProps.session) {
      this.props.onCallEnd();
    }
  }

  load() {
    this.props.setActiveSessionId(this.props.sessionId);
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
    this.props.onTransfer(this._getTransferNumber(), this.props.sessionId);
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
    const {
      controlBusy,
      session,
      onBack,
      currentLocale,
      searchContact,
      searchContactList,
      formatPhone,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer,
      autoFocus,
    } = this.props;
    if (!session) {
      return null;
    }
    const isOnTransfer = !!session.isOnTransfer;
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={onBack}>
          {i18n.getString('transferTo', currentLocale)}
        </BackHeader>
        <RecipientsInput
          className={styles.dialInput}
          value={this.state.toNumber}
          onChange={this.onToNumberChange}
          onClean={this.clearToNumber}
          recipient={this.state.recipient}
          addToRecipients={this.setRecipient}
          removeFromRecipients={this.clearRecipient}
          searchContact={searchContact}
          searchContactList={searchContactList}
          formatContactPhone={formatPhone}
          currentLocale={currentLocale}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          contactInfoRenderer={recipientsContactInfoRenderer}
          contactPhoneRenderer={recipientsContactPhoneRenderer}
          titleEnabled
          autoFocus={autoFocus}
        />
        <div className={styles.padContainer}>
          <DialPad
            className={styles.dialPad}
            onButtonOutput={this.onButtonOutput}
          />
          <div className={styles.buttonRow}>
            <div className={styles.button}>
              <CircleButton
                className={isOnTransfer ? styles.disabled : undefined}
                onClick={this.onTransfer}
                icon={TransferIcon}
                disabled={isOnTransfer || controlBusy}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
