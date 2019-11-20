import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DialPad from '../DialPad';
import RecipientsInput from '../RecipientsInput';
import RecipientsInputV2 from '../RecipientsInputV2';
import FromField from '../FromField';
import SpinnerOverlay from '../SpinnerOverlay';
import CircleButton from '../CircleButton';
import AnswerIcon from '../../assets/images/Answer.svg';

import styles from './styles.scss';

function DialerPanel({
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
  children,
  withTabs,
  inConference,
  isLastInputFromDialpad,
  useV2,
}) {
  const inputEl = useRef(null);
  useEffect(() => {
    if (useV2 && autoFocus && inputEl.current) {
      inputEl.current.focus();
    }
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
      titleEnabled
      className={
        !showFromField
          ? classnames(styles.inputField, styles.recipientsField)
          : null
      }
    />
  ) : (
    <RecipientsInput
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
            fromNumber={fromNumber}
            fromNumbers={fromNumbers}
            onChange={changeFromNumber}
            formatPhone={formatPhone}
            currentLocale={currentLocale}
            hidden={!isWebphoneMode}
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
}

DialerPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  dialButtonsClassName: PropTypes.string,
  onCallButtonClick: PropTypes.func.isRequired,
  callButtonDisabled: PropTypes.bool,
  isWebphoneMode: PropTypes.bool,
  toNumber: PropTypes.string,
  onToNumberChange: PropTypes.func,
  fromNumber: PropTypes.string,
  fromNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      phoneNumber: PropTypes.string,
      usageType: PropTypes.string,
    }),
  ),
  changeFromNumber: PropTypes.func,
  formatPhone: PropTypes.func,
  showSpinner: PropTypes.bool,
  dialButtonVolume: PropTypes.number,
  dialButtonMuted: PropTypes.bool,
  searchContact: PropTypes.func.isRequired,
  searchContactList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      entityType: PropTypes.string.isRequired,
      phoneType: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  ).isRequired,
  recipient: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  ).isRequired,
  clearToNumber: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  clearRecipient: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  recipientsContactInfoRenderer: PropTypes.func,
  recipientsContactPhoneRenderer: PropTypes.func,
  autoFocus: PropTypes.bool,
  showFromField: PropTypes.bool,
  children: PropTypes.node,
  withTabs: PropTypes.bool,
  inConference: PropTypes.bool,
  isLastInputFromDialpad: PropTypes.bool,
  useV2: PropTypes.bool,
};

DialerPanel.defaultProps = {
  className: null,
  dialButtonsClassName: null,
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: () => null,
  onToNumberChange: () => null,
  formatPhone: (phoneNumber) => phoneNumber,
  showSpinner: false,
  dialButtonVolume: 1,
  dialButtonMuted: false,
  recipient: [],
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: false,
  showFromField: true,
  children: undefined,
  withTabs: false,
  inConference: false,
  isLastInputFromDialpad: false,
  useV2: false,
};

export default DialerPanel;
