import React, { FunctionComponent, useEffect, useRef } from 'react';

import classnames from 'classnames';

import AnswerIcon from '../../assets/images/Answer.svg';
import CircleButton from '../CircleButton';
import DialPad from '../DialPad';
import FromField from '../FromField';
import RecipientsInput from '../RecipientsInput';
import { RecipientsInputV2 } from '../RecipientsInputV2';
import { Recipient } from '../RecipientsInputV2/RecipientsInputV2.interface';
import { SpinnerOverlay } from '../SpinnerOverlay';
import styles from './styles.scss';

export interface DialerPanelProps {
  currentLocale: string;
  className?: string;
  dialButtonsClassName?: string;
  onCallButtonClick: (...args: any[]) => any;
  callButtonDisabled?: boolean;
  isWebphoneMode?: boolean;
  toNumber?: string;
  onToNumberChange?: (...args: any[]) => any;
  fromNumber?: string;
  fromNumbers?: {
    phoneNumber?: string;
    usageType?: string;
  }[];
  changeFromNumber?: (...args: any[]) => any;
  formatPhone?: (...args: any[]) => any;
  showSpinner?: boolean;
  dialButtonVolume?: number;
  dialButtonMuted?: boolean;
  searchContact: (...args: any[]) => any;
  searchContactList: {
    name: string;
    entityType: string;
    phoneType: string;
    phoneNumber: string;
  }[];
  recipient?: Recipient;
  recipients: Recipient[];
  clearToNumber: (...args: any[]) => any;
  setRecipient: (...args: any[]) => any;
  clearRecipient: (...args: any[]) => any;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  recipientsContactInfoRenderer?: (...args: any[]) => any;
  recipientsContactPhoneRenderer?: (...args: any[]) => any;
  autoFocus?: boolean;
  showFromField?: boolean;
  disableFromField?: boolean;
  withTabs?: boolean;
  inConference?: boolean;
  isLastInputFromDialpad?: boolean;
  useV2?: boolean;
  showAnonymous?: boolean;
}
const DialerPanel: FunctionComponent<DialerPanelProps> = ({
  currentLocale,
  callButtonDisabled,
  className,
  dialButtonsClassName,
  onToNumberChange,
  onCallButtonClick,
  toNumber,
  fromNumber,
  fromNumbers,
  changeFromNumber,
  formatPhone,
  isWebphoneMode,
  showSpinner,
  dialButtonVolume,
  dialButtonMuted,
  searchContact,
  searchContactList,
  recipients,
  recipient,
  clearToNumber,
  setRecipient,
  clearRecipient,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
  autoFocus,
  showFromField = true,
  disableFromField = false,
  children,
  withTabs,
  inConference,
  isLastInputFromDialpad,
  showAnonymous,
  useV2,
}) => {
  const inputEl = useRef(null);
  useEffect(() => {
    if (useV2 && autoFocus && inputEl.current) {
      inputEl.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const input = useV2 ? (
    <RecipientsInputV2
      ref={inputEl}
      value={toNumber}
      onInputChange={onToNumberChange}
      onInputClear={clearToNumber}
      recipients={recipients}
      addToRecipients={setRecipient}
      removeFromRecipients={clearRecipient}
      searchContactList={searchContactList}
      formatContactPhone={formatPhone}
      currentLocale={currentLocale}
      phoneTypeRenderer={phoneTypeRenderer}
      phoneSourceNameRenderer={phoneSourceNameRenderer}
      contactInfoRenderer={recipientsContactInfoRenderer}
      contactPhoneRenderer={recipientsContactPhoneRenderer}
      isLastInputFromDialpad={isLastInputFromDialpad}
      enableTitle
      className={
        !showFromField
          ? classnames(styles.inputField, styles.recipientsField)
          : null
      }
    />
  ) : (
    <RecipientsInput
      inputRef={(element) => {
        inputEl.current = element;
      }}
      value={toNumber}
      onChange={onToNumberChange}
      onClean={clearToNumber}
      recipient={recipient}
      addToRecipients={setRecipient}
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
      className={
        !showFromField
          ? classnames(styles.inputField, styles.recipientsField)
          : null
      }
    />
  );
  return (
    <div className={classnames(styles.root, className)}>
      {input}
      {showFromField ? (
        <div className={styles.inputField}>
          <FromField
            showAnonymous={showAnonymous}
            fromNumber={fromNumber}
            fromNumbers={fromNumbers}
            onChange={changeFromNumber}
            formatPhone={formatPhone}
            currentLocale={currentLocale}
            hidden={!isWebphoneMode}
            disabled={disableFromField}
          />
        </div>
      ) : null}
      <div className={classnames(styles.dialButtons, dialButtonsClassName)}>
        <DialPad
          className={styles.dialPad}
          onButtonOutput={(key) => {
            onToNumberChange(toNumber + key, true);
            if (inputEl.current) {
              inputEl.current.focus();
            }
          }}
          dialButtonVolume={dialButtonVolume}
          dialButtonMuted={dialButtonMuted}
        />
        <div
          className={classnames(
            styles.callBtnRow,
            withTabs && styles.callBtnRowWithTabs,
            inConference && styles.callBtnRowInConference,
          )}
        >
          <div className={styles.callBtn}>
            <CircleButton
              dataSign="callButton"
              className={classnames(
                styles.dialBtn,
                callButtonDisabled && styles.disabled,
              )}
              onClick={onCallButtonClick}
              disabled={callButtonDisabled}
              icon={AnswerIcon}
              showBorder={false}
            />
          </div>
        </div>
      </div>
      {showSpinner ? <SpinnerOverlay /> : null}
      {children}
    </div>
  );
};

const Empty: FunctionComponent = () => null;

DialerPanel.defaultProps = {
  className: null,
  dialButtonsClassName: null,
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: Empty,
  onToNumberChange: Empty,
  formatPhone: (phoneNumber) => phoneNumber,
  showSpinner: false,
  dialButtonVolume: 1,
  dialButtonMuted: false,
  recipients: [],
  autoFocus: false,
  showFromField: true,
  disableFromField: false,
  withTabs: false,
  inConference: false,
  isLastInputFromDialpad: false,
  useV2: false,
  showAnonymous: true,
};
export default DialerPanel;
