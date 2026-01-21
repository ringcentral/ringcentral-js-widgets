import { useFormattedPhoneNumberFn } from '@ringcentral-integration/micro-auth/src/app/components';
import { Option, Select } from '@ringcentral/spring-ui';
import React, { memo } from 'react';

import { t } from './i18n';
import styles from './styles.scss';

interface PhoneNumberProps {
  phoneNumber?: string | null;
  usageType?: string | null;
  label?: string;
}

const PhoneNumber = ({ usageType, label, phoneNumber }: PhoneNumberProps) => {
  const usageTypeDom =
    label || usageType ? (
      <span className={styles.usageType}>
        {label || (usageType ? t(usageType as any) : '')}
      </span>
    ) : null;

  const formatPhone = useFormattedPhoneNumberFn();
  return (
    <span className={styles.phoneNumber}>
      {usageTypeDom}
      <span data-sign="phoneNumber">{formatPhone(phoneNumber || '')}</span>
    </span>
  );
};

interface FromNumberOption {
  phoneNumber: string;
  label?: string;
  usageType?: string;
}

interface FromFieldProps {
  fromNumber?: string | null;
  fromPlaceholder?: string;
  fromNumbers: FromNumberOption[];
  onChange: (args: { phoneNumber: string }) => void;
  hidden: boolean;
  showAnonymous?: boolean;
  className?: string;
  disabled?: boolean;
  showCustomPhoneLabel?: boolean;
}

// phone number formatting becomes expensive when there are lots of numbers
// memo makes this a pure component to reduce rendering cost
export const FromField = memo(function FromField({
  className,
  fromNumber = null,
  fromNumbers,
  fromPlaceholder,
  onChange,
  hidden,
  disabled = false,
  showAnonymous = true,
  showCustomPhoneLabel,
}: FromFieldProps) {
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
    <div className={className}>
      <Select
        className="w-full"
        data-sign="dropdownSelect"
        variant="outlined"
        size="large"
        label={fromPlaceholder || t('from')}
        value={fromNumber}
        disabled={disabled}
        renderValue={(value) => {
          if (value === 'anonymous') {
            return <span>{t('Blocked')}</span>;
          }
          return <PhoneNumber phoneNumber={value} />;
        }}
        onChange={(e) => onChange({ phoneNumber: e.target.value })}
      >
        {options.map(({ phoneNumber, label, usageType }) => {
          return (
            <Option
              data-sign="selectMenuItem"
              key={phoneNumber}
              value={phoneNumber}
            >
              {phoneNumber === 'anonymous' ? (
                <span>{t('Blocked')}</span>
              ) : (
                <PhoneNumber
                  phoneNumber={phoneNumber}
                  usageType={usageType}
                  label={showCustomPhoneLabel ? label : undefined}
                />
              )}
            </Option>
          );
        })}
      </Select>
    </div>
  );
});
