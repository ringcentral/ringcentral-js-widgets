import { FormattedPhoneNumber } from '@ringcentral-integration/micro-auth/src/app/components';
import { InfoMd } from '@ringcentral/spring-icon';
import { Icon, Option, Select, Tooltip } from '@ringcentral/spring-ui';
import React, { memo } from 'react';

import { t, type I18nKey } from './i18n';
import styles from './styles.scss';

interface PhoneNumberProps {
  phoneNumber?: string | null;
  label?: string;
}

const PhoneNumber = (props: PhoneNumberProps) => {
  const { label, phoneNumber } = props;

  return (
    <span className={styles.phoneNumber}>
      {label ? <span className={styles.usageType}>{label}</span> : null}
      <span data-sign="phoneNumber">
        <FormattedPhoneNumber phoneNumber={phoneNumber || ''} />
      </span>
    </span>
  );
};

const NumberFeatureOption = (
  props: PhoneNumberProps & { statusLabel?: React.ReactNode },
) => {
  const { label, phoneNumber, statusLabel } = props;

  return (
    <span className="flex w-full items-center justify-between gap-2 py-0.5">
      <span className="flex shrink-0 flex-col items-start whitespace-nowrap">
        {label ? (
          <span className="typography-subtitleMini text-neutral-b0">
            {label}
          </span>
        ) : null}
        <span
          className="typography-descriptor text-neutral-b2"
          data-sign="phoneNumber"
        >
          <FormattedPhoneNumber phoneNumber={phoneNumber || ''} />
        </span>
      </span>
      {statusLabel ? (
        <span className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-1 text-right">
          <span className="min-w-0 whitespace-normal break-words text-right typography-descriptorMini text-neutral-b2">
            {statusLabel}
          </span>
          <Tooltip
            title={t('numberRegistrationTooltip')}
            classes={{ content: 'text-left' }}
            placement="left"
            triggerWhenDisabled
            triggerWrapperProps={{
              className:
                'inline-flex shrink-0 cursor-pointer pointer-events-auto',
              onClick: (event) => event.stopPropagation(),
              onMouseDown: (event) => event.stopPropagation(),
            }}
          >
            <Icon
              size="small"
              data-sign="numberFeatureStatusHint"
              symbol={InfoMd}
              className="text-neutral-b0"
            />
          </Tooltip>
        </span>
      ) : null}
    </span>
  );
};

interface FromNumberOption {
  phoneNumber: string;
  usageType?: string;
  displayLabel?: string;
  disabled?: boolean;
  statusLabel?: React.ReactNode;
  extension?: Extension;
}

interface Extension {
  uri: string;
  id: number;
  extensionNumber: string;
  name: string;
  type: string;
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
  const disabledPhoneNumberSet = new Set(
    options
      .filter(({ disabled }) => disabled)
      .map(({ phoneNumber }) => phoneNumber),
  );

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

          const selectedOption = options.find(
            ({ phoneNumber }) => phoneNumber === value,
          );

          const usageTypeLabel =
            selectedOption &&
            getDisplayLabel(
              selectedOption.extension,
              selectedOption.usageType,
              selectedOption.displayLabel,
            );

          return <PhoneNumber phoneNumber={value} label={usageTypeLabel} />;
        }}
        onChange={(e) => {
          const phoneNumber = e.target.value;
          if (disabledPhoneNumberSet.has(phoneNumber)) {
            return;
          }

          onChange({ phoneNumber });
        }}
      >
        {options.map((option) => {
          const {
            phoneNumber,
            usageType,
            displayLabel,
            disabled,
            statusLabel,
            extension,
          } = option;

          const usageTypeLabel = getDisplayLabel(
            extension,
            usageType,
            displayLabel,
          );

          return (
            <Option
              data-sign="selectMenuItem"
              key={phoneNumber}
              value={phoneNumber}
              disabled={disabled}
            >
              {phoneNumber === 'anonymous' ? (
                <span>{t('Blocked')}</span>
              ) : (
                <NumberFeatureOption
                  phoneNumber={phoneNumber}
                  label={usageTypeLabel}
                  statusLabel={statusLabel}
                />
              )}
            </Option>
          );
        })}
      </Select>
    </div>
  );
});

function getDisplayLabel(
  extension: Extension | undefined,
  usageType: string | undefined,
  displayLabel: string | undefined,
) {
  return displayLabel
    ? displayLabel
    : extension?.type === 'Site'
    ? extension.name
    : usageType
    ? t(usageType as I18nKey)
    : undefined;
}
