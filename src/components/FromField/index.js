import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
function FromField({
  className,
  fromNumber,
  fromNumbers,
  onChange,
  formatPhone,
  hidden,
  showAnonymous,
  currentLocale,
}) {
  if (hidden) {
    return null;
  }
  const options = [
    ...fromNumbers,
  ];
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

FromField.propTypes = {
  fromNumber: PropTypes.string,
  formatPhone: PropTypes.func.isRequired,
  fromNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string,
    usageType: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  showAnonymous: PropTypes.bool,
  className: PropTypes.string,
};

FromField.defaultProps = {
  fromNumber: null,
  className: undefined,
  showAnonymous: true,
};

export default FromField;
