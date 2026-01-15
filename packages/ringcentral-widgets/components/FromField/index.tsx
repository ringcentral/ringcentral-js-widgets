import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import DropdownSelect from '../DropdownSelect';

import i18n from './i18n';
import styles from './styles.scss';

const PhoneNumber = ({
  formatPhone,
  usageType,
  label,
  currentLocale,
  phoneNumber,
}: any) => {
  const usageTypeDom =
    label || usageType ? (
      <span className={styles.usageType}>
        {label || i18n.getString(usageType, currentLocale)}
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
  label: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
};

PhoneNumber.defaultProps = {
  phoneNumber: null,
  usageType: null,
};

interface FromFieldIns {
  fromNumber: string;
  formatPhone: (...args: any[]) => any;
  fromNumbers: any[];
  onChange: (...args: any[]) => any;
  currentLocale: string;
  hidden: boolean;
  showAnonymous: boolean;
  className?: string;
  disabled?: boolean;
  showCustomPhoneLabel?: boolean;
}

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
  showCustomPhoneLabel,
}: FromFieldIns) {
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
      className={clsx(styles.root, className)}
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
            label={showCustomPhoneLabel ? option.label : undefined}
            currentLocale={currentLocale}
          />
        );
      }}
    />
  );
});

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'Named... Remove this comment to see the full error message
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

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'Na... Remove this comment to see the full error message
FromField.defaultProps = {
  fromNumber: null,
  className: undefined,
  showAnonymous: true,
  disabled: false,
};

export default FromField;
