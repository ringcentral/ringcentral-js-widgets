import React from 'react';
import PropTypes from 'prop-types';
import DropdownSelect from '../DropdownSelect';
import styles from './styles.scss';

import i18n from './i18n';

function PhoneNumber({
  formatPhone,
  usageType,
  currentLocale,
  phoneNumber,
}) {
  const usageTypeDom = usageType ?
    (
      <span className={styles.usageType}>
        {i18n.getString(usageType, currentLocale)}
      </span>
    ) : null;
  return (
    <span className={styles.phoneNumber}>
      <span>
        {formatPhone(phoneNumber)}
      </span>
      {usageTypeDom}
    </span>
  );
}

PhoneNumber.propTypes = {
  formatPhone: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string,
  usageType: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
};

PhoneNumber.defaultProps = {
  phoneNumber: null,
  usageType: null,
};

function CallIdSelect({
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
      className={styles.root}
      iconClassName={styles.selectIcon}
      value={fromNumber}
      label={`${i18n.getString('from', currentLocale)}:`}
      onChange={onChange}
      options={options}
      renderValue={(value) => {
        if (value === 'anonymous') {
          return (
            <span>{i18n.getString('Blocked', currentLocale)}</span>
          );
        }
        return (
          <PhoneNumber
            formatPhone={formatPhone}
            phoneNumber={value}
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

CallIdSelect.propTypes = {
  fromNumber: PropTypes.string,
  formatPhone: PropTypes.func.isRequired,
  fromNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string,
    usageType: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
};

CallIdSelect.defaultProps = {
  fromNumber: null,
};

export default CallIdSelect;
