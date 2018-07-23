import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DialPad from '../DialPad';
import RecipientsInput from '../RecipientsInput';
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
  recipient,
  clearToNumber,
  setRecipient,
  clearRecipient,
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
  autoFocus,
  showFromField = true,
  children,
}) {
  const onCallFunc = () => {
    if (!callButtonDisabled) {
      onCallButtonClick();
    }
  };

  return (
    <div className={classnames(styles.root, className)}>
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
        contactInfoRenderer={recipientsContactInfoRenderer}
        contactPhoneRenderer={recipientsContactPhoneRenderer}
        titleEnabled
        autoFocus={autoFocus}
        className={!showFromField ? classnames(styles.inputField, styles.recipientsField) : null}
      />
      {
        showFromField ?
          <div className={styles.inputField}>
            <FromField
              fromNumber={fromNumber}
              fromNumbers={fromNumbers}
              onChange={changeFromNumber}
              formatPhone={formatPhone}
              currentLocale={currentLocale}
              hidden={!isWebphoneMode}
            />
          </div> : null
      }
      <div className={classnames(styles.dialButtons, dialButtonsClassName)}>
        <DialPad
          className={styles.dialPad}
          onButtonOutput={(key) => {
            onToNumberChange(toNumber + key);
          }}
          dialButtonVolume={dialButtonVolume}
          dialButtonMuted={dialButtonMuted}
        />
        <div className={classnames(styles.callBtnRow)}>
          <div className={styles.callBtn}>
            <CircleButton
              className={classnames(
                styles.dialBtn,
                callButtonDisabled && styles.disabled,
              )}
              onClick={onCallFunc}
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
  fromNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string,
    usageType: PropTypes.string,
  })),
  changeFromNumber: PropTypes.func,
  formatPhone: PropTypes.func,
  showSpinner: PropTypes.bool,
  dialButtonVolume: PropTypes.number,
  dialButtonMuted: PropTypes.bool,
  searchContact: PropTypes.func.isRequired,
  searchContactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  recipient: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  clearToNumber: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  clearRecipient: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
  recipientsContactInfoRenderer: PropTypes.func,
  recipientsContactPhoneRenderer: PropTypes.func,
  autoFocus: PropTypes.bool,
  showFromField: PropTypes.bool,
  children: PropTypes.node,
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
  formatPhone: phoneNumber => phoneNumber,
  showSpinner: false,
  dialButtonVolume: 1,
  dialButtonMuted: false,
  recipient: [],
  phoneTypeRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: false,
  showFromField: true,
  children: undefined,
};

export default DialerPanel;
