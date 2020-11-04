import { RcLineSelect, RcLineSelectProps, RcMenuItem } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

export type SelectFieldProps = {
  options: {
    label: any;
    value: string;
    disabled: boolean;
  }[];
} & RcLineSelectProps;

export const SelectField: FunctionComponent<SelectFieldProps> = ({
  options,
  ...rest
}) => {
  return (
    <RcLineSelect {...rest}>
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
    </RcLineSelect>
  );
};
