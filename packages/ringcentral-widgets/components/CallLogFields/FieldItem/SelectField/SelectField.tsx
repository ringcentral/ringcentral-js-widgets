import type { FunctionComponent } from 'react';
import React from 'react';

import type { RcSelectProps } from '@ringcentral/juno';
import { RcMenuItem, RcSelect } from '@ringcentral/juno';

export type SelectFieldProps = {
  options: {
    label: any;
    value: string;
    disabled: boolean;
    title?: string;
  }[];
  labelClassName?: string;
} & RcSelectProps;

export const SelectField: FunctionComponent<SelectFieldProps> = ({
  options,
  labelClassName,
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
          title={item.label}
        >
          <span className={labelClassName}>{item.label}</span>
        </RcMenuItem>
      ))}
    </RcSelect>
  );
};
