import { RcBox, RcButton, spacing, styled, useTheme } from '@ringcentral/juno';
import React from 'react';

import i18n from './i18n';
import styles from './styles.scss';

export const MINS = 0;
export const HOURS = 1;
export const DAYS = 2;

const TimeButton = styled(RcButton)`
  && {
    box-shadow: none;
  }
`;

TimeButton.defaultProps = {
  size: 'xsmall',
  radius: 'round',
  keepElevation: false,
};

type TimeInputProps = {
  currentLocale: string;
  timeValue?: string;
  timeUnit?: number;
  inputRef: (...args: any[]) => any;
  onTimeValueChange: React.ChangeEventHandler<HTMLInputElement>;
  onSelectTimeUnit: (unit: number) => any;
};

export const TimeInput: React.FC<TimeInputProps> = ({
  timeValue,
  onTimeValueChange,
  inputRef,
  currentLocale,
  timeUnit,
  onSelectTimeUnit,
}) => {
  const handleSelectTimeUnit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    unit: number,
  ) => {
    e.stopPropagation();
    onSelectTimeUnit(unit);
  };

  const theme = useTheme();

  return (
    <div className={styles.timeInput}>
      <span className={styles.timeValue}>
        <input
          maxLength={2}
          value={timeValue}
          onChange={onTimeValueChange}
          ref={inputRef}
        />
      </span>
      <RcBox marginLeft={spacing(2)({ theme })} clone>
        <TimeButton
          onClick={(e) => handleSelectTimeUnit(e, MINS)}
          variant={timeUnit === MINS ? 'contained' : 'text'}
        >
          {i18n.getString('min', currentLocale)}
        </TimeButton>
      </RcBox>
      <TimeButton
        variant={timeUnit === HOURS ? 'contained' : 'text'}
        onClick={(e) => handleSelectTimeUnit(e, HOURS)}
      >
        {i18n.getString('hours', currentLocale)}
      </TimeButton>
      <TimeButton
        variant={timeUnit === DAYS ? 'contained' : 'text'}
        onClick={(e) => handleSelectTimeUnit(e, DAYS)}
      >
        {i18n.getString('days', currentLocale)}
      </TimeButton>
    </div>
  );
};

TimeInput.defaultProps = {
  timeValue: '',
  timeUnit: MINS,
};
