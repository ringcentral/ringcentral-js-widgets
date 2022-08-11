import React, { FunctionComponent, useEffect, useRef } from 'react';

import classnames from 'classnames';

import { ToNumber as Recipient } from '@ringcentral-integration/commons/modules/ComposeText';

import AnswerIcon from '../../assets/images/Answer.svg';
import CircleButton from '../CircleButton';
import DialPad from '../DialPad';
import FromField from '../FromField';
import RecipientsInput from '../RecipientsInput';
import { RecipientsInputV2 } from '../RecipientsInputV2';
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
      // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
      inputEl.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const input = useV2 ? (
    <RecipientsInputV2
      ref={inputEl}
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      value={toNumber}
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      onInputChange={onToNumberChange}
      onInputClear={clearToNumber}
      recipients={recipients}
      addToRecipients={setRecipient}
      removeFromRecipients={clearRecipient}
      searchContactList={searchContactList}
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      formatContactPhone={formatPhone}
      currentLocale={currentLocale}
      phoneTypeRenderer={phoneTypeRenderer}
      phoneSourceNameRenderer={phoneSourceNameRenderer}
      contactInfoRenderer={recipientsContactInfoRenderer}
      contactPhoneRenderer={recipientsContactPhoneRenderer}
      isLastInputFromDialpad={isLastInputFromDialpad}
      enableTitle
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
            showAnonymous={showAnonymous}
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            fromNumber={fromNumber}
            // @ts-expect-error TS(2322): Type '{ phoneNumber?: string | undefined; usageTyp... Remove this comment to see the full error message
            fromNumbers={fromNumbers}
            // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
            onChange={changeFromNumber}
            // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            onToNumberChange(toNumber + key, true);
            if (inputEl.current) {
              // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
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
              onClick={() => onCallButtonClick({ clickDialerToCall: true })}
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  dialButtonsClassName: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
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
