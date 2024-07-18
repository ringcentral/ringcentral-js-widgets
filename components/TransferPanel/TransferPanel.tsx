import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { ActiveSession } from '@ringcentral-integration/commons/modules/ActiveCallControl/ActiveCallControl.interface';
import type { Recipient } from '@ringcentral-integration/commons/modules/Call';
import { RcIconButton, usePrevious } from '@ringcentral/juno';
import { Askfirst } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { noop } from 'rxjs';

import TransferIcon from '../../assets/images/Transfer.svg';
import ActiveCallButton from '../ActiveCallButton';
import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import CircleButton from '../CircleButton';
import DialPad from '../DialPad';
import RecipientsInput from '../RecipientsInput';

import { t } from './i18n';
import styles from './styles.scss';

type TransferPanelProps = {
  setActiveSessionId?: (...args: any[]) => any;
  onTransfer: (...args: any[]) => any;
  onWarmTransfer: (...args: any[]) => any;
  currentLocale: string;
  onBack: (...args: any[]) => any;
  onCallEnd?: (...args: any[]) => any;
  searchContactList?: any[];
  searchContact: (...args: any[]) => any;
  formatPhone: (...args: any[]) => any;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  recipientsContactInfoRenderer?: (...args: any[]) => any;
  recipientsContactPhoneRenderer?: (...args: any[]) => any;
  autoFocus?: boolean;
  sessionId: string;
  session?: Partial<ActiveSession> | NormalizedSession | null;
  controlBusy?: boolean;
  enableWarmTransfer?: boolean;
};

export const TransferPanel: React.FC<TransferPanelProps> = ({
  setActiveSessionId = () => {
    //
  },
  onTransfer,
  onWarmTransfer,
  currentLocale,
  onBack,
  onCallEnd = noop,
  searchContactList = [],
  searchContact,
  formatPhone,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
  autoFocus = true,
  sessionId,
  session = null,
  controlBusy = false,
  enableWarmTransfer = false,
}) => {
  const [toNumber, setToNumber] = useState('');
  const [recipient, setRecipient] = useState<Recipient>();
  const [isLastInputFromDialpad, setIsLastInputFromDialpad] = useState(false);

  useEffect(() => {
    setActiveSessionId(sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevSession = usePrevious(() => session);

  useEffect(() => {
    if (prevSession && !session) {
      onCallEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getTransferNumber = () => {
    return recipient?.phoneNumber || toNumber;
  };

  const onButtonOutput = (key: string) => {
    setIsLastInputFromDialpad(true);
    if (recipient) {
      return;
    }
    setToNumber((prevState) => prevState + key);
  };

  const onTransferClick = () => {
    onTransfer(getTransferNumber(), sessionId);
  };

  const onWarmTransferClick = () => {
    onWarmTransfer(getTransferNumber(), sessionId);
  };

  const onToNumberChange = (toNumber: string) => {
    setIsLastInputFromDialpad(false);
    setToNumber(toNumber);
  };

  const clearToNumber = () => {
    setToNumber('');
  };

  const clearRecipient = () => {
    setRecipient(undefined);
  };

  const addToRecipients = (recipient: Recipient) => {
    setRecipient(recipient);
    clearToNumber();
  };

  if (!session) {
    return null;
  }

  const isOnTransfer = !!session.isOnTransfer;

  const { warmTransferButton, transferButton } = getTransferButtons();

  return (
    <div className={styles.root}>
      <PageHeader>
        <PageHeaderBack onClick={onBack} className={styles.backHeader} />
        <PageHeaderTitle>{t('transferTo')}</PageHeaderTitle>
        <PageHeaderRemain />
      </PageHeader>
      <RecipientsInput
        className={styles.dialInput}
        value={toNumber}
        onChange={onToNumberChange}
        onClean={clearToNumber}
        recipient={recipient}
        addToRecipients={addToRecipients}
        removeFromRecipients={clearRecipient}
        searchContact={searchContact}
        searchContactList={searchContactList}
        formatContactPhone={formatPhone}
        currentLocale={currentLocale}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
        contactInfoRenderer={recipientsContactInfoRenderer}
        contactPhoneRenderer={recipientsContactPhoneRenderer}
        isLastInputFromDialpad={isLastInputFromDialpad}
        titleEnabled
        autoFocus={autoFocus}
      />
      <div className={styles.padContainer}>
        <DialPad
          dataSign="transfer"
          className={styles.dialPad}
          onButtonOutput={onButtonOutput}
        />
        <div className={styles.buttonRow}>
          {warmTransferButton}
          {transferButton}
        </div>
      </div>
    </div>
  );

  function getTransferButtons() {
    let transferButton;
    let warmTransferButton;

    if (enableWarmTransfer) {
      transferButton = (
        <div className={clsx(styles.button, styles.buttonGroupItem)}>
          <ActiveCallButton
            dataSign="transferBtn"
            className={isOnTransfer ? styles.disabled : undefined}
            onClick={onTransferClick}
            icon={TransferIcon}
            disabled={isOnTransfer || controlBusy}
            title={t('blindTransfer')}
          />
        </div>
      );
      warmTransferButton = (
        <div className={clsx(styles.button, styles.buttonGroupItem)}>
          <ActiveCallButton
            dataSign="warmTransferBtn"
            className={isOnTransfer ? styles.disabled : undefined}
            onClick={onWarmTransferClick}
            icon={Askfirst}
            disabled={isOnTransfer || controlBusy}
            title={t('warmTransfer')}
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
            onClick={onTransferClick}
            icon={TransferIcon}
            disabled={isOnTransfer || controlBusy}
          />
        </RcIconButton>
      );
    }
    return { warmTransferButton, transferButton };
  }
};

export default TransferPanel;
