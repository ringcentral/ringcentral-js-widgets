import { RcMenuItem, RcSelect, RcSelectProps } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

export type SelectFieldProps = {
  options: {
    label: any;
    value: string;
    disabled: boolean;
  }[];
} & RcSelectProps;

export const SelectField: FunctionComponent<SelectFieldProps> = ({
  options,
  ...rest
}) => {
  return (
    <RcSelect gutterBottom {...rest}>
      {options.map((item, i) => (
        <RcMenuItem
          key={i}
          value={!item.value ? undefined : `${item.value}`}
          data-sign={`option${i}`}
          disabled={item.disabled}
        >
          {item.label}
        </RcMenuItem>
      ))}
    </RcSelect>
  );
};
