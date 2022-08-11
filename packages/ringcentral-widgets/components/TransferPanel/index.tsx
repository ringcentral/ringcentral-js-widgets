import React, { PureComponent } from 'react';

import classnames from 'classnames';

import { RcIconButton } from '@ringcentral/juno';
import { Askfirst } from '@ringcentral/juno-icon';

import TransferIcon from '../../assets/images/Transfer.svg';
import ActiveCallButton from '../ActiveCallButton';
import BackHeader from '../BackHeader';
import CircleButton from '../CircleButton';
import DialPad from '../DialPad';
import RecipientsInput from '../RecipientsInput';
import i18n from './i18n';
import styles from './styles.scss';

type TransferPanelProps = {
  setActiveSessionId?: (...args: any[]) => any;
  onTransfer: (...args: any[]) => any;
  onWarmTransfer: (...args: any[]) => any;
  currentLocale: string;
  onBack: (...args: any[]) => any;
  onCallEnd: (...args: any[]) => any;
  searchContactList?: any[];
  searchContact: (...args: any[]) => any;
  formatPhone: (...args: any[]) => any;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  recipientsContactInfoRenderer?: (...args: any[]) => any;
  recipientsContactPhoneRenderer?: (...args: any[]) => any;
  autoFocus?: boolean;
  sessionId: string;
  session?: object | null;
  controlBusy?: boolean;
  enableWarmTransfer?: boolean;
};
type TransferPanelState = {
  toNumber: string;
  recipient: null;
  isLastInputFromDialpad: boolean;
};
class TransferPanel extends PureComponent<
  TransferPanelProps,
  TransferPanelState
> {
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
    enableWarmTransfer: false,
    children: null,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      toNumber: '',
      recipient: null,
      isLastInputFromDialpad: false,
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.load();
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (this.props.session && !nextProps.session) {
      this.props.onCallEnd();
    }
  }
  load() {
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.setActiveSessionId(this.props.sessionId);
  }
  _getTransferNumber() {
    return (
      // @ts-expect-error TS(2339): Property 'phoneNumber' does not exist on type 'nev... Remove this comment to see the full error message
      (this.state.recipient && this.state.recipient.phoneNumber) ||
      this.state.toNumber
    );
  }
  onButtonOutput = (key: any) => {
    this.setState({
      isLastInputFromDialpad: true,
    });
    if (this.state.recipient) {
      return;
    }
    this.setState((preState) => {
      const value = preState.toNumber + key;
      return { toNumber: value };
    });
  };
  onTransfer = () => {
    this.props.onTransfer(this._getTransferNumber(), this.props.sessionId);
  };
  onWarmTransfer = () => {
    this.props.onWarmTransfer(this._getTransferNumber(), this.props.sessionId);
  };
  onToNumberChange = (toNumber: any) => {
    this.setState({
      isLastInputFromDialpad: false,
      toNumber,
    });
  };
  clearToNumber = () => {
    this.setState({
      toNumber: '',
    });
  };
  setRecipient = (recipient: any) => {
    this.setState({
      recipient,
      toNumber: '',
    });
  };
  clearRecipient = () => {
    this.setState({ recipient: null });
  };
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
      enableWarmTransfer,
      children,
    } = this.props;
    if (!session) {
      return null;
    }
    // @ts-expect-error TS(2339): Property 'isOnTransfer' does not exist on type 'ob... Remove this comment to see the full error message
    const isOnTransfer = !!session.isOnTransfer;
    let transferButton;
    let warmTransferButton;
    if (enableWarmTransfer) {
      transferButton = (
        <div className={classnames(styles.button, styles.buttonGroupItem)}>
          <ActiveCallButton
            dataSign="transferBtn"
            className={isOnTransfer ? styles.disabled : undefined}
            onClick={this.onTransfer}
            icon={TransferIcon}
            disabled={isOnTransfer || controlBusy}
            title={i18n.getString('blindTransfer', currentLocale)}
          />
        </div>
      );
      warmTransferButton = (
        <div className={classnames(styles.button, styles.buttonGroupItem)}>
          <ActiveCallButton
            dataSign="warnTransferBtn"
            className={isOnTransfer ? styles.disabled : undefined}
            onClick={this.onWarmTransfer}
            icon={Askfirst}
            disabled={isOnTransfer || controlBusy}
            title={i18n.getString('warmTransfer', currentLocale)}
          />
        </div>
      );
    } else {
      transferButton = (
        <RcIconButton
          className={styles.button}
          disabled={isOnTransfer || controlBusy}
          data-sign="transferBtnWrap"
        >
          <CircleButton
            dataSign="transferBtn"
            className={isOnTransfer ? styles.disabled : undefined}
            onClick={this.onTransfer}
            icon={TransferIcon}
            disabled={isOnTransfer || controlBusy}
          />
        </RcIconButton>
      );
    }
    return (
      <div className={styles.root}>
        <BackHeader onBackClick={onBack} className={styles.backHeader}>
          {i18n.getString('transferTo', currentLocale)}
        </BackHeader>
        <RecipientsInput
          className={styles.dialInput}
          value={this.state.toNumber}
          onChange={this.onToNumberChange}
          onClean={this.clearToNumber}
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type '{ phoneNumb... Remove this comment to see the full error message
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
          isLastInputFromDialpad={this.state.isLastInputFromDialpad}
          titleEnabled
          autoFocus={autoFocus}
        />
        <div className={styles.padContainer}>
          <DialPad
            dataSign="transfer"
            className={styles.dialPad}
            onButtonOutput={this.onButtonOutput}
          />
          <div className={styles.buttonRow}>
            {warmTransferButton}
            {transferButton}
          </div>
        </div>
        {children}
      </div>
    );
  }
}
export default TransferPanel;
