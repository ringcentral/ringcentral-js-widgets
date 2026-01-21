import { FormattedPhoneNumber } from '@ringcentral-integration/micro-auth/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Dropdown,
  DropdownProps,
  MenuItemText,
  Option,
} from '@ringcentral/spring-ui';
import React, { FunctionComponent, useMemo } from 'react';

import useContactRenderInfoI18n from '../../hooks/useContactRenderInfo/i18n';
import { UserPhoneNumberInfo } from '../../services/CallerId/CallerId.interface';

import i18n from './i18n';

export type MyCallerIdDropdownProps = {
  showAnonymous: boolean;
  options: UserPhoneNumberInfo[];
} & Omit<DropdownProps, 'data' | 'children'>;

export const MyCallerIdDropdown: FunctionComponent<MyCallerIdDropdownProps> = ({
  showAnonymous,
  value: fromNumber,
  options: fromNumbers,
  ...rest
}) => {
  const { t } = useLocale(i18n, useContactRenderInfoI18n);
  const anonymousCallerLabel = t('Blocked');

  const renderValue = (option: UserPhoneNumberInfo) => {
    const isAnonymousCaller = option.phoneNumber === 'anonymous';
    const primaryText = isAnonymousCaller
      ? anonymousCallerLabel
      : option.label || (option.usageType && t(option.usageType));

    return (
      <div className="flex flex-col">
        <span className="typography-subtitle truncate" title={primaryText}>
          {primaryText}
        </span>
        {!isAnonymousCaller && (
          <span
            data-sign="phoneNumber"
            className="typography-subtitleMini text-neutral-b2 truncate"
          >
            <FormattedPhoneNumber phoneNumber={option.phoneNumber!} />
          </span>
        )}
      </div>
    );
  };

  const options = useMemo(() => {
    if (showAnonymous) {
      return [
        ...fromNumbers,
        {
          phoneNumber: 'anonymous',
        },
      ];
    }

    return fromNumbers;
  }, [fromNumbers, showAnonymous]);

  return (
    <Dropdown
      rootProps={{
        title: t('myCallerId'),
      }}
      label={t('myCallerId')}
      {...rest}
      buttonProps={{
        'data-sign': 'callFrom',
      }}
      MenuProps={{
        PopperProps: {
          padding: 16,
        },
      }}
      placeholder="Select a caller ID"
      getSelectedIndex={(value) => {
        const index = options.findIndex((v) => v.phoneNumber === value);

        if (process.env.NODE_ENV !== 'production') {
          if (index === -1) {
            console.error(
              `[MyCallerIdDropdown] The fromNumber "${value}" is not in the fromNumbers list should figure out why that happened`,
              {
                value,
                fromNumber,
                fromNumbers,
              },
            );
          }
        }

        return index !== -1 ? index : 0;
      }}
      value={fromNumber}
      renderValue={(phoneNumber) => {
        return phoneNumber === 'anonymous' ? (
          anonymousCallerLabel
        ) : (
          <FormattedPhoneNumber phoneNumber={phoneNumber} />
        );
      }}
      data={options}
    >
      {(_, option: UserPhoneNumberInfo) => {
        return (
          <Option
            classes={{
              container: '[&&]:h-12',
            }}
            key={option.phoneNumber}
            value={option.phoneNumber}
          >
            <MenuItemText>{renderValue(option)}</MenuItemText>
          </Option>
        );
      }}
    </Dropdown>
  );
};
