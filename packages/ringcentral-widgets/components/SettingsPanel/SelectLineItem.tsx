import { RcMenuItem, RcSelect } from '@ringcentral/juno';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import Line from '../Line';

import i18n from './i18n';
import styles from './styles.scss';

export const SelectLineItem: FunctionComponent<{
  name?: string;
  currentLocale?: string;
  customTitle?: string;
  switchTitle?: string;
  show?: boolean;
  dataSign?: string;
  disabled?: boolean;
  value: any;
  options: Array<{
    value: any;
    label: string;
  }>;
  onChange: (...args: any) => void;
}> = ({
  show,
  name,
  customTitle,
  currentLocale,
  dataSign,
  disabled,
  value,
  options,
  onChange,
}) => {
  if (!show) {
    return null;
  }
  return (
    <Line>
      <span
        data-sign={`${dataSign}_label`}
        className={clsx(disabled && styles.disableText, styles.selectTitle)}
      >
        {/* @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message */}
        {customTitle || i18n.getString(name, currentLocale)}
      </span>
      <RcSelect
        fullWidth
        data-sign={dataSign}
        variant="box"
        value={value}
        className={styles.selectSection}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(({ value, label }) => {
          return (
            <RcMenuItem key={value} value={value}>
              {/* @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message */}
              {i18n.getString(label, currentLocale)}
            </RcMenuItem>
          );
        })}
      </RcSelect>
    </Line>
  );
};
