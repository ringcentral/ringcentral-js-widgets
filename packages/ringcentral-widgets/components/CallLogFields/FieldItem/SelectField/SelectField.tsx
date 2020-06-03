import {
  RcLineSelect,
  RcLineSelectProps,
  RcMenuItem,
} from '@ringcentral-integration/rcui';
import React, { FunctionComponent } from 'react';

import styles from './styles.scss';

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
          value={`${item.value}`}
          data-sign={`option${i}`}
          disabled={item.disabled}
        >
          {item.label}
        </RcMenuItem>
      ))}
    </RcLineSelect>
  );
};
