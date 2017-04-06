import React, { PropTypes } from 'react';
import classnames from 'classnames';
import DialPad from '../DialPad';
import DialTextInput from '../DialTextInput';
import DropdownSelect from '../DropdownSelect';
import styles from './styles.scss';

import i18n from './i18n';

function PhoneNumber({
  formatPhone,
  usageType,
  currentLocale,
  phoneNumber,
}) {
  return (
    <span className={styles.phoneNumber}>
      <span>
        {formatPhone(phoneNumber)}
      </span>
      <span className={styles.usageType}>
        {i18n.getString(usageType, currentLocale)}
      </span>
    </span>
  );
}

PhoneNumber.propTypes = {
  formatPhone: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  usageType: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

function FromNumberSelect({
  fromNumber,
  fromNumbers,
  onChange,
  formatPhone,
  hidden,
  currentLocale,
}) {
  if (hidden) {
    return null;
  }
  const options = [
    ...fromNumbers,
    {
      phoneNumber: 'anonymous',
    }
  ];
  return (
    <DropdownSelect
      className={styles.select}
      iconClassName={styles.selectIcon}
      value={fromNumber}
      label={'From:'}
      onChange={onChange}
      options={options}
      renderValue={(value) => {
        if (value === 'anonymous') {
          return (
            <span>{i18n.getString('Blocked', currentLocale)}</span>
          );
        }
        const valueItem = fromNumbers.find(
          item => item.phoneNumber === value
        );
        const usageType = valueItem && valueItem.usageType;
        return (
          <PhoneNumber
            formatPhone={formatPhone}
            phoneNumber={value}
            usageType={usageType}
            currentLocale={currentLocale}
          />
        );
      }}
      valueFunction={option => option.phoneNumber}
      renderFunction={(option) => {
        if (option.phoneNumber === 'anonymous') {
          return (
            <span>{i18n.getString('Blocked', currentLocale)}</span>
          );
        }
        return (
          <PhoneNumber
            formatPhone={formatPhone}
            phoneNumber={option.phoneNumber}
            usageType={option.usageType}
            currentLocale={currentLocale}
          />
        );
      }}
    />
  );
}

FromNumberSelect.propTypes = {
  fromNumber: PropTypes.string.isRequired,
  formatPhone: PropTypes.func.isRequired,
  fromNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string,
    usageType: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
};

function DialerPanel({
  callButtonDisabled,
  className,
  keepToNumber,
  onCall,
  toNumber,
  fromNumber,
  fromNumbers,
  changeFromNumber,
  formatPhone,
  isWebphoneMode,
  currentLocale,
}) {
  const onCallFunc = () => {
    if (!callButtonDisabled) {
      onCall();
    }
  };
  return (
    <div className={classnames(styles.root, className)}>
      <FromNumberSelect
        fromNumber={fromNumber}
        fromNumbers={fromNumbers}
        onChange={changeFromNumber}
        formatPhone={formatPhone}
        currentLocale={currentLocale}
        hidden={!isWebphoneMode}
      />
      <DialTextInput
        value={toNumber}
        onChangeEvent={(event) => {
          keepToNumber(event.currentTarget.value);
        }}
        onDelete={() => {
          keepToNumber('');
        }}
        />
      <div className={styles.dialButtons}>
        <DialPad
          className={styles.dialPad}
          onButtonOutput={(key) => {
            keepToNumber(toNumber + key);
          }}
          />
        <div className={classnames(styles.callBtnRow)}>
          <div className={styles.callBtn}>
            <svg className={styles.btnSvg} viewBox="0 0 500 500">
              <g
                className={classnames(
                  styles.btnSvgGroup,
                  callButtonDisabled && styles.disabled,
                )}
                onClick={onCallFunc}
                >
                <circle
                  className={styles.circle}
                  cx="250"
                  cy="250"
                  r="200"
                  />
                <text
                  className={styles.btnValue}
                  x="0"
                  dx="167.5155"
                  y="0"
                  dy="300"
                  dangerouslySetInnerHTML={{
                    __html: '&#xe953;',
                  }} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
DialerPanel.propTypes = {
  className: PropTypes.string,
  onCall: PropTypes.func.isRequired,
  callButtonDisabled: PropTypes.bool,
  isWebphoneMode: PropTypes.bool,
  toNumber: PropTypes.string,
  keepToNumber: PropTypes.func,
  fromNumber: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  fromNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string,
    usageType: PropTypes.string,
  })),
  changeFromNumber: PropTypes.func,
  formatPhone: PropTypes.func,
};

DialerPanel.defaultProps = {
  className: null,
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: () => null,
  keepToNumber: () => null,
  formatPhone: phoneNumber => phoneNumber,
};

export default DialerPanel;
