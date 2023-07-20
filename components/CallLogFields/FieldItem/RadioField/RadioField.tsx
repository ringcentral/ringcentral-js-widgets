import type { FunctionComponent } from 'react';
import React from 'react';

import type { RcRadioGroupProps } from '@ringcentral/juno';
import { RcFormControlLabel, RcRadio, RcRadioGroup } from '@ringcentral/juno';

export type RadioFieldProps = {
  options: {
    label: any;
    value: string;
    disabled: boolean;
  }[];
  value: string;
} & RcRadioGroupProps;

export const RadioField: FunctionComponent<RadioFieldProps> = ({
  value,
  options,
  classes,
  onChange,
}) => {
  return (
    <RcRadioGroup value={value} onChange={onChange}>
      {options.map((item, i) => (
        <RcFormControlLabel
          key={`label-${i}`}
          value={item.value}
          control={<RcRadio key={`radio-${i}`} size="small" />}
          label={item.label}
          disabled={item.disabled}
          classes={classes}
        />
      ))}
    </RcRadioGroup>
  );
};
