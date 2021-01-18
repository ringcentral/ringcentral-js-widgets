import {
  RcRadio,
  RcRadioGroup,
  RcFormControlLabel,
  RcRadioGroupProps,
} from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

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
  onChange,
}) => {
  return (
    <RcRadioGroup value={value} onChange={onChange}>
      {options.map((item, i) => (
        <RcFormControlLabel
          key={`label-${i}`}
          value={item.value}
          control={<RcRadio key={`radio-${i}`} />}
          label={item.label}
          disabled={item.disabled}
        />
      ))}
    </RcRadioGroup>
  );
};
