import React, { memo } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import DropdownSelect from '../DropdownSelect';
import i18n from './i18n';
import styles from './styles.scss';

const PhoneNumber = ({
  formatPhone,
  usageType,
  currentLocale,
  phoneNumber,
}) => {
  const usageTypeDom = usageType ? (
    <span className={styles.usageType}>
      {i18n.getString(usageType, currentLocale)}
    </span>
  ) : null;
  return (
    <span className={styles.phoneNumber}>
      {usageTypeDom}
      <span data-sign="phoneNumber">{formatPhone(phoneNumber)}</span>
    </span>
  );
};

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

// phone number formatting becomes expensive when there are lots of numbers
// memo makes this a pure component to reduce rendering cost
const FromField = memo(function FromField({
  className,
  fromNumber,
  fromNumbers,
  onChange,
  formatPhone,
  hidden,
  disabled,
  showAnonymous,
  currentLocale,
}) {
  if (hidden) {
    return null;
  }
  const options = [...fromNumbers];
  if (showAnonymous) {
    options.push({
      phoneNumber: 'anonymous',
    });
  }
  return (
    <DropdownSelect
      className={classnames(styles.root, className)}
      iconClassName={styles.selectIcon}
      value={fromNumber}
      label={`${i18n.getString('from', currentLocale)}:`}
      onChange={onChange}
      options={options}
      disabled={disabled}
      renderValue={(value) => {
        if (value === 'anonymous') {
          return <span>{i18n.getString('Blocked', currentLocale)}</span>;
        }
        return (
          <PhoneNumber
            formatPhone={formatPhone}
            phoneNumber={value}
            currentLocale={currentLocale}
          />
        );
      }}
      valueFunction={(option) => option.phoneNumber}
      renderFunction={(option) => {
        if (option.phoneNumber === 'anonymous') {
          return <span>{i18n.getString('Blocked', currentLocale)}</span>;
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
});

FromField.propTypes = {
  fromNumber: PropTypes.string,
  formatPhone: PropTypes.func.isRequired,
  fromNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      phoneNumber: PropTypes.string,
      usageType: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  showAnonymous: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

FromField.defaultProps = {
  fromNumber: null,
  className: undefined,
  showAnonymous: true,
  disabled: false,
};

export default FromField;
