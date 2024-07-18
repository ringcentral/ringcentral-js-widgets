import type { RcSelectProps } from '@ringcentral/juno';
import { RcMenuItem, RcSelect } from '@ringcentral/juno';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import styles from './styles.scss';

export interface PickListProps extends Pick<RcSelectProps, 'InputProps'> {
  options: any[];
  /**
   * the option value with key of options, default is 'id'
   */
  optionValueKey?: string;
  /**
   * the option show label with the key of options, default is 'label'
   */
  optionLabelKey?: string;
  label: string;
  value: string;
  required?: boolean;
  onChange: (e: any) => void;
  dataSign?: string;
  renderItem?: (...args: any[]) => ReactNode;
  renderValue?: (...args: any[]) => ReactNode;
}

export const PickList: FunctionComponent<PickListProps> = ({
  options,
  optionValueKey = 'id',
  optionLabelKey = 'label',
  label,
  value,
  required,
  onChange,
  dataSign,
  renderItem,
  renderValue,
  InputProps,
  ...rest
}) => {
  return (
    <RcSelect
      data-sign={dataSign}
      fullWidth
      gutterBottom
      required={required}
      label={label}
      value={value}
      InputProps={InputProps}
      onChange={({ target: { value } }) => {
        onChange(value);
      }}
      renderValue={renderValue}
      {...rest}
    >
      {options.map((item, i) => {
        const label = item[optionLabelKey];
        return (
          <RcMenuItem
            key={i}
            value={item[optionValueKey]}
            data-sign={`option${i}`}
          >
            {renderItem ? (
              renderItem(item)
            ) : (
              <div className={styles.menuItem} title={label}>
                {label}
              </div>
            )}
          </RcMenuItem>
        );
      })}
    </RcSelect>
  );
};
